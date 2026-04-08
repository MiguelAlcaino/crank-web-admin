import { readonly, ref } from 'vue'
import { gql } from 'graphql-tag'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

export interface SimpleSiteUser {
  site: string
  externalUserId: string
}

export interface User {
  firstName: string
  lastName: string
  email: string
  phone: string
  isMobilePhoneVerified: boolean
  siteUsers: SimpleSiteUser[]
}

export interface IdentifiableUser {
  id: string
  user: User
}

export interface PaginatedAdminCustomers {
  items: IdentifiableUser[]
  totalCount: number
  page: number
  limit: number
}

const ADMIN_CUSTOMERS_QUERY = gql`
  query AdminCustomers($params: AdminCustomersParams, $pagination: PaginationInput) {
    customers(params: $params, pagination: $pagination) {
      items {
        id
        user {
          firstName
          lastName
          email
          phone
          isMobilePhoneVerified
          siteUsers {
            site
            externalUserId
          }
        }
      }
      totalCount
      page
      limit
    }
  }
`

export const useAdminCustomers = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  const result = ref<PaginatedAdminCustomers | null>(null)
  const isLoading = ref(false)
  const hasError = ref(false)

  async function fetchCustomers(input: {
    search?: string
    registrationStartDate?: string
    registrationEndDate?: string
    vodStartDate?: string
    vodEndDate?: string
    page?: number
    limit?: number
  }) {
    isLoading.value = true
    hasError.value = false
    try {
      const { page, limit, ...filterParams } = input
      const { data } = await apolloClient.query({
        query: ADMIN_CUSTOMERS_QUERY,
        variables: {
          params: Object.keys(filterParams).length > 0 ? filterParams : undefined,
          pagination: page || limit ? { page, limit } : undefined
        },
        fetchPolicy: 'network-only'
      })
      result.value = data.customers
    } catch (e) {
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    result: readonly(result),
    isLoading: readonly(isLoading),
    hasError: readonly(hasError),
    fetchCustomers
  }
}
