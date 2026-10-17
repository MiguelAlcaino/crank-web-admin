import { ref } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import {
  CustomerGiftCardsDocument,
  UpdateCustomerGiftCardDocument,
  type CustomerGiftCardsQuery,
  type UpdateCustomerGiftCardMutation
} from '@/gql-main/graphql'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

export type CustomerGiftCard = CustomerGiftCardsQuery['customerGiftCards'][number]

type UpdateCustomerGiftCardResult = UpdateCustomerGiftCardMutation['updateCustomerGiftCard']

/** The backend's limit for the gift card PDF (2048 KB). */
export const MAX_GIFT_CARD_PDF_BYTES = 2048 * 1024

/** Client-side check of the issue form, matching the backend's constraints; null when valid. */
export function issueGiftCardFormError(code: string, file: File | null): string | null {
  if (code.trim() === '') {
    return 'Paste the gift card code Mindbody issued.'
  }
  if (file === null) {
    return 'Choose the gift card PDF.'
  }
  if (file.type !== '' && file.type !== 'application/pdf') {
    return 'The gift card has to be a PDF file.'
  }
  if (file.size > MAX_GIFT_CARD_PDF_BYTES) {
    return 'The gift card PDF has to be 2048 KB or smaller.'
  }

  return null
}

/** The message for an `updateCustomerGiftCard` error member, or null when the result succeeded. */
export function updateCustomerGiftCardErrorMessage(
  result: UpdateCustomerGiftCardResult
): string | null {
  switch (result.__typename) {
    case 'CustomerGiftCard':
      return null
    case 'CustomerGiftCardNotFoundError':
      return 'This gift card order no longer exists.'
    case 'GiftCardCodeRequiredError':
      return 'Paste the gift card code Mindbody issued.'
    case 'InvalidGiftCardPdfError':
      return result.message || 'The gift card has to be a PDF of 2048 KB or smaller.'
  }
}

/** Status changes newest first, the way the legacy Twig page lists them. */
export function newestStatusesFirst(giftCard: CustomerGiftCard): CustomerGiftCard['statusHistory'] {
  return [...giftCard.statusHistory].reverse()
}

/**
 * Paid customer gift card orders waiting for their code (`customerGiftCards`) and the form that
 * issues it (`updateCustomerGiftCard`, a GraphQL multipart request carrying the PDF). Super admin
 * only on the backend.
 */
export const useCustomerGiftCards = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  const giftCards = ref<CustomerGiftCard[]>([])
  const isLoading = ref(false)
  const hasLoadError = ref(false)
  const isIssuing = ref(false)

  async function fetchGiftCards() {
    isLoading.value = true
    hasLoadError.value = false
    try {
      const { data } = await apolloClient.query({
        query: CustomerGiftCardsDocument,
        fetchPolicy: 'network-only'
      })
      giftCards.value = data.customerGiftCards
    } catch (e) {
      hasLoadError.value = true
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Issues the code: answers null on success, or the message to show. apollo-upload-client turns
   * the File in the variables into the multipart request the backend expects.
   */
  async function issueCode(
    id: string,
    giftCardCode: string,
    pdfGiftCard: File
  ): Promise<string | null> {
    isIssuing.value = true
    try {
      const { data } = await apolloClient.mutate({
        mutation: UpdateCustomerGiftCardDocument,
        variables: { id, input: { giftCardCode: giftCardCode.trim(), pdfGiftCard } }
      })
      const result = data?.updateCustomerGiftCard
      if (!result) {
        return ERROR_UNKNOWN
      }

      return updateCustomerGiftCardErrorMessage(result)
    } catch (e) {
      return ERROR_UNKNOWN
    } finally {
      isIssuing.value = false
    }
  }

  return { giftCards, isLoading, hasLoadError, isIssuing, fetchGiftCards, issueCode }
}
