import { FailedMessageQueueEnum } from '@/gql-main/graphql'
import { messageForGraphqlError } from '@/utils/errors/graphqlErrorCode'

export interface FailedMessageQueueTab {
  label: string
  queue: FailedMessageQueueEnum
  /** Whether the rows carry Payfort details (merchant reference, amount) worth their own columns. */
  hasPayfortDetails: boolean
}

/** One tab per failure queue; the first one is selected when the page opens. */
export const FAILED_MESSAGE_QUEUE_TABS: readonly FailedMessageQueueTab[] = [
  {
    label: 'Payfort feedback',
    queue: FailedMessageQueueEnum.PayfortTransactionFeedback,
    hasPayfortDetails: true
  },
  { label: 'Default queue', queue: FailedMessageQueueEnum.Default, hasPayfortDetails: false },
  {
    label: 'Partner purchases',
    queue: FailedMessageQueueEnum.PartnerPurchase,
    hasPayfortDetails: false
  }
]

export const DEFAULT_FAILED_MESSAGE_QUEUE = FAILED_MESSAGE_QUEUE_TABS[0].queue

export const FAILED_MESSAGES_LOAD_ERROR =
  'The failed messages could not be loaded. Please try again later.'
export const FAILED_MESSAGE_LOAD_ERROR =
  'The failed message could not be loaded. Please try again later.'
export const FAILED_MESSAGE_ACTION_ERROR = 'Action failed. Please try again later.'
export const FAILED_MESSAGE_NOT_FOUND =
  'Message not found. It may have been retried or discarded already.'
export const FAILED_MESSAGE_RETRIED = 'Message re-dispatched for processing.'
export const FAILED_MESSAGE_DISCARDED = 'Failed message discarded.'

const NOT_SUPER_ADMIN = 'Only super admins can manage failed messages.'

/** Messages for the error codes the failed-messages operations answer with. */
export const FAILED_MESSAGE_ERRORS: Record<string, string> = {
  'user.not_admin': NOT_SUPER_ADMIN,
  'user.does_not_have_required_role': NOT_SUPER_ADMIN
}

export type FailedMessageAction = 'retry' | 'discard'

export interface FailedMessageActionOutcome {
  /** `notFound`: the message was no longer in the queue, someone else retried or discarded it. */
  kind: 'success' | 'notFound' | 'error'
  message: string
}

/** The outcome of a retry or discard from the `__typename` of its result union. */
export function failedMessageActionOutcome(
  action: FailedMessageAction,
  typename: string | undefined
): FailedMessageActionOutcome {
  switch (typename) {
    case 'FailedMessageActionSuccess':
      return {
        kind: 'success',
        message: action === 'retry' ? FAILED_MESSAGE_RETRIED : FAILED_MESSAGE_DISCARDED
      }
    case 'FailedMessageNotFoundError':
      return { kind: 'notFound', message: FAILED_MESSAGE_NOT_FOUND }
    default:
      return { kind: 'error', message: FAILED_MESSAGE_ACTION_ERROR }
  }
}

/** The message to show for an operation that threw. */
export function failedMessageErrorMessage(error: unknown, fallback: string): string {
  return messageForGraphqlError(error, FAILED_MESSAGE_ERRORS, fallback)
}

/** The short name of a PHP class (`App\Message\Foo` -> `Foo`), or `-` when there is none. */
export function shortClassName(fqcn: string | null | undefined): string {
  return fqcn ? fqcn.split('\\').pop() ?? fqcn : '-'
}

/**
 * The page to reload after a row left the list: the previous one when it was the last row of a
 * page other than the first, so the admin does not land on an empty page.
 */
export function pageAfterRowRemoved(currentPage: number, rowsOnPage: number): number {
  return rowsOnPage <= 1 && currentPage > 1 ? currentPage - 1 : currentPage
}
