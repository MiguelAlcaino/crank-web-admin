import { gql } from '@apollo/client'

import { CUSTOMER_PROFILE_FIELDS } from './customerProfile'

/*
 * Operations that only exist on the KAN-231 backend profile. They live in their own file so the
 * main profile codegen (codegen.main.ts) can leave them out. Only call them behind
 * isFeatureAvailable() from src/config/backendProfile.ts.
 */

/** Customer profile including subscriptions. TODO: main, crank-payments#968. */
export const GET_USER_WITH_SUBSCRIPTIONS_QUERY = gql`
  query getUserWithSubscriptions($id: ID!) {
    user(id: $id) {
      id
      user {
        ...CustomerProfileFields
        subscriptions {
          id
          status
          amountCents
          billingInterval
          creditCardLastFourDigits
          createdAt
          cancelledAt
          nextBillingAt
        }
      }
    }
  }
  ${CUSTOMER_PROFILE_FIELDS}
`

export const SEARCH_USER_DOCUMENT = gql`
  query searchUser($query: String) {
    searchUser(query: $query) {
      id
      user {
        firstName
        lastName
        email
      }
    }
  }
`

export const ADMIN_SEND_WAITLIST_BOOKING_NOTIFICATION_MUTATION = gql`
  mutation adminSendWaitlistBookingNotification(
    $input: AdminSendWaitlistBookingNotificationInput!
  ) {
    adminSendWaitlistBookingNotification(input: $input) {
      __typename
      ... on AdminSendPushNotificationSuccess {
        customerId
      }
      ... on CustomerNotFoundError {
        code
      }
    }
  }
`

export const ADMIN_SEND_LATE_CANCELLATION_NOTIFICATION_MUTATION = gql`
  mutation adminSendLateCancellationNotification(
    $input: AdminSendLateCancellationNotificationInput!
  ) {
    adminSendLateCancellationNotification(input: $input) {
      __typename
      ... on AdminSendPushNotificationSuccess {
        customerId
      }
      ... on CustomerNotFoundError {
        code
      }
    }
  }
`
