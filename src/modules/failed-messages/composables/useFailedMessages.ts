import { ref } from 'vue'
import type { ApolloClient } from '@apollo/client'
import {
  DiscardFailedMessageDocument,
  FailedMessageDocument,
  FailedMessagesDocument,
  RetryFailedMessageDocument
} from '@/gql/graphql'
import type { FailedMessageQuery, FailedMessageQueueEnum, FailedMessagesQuery } from '@/gql/graphql'

export type FailedMessageRow = FailedMessagesQuery['failedMessages']['failedMessages'][number]
export type FailedMessageDetails = NonNullable<FailedMessageQuery['failedMessage']>
export type FailedMessageActionResult = 'success' | 'not_found' | 'error'
export type FailedMessageAction = 'retry' | 'discard'

export const useFailedMessages = (apolloClient: ApolloClient<any>) => {
  const failedMessages = ref<FailedMessageRow[]>([])
  const total = ref<number>(0)
  const isLoading = ref<boolean>(false)
  const hasError = ref<boolean>(false)

  const selectedMessage = ref<FailedMessageDetails | null>(null)
  const isLoadingDetail = ref<boolean>(false)

  const actingId = ref<string | null>(null)
  const actingAction = ref<FailedMessageAction | null>(null)

  async function fetchFailedMessages(queue: FailedMessageQueueEnum, page: number, limit: number) {
    isLoading.value = true
    hasError.value = false

    try {
      const result = await apolloClient.query({
        query: FailedMessagesDocument,
        variables: { queue, pagination: { page, limit } },
        fetchPolicy: 'network-only'
      })
      failedMessages.value = result.data.failedMessages.failedMessages
      total.value = result.data.failedMessages.total
    } catch (error) {
      hasError.value = true
      failedMessages.value = []
      total.value = 0
    } finally {
      isLoading.value = false
    }
  }

  async function fetchFailedMessage(
    queue: FailedMessageQueueEnum,
    id: string
  ): Promise<FailedMessageDetails | null> {
    isLoadingDetail.value = true
    selectedMessage.value = null

    try {
      const result = await apolloClient.query({
        query: FailedMessageDocument,
        variables: { queue, id },
        fetchPolicy: 'network-only'
      })
      selectedMessage.value = result.data.failedMessage ?? null
    } catch (error) {
      selectedMessage.value = null
    } finally {
      isLoadingDetail.value = false
    }

    return selectedMessage.value
  }

  async function retryFailedMessage(
    queue: FailedMessageQueueEnum,
    id: string
  ): Promise<FailedMessageActionResult> {
    actingId.value = id
    actingAction.value = 'retry'

    try {
      const result = await apolloClient.mutate({
        mutation: RetryFailedMessageDocument,
        variables: { input: { queue, id } }
      })

      return toActionResult(result.data?.retryFailedMessage?.__typename)
    } catch (error) {
      return 'error'
    } finally {
      actingId.value = null
      actingAction.value = null
    }
  }

  async function discardFailedMessage(
    queue: FailedMessageQueueEnum,
    id: string
  ): Promise<FailedMessageActionResult> {
    actingId.value = id
    actingAction.value = 'discard'

    try {
      const result = await apolloClient.mutate({
        mutation: DiscardFailedMessageDocument,
        variables: { input: { queue, id } }
      })

      return toActionResult(result.data?.discardFailedMessage?.__typename)
    } catch (error) {
      return 'error'
    } finally {
      actingId.value = null
      actingAction.value = null
    }
  }

  function toActionResult(typename: string | undefined): FailedMessageActionResult {
    if (typename === 'FailedMessageActionSuccess') {
      return 'success'
    }

    if (typename === 'FailedMessageNotFoundError') {
      return 'not_found'
    }

    return 'error'
  }

  return {
    failedMessages,
    total,
    isLoading,
    hasError,
    selectedMessage,
    isLoadingDetail,
    actingId,
    actingAction,
    fetchFailedMessages,
    fetchFailedMessage,
    retryFailedMessage,
    discardFailedMessage
  }
}
