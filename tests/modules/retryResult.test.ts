import { describe, expect, it } from 'vitest'

import { retryResultFromError } from '../../src/modules/incomplete-transaction-feedbacks/retryResult'

describe('retryResultFromError', () => {
  it('is error for something that is not a GraphQL error', () => {
    expect(retryResultFromError(new Error('Network error'))).toBe('error')
  })

  it.each([
    ['temporal_transaction.not_found', 'not_found'],
    ['temporal_transaction.already_completed', 'already_done'],
    ['temporal_transaction.feedback_in_progress', 'in_progress'],
    ['temporal_transaction.already_sold', 'already_sold']
  ])('maps the main error code %s', (code, result) => {
    expect(retryResultFromError({ graphQLErrors: [{ message: code }] })).toBe(result)
  })

  it.each([
    ['Temporal Transaction not found', 'not_found'],
    ['This temporal transactions seemed to be processed successfully already', 'already_done']
  ])('maps the KAN-231 debug message "%s"', (debugMessage, result) => {
    expect(
      retryResultFromError({
        graphQLErrors: [{ message: 'Internal server error', extensions: { debugMessage } }]
      })
    ).toBe(result)
  })

  it('is error for an unknown code', () => {
    expect(
      retryResultFromError({
        graphQLErrors: [{ message: 'Internal server error', extensions: { debugMessage: 'boom' } }]
      })
    ).toBe('error')
  })
})
