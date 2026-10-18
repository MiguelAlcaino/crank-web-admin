import { gql } from 'graphql-tag'

import { TRANSACTION_RECORD_DETAIL_FIELDS, TRANSACTION_RECORD_LIST_FIELDS } from './shared'

/*
 * Transaction record documents of the main backend profile: no shopping cart, but the payment
 * details the Twig admin shows, and whether the record is a payment-link sale. codegen.ts
 * (KAN-231) leaves this file out.
 */

export const TRANSACTION_RECORDS_QUERY = gql`
  query TransactionRecords($filter: TransactionRecordFilterInput, $pagination: PaginationInput) {
    transactionRecords(filter: $filter, pagination: $pagination) {
      items {
        ...TransactionRecordListFields
        paymentMethod
        isPaymentLinkSale
        paymentLinkTitle
      }
      totalCount
      page
      limit
    }
  }
  ${TRANSACTION_RECORD_LIST_FIELDS}
`

export const TRANSACTION_RECORD_QUERY = gql`
  query TransactionRecord($id: ID!) {
    transactionRecord(id: $id) {
      ...TransactionRecordDetailFields
      paymentMethod
      isPaymentLinkSale
      paymentLinkTitle
      payfortAuthorizationCode
      serviceExpirationDate
      userCountry
      mindbodyCheckoutFail
      merchantResponse
      paymentGatewayResponse
      refundResponse
    }
  }
  ${TRANSACTION_RECORD_DETAIL_FIELDS}
`
