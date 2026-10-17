/**
 * The code of the first GraphQL error of a failed Apollo operation, or null when there is none
 * (network failure, unexpected exception).
 *
 * crank-payments answers its client-safe errors with the code as the message, for example
 * `customer.not_found` or `customer_vod_period.invalid`; anything else is "Internal server error".
 */
export function graphqlErrorCode(error: unknown): string | null {
  if (typeof error !== 'object' || error === null) {
    return null
  }

  const graphQLErrors = (error as { graphQLErrors?: unknown }).graphQLErrors
  if (!Array.isArray(graphQLErrors) || graphQLErrors.length === 0) {
    return null
  }

  const message = (graphQLErrors[0] as { message?: unknown } | null)?.message

  return typeof message === 'string' && message !== '' ? message : null
}

/**
 * A message fit to show to the admin for a failed operation: the one mapped to its error code, or
 * the fallback when the code is unknown or there is none.
 */
export function messageForGraphqlError(
  error: unknown,
  messages: Record<string, string>,
  fallback: string
): string {
  const code = graphqlErrorCode(error)

  return code !== null && code in messages ? messages[code] : fallback
}
