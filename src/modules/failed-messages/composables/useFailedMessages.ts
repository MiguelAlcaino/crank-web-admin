import { ref } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import {
  DiscardFailedMessageDocument,
  FailedMessageDocument,
  FailedMessagesDocument,
  RetryFailedMessageDocument,
  type FailedMessageQuery,
  type FailedMessageQueueEnum,
  type FailedMessagesQuery
} from '@/gql-main/graphql'
import {
  FAILED_MESSAGE_ACTION_ERROR,
  FAILED_MESSAGE_LOAD_ERROR,
  FAILED_MESSAGES_LOAD_ERROR,
  failedMessageActionOutcome,
  failedMessageErrorMessage,
  type FailedMessageAction,
  type FailedMessageActionOutcome
} from './failedMessages'

export type FailedMessageRow = FailedMessagesQuery['failedMessages']['failedMessages'][number]
export type FailedMessageDetails = NonNullable<FailedMessageQuery['failedMessage']>

/**
 * Messenger messages that exhausted their retries, per failure queue (`failedMessages`), the full
 * record of one (`failedMessage`) and the retry and discard actions. Super admin only on the
 * backend.
 */
export const useFailedMessages = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  const failedMessages = ref<FailedMessageRow[]>([])
  const total = ref(0)
  const isLoading = ref(false)
  /** The message to show when the list could not be loaded, null otherwise. */
  const loadError = ref<string | null>(null)

  const selectedMessage = ref<FailedMessageDetails | null>(null)
  const isLoadingDetail = ref(false)
  const detailError = ref<string | null>(null)

  /** The row whose action is running, to show its spinner and disable the other buttons. */
  const actingId = ref<string | null>(null)
  const actingAction = ref<FailedMessageAction | null>(null)

  async function fetchFailedMessages(queue: FailedMessageQueueEnum, page: number, limit: number) {
    isLoading.value = true
    loadError.value = null
    try {
      const { data } = await apolloClient.query({
        query: FailedMessagesDocument,
        variables: { queue, pagination: { page, limit } },
        fetchPolicy: 'network-only'
      })
      failedMessages.value = data.failedMessages.failedMessages
      total.value = data.failedMessages.total
    } catch (e) {
      loadError.value = failedMessageErrorMessage(e, FAILED_MESSAGES_LOAD_ERROR)
      failedMessages.value = []
      total.value = 0
    } finally {
      isLoading.value = false
    }
  }

  /** Loads the full record, error message included, which the list leaves out. */
  async function fetchFailedMessage(queue: FailedMessageQueueEnum, id: string) {
    isLoadingDetail.value = true
    selectedMessage.value = null
    detailError.value = null
    try {
      const { data } = await apolloClient.query({
        query: FailedMessageDocument,
        variables: { queue, id },
        fetchPolicy: 'network-only'
      })
      selectedMessage.value = data.failedMessage ?? null
    } catch (e) {
      detailError.value = failedMessageErrorMessage(e, FAILED_MESSAGE_LOAD_ERROR)
    } finally {
      isLoadingDetail.value = false
    }
  }

  async function act(
    action: FailedMessageAction,
    id: string,
    mutate: () => Promise<string | undefined>
  ): Promise<FailedMessageActionOutcome> {
    actingId.value = id
    actingAction.value = action
    try {
      return failedMessageActionOutcome(action, await mutate())
    } catch (e) {
      return { kind: 'error', message: failedMessageErrorMessage(e, FAILED_MESSAGE_ACTION_ERROR) }
    } finally {
      actingId.value = null
      actingAction.value = null
    }
  }

  /** Re-dispatches the message to its original transport and removes it from the queue. */
  function retryFailedMessage(queue: FailedMessageQueueEnum, id: string) {
    return act('retry', id, async () => {
      const { data } = await apolloClient.mutate({
        mutation: RetryFailedMessageDocument,
        variables: { input: { queue, id } }
      })
      return data?.retryFailedMessage.__typename
    })
  }

  /** Removes the message from the queue for good; it is never processed. */
  function discardFailedMessage(queue: FailedMessageQueueEnum, id: string) {
    return act('discard', id, async () => {
      const { data } = await apolloClient.mutate({
        mutation: DiscardFailedMessageDocument,
        variables: { input: { queue, id } }
      })
      return data?.discardFailedMessage.__typename
    })
  }

  return {
    failedMessages,
    total,
    isLoading,
    loadError,
    selectedMessage,
    isLoadingDetail,
    detailError,
    actingId,
    actingAction,
    fetchFailedMessages,
    fetchFailedMessage,
    retryFailedMessage,
    discardFailedMessage
  }
}
