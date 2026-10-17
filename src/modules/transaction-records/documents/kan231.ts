import { gql } from 'graphql-tag'

import { TRANSACTION_RECORD_DETAIL_FIELDS, TRANSACTION_RECORD_LIST_FIELDS } from './shared'

/*
 * Transaction record documents of the KAN-231 backend profile, which has the Sylius shopping cart
 * of each transaction. codegen.main.ts leaves this file out.
 */

export const TRANSACTION_RECORDS_QUERY = gql`
  query TransactionRecords($filter: TransactionRecordFilterInput, $pagination: PaginationInput) {
    transactionRecords(filter: $filter, pagination: $pagination) {
      items {
        ...TransactionRecordListFields
        shoppingCart {
          currency
        }
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
      shoppingCart {
        id
        currency
        items {
          id
          quantity
          subtotal
          variant {
            id
            name
            price
          }
        }
      }
    }
  }
  ${TRANSACTION_RECORD_DETAIL_FIELDS}
`
