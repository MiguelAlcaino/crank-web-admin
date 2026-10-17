import { graphqlErrorCode as graphQLErrorCode } from '@/utils/errors/graphqlErrorCode'

export type RetryResult =
  | 'success'
  | 'not_found'
  | 'already_done'
  | 'in_progress'
  | 'already_sold'
  | 'error'

const RESULT_BY_ERROR_CODE: Record<string, RetryResult> = {
  'temporal_transaction.not_found': 'not_found',
  'temporal_transaction.already_completed': 'already_done',
  'temporal_transaction.feedback_in_progress': 'in_progress',
  'temporal_transaction.already_sold': 'already_sold'
}

/** Debug messages of the plain exceptions the KAN-231 backend throws instead of error codes. */
const RESULT_BY_KAN231_DEBUG_MESSAGE: Record<string, RetryResult> = {
  'Temporal Transaction not found': 'not_found',
  'This temporal transactions seemed to be processed successfully already': 'already_done'
}

/** Why retryTransactionFeedback refused, from the error the backend answered. */
export function retryResultFromError(error: unknown): RetryResult {
  const code = graphQLErrorCode(error)
  if (code && RESULT_BY_ERROR_CODE[code]) {
    return RESULT_BY_ERROR_CODE[code]
  }

  const debugMessage = (
    error as { graphQLErrors?: { extensions?: { debugMessage?: unknown } }[] } | null
  )?.graphQLErrors?.[0]?.extensions?.debugMessage
  if (typeof debugMessage === 'string' && RESULT_BY_KAN231_DEBUG_MESSAGE[debugMessage]) {
    return RESULT_BY_KAN231_DEBUG_MESSAGE[debugMessage]
  }

  return 'error'
}
