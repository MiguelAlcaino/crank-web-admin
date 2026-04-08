import { readonly, ref } from 'vue'
import { gql } from 'graphql-tag'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

export interface AdminMindbodyClient {
  id: string
  clientId: string | null
  firstName: string | null
  lastName: string | null
  email: string | null
  mobilePhone: string | null
}

export interface PaginatedMindbodyClients {
  items: AdminMindbodyClient[]
  totalCount: number
  page: number
  limit: number
}

const LIST_QUERY = gql`
  query AdminMindbodyClients($params: AdminMindbodyClientsParams, $pagination: PaginationInput) {
    mindbodyClients(params: $params, pagination: $pagination) {
      items {
        id
        clientId
        firstName
        lastName
        email
        mobilePhone
      }
      totalCount
      page
      limit
    }
  }
`

const DETAIL_QUERY = gql`
  query AdminMindbodyClient($id: ID!) {
    mindbodyClient(id: $id) {
      id
      clientId
      firstName
      lastName
      email
      mobilePhone
    }
  }
`

export const useMindbodyClients = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  const listResult = ref<PaginatedMindbodyClients | null>(null)
  const detail = ref<AdminMindbodyClient | null>(null)
  const isLoading = ref(false)
  const hasError = ref(false)

  async function fetchList(params?: { search?: string }, pagination?: { page?: number; limit?: number }) {
    isLoading.value = true
    hasError.value = false
    try {
      const { data } = await apolloClient.query({
        query: LIST_QUERY,
        variables: {
          params: params && Object.keys(params).length > 0 ? params : undefined,
          pagination
        },
        fetchPolicy: 'network-only'
      })
      listResult.value = data.mindbodyClients
    } catch (e) {
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

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
      detail.value = data.mindbodyClient
    } catch (e) {
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    listResult: readonly(listResult),
    detail: readonly(detail),
    isLoading: readonly(isLoading),
    hasError: readonly(hasError),
    fetchList,
    fetchDetail
  }
}
