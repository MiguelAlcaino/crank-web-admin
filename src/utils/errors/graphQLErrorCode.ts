/**
 * The message of the first GraphQL error of an Apollo error. crank-payments answers its client-safe
 * errors with the error code as the message (e.g. `transaction_record.not_found`); anything else
 * reaches the client as "Internal server error".
 */
export function graphQLErrorCode(error: unknown): string | null {
  const graphQLErrors = (error as { graphQLErrors?: { message?: unknown }[] } | null)?.graphQLErrors
  const message = graphQLErrors?.[0]?.message

  return typeof message === 'string' && message !== '' ? message : null
}
