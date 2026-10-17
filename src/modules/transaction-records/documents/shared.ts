import { gql } from 'graphql-tag'

/** Transaction record fields of the list, available on every backend profile. */
export const TRANSACTION_RECORD_LIST_FIELDS = gql`
  fragment TransactionRecordListFields on TransactionRecord {
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
`

/** Transaction record fields of the detail page, available on every backend profile. */
export const TRANSACTION_RECORD_DETAIL_FIELDS = gql`
  fragment TransactionRecordDetailFields on TransactionRecord {
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
    siteCustomer {
      identifiableUser {
        id
      }
    }
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
`

export const REFUND_TRANSACTION_MUTATION = gql`
  mutation RefundTransaction($id: ID!) {
    refundTransaction(id: $id)
  }
`
