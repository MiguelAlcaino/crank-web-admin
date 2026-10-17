import { graphqlErrorCode as graphQLErrorCode } from '@/utils/errors/graphqlErrorCode'

const REFUND_ERROR_MESSAGES: Record<string, string> = {
  'transaction_record.not_found': 'The transaction no longer exists',
  'transaction_record.already_refunded': 'This transaction has already been refunded',
  'transaction_record.refund_window_expired': 'The refund window for this transaction has expired',
  'transaction_record.payfort_refund_failed': 'Payfort rejected the refund'
}

export const DEFAULT_REFUND_ERROR_MESSAGE = 'Failed to process refund'

/** What to tell the admin when refundTransaction fails, from the error code the backend answers. */
export function refundErrorMessage(error: unknown): string {
  const code = graphQLErrorCode(error)

  return (code && REFUND_ERROR_MESSAGES[code]) || DEFAULT_REFUND_ERROR_MESSAGE
}
