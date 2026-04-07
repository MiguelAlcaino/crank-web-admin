import { readonly, ref } from 'vue'
import { gql } from 'graphql-tag'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

export interface AdminSiteCustomerInfo {
  siteCustomerId: string
  site: string
  siteName: string
  mindbodyId: string | null
}

export interface AdminCustomerListItem {
  id: string
  firstName: string | null
  lastName: string | null
  email: string
  mobilePhone: string | null
  createdAt: string | null
  isMobilePhoneVerified: boolean
  siteCustomers: AdminSiteCustomerInfo[]
}

export interface PaginatedAdminCustomers {
  items: AdminCustomerListItem[]
  totalCount: number
  page: number
  limit: number
}

const ADMIN_CUSTOMERS_QUERY = gql`
  query AdminCustomers($params: AdminCustomersParams, $pagination: PaginationInput) {
    adminCustomers(params: $params, pagination: $pagination) {
      items {
        id
        firstName
        lastName
        email
        mobilePhone
        createdAt
        isMobilePhoneVerified
        siteCustomers {
          siteCustomerId
          site
          siteName
          mindbodyId
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
      result.value = data.adminCustomers
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
