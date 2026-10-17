import { ref } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import {
  ChargeableProductsDocument,
  CreateCustomTransactionRequestDocument,
  type ChargeableProductsQuery,
  type CreateCustomTransactionRequestMutation
} from '@/gql-main/graphql'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

export type ChargeableProduct = ChargeableProductsQuery['chargeableProducts'][number]

type CreateCustomTransactionRequestResult =
  CreateCustomTransactionRequestMutation['createCustomTransactionRequest']

/** UAE VAT, added to the before-VAT price the backend answers, as the legacy form did. */
export const VAT_RATE = 0.05

/** The amount the customer is charged: the before-VAT price plus VAT, rounded to whole AED. */
export function priceWithVat(beforeVatPrice: number): number {
  return Math.round(beforeVatPrice * (1 + VAT_RATE))
}

/**
 * The email the legacy charge-client form proposed. The backend replaces [#link] with the purchase
 * link (and [#firstName] / [#lastName] with the customer's names).
 */
export function defaultChargeEmailBody(
  firstName: string,
  lastName: string,
  productName: string | null
): string {
  return (
    `Hi ${firstName} ${lastName}.\n\n` +
    `Please click on this [#link] to pay for ${productName ?? '[#productName]'}.\n\n` +
    'Your CRANK team'
  )
}

export type ChargeClientOutcome =
  | { sent: true; recipientEmail: string }
  | { sent: false; message: string }

export function chargeClientOutcome(
  result: CreateCustomTransactionRequestResult
): ChargeClientOutcome {
  switch (result.__typename) {
    case 'CustomTransactionRequestSent':
      return { sent: true, recipientEmail: result.recipientEmail }
    case 'CustomerNotFoundError':
      return { sent: false, message: 'This customer no longer exists.' }
    case 'ProductNotFoundError':
      return { sent: false, message: 'This package can no longer be charged. Pick another one.' }
  }
}

/**
 * "Charge client" on crank-payments main: the packages the customer can be charged for
 * (`chargeableProducts`) and the email with the purchase link (`createCustomTransactionRequest`).
 */
export const useChargeClient = (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  customerId: string
) => {
  const products = ref<ChargeableProduct[]>([])
  const isLoading = ref(false)
  const hasLoadError = ref(false)
  const isSending = ref(false)

  async function fetchProducts() {
    isLoading.value = true
    hasLoadError.value = false
    try {
      const { data } = await apolloClient.query({
        query: ChargeableProductsDocument,
        variables: { customerId },
        fetchPolicy: 'network-only'
      })
      products.value = data.chargeableProducts
    } catch (e) {
      hasLoadError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function sendEmail(productId: string, emailBody: string): Promise<ChargeClientOutcome> {
    isSending.value = true
    try {
      const { data } = await apolloClient.mutate({
        mutation: CreateCustomTransactionRequestDocument,
        variables: { input: { customerId, productId, emailBody } }
      })
      const result = data?.createCustomTransactionRequest

      return result ? chargeClientOutcome(result) : { sent: false, message: ERROR_UNKNOWN }
    } catch (e) {
      return { sent: false, message: ERROR_UNKNOWN }
    } finally {
      isSending.value = false
    }
  }

  return { products, isLoading, hasLoadError, isSending, fetchProducts, sendEmail }
}
