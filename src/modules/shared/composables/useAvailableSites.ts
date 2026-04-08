import { readonly, ref } from 'vue'
import { gql } from 'graphql-tag'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

export interface AvailableSite {
  name: string
  code: string
}

const AVAILABLE_SITES_QUERY = gql`
  query AvailableSites {
    availableSites {
      name
      code
    }
  }
`

const cachedSites = ref<AvailableSite[]>([])
let fetched = false

export const useAvailableSites = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  const isLoading = ref(false)

  async function fetchSites() {
    if (fetched && cachedSites.value.length > 0) return

    isLoading.value = true
    try {
      const { data } = await apolloClient.query({
        query: AVAILABLE_SITES_QUERY,
        fetchPolicy: 'cache-first'
      })
      if (data?.availableSites) {
        cachedSites.value = data.availableSites
        fetched = true
      }
    } catch (e) {
      console.error('Failed to fetch available sites', e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    sites: readonly(cachedSites),
    isLoading: readonly(isLoading),
    fetchSites
  }
}
