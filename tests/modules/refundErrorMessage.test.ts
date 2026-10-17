import { describe, expect, it } from 'vitest'

import {
  DEFAULT_REFUND_ERROR_MESSAGE,
  refundErrorMessage
} from '../../src/modules/transaction-records/refundErrorMessage'

const errorWithCode = (message: string) => ({ graphQLErrors: [{ message }] })

describe('refundErrorMessage', () => {
  it('falls back to the default message without an error code', () => {
    expect(refundErrorMessage(new Error('Network error'))).toBe(DEFAULT_REFUND_ERROR_MESSAGE)
  })

  it('falls back to the default message on an unknown code', () => {
    expect(refundErrorMessage(errorWithCode('Internal server error'))).toBe(
      DEFAULT_REFUND_ERROR_MESSAGE
    )
  })

  it.each([
    ['transaction_record.not_found', 'The transaction no longer exists'],
    ['transaction_record.already_refunded', 'This transaction has already been refunded'],
    [
      'transaction_record.refund_window_expired',
      'The refund window for this transaction has expired'
    ],
    ['transaction_record.payfort_refund_failed', 'Payfort rejected the refund']
  ])('explains %s', (code, message) => {
    expect(refundErrorMessage(errorWithCode(code))).toBe(message)
  })
})
