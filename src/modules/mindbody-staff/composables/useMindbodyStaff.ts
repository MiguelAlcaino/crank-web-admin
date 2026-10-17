import { readonly, ref } from 'vue'
import { gql } from 'graphql-tag'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

export interface MindbodyStaffInfo {
  id: string
  firstName: string
  lastName: string
  email: string | null
}

const STAFF_QUERY = gql`
  query MindbodyStaffs($site: SiteEnum!) {
    mindbodyStaffs(site: $site) {
      id
      firstName
      lastName
      email
    }
  }
`

const SYNC_MUTATION = gql`
  mutation SyncAllMindbodyStaff($site: SiteEnum!) {
    syncAllMindbodyStaff(site: $site)
  }
`

export const useMindbodyStaff = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  const staffList = ref<MindbodyStaffInfo[]>([])
  const isLoading = ref(false)
  const isSyncing = ref(false)
  const hasError = ref(false)

  async function fetchStaff(site: string) {
    isLoading.value = true
    hasError.value = false
    try {
      const { data } = await apolloClient.query({
        query: STAFF_QUERY,
        variables: { site },
        fetchPolicy: 'network-only'
      })
      staffList.value = data.mindbodyStaffs
    } catch (e) {
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function syncStaff(site: string): Promise<boolean> {
    isSyncing.value = true
    hasError.value = false
    try {
      await apolloClient.mutate({
        mutation: SYNC_MUTATION,
        variables: { site }
      })
      return true
    } catch (e) {
      hasError.value = true
      return false
    } finally {
      isSyncing.value = false
    }
  }

  return {
    staffList: readonly(staffList),
    isLoading: readonly(isLoading),
    isSyncing: readonly(isSyncing),
    hasError: readonly(hasError),
    fetchStaff,
    syncStaff
  }
}
