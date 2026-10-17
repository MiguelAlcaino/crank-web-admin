/**
 * Messages for the error codes of the customer operations of crank-payments main (crank-payments
 * PR #979 / #981). Codes not listed fall back to a generic message.
 */
export const CUSTOMER_ACTION_ERRORS: Record<string, string> = {
  'customer.not_found': 'This customer no longer exists.',
  'site_customer.not_found': 'The customer has no account in that site.',
  'site_customer.invalid_mindbody_id': 'Enter the new Mindbody id.',
  'customer.phone_verification_not_found':
    'This customer never asked for a phone verification, so there is nothing to change.',
  'customer.mindbody_client_not_found': 'Mindbody has no client with the id this customer holds.'
}

export const VOD_PERIOD_ERRORS: Record<string, string> = {
  'customer.not_found': 'This customer no longer exists.',
  'customer_vod_period.invalid': 'The VOD period has to end after it starts.',
  'customer_vod_period.not_found': 'This VOD period no longer exists.'
}

export const RETRY_FEEDBACK_ERRORS: Record<string, string> = {
  'temporal_transaction.not_found': 'This purchase attempt no longer exists.',
  'temporal_transaction.already_completed': 'This purchase was already completed.',
  'temporal_transaction.feedback_in_progress':
    'The payment feedback is being processed right now. Try again in a few minutes.',
  'temporal_transaction.already_sold':
    'Mindbody already sold this purchase; what is missing has to be finished by hand.'
}
