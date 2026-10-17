import { readonly, ref } from 'vue'
import { gql } from 'graphql-tag'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

const BULK_ACTIVATE_MUTATION = gql`
  mutation BulkActivateVod($input: BulkActivateVodInput!) {
    bulkActivateVod(input: $input) {
      processedCount
    }
  }
`

const BULK_DEACTIVATE_MUTATION = gql`
  mutation BulkDeactivateVod($mindbodyIds: [Int!]!) {
    bulkDeactivateVod(mindbodyIds: $mindbodyIds) {
      processedCount
    }
  }
`

export const useBulkVod = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  const isProcessing = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')
  const lastResult = ref<{ processedCount: number } | null>(null)

  async function activateVod(mindbodyIds: number[], vodDays: number): Promise<boolean> {
    isProcessing.value = true
    hasError.value = false
    lastResult.value = null
    try {
      const { data } = await apolloClient.mutate({
        mutation: BULK_ACTIVATE_MUTATION,
        variables: { input: { mindbodyIds, vodDays } }
      })
      lastResult.value = data?.bulkActivateVod ?? null
      return true
    } catch (e) {
      hasError.value = true
      errorMessage.value = 'Failed to activate VOD periods'
      return false
    } finally {
      isProcessing.value = false
    }
  }

  async function deactivateVod(mindbodyIds: number[]): Promise<boolean> {
    isProcessing.value = true
    hasError.value = false
    lastResult.value = null
    try {
      const { data } = await apolloClient.mutate({
        mutation: BULK_DEACTIVATE_MUTATION,
        variables: { mindbodyIds }
      })
      lastResult.value = data?.bulkDeactivateVod ?? null
      return true
    } catch (e) {
      hasError.value = true
      errorMessage.value = 'Failed to deactivate VOD periods'
      return false
    } finally {
      isProcessing.value = false
    }
  }

  return {
    isProcessing: readonly(isProcessing),
    hasError: readonly(hasError),
    errorMessage: readonly(errorMessage),
    lastResult: readonly(lastResult),
    activateVod,
    deactivateVod
  }
}
