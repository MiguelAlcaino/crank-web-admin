import { readonly, ref } from 'vue'
import { gql } from 'graphql-tag'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

export interface IncompleteTransactionFeedbackSiteCustomer {
  id: string
  siteUserInfo: { site: string; externalUserId: string } | null
  identifiableUser: {
    id: string
    user: { firstName: string; lastName: string; email: string } | null
  } | null
}

export interface IncompleteTransactionFeedback {
  id: string
  merchantReference: number | null
  status: string
  feedbackTryNumber: number
  feedbackStatusUpdatedAt: string | null
  created: string
  siteCustomer: IncompleteTransactionFeedbackSiteCustomer | null
}

export interface PaginatedIncompleteTransactionFeedbacks {
  items: IncompleteTransactionFeedback[]
  totalCount: number
  page: number
  limit: number
}

export type RetryResult = 'success' | 'not_found' | 'already_done' | 'error'

const LIST_QUERY = gql`
  query IncompleteFeedbacks(
    $filter: IncompleteTransactionFeedbackFilterInput
    $pagination: PaginationInput
  ) {
    incompleteTransactionFeedbacks(filter: $filter, pagination: $pagination) {
      totalCount
      page
      limit
      items {
        id
        merchantReference
        status
        feedbackTryNumber
        feedbackStatusUpdatedAt
        created
        siteCustomer {
          id
          siteUserInfo {
            site
            externalUserId
          }
          identifiableUser {
            id
            user {
              firstName
              lastName
              email
            }
          }
        }
      }
    }
  }
`

const RETRY_MUTATION = gql`
  mutation RetryTransactionFeedback($id: ID!) {
    retryTransactionFeedback(id: $id)
  }
`

export const useIncompleteTransactionFeedbacks = (
  apolloClient: ApolloClient<NormalizedCacheObject>
) => {
  const listResult = ref<PaginatedIncompleteTransactionFeedbacks | null>(null)
  const isLoading = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')
  const retryingId = ref<string | null>(null)

  async function fetchList(
    filter?: { email?: string; createdAfter?: string },
    pagination?: { page?: number; limit?: number }
  ) {
    isLoading.value = true
    hasError.value = false
    try {
      const { data } = await apolloClient.query({
        query: LIST_QUERY,
        variables: {
          filter: filter && Object.keys(filter).length > 0 ? filter : undefined,
          pagination
        },
        fetchPolicy: 'network-only'
      })
      listResult.value = data.incompleteTransactionFeedbacks
    } catch (e) {
      hasError.value = true
      errorMessage.value = 'Failed to load incomplete feedbacks'
    } finally {
      isLoading.value = false
    }
  }

  async function retry(id: string): Promise<RetryResult> {
    retryingId.value = id
    try {
      await apolloClient.mutate({
        mutation: RETRY_MUTATION,
        variables: { id }
      })
      return 'success'
    } catch (e: any) {
      const debugMessage = e?.graphQLErrors?.[0]?.extensions?.debugMessage ?? ''
      if (debugMessage === 'Temporal Transaction not found') return 'not_found'
      if (debugMessage === 'This temporal transactions seemed to be processed successfully already')
        return 'already_done'
      return 'error'
    } finally {
      retryingId.value = null
    }
  }

  return {
    listResult: readonly(listResult),
    isLoading: readonly(isLoading),
    hasError: readonly(hasError),
    errorMessage: readonly(errorMessage),
    retryingId: readonly(retryingId),
    fetchList,
    retry
  }
}
