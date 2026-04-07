import { readonly, ref } from 'vue'
import { gql } from 'graphql-tag'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

export interface TransactionItem {
  id: string | null
  name: string | null
  quantity: number | null
  amount: string | null
}

export interface AdminTransactionRecord {
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
  customerName: string | null
  customerEmail: string | null
  siteName: string | null
  isRefundable: boolean
  items: TransactionItem[]
}

export interface PaginatedTransactionRecords {
  items: AdminTransactionRecord[]
  totalCount: number
  page: number
  limit: number
}

const LIST_QUERY = gql`
  query AdminTransactionRecords(
    $filter: AdminTransactionRecordFilterInput
    $pagination: PaginationInput
  ) {
    adminTransactionRecords(filter: $filter, pagination: $pagination) {
      items {
        id
        amount
        status
        created
        customerName
        customerEmail
        siteName
        isRefundable
        creditCardLastFourDigits
        authorizationCode
        items {
          id
          name
          quantity
          amount
        }
      }
      totalCount
      page
      limit
    }
  }
`

const DETAIL_QUERY = gql`
  query AdminTransactionRecord($id: ID!) {
    adminTransactionRecord(id: $id) {
      id
      creditCardChargeId
      creditCardHolderName
      creditCardLastFourDigits
      amount
      taxAmount
      subTotal
      status
      created
      refundDate
      authorizationCode
      installments
      merchantPurchaseId
      customerName
      customerEmail
      siteName
      isRefundable
      items {
        id
        name
        quantity
        amount
      }
    }
  }
`

const REFUND_MUTATION = gql`
  mutation RefundTransaction($id: ID!) {
    refundTransaction(id: $id)
  }
`

export const useTransactionRecords = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  const listResult = ref<PaginatedTransactionRecords | null>(null)
  const detail = ref<AdminTransactionRecord | null>(null)
  const isLoading = ref(false)
  const isRefunding = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')

  async function fetchList(filter?: {
    search?: string
    paymentMethod?: string
    site?: string
    startDate?: string
    endDate?: string
  }, pagination?: { page?: number; limit?: number }) {
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
      listResult.value = data.adminTransactionRecords
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
      detail.value = data.adminTransactionRecord
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
      errorMessage.value = 'Failed to process refund'
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
