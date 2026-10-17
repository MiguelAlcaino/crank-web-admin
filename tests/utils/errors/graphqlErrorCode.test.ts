import { describe, expect, it } from 'vitest'
import { ApolloError } from '@apollo/client/core'
import { GraphQLError } from 'graphql'

import {
  graphqlErrorCode,
  messageForGraphqlError
} from '../../../src/utils/errors/graphqlErrorCode'

describe('graphqlErrorCode', () => {
  it('is null for anything that is not an Apollo error with GraphQL errors', () => {
    expect(graphqlErrorCode(null)).toBeNull()
    expect(graphqlErrorCode('customer.not_found')).toBeNull()
    expect(graphqlErrorCode(new Error('Network error'))).toBeNull()
    expect(graphqlErrorCode(new ApolloError({ graphQLErrors: [] }))).toBeNull()
  })

  it('reads the code of the first GraphQL error', () => {
    const error = new ApolloError({
      graphQLErrors: [new GraphQLError('customer.not_found'), new GraphQLError('other')]
    })

    expect(graphqlErrorCode(error)).toBe('customer.not_found')
  })
})

describe('messageForGraphqlError', () => {
  const messages = { 'customer.not_found': 'This customer no longer exists.' }

  it('falls back when the code is unknown or missing', () => {
    const unknown = new ApolloError({ graphQLErrors: [new GraphQLError('Internal server error')] })

    expect(messageForGraphqlError(unknown, messages, 'fallback')).toBe('fallback')
    expect(messageForGraphqlError(new Error('boom'), messages, 'fallback')).toBe('fallback')
  })

  it('maps a known code to its message', () => {
    const error = new ApolloError({ graphQLErrors: [new GraphQLError('customer.not_found')] })

    expect(messageForGraphqlError(error, messages, 'fallback')).toBe(
      'This customer no longer exists.'
    )
  })
})
