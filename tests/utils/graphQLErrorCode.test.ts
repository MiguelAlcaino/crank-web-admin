import { describe, expect, it } from 'vitest'

import { graphQLErrorCode } from '../../src/utils/errors/graphQLErrorCode'

describe('graphQLErrorCode', () => {
  it('is null for something that is not an Apollo error', () => {
    expect(graphQLErrorCode(null)).toBeNull()
    expect(graphQLErrorCode(undefined)).toBeNull()
    expect(graphQLErrorCode(new Error('Network error'))).toBeNull()
  })

  it('is null without GraphQL errors or with an empty message', () => {
    expect(graphQLErrorCode({ graphQLErrors: [] })).toBeNull()
    expect(graphQLErrorCode({ graphQLErrors: [{ message: '' }] })).toBeNull()
    expect(graphQLErrorCode({ graphQLErrors: [{ message: 42 }] })).toBeNull()
  })

  it('is the message of the first GraphQL error', () => {
    expect(
      graphQLErrorCode({
        graphQLErrors: [{ message: 'transaction_record.not_found' }, { message: 'other' }]
      })
    ).toBe('transaction_record.not_found')
  })
})
