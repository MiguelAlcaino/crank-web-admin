import { gql } from '@apollo/client'

/** Customer profile fields available on every backend profile. */
export const CUSTOMER_PROFILE_FIELDS = gql`
  fragment CustomerProfileFields on User {
    firstName
    lastName
    email
    leaderboardUsername
    weight
    gender
    birthdate
    country {
      code
      name
    }
    state {
      code
      name
    }
    city
    address1
    address2
    zipCode
    phone
    emergencyContactName
    emergencyContactPhone
    emergencyContactRelationship
    hideMetrics
    existsInSites
    siteUsers {
      externalUserId
      site
    }
  }
`

export const GET_USER_QUERY = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      user {
        ...CustomerProfileFields
      }
    }
  }
  ${CUSTOMER_PROFILE_FIELDS}
`
