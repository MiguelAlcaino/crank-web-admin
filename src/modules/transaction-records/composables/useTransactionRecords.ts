import { readonly, ref } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import { AdminFeature, isFeatureAvailable } from '@/config/backendProfile'
import * as kan231Documents from '../documents/kan231'
import * as mainDocuments from '../documents/main'
import { REFUND_TRANSACTION_MUTATION as REFUND_MUTATION } from '../documents/shared'
import { refundErrorMessage } from '../refundErrorMessage'

export interface TransactionItem {
  id: string | null
  name: string | null
  quantity: number | null
  amount: string | null
}

export interface ShoppingCartItem {
  id: string
  quantity: number
  subtotal: number | null
  variant: {
    id: string
    name: string | null
    price: number
  }
}

export interface ShoppingCart {
  id: string
  items: ShoppingCartItem[]
  currency: string
}

export interface TransactionRecord {
  id: string
  creditCardChargeId: string | null
  creditCardHolderName: string | null
  creditCardLastFourDigits: string | null
  amount: string | null
  taxAmount: string | null
  subTotal: string | null
  status: string | null
  created: string | null
  refundDate: string | null
  authorizationCode: string | null
  installments: number | null
  merchantPurchaseId: number | null
  siteCustomer: { identifiableUser: { id: string } | null } | null
  customerName: string | null
  customerEmail: string | null
  siteName: string | null
  isRefundable: boolean
  items: TransactionItem[]
  /** KAN-231 only (AdminFeature.TransactionShoppingCart). */
  shoppingCart?: ShoppingCart | null
  /** main only (AdminFeature.TransactionPaymentDetails), as are the fields below. */
  paymentMethod?: string | null
  payfortAuthorizationCode?: string | null
  serviceExpirationDate?: string | null
  userCountry?: string | null
  mindbodyCheckoutFail?: boolean
  merchantResponse?: string | null
  paymentGatewayResponse?: string | null
  refundResponse?: string | null
}

export interface PaginatedTransactionRecords {
  items: TransactionRecord[]
  totalCount: number
  page: number
  limit: number
}

/*
 * KAN-231 has the Sylius shopping cart of each transaction, main the payment details the Twig
 * admin shows; each profile gets its own documents.
 */
const { TRANSACTION_RECORDS_QUERY: LIST_QUERY, TRANSACTION_RECORD_QUERY: DETAIL_QUERY } =
  isFeatureAvailable(AdminFeature.TransactionShoppingCart) ? kan231Documents : mainDocuments

export const useTransactionRecords = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  const listResult = ref<PaginatedTransactionRecords | null>(null)
  const detail = ref<TransactionRecord | null>(null)
  const isLoading = ref(false)
  const isRefunding = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')

  async function fetchList(
    filter?: {
      search?: string
      paymentMethod?: string
      site?: string
      startDate?: string
      endDate?: string
    },
    pagination?: { page?: number; limit?: number }
  ) {
    isLoading.value = true
    hasError.value = false
    try {
      const { data } = await apolloClient.query({
        query: LIST_QUERY,
        variables: {
          filter: filter && Object.keys(filter).length > 0 ? filter : undefined,
          pagination
        },
        fetchPolicy: 'network-only'
      })
      listResult.value = data.transactionRecords
    } catch (e) {
      hasError.value = true
      errorMessage.value = 'Failed to load transactions'
    } finally {
      isLoading.value = false
    }
  }

  async function fetchDetail(id: string) {
    isLoading.value = true
    hasError.value = false
    detail.value = null
    try {
      const { data } = await apolloClient.query({
        query: DETAIL_QUERY,
        variables: { id },
        fetchPolicy: 'network-only'
      })
      detail.value = data.transactionRecord
    } catch (e) {
      hasError.value = true
      errorMessage.value = 'Failed to load transaction'
    } finally {
      isLoading.value = false
    }
  }

  async function refund(id: string): Promise<boolean> {
    isRefunding.value = true
    hasError.value = false
    try {
      const { data } = await apolloClient.mutate({
        mutation: REFUND_MUTATION,
        variables: { id }
      })
      return !!data?.refundTransaction
    } catch (e) {
      hasError.value = true
      errorMessage.value = refundErrorMessage(e)
      return false
    } finally {
      isRefunding.value = false
    }
  }

  return {
    listResult: readonly(listResult),
    detail: readonly(detail),
    isLoading: readonly(isLoading),
    isRefunding: readonly(isRefunding),
    hasError: readonly(hasError),
    errorMessage: readonly(errorMessage),
    fetchList,
    fetchDetail,
    refund
  }
}
