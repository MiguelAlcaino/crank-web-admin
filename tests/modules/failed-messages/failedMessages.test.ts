import { describe, expect, it } from 'vitest'

import { FailedMessageQueueEnum } from '../../../src/gql-main/graphql'
import {
  DEFAULT_FAILED_MESSAGE_QUEUE,
  FAILED_MESSAGE_ACTION_ERROR,
  FAILED_MESSAGE_DISCARDED,
  FAILED_MESSAGE_NOT_FOUND,
  FAILED_MESSAGE_QUEUE_TABS,
  FAILED_MESSAGE_RETRIED,
  failedMessageActionOutcome,
  failedMessageErrorMessage,
  pageAfterRowRemoved,
  shortClassName
} from '../../../src/modules/failed-messages/composables/failedMessages'

function graphqlError(message: string) {
  return { graphQLErrors: [{ message }] }
}

describe('FAILED_MESSAGE_QUEUE_TABS', () => {
  it('has one tab per failure queue, Payfort feedback first', () => {
    expect(FAILED_MESSAGE_QUEUE_TABS.map((tab) => tab.queue).sort()).toEqual(
      Object.values(FailedMessageQueueEnum).sort()
    )
    expect(DEFAULT_FAILED_MESSAGE_QUEUE).toBe(FailedMessageQueueEnum.PayfortTransactionFeedback)
  })

  it('shows Payfort details only on the Payfort feedback tab', () => {
    const withPayfortDetails = FAILED_MESSAGE_QUEUE_TABS.filter((tab) => tab.hasPayfortDetails)

    expect(withPayfortDetails.map((tab) => tab.queue)).toEqual([
      FailedMessageQueueEnum.PayfortTransactionFeedback
    ])
  })
})

describe('failedMessageActionOutcome', () => {
  it('is an error when the result is missing or unexpected', () => {
    expect(failedMessageActionOutcome('retry', undefined)).toEqual({
      kind: 'error',
      message: FAILED_MESSAGE_ACTION_ERROR
    })
    expect(failedMessageActionOutcome('discard', 'SomethingElse').kind).toBe('error')
  })

  it('is a warning-worthy not found when the message left the queue already', () => {
    expect(failedMessageActionOutcome('retry', 'FailedMessageNotFoundError')).toEqual({
      kind: 'notFound',
      message: FAILED_MESSAGE_NOT_FOUND
    })
  })

  it('names the action on success', () => {
    expect(failedMessageActionOutcome('retry', 'FailedMessageActionSuccess')).toEqual({
      kind: 'success',
      message: FAILED_MESSAGE_RETRIED
    })
    expect(failedMessageActionOutcome('discard', 'FailedMessageActionSuccess')).toEqual({
      kind: 'success',
      message: FAILED_MESSAGE_DISCARDED
    })
  })
})

describe('failedMessageErrorMessage', () => {
  it('falls back for a network failure or an unknown code', () => {
    expect(failedMessageErrorMessage(new Error('Network'), 'fallback')).toBe('fallback')
    expect(failedMessageErrorMessage(graphqlError('Internal server error'), 'fallback')).toBe(
      'fallback'
    )
  })

  it('explains the missing role', () => {
    expect(failedMessageErrorMessage(graphqlError('user.not_admin'), 'fallback')).toMatch(
      /super admins/
    )
    expect(
      failedMessageErrorMessage(graphqlError('user.does_not_have_required_role'), 'fallback')
    ).toMatch(/super admins/)
  })
})

describe('shortClassName', () => {
  it('is a dash without a class', () => {
    expect(shortClassName(null)).toBe('-')
    expect(shortClassName(undefined)).toBe('-')
    expect(shortClassName('')).toBe('-')
  })

  it('keeps the last segment of a namespaced class', () => {
    expect(shortClassName('App\\Messenger\\PartnerPurchaseMessage')).toBe('PartnerPurchaseMessage')
    expect(shortClassName('RuntimeException')).toBe('RuntimeException')
  })
})

describe('pageAfterRowRemoved', () => {
  it('stays on the first page', () => {
    expect(pageAfterRowRemoved(1, 1)).toBe(1)
  })

  it('steps back when the last row of a later page left', () => {
    expect(pageAfterRowRemoved(3, 1)).toBe(2)
  })

  it('stays when rows remain on the page', () => {
    expect(pageAfterRowRemoved(3, 5)).toBe(3)
  })
})
