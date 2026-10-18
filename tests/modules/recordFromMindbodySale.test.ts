import { describe, expect, it, vi } from 'vitest'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import {
  DEFAULT_RECORD_SALE_ERROR_MESSAGE,
  RECORD_SALE_ERROR_MESSAGES,
  parseMindbodySaleId,
  recordSaleOutcome,
  recordTransactionFromMindbodySale
} from '../../src/modules/incomplete-transaction-feedbacks/recordFromMindbodySale'

function apolloClient(mutate: unknown) {
  return { mutate } as unknown as ApolloClient<NormalizedCacheObject>
}

describe('parseMindbodySaleId', () => {
  it.each(['', '   ', 'abc', '12a', '-5', '0', '1.5'])('refuses "%s"', (input) => {
    expect(parseMindbodySaleId(input)).toBeNull()
  })

  it('trims a positive whole number', () => {
    expect(parseMindbodySaleId(' 72463 ')).toBe('72463')
  })
})

describe('recordSaleOutcome', () => {
  it('is the default failure without an answer', () => {
    expect(recordSaleOutcome(null)).toEqual({
      recorded: false,
      message: DEFAULT_RECORD_SALE_ERROR_MESSAGE
    })
  })

  it.each([
    ['TemporalTransactionNotFoundError', 'temporal_transaction.not_found'],
    ['TemporalTransactionAlreadyCompletedError', 'temporal_transaction.already_completed'],
    ['TemporalTransactionAlreadyCompletedError', 'temporal_transaction.already_sold'],
    ['TemporalTransactionNotAwaitingReviewError', 'temporal_transaction.not_awaiting_review'],
    ['TemporalTransactionNotAwaitingReviewError', 'temporal_transaction.feedback_in_progress'],
    ['TemporalTransactionPaidWithGiftCardError', 'temporal_transaction.paid_with_gift_card'],
    ['MindbodySaleNotFoundError', 'mindbody_sale.not_found'],
    ['MindbodySaleMismatchError', 'mindbody_sale.returned'],
    ['MindbodySaleMismatchError', 'mindbody_sale.other_service'],
    ['MindbodySaleMismatchError', 'mindbody_sale.amount_mismatch'],
    ['MindbodySaleMismatchError', 'mindbody_sale.outside_transaction_window'],
    ['MindbodySaleMismatchError', 'mindbody_sale.other_transaction'],
    ['MindbodySaleAlreadyRecordedError', 'mindbody_sale.already_recorded'],
    ['MindbodySaleLookupFailedError', 'mindbody_sale.lookup_failed']
  ] as const)('tells the %s %s with its own message', (__typename, code) => {
    const outcome = recordSaleOutcome({ __typename, code })

    expect(outcome).toEqual({ recorded: false, message: RECORD_SALE_ERROR_MESSAGES[code] })
    expect(RECORD_SALE_ERROR_MESSAGES[code]).toBeTruthy()
  })

  it('is the default failure for a code it does not know', () => {
    expect(
      recordSaleOutcome({ __typename: 'MindbodySaleMismatchError', code: 'mindbody_sale.new' })
    ).toEqual({
      recorded: false,
      message: DEFAULT_RECORD_SALE_ERROR_MESSAGE
    })
  })

  it('is recorded for a transaction record', () => {
    expect(
      recordSaleOutcome({ __typename: 'TransactionRecord', id: '9001', merchantPurchaseId: 72463 })
    ).toEqual({ recorded: true })
  })
})

describe('recordTransactionFromMindbodySale', () => {
  it('tells a request refused for its role', async () => {
    const mutate = vi.fn().mockRejectedValue({ graphQLErrors: [{ message: 'user.not_admin' }] })

    expect(await recordTransactionFromMindbodySale(apolloClient(mutate), '12', '72463')).toEqual({
      recorded: false,
      message: RECORD_SALE_ERROR_MESSAGES['user.not_admin']
    })
  })

  it('is the default failure for a network error', async () => {
    const mutate = vi.fn().mockRejectedValue(new Error('Network error'))

    expect(await recordTransactionFromMindbodySale(apolloClient(mutate), '12', '72463')).toEqual({
      recorded: false,
      message: DEFAULT_RECORD_SALE_ERROR_MESSAGE
    })
  })

  it('tells the typed error answered', async () => {
    const mutate = vi.fn().mockResolvedValue({
      data: {
        recordTransactionFromMindbodySale: {
          __typename: 'MindbodySaleMismatchError',
          code: 'mindbody_sale.amount_mismatch'
        }
      }
    })

    expect(await recordTransactionFromMindbodySale(apolloClient(mutate), '12', '72463')).toEqual({
      recorded: false,
      message: RECORD_SALE_ERROR_MESSAGES['mindbody_sale.amount_mismatch']
    })
  })

  it('sends the transaction and sale ids and is recorded for a transaction record', async () => {
    const mutate = vi.fn().mockResolvedValue({
      data: {
        recordTransactionFromMindbodySale: {
          __typename: 'TransactionRecord',
          id: '9001',
          merchantPurchaseId: 72463
        }
      }
    })

    expect(await recordTransactionFromMindbodySale(apolloClient(mutate), '12', '72463')).toEqual({
      recorded: true
    })
    expect(mutate.mock.calls[0][0].variables).toEqual({ id: '12', mindbodySaleId: '72463' })
  })
})
