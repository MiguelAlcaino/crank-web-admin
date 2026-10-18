import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import {
  RecordTransactionFromMindbodySaleDocument,
  type RecordTransactionFromMindbodySaleMutation
} from '@/gql-main/graphql'
import { messageForGraphqlError } from '@/utils/errors/graphqlErrorCode'

/** What `recordTransactionFromMindbodySale` answered, as the admin is told it. */
export type RecordSaleOutcome = { recorded: true } | { recorded: false; message: string }

type RecordSaleResult =
  RecordTransactionFromMindbodySaleMutation['recordTransactionFromMindbodySale']

/**
 * The codes of the typed errors of `recordTransactionFromMindbodySale` (crank-payments#998), and of
 * the client-safe GraphQL errors it can throw (`user.*`).
 */
export const RECORD_SALE_ERROR_MESSAGES: Record<string, string> = {
  'temporal_transaction.not_found': 'This transaction no longer exists.',
  'temporal_transaction.already_completed':
    'This transaction is completed already; there is nothing to record.',
  'temporal_transaction.already_sold':
    'Mindbody has already sold this transaction and it has a record; finish the rest by hand.',
  'temporal_transaction.not_awaiting_review':
    'This transaction is not awaiting review: only a paid transaction left with no sale recorded can be completed from a Mindbody sale.',
  'temporal_transaction.feedback_in_progress':
    'A delivery of this feedback is being processed right now. Try again in a few minutes.',
  'temporal_transaction.paid_with_gift_card':
    'A gift card paid part of this transaction, so it cannot be completed from a Mindbody sale. Finish it by hand.',
  'mindbody_sale.not_found':
    'This customer has no Mindbody sale with that id since the transaction was created.',
  'mindbody_sale.returned': 'That Mindbody sale was returned.',
  'mindbody_sale.other_service': "That Mindbody sale is not of this transaction's package alone.",
  'mindbody_sale.amount_mismatch':
    "The amount paid in that Mindbody sale is not this transaction's total.",
  'mindbody_sale.outside_transaction_window':
    'That Mindbody sale is dated before this transaction was created.',
  'mindbody_sale.other_transaction':
    "That Mindbody sale is tagged with another transaction's merchant reference: it belongs to that transaction.",
  'mindbody_sale.already_recorded': 'That Mindbody sale is already recorded for a transaction.',
  'mindbody_sale.lookup_failed':
    'Mindbody could not be reached to check the sale. Nothing was recorded; try again later.',
  'user.not_authorized': 'Your session has expired. Log in again.',
  'user.not_admin': 'Only admins can complete a transaction from a Mindbody sale.'
}

export const DEFAULT_RECORD_SALE_ERROR_MESSAGE =
  'Recording the Mindbody sale failed. Please try again later.'

/** The sale id the admin typed, trimmed, or null when it is not a positive whole number. */
export function parseMindbodySaleId(input: string): string | null {
  const saleId = input.trim()

  return /^\d+$/.test(saleId) && Number(saleId) > 0 ? saleId : null
}

/** The outcome of an answered mutation: recorded, or the message of its typed error. */
export function recordSaleOutcome(result: RecordSaleResult | null | undefined): RecordSaleOutcome {
  if (!result) {
    return { recorded: false, message: DEFAULT_RECORD_SALE_ERROR_MESSAGE }
  }

  if (result.__typename === 'TransactionRecord') {
    return { recorded: true }
  }

  return {
    recorded: false,
    message: RECORD_SALE_ERROR_MESSAGES[result.code] ?? DEFAULT_RECORD_SALE_ERROR_MESSAGE
  }
}

/**
 * Completes the transaction from the Mindbody sale, without buying it again. Never throws: a failed
 * request is an outcome with its message too.
 */
export async function recordTransactionFromMindbodySale(
  apolloClient: ApolloClient<NormalizedCacheObject>,
  id: string,
  mindbodySaleId: string
): Promise<RecordSaleOutcome> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: RecordTransactionFromMindbodySaleDocument,
      variables: { id, mindbodySaleId }
    })

    return recordSaleOutcome(data?.recordTransactionFromMindbodySale)
  } catch (e) {
    return {
      recorded: false,
      message: messageForGraphqlError(
        e,
        RECORD_SALE_ERROR_MESSAGES,
        DEFAULT_RECORD_SALE_ERROR_MESSAGE
      )
    }
  }
}
