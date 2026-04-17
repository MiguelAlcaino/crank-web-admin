import { readonly, ref } from 'vue'
import { gql } from 'graphql-tag'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

export interface SubscriptionTransaction {
  id: string
  amount: string | null
  status: string | null
  created: string | null
  customerName: string | null
  customerEmail: string | null
}

export interface SubscriptionDetail {
  id: string
  status: string
  amountCents: number
  billingInterval: string
  creditCardLastFourDigits: string | null
  createdAt: string
  cancelledAt: string | null
  transactions: SubscriptionTransaction[]
}

const CANCEL_MUTATION = gql`
  mutation CancelSubscription($subscriptionId: ID!) {
    cancelSubscription(input: { subscriptionId: $subscriptionId }) {
      ... on CancelSubscriptionSuccess {
        success
      }
      ... on SubscriptionNotFoundError {
        code
      }
      ... on SubscriptionDoesNotBelongToUserError {
        code
      }
      ... on SubscriptionAlreadyCancelledError {
        code
      }
      ... on UnknownError {
        code
      }
    }
  }
`

const DETAIL_QUERY = gql`
  query CustomerSubscription($id: ID!) {
    customerSubscription(id: $id) {
      id
      status
      amountCents
      billingInterval
      creditCardLastFourDigits
      createdAt
      cancelledAt
      transactions {
        id
        amount
        status
        created
        customerName
        customerEmail
      }
    }
  }
`

export const useSubscription = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  const detail = ref<SubscriptionDetail | null>(null)
  const isLoading = ref(false)
  const isCancelling = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')

  async function fetchDetail(id: string) {
    isLoading.value = true
    hasError.value = false
    detail.value = null
    try {
      const { data } = await apolloClient.query({
        query: DETAIL_QUERY,
        variables: { id },
        fetchPolicy: 'network-only'
      })
      detail.value = data.customerSubscription
    } catch (e) {
      hasError.value = true
      errorMessage.value = 'Failed to load subscription'
    } finally {
      isLoading.value = false
    }
  }

  async function cancel(id: string): Promise<{ success: boolean; errorCode?: string }> {
    isCancelling.value = true
    hasError.value = false
    try {
      const { data } = await apolloClient.mutate({
        mutation: CANCEL_MUTATION,
        variables: { subscriptionId: id }
      })
      const result = data?.cancelSubscription
      if (result?.success) {
        return { success: true }
      }
      return { success: false, errorCode: result?.code ?? 'UNKNOWN' }
    } catch (e) {
      hasError.value = true
      errorMessage.value = 'Failed to cancel subscription'
      return { success: false }
    } finally {
      isCancelling.value = false
    }
  }

  return {
    detail: readonly(detail),
    isLoading: readonly(isLoading),
    isCancelling: readonly(isCancelling),
    hasError: readonly(hasError),
    errorMessage: readonly(errorMessage),
    fetchDetail,
    cancel
  }
}
