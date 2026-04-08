import { readonly, ref } from 'vue'
import { gql } from 'graphql-tag'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

export interface SystemSettings {
  id: string
  sendSuccessfulPurchaseEmail: boolean
  textBottomIndexPage: string | null
}

const SYSTEM_SETTINGS_QUERY = gql`
  query SystemSettings {
    systemSettings {
      id
      sendSuccessfulPurchaseEmail
      textBottomIndexPage
    }
  }
`

const UPDATE_SYSTEM_SETTINGS_MUTATION = gql`
  mutation UpdateSystemSettings($input: UpdateSystemSettingsInput!) {
    updateSystemSettings(input: $input) {
      id
      sendSuccessfulPurchaseEmail
      textBottomIndexPage
    }
  }
`

const CLEAR_CACHE_MUTATION = gql`
  mutation ClearSystemCache {
    clearSystemCache
  }
`

export const useSystemSettings = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  const settings = ref<SystemSettings | null>(null)
  const isLoading = ref(false)
  const isSaving = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')

  async function fetchSettings() {
    isLoading.value = true
    hasError.value = false
    try {
      const { data } = await apolloClient.query({
        query: SYSTEM_SETTINGS_QUERY,
        fetchPolicy: 'network-only'
      })
      settings.value = data.systemSettings
    } catch (e) {
      hasError.value = true
      errorMessage.value = 'Failed to load system settings'
    } finally {
      isLoading.value = false
    }
  }

  async function updateSettings(
    sendSuccessfulPurchaseEmail: boolean,
    textBottomIndexPage: string | null
  ): Promise<boolean> {
    isSaving.value = true
    hasError.value = false
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_SYSTEM_SETTINGS_MUTATION,
        variables: { input: { sendSuccessfulPurchaseEmail, textBottomIndexPage } }
      })
      if (data?.updateSystemSettings) {
        settings.value = data.updateSystemSettings
      }
      return true
    } catch (e) {
      hasError.value = true
      errorMessage.value = 'Failed to update settings'
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function clearCache(): Promise<boolean> {
    isSaving.value = true
    hasError.value = false
    try {
      const { data } = await apolloClient.mutate({
        mutation: CLEAR_CACHE_MUTATION
      })
      return !!data?.clearSystemCache
    } catch (e) {
      hasError.value = true
      errorMessage.value = 'Failed to clear cache'
      return false
    } finally {
      isSaving.value = false
    }
  }

  return {
    settings: readonly(settings),
    isLoading: readonly(isLoading),
    isSaving: readonly(isSaving),
    hasError: readonly(hasError),
    errorMessage: readonly(errorMessage),
    fetchSettings,
    updateSettings,
    clearCache
  }
}
