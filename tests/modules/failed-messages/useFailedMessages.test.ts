import { describe, expect, it, vi } from 'vitest'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import {
  DiscardFailedMessageDocument,
  FailedMessageDocument,
  FailedMessageQueueEnum,
  FailedMessagesDocument,
  RetryFailedMessageDocument
} from '../../../src/gql-main/graphql'
import {
  FAILED_MESSAGE_ACTION_ERROR,
  FAILED_MESSAGE_LOAD_ERROR,
  FAILED_MESSAGE_NOT_FOUND,
  FAILED_MESSAGE_RETRIED,
  FAILED_MESSAGES_LOAD_ERROR
} from '../../../src/modules/failed-messages/composables/failedMessages'
import { useFailedMessages } from '../../../src/modules/failed-messages/composables/useFailedMessages'

const QUEUE = FailedMessageQueueEnum.PartnerPurchase

function apolloClient(client: { query?: unknown; mutate?: unknown }) {
  return client as unknown as ApolloClient<NormalizedCacheObject>
}

function row(id: string) {
  return {
    __typename: 'FailedMessage' as const,
    id,
    queue: QUEUE,
    messageClass: 'App\\Messenger\\PartnerPurchaseMessage',
    summary: null,
    exceptionClass: null,
    failedAt: null,
    retryCount: 3,
    originalTransport: 'partner_purchase_queue',
    payfortDetails: null
  }
}

describe('useFailedMessages fetchFailedMessages', () => {
  it('clears the list and maps the error code when the query fails', async () => {
    const query = vi.fn().mockRejectedValue({ graphQLErrors: [{ message: 'user.not_admin' }] })
    const { failedMessages, total, loadError, isLoading, fetchFailedMessages } = useFailedMessages(
      apolloClient({ query })
    )

    await fetchFailedMessages(QUEUE, 1, 25)

    expect(failedMessages.value).toEqual([])
    expect(total.value).toBe(0)
    expect(loadError.value).toMatch(/super admins/)
    expect(isLoading.value).toBe(false)
  })

  it('falls back to the generic load error without a known code', async () => {
    const query = vi.fn().mockRejectedValue(new Error('Network'))
    const { loadError, fetchFailedMessages } = useFailedMessages(apolloClient({ query }))

    await fetchFailedMessages(QUEUE, 1, 25)

    expect(loadError.value).toBe(FAILED_MESSAGES_LOAD_ERROR)
  })

  it('loads the page of the queue with its total', async () => {
    const query = vi.fn().mockResolvedValue({
      data: { failedMessages: { total: 26, failedMessages: [row('a')] } }
    })
    const { failedMessages, total, loadError, fetchFailedMessages } = useFailedMessages(
      apolloClient({ query })
    )

    await fetchFailedMessages(QUEUE, 2, 25)

    expect(query).toHaveBeenCalledWith({
      query: FailedMessagesDocument,
      variables: { queue: QUEUE, pagination: { page: 2, limit: 25 } },
      fetchPolicy: 'network-only'
    })
    expect(failedMessages.value).toEqual([row('a')])
    expect(total.value).toBe(26)
    expect(loadError.value).toBeNull()
  })
})

describe('useFailedMessages fetchFailedMessage', () => {
  it('shows an error when the query fails', async () => {
    const query = vi.fn().mockRejectedValue(new Error('Network'))
    const { selectedMessage, detailError, fetchFailedMessage } = useFailedMessages(
      apolloClient({ query })
    )

    await fetchFailedMessage(QUEUE, 'a')

    expect(selectedMessage.value).toBeNull()
    expect(detailError.value).toBe(FAILED_MESSAGE_LOAD_ERROR)
  })

  it('leaves the message empty when it is no longer in the queue', async () => {
    const query = vi.fn().mockResolvedValue({ data: { failedMessage: null } })
    const { selectedMessage, detailError, fetchFailedMessage } = useFailedMessages(
      apolloClient({ query })
    )

    await fetchFailedMessage(QUEUE, 'a')

    expect(selectedMessage.value).toBeNull()
    expect(detailError.value).toBeNull()
  })

  it('loads the full record', async () => {
    const message = { ...row('a'), errorMessage: 'Mindbody is down' }
    const query = vi.fn().mockResolvedValue({ data: { failedMessage: message } })
    const { selectedMessage, isLoadingDetail, fetchFailedMessage } = useFailedMessages(
      apolloClient({ query })
    )

    await fetchFailedMessage(QUEUE, 'a')

    expect(query).toHaveBeenCalledWith({
      query: FailedMessageDocument,
      variables: { queue: QUEUE, id: 'a' },
      fetchPolicy: 'network-only'
    })
    expect(selectedMessage.value).toEqual(message)
    expect(isLoadingDetail.value).toBe(false)
  })
})

describe('useFailedMessages actions', () => {
  it('answers an error when the mutation throws', async () => {
    const mutate = vi.fn().mockRejectedValue(new Error('Network'))
    const { actingId, actingAction, retryFailedMessage } = useFailedMessages(
      apolloClient({ mutate })
    )

    const outcome = await retryFailedMessage(QUEUE, 'a')

    expect(outcome).toEqual({ kind: 'error', message: FAILED_MESSAGE_ACTION_ERROR })
    expect(actingId.value).toBeNull()
    expect(actingAction.value).toBeNull()
  })

  it('answers not found when the message left the queue already', async () => {
    const mutate = vi.fn().mockResolvedValue({
      data: { discardFailedMessage: { __typename: 'FailedMessageNotFoundError', code: 'x' } }
    })
    const { discardFailedMessage } = useFailedMessages(apolloClient({ mutate }))

    const outcome = await discardFailedMessage(QUEUE, 'a')

    expect(mutate).toHaveBeenCalledWith({
      mutation: DiscardFailedMessageDocument,
      variables: { input: { queue: QUEUE, id: 'a' } }
    })
    expect(outcome).toEqual({ kind: 'notFound', message: FAILED_MESSAGE_NOT_FOUND })
  })

  it('marks the row as acting while the retry runs and answers success', async () => {
    let resolve: (value: unknown) => void = () => {}
    const mutate = vi.fn().mockReturnValue(new Promise((r) => (resolve = r)))
    const { actingId, actingAction, retryFailedMessage } = useFailedMessages(
      apolloClient({ mutate })
    )

    const pending = retryFailedMessage(QUEUE, 'a')
    expect(actingId.value).toBe('a')
    expect(actingAction.value).toBe('retry')

    resolve({
      data: { retryFailedMessage: { __typename: 'FailedMessageActionSuccess', success: true } }
    })
    const outcome = await pending

    expect(mutate).toHaveBeenCalledWith({
      mutation: RetryFailedMessageDocument,
      variables: { input: { queue: QUEUE, id: 'a' } }
    })
    expect(outcome).toEqual({ kind: 'success', message: FAILED_MESSAGE_RETRIED })
    expect(actingId.value).toBeNull()
  })
})
