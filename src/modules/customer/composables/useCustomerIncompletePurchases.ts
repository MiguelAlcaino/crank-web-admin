import { ref } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import {
  CustomerIncompletePurchasesDocument,
  CustomerRetryTransactionFeedbackDocument,
  type CustomerIncompletePurchasesQuery
} from '@/gql-main/graphql'
import { authService } from '@/services/authService'
import { Role } from '@/utils/userRoles'
import { messageForGraphqlError } from '@/utils/errors/graphqlErrorCode'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { RETRY_FEEDBACK_ERRORS } from './customerAdminErrors'

export type IncompletePurchase =
  CustomerIncompletePurchasesQuery['incompleteTransactionFeedbacks']['items'][number]

/**
 * The backend filters by part of the email, so `ann@x.com` also matches `joann@x.com`: keep only
 * the purchases of this customer.
 */
export function purchasesOfCustomer(
  purchases: readonly IncompletePurchase[],
  customerId: string
): IncompletePurchase[] {
  return purchases.filter((purchase) => purchase.siteCustomer?.identifiableUser?.id === customerId)
}

/**
 * The customer's purchases whose payment feedback arrived but did not complete
 * (`incompleteTransactionFeedbacks`), with the resend of the feedback (`retryTransactionFeedback`),
 * like "Send to Message bus" on the legacy Twig profile.
 *
 * Both operations require ROLE_DEVELOPER (crank-payments#1015), so for an admin without it
 * `canView` is false and nothing is queried.
 */
export const useCustomerIncompletePurchases = (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  customerId: string,
  email: string
) => {
  const purchases = ref<IncompletePurchase[]>([])
  const isLoading = ref(false)
  const hasLoadError = ref(false)
  const retryingId = ref<string | null>(null)
  const canView = authService.userHasRole(Role.ROLE_DEVELOPER)

  async function fetchPurchases() {
    if (!canView) return

    isLoading.value = true
    hasLoadError.value = false
    try {
      const { data } = await apolloClient.query({
        query: CustomerIncompletePurchasesDocument,
        variables: { email },
        fetchPolicy: 'network-only'
      })
      purchases.value = purchasesOfCustomer(data.incompleteTransactionFeedbacks.items, customerId)
    } catch (e) {
      hasLoadError.value = true
    } finally {
      isLoading.value = false
    }
  }

  /** Answers null on success, or the message to show. */
  async function retry(id: string): Promise<string | null> {
    retryingId.value = id
    try {
      await apolloClient.mutate({
        mutation: CustomerRetryTransactionFeedbackDocument,
        variables: { id }
      })
      await fetchPurchases()
      return null
    } catch (e) {
      return messageForGraphqlError(e, RETRY_FEEDBACK_ERRORS, ERROR_UNKNOWN)
    } finally {
      retryingId.value = null
    }
  }

  return { canView, purchases, isLoading, hasLoadError, retryingId, fetchPurchases, retry }
}
