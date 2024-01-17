import { ApolloError, gql } from '@apollo/client'
import type {
  BookUserIntoClassInput,
  CalendarClassesParams,
  CancelEnrollmentInput,
  CheckinResultUnion,
  CheckinUserInClass,
  CheckoutResultUnion,
  CheckoutUserInClass,
  Class,
  ClassInfo,
  Country,
  DisableEnableSpotInput,
  DisableEnableSpotResult,
  DisableEnableSpotResultUnion,
  EditClassInput,
  EditClassResultUnion,
  EditEnrollmentInput,
  EditEnrollmentResultUnion,
  EditRoomLayoutInput,
  EnrollmentInfoInterface,
  IdentifiableUser,
  RegisterUserInput,
  RemoveUserFromWaitlistInput,
  RemoveUserFromWaitlistUnion,
  RoomLayout,
  RoomLayoutInput,
  SiteEnum,
  SwapSpotResultUnion
} from '@/gql/graphql'
import type { SiteSetting } from '@/gql/graphql'
import type { ApolloClient } from '@apollo/client/core'
import dayjs from 'dayjs'
import { ValidationError } from '@/utils/errors/saveUserErrors'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

export class ApiService {
  authApiClient: ApolloClient<any>
  anonymousApiClient: ApolloClient<any>

  constructor(authApiClient: ApolloClient<any>, anonymousApiClient: ApolloClient<any>) {
    this.authApiClient = authApiClient
    this.anonymousApiClient = anonymousApiClient
  }

  async getSiteSettings(site: SiteEnum): Promise<SiteSetting | null> {
    const SITE_SETTING_QUERY = gql`
      query siteSettings($site: SiteEnum!) {
        siteSettings(site: $site) {
          siteDateTimeNow
        }
      }
    `
    try {
      const queryResult = await this.authApiClient.query({
        query: SITE_SETTING_QUERY,
        variables: {
          site: site
        },
        fetchPolicy: 'network-only'
      })

      return queryResult.data.siteSettings as SiteSetting
    } catch (error) {
      return null
    }
  }

  async getCalendarClasses(site: SiteEnum, startDate: Date, endDate: Date): Promise<Class[]> {
    const CALENDAR_CLASSES_QUERY = gql`
      query calendarClasses($site: SiteEnum!, $params: CalendarClassesParams) {
        calendarClasses(site: $site, params: $params) {
          id
          name
          description
          instructorName
          isSubstitute
          start
          startWithNoTimeZone
          duration
          waitListAvailable
          bookingWindow {
            startDateTime
            endDateTime
          }
        }
      }
    `

    const stgStartDate = dayjs(startDate).format('YYYY-MM-DD')
    const stgEndDate = dayjs(endDate).format('YYYY-MM-DD')

    const params: CalendarClassesParams = {
      startDate: stgStartDate,
      endDate: stgEndDate
    }

    const queryResult = await this.anonymousApiClient.query({
      query: CALENDAR_CLASSES_QUERY,
      variables: {
        site: site,
        params: params
      }
    })

    return queryResult.data.calendarClasses as Class[]
  }

  async getClassInfo(site: SiteEnum, id: string): Promise<ClassInfo | null> {
    const CLASS_INFO_QUERY = gql`
      query classInfo($site: SiteEnum!, $id: ID!) {
        classInfo(site: $site, id: $id) {
          class {
            id
            name
            description
            instructorName
            start
            startWithNoTimeZone
            duration
            waitListAvailable
          }
          roomLayout {
            id
            name
            matrix {
              __typename
              x
              y
              icon
              ... on BookableSpot {
                enabled
                spotNumber
                spotInfo {
                  spotNumber
                  isBooked
                }
              }
            }
          }
          enrollments(status: active) {
            id
            enrollmentStatus
            enrollmentDateTime
            ... on EnrollmentInfo {
              isCheckedIn
              spotNumber
              spotInfo {
                __typename
                isBooked
                spotNumber
              }
            }
          }
        }
      }
    `
    try {
      const queryResult = await this.authApiClient.query({
        query: CLASS_INFO_QUERY,
        variables: {
          site: site,
          id: id
        },
        fetchPolicy: 'network-only'
      })

      return queryResult.data.classInfo as ClassInfo
    } catch (error) {
      return null
    }
  }

  async getClassInfoAdmin(site: SiteEnum, id: string): Promise<ClassInfo | null> {
    const CLASS_INFO_QUERY = gql`
      query classInfoAdmin($site: SiteEnum!, $id: ID!) {
        classInfo(site: $site, id: $id) {
          class {
            id
            name
            description
            instructorName
            start
            startWithNoTimeZone
            duration
            waitListAvailable
          }
          roomLayout {
            id
            name
            matrix {
              __typename
              x
              y
              icon
              ... on BookableSpot {
                enabled
                spotNumber
                spotInfo {
                  spotNumber
                  isBooked
                }
              }
            }
          }
          enrollments(status: active) {
            id
            enrollmentStatus
            enrollmentDateTime
            identifiableUser {
              id
              user {
                __typename
                firstName
                lastName
                email
                leaderboardUsername
              }
            }

            ... on EnrollmentInfo {
              isCheckedIn
              spotNumber
              spotInfo {
                __typename
                isBooked
                spotNumber
              }
            }
          }
          onHoldSpots
        }
      }
    `
    try {
      const queryResult = await this.authApiClient.query({
        query: CLASS_INFO_QUERY,
        variables: {
          site: site,
          id: id
        },
        fetchPolicy: 'network-only'
      })

      return queryResult.data.classInfo as ClassInfo
    } catch (error) {
      return null
    }
  }

  async disableSpot(classId: string, spotNumber?: number): Promise<string> {
    const input = { classId: classId, spotNumber: spotNumber } as DisableEnableSpotInput

    const DISABLE_SPOT_MUTATION = gql`
      mutation disableSpot($input: DisableEnableSpotInput) {
        disableSpot(input: $input) {
          __typename
          ... on DisableEnableSpotResult {
            __typename
            result
          }
          ... on SpotNotFoundError {
            __typename
            code
          }
        }
      }
    `

    try {
      const result = await this.authApiClient.mutate({
        mutation: DISABLE_SPOT_MUTATION,
        variables: {
          input: input
        },
        fetchPolicy: 'network-only'
      })

      const disableEnableSpotResultUnion = result.data.disableSpot as DisableEnableSpotResultUnion

      if (disableEnableSpotResultUnion.__typename === 'DisableEnableSpotResult') {
        const disableEnableSpotResult = disableEnableSpotResultUnion as DisableEnableSpotResult

        if (disableEnableSpotResult.result === true) {
          return 'Success'
        } else {
          return 'Error'
        }
      } else if (disableEnableSpotResultUnion.__typename === 'SpotNotFoundError') {
        return 'SpotNotFoundError'
      } else {
        return 'UnknownError'
      }
    } catch (error) {
      return 'UnknownError'
    }
  }

  async enableSpot(classId: string, spotNumber?: number): Promise<string> {
    const input = { classId: classId, spotNumber: spotNumber } as DisableEnableSpotInput

    const ENABLE_SPOT_MUTATION = gql`
      mutation enableSpot($input: DisableEnableSpotInput) {
        enableSpot(input: $input) {
          __typename
          ... on DisableEnableSpotResult {
            __typename
            result
          }
          ... on SpotNotFoundError {
            __typename
            code
          }
        }
      }
    `

    try {
      const result = await this.authApiClient.mutate({
        mutation: ENABLE_SPOT_MUTATION,
        variables: {
          input: input
        },
        fetchPolicy: 'network-only'
      })

      const disableEnableSpotResultUnion = result.data.enableSpot as DisableEnableSpotResultUnion

      if (disableEnableSpotResultUnion.__typename === 'DisableEnableSpotResult') {
        const disableEnableSpotResult = disableEnableSpotResultUnion as DisableEnableSpotResult

        if (disableEnableSpotResult.result === true) {
          return 'Success'
        } else {
          return 'Error'
        }
      } else if (disableEnableSpotResultUnion.__typename === 'SpotNotFoundError') {
        return 'SpotNotFoundError'
      } else {
        return 'UnknownError'
      }
    } catch (error) {
      return 'UnknownError'
    }
  }

  async searchUser(site: SiteEnum, query: string): Promise<IdentifiableUser[] | []> {
    if (query.length < 3) return []

    const SEARCH_USER_QUERY = gql`
      query searchUser($site: SiteEnum!, $query: String) {
        searchUser(site: $site, query: $query) {
          id
          user {
            firstName
            lastName
            email
          }
        }
      }
    `
    try {
      const queryResult = await this.authApiClient.query({
        query: SEARCH_USER_QUERY,
        variables: {
          site: site,
          query: query
        },
        fetchPolicy: 'network-only'
      })

      return queryResult.data.searchUser as IdentifiableUser[]
    } catch (error) {
      return []
    }
  }

  async bookUserIntoClass(
    classId: string,
    userId: string,
    spotNumber?: number | null,
    isPaymentRequired?: boolean | null,
    isWaitlistBooking?: boolean | null
  ): Promise<string> {
    const input = {
      classId: classId,
      spotNumber: spotNumber,
      userId: userId,
      isPaymentRequired: isPaymentRequired,
      isWaitlistBooking: isWaitlistBooking
    } as BookUserIntoClassInput

    if (spotNumber) input.spotNumber = spotNumber

    if (isPaymentRequired) input.isPaymentRequired = isPaymentRequired

    if (isWaitlistBooking) input.isWaitlistBooking = isWaitlistBooking

    const BOOK_USER_INTO_CLASS_MUTATION = gql`
      mutation bookUserIntoClass($input: BookUserIntoClassInput!) {
        bookUserIntoClass(input: $input) {
          __typename
        }
      }
    `

    try {
      const result = await this.authApiClient.mutate({
        mutation: BOOK_USER_INTO_CLASS_MUTATION,
        variables: {
          input: input
        },
        fetchPolicy: 'network-only'
      })

      return result.data.bookUserIntoClass.__typename
    } catch (error) {
      return 'UnknownError'
    }
  }

  async removeUserFromClass(enrollmentId: string, lateCancel?: boolean): Promise<string> {
    const input = { enrollmentId: enrollmentId, lateCancel: lateCancel } as CancelEnrollmentInput

    const REMOVE_USER_FROM_CLASS_MUTATION = gql`
      mutation removeUserFromClass($input: CancelEnrollmentInput!) {
        removeUserFromClass(input: $input) {
          __typename
        }
      }
    `

    try {
      const result = await this.authApiClient.mutate({
        mutation: REMOVE_USER_FROM_CLASS_MUTATION,
        variables: {
          input: input
        },
        fetchPolicy: 'network-only'
      })

      return result.data.removeUserFromClass.__typename
    } catch (error) {
      return 'UnknownError'
    }
  }

  async editClass(input: EditClassInput): Promise<EditClassResultUnion> {
    const EDIT_CLASS_MUTATION = gql`
      mutation editClass($input: EditClassInput!) {
        editClass(input: $input) {
          __typename
          ... on EditClassSuccessResult {
            __typename
            updated
          }
        }
      }
    `

    const result = await this.authApiClient.mutate({
      mutation: EDIT_CLASS_MUTATION,
      variables: {
        input: input
      },
      fetchPolicy: 'network-only'
    })

    return result.data.editClass as EditClassResultUnion
  }

  async roomLayouts(site: SiteEnum): Promise<RoomLayout[] | null> {
    const query = gql`
      query roomLayouts($site: SiteEnum!) {
        roomLayouts(site: $site) {
          id
          name
        }
      }
    `
    try {
      const queryResult = await this.authApiClient.query({
        query: query,
        variables: {
          site: site,
          query: query
        },
        fetchPolicy: 'network-only'
      })

      return queryResult.data.roomLayouts as RoomLayout[]
    } catch (error) {
      return null
    }
  }

  async roomLayout(site: SiteEnum, id: string): Promise<RoomLayout | null> {
    const query = gql`
      query roomLayout($site: SiteEnum!, $id: ID!) {
        roomLayout(site: $site, id: $id) {
          id
          name
          columns
          rows
          matrix {
            x
            y
            icon
            ... on BookableSpot {
              spotNumber
            }
          }
        }
      }
    `
    try {
      const queryResult = await this.authApiClient.query({
        query: query,
        variables: {
          site: site,
          id: id,
          query: query
        },
        fetchPolicy: 'network-only'
      })

      return queryResult.data.roomLayout as RoomLayout
    } catch (error) {
      return null
    }
  }

  async createRoomLayout(site: SiteEnum, input: RoomLayoutInput): Promise<RoomLayout | null> {
    const muration = gql`
      mutation createRoomLayout($site: SiteEnum!, $input: RoomLayoutInput!) {
        createRoomLayout(site: $site, input: $input) {
          id
        }
      }
    `

    try {
      const result = await this.authApiClient.mutate({
        mutation: muration,
        variables: {
          site: site,
          input: input
        },
        fetchPolicy: 'network-only'
      })

      return result.data.createRoomLayout as RoomLayout
    } catch (error) {
      return null
    }
  }

  async editRoomLayout(site: SiteEnum, input: EditRoomLayoutInput): Promise<RoomLayout | null> {
    const muration = gql`
      mutation editRoomLayout($site: SiteEnum!, $input: EditRoomLayoutInput!) {
        editRoomLayout(site: $site, input: $input) {
          id
        }
      }
    `

    try {
      const result = await this.authApiClient.mutate({
        mutation: muration,
        variables: {
          site: site,
          input: input
        },
        fetchPolicy: 'network-only'
      })

      return result.data.editRoomLayout as RoomLayout
    } catch (error) {
      return null
    }
  }

  async getClassWaitlistEntries(
    site: SiteEnum,
    classId: string
  ): Promise<EnrollmentInfoInterface[] | null> {
    const query = gql`
      query classWaitlistEntries($site: SiteEnum!, $id: ID!) {
        classInfo(site: $site, id: $id) {
          enrollments(status: waitlisted) {
            id
            enrollmentStatus
            enrollmentDateTime
            identifiableUser {
              id
              user {
                firstName
                lastName
              }
            }
          }
        }
      }
    `

    const queryResult = await this.authApiClient.query({
      query: query,
      variables: {
        site: site,
        id: classId,
        query: query
      },
      fetchPolicy: 'no-cache'
    })

    const classInfo = queryResult.data.classInfo as ClassInfo

    return classInfo.enrollments
  }

  async removeUserFromWaitlist(waitlistEntryId: string): Promise<RemoveUserFromWaitlistUnion> {
    const input = { waitlistEntryId: waitlistEntryId } as RemoveUserFromWaitlistInput

    const muration = gql`
      mutation removeUserFromWaitlist($input: RemoveUserFromWaitlistInput!) {
        removeUserFromWaitlist(input: $input) {
          ... on RemoveFromWaitlistResult {
            success
          }
          ... on WaitlistEntryNotFoundError {
            code
          }
        }
      }
    `

    const result = await this.authApiClient.mutate({
      mutation: muration,
      variables: {
        input: input
      },
      fetchPolicy: 'no-cache'
    })

    return result.data.removeUserFromWaitlist as RemoveUserFromWaitlistUnion
  }

  async checkinUserInClass(site: SiteEnum, input: CheckinUserInClass): Promise<CheckinResultUnion> {
    const mutation = gql`
      mutation checkinUserInClass($site: SiteEnum!, $input: CheckinUserInClass!) {
        checkinUserInClass(site: $site, input: $input) {
          __typename
          ... on CheckinSuccess {
            success
          }
          ... on EnrollmentNotFoundError {
            code
          }
        }
      }
    `
    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        site: site,
        input: input
      },
      fetchPolicy: 'network-only'
    })

    return result.data.checkinUserInClass as CheckinResultUnion
  }

  async checkoutUserInClass(
    site: SiteEnum,
    input: CheckoutUserInClass
  ): Promise<CheckoutResultUnion> {
    const mutation = gql`
      mutation checkoutUserInClass($site: SiteEnum!, $input: CheckoutUserInClass!) {
        checkoutUserInClass(site: $site, input: $input) {
          __typename
          ... on CheckoutSuccess {
            success
          }
          ... on EnrollmentNotFoundError {
            code
          }
        }
      }
    `
    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        site: site,
        input: input
      },
      fetchPolicy: 'network-only'
    })

    return result.data.checkoutUserInClass as CheckoutResultUnion
  }

  async editEnrollment(
    site: SiteEnum,
    input: EditEnrollmentInput
  ): Promise<EditEnrollmentResultUnion> {
    const mutation = gql`
      mutation editEnrollment($site: SiteEnum!, $input: EditEnrollmentInput!) {
        editEnrollment(site: $site, input: $input) {
          __typename
          ... on Enrollment {
            __typename
          }
          ... on SpotAlreadyReservedError {
            code
          }
          ... on TryToSwitchToSameSpotError {
            code
          }
          ... on ClientIsOutsideSchedulingWindowError {
            code
          }
        }
      }
    `
    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        site: site,
        input: input
      },
      fetchPolicy: 'no-cache'
    })

    return result.data.editEnrollment as EditEnrollmentResultUnion
  }

  async swapSpot(site: SiteEnum, input: EditEnrollmentInput): Promise<SwapSpotResultUnion> {
    const mutation = gql`
      mutation swapSpot($site: SiteEnum!, $input: EditEnrollmentInput!) {
        swapSpot(site: $site, input: $input) {
          __typename
          ... on SwapSpotSuccess {
            __typename
          }
          ... on TryToSwitchToSameSpotError {
            __typename
            code
          }
        }
      }
    `
    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        site: site,
        input: input
      },
      fetchPolicy: 'no-cache'
    })

    return result.data.swapSpot as SwapSpotResultUnion
  }

  async getCalendarClassesForList(
    site: SiteEnum,
    startDate: Date,
    endDate: Date
  ): Promise<Class[]> {
    const query = gql`
      query getCalendarClassesForList($site: SiteEnum!, $params: CalendarClassesParams) {
        calendarClasses(site: $site, params: $params) {
          id
          name
          startWithNoTimeZone
          maxCapacity
          totalBooked
          totalUnderMaintenanceSpots
        }
      }
    `

    const stgStartDate = dayjs(startDate).format('YYYY-MM-DD')
    const stgEndDate = dayjs(endDate).format('YYYY-MM-DD')

    const params: CalendarClassesParams = {
      startDate: stgStartDate,
      endDate: stgEndDate
    }

    const queryResult = await this.authApiClient.query({
      query: query,
      fetchPolicy: 'no-cache',
      variables: {
        site: site,
        params: params
      }
    })

    return queryResult.data.calendarClasses as Class[]
  }

  async getUser(id: string): Promise<IdentifiableUser> {
    const query = gql`
      query getUser($id: ID!) {
        user(id: $id) {
          id
          user {
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
          }
        }
      }
    `

    const queryResult = await this.authApiClient.query({
      query: query,
      fetchPolicy: 'no-cache',
      variables: {
        id: id
      }
    })

    return queryResult.data.user as IdentifiableUser
  }

  async classWaitlistIsEnabled(site: SiteEnum, id: string): Promise<boolean> {
    const query = gql`
      query classWaitlistIsEnabled($site: SiteEnum!, $id: ID!) {
        classInfo(site: $site, id: $id) {
          class {
            waitListAvailable
          }
        }
      }
    `

    const queryResult = await this.authApiClient.query({
      query: query,
      fetchPolicy: 'no-cache',
      variables: {
        site: site,
        id: id
      }
    })

    const classInfo = queryResult.data.classInfo as ClassInfo

    return classInfo.class.waitListAvailable
  }

  async syncClass(site: SiteEnum, classId: string): Promise<ClassInfo> {
    const mutation = gql`
      mutation syncClass($site: SiteEnum!, $classId: ID!) {
        syncClass(site: $site, classId: $classId) {
          class {
            id
            name
            description
            instructorName
            start
            startWithNoTimeZone
            duration
            waitListAvailable
          }
          roomLayout {
            id
            name
            matrix {
              __typename
              x
              y
              icon
              ... on BookableSpot {
                enabled
                spotNumber
                spotInfo {
                  spotNumber
                  isBooked
                }
              }
            }
          }
          enrollments(status: active) {
            id
            enrollmentStatus
            enrollmentDateTime
            identifiableUser {
              id
              user {
                __typename
                firstName
                lastName
                email
                leaderboardUsername
              }
            }

            ... on EnrollmentInfo {
              isCheckedIn
              spotNumber
              spotInfo {
                __typename
                isBooked
                spotNumber
              }
            }
          }
          onHoldSpots
        }
      }
    `
    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        site: site,
        classId: classId
      },
      fetchPolicy: 'no-cache'
    })

    return result.data.syncClass as ClassInfo
  }

  async syncAllClasses(site: SiteEnum): Promise<Class[]> {
    const mutation = gql`
      mutation syncAllClasses($site: SiteEnum!) {
        syncAllClasses(site: $site) {
          id
        }
      }
    `
    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        site: site
      },
      fetchPolicy: 'no-cache'
    })

    return result.data.syncAllClasses as Class[]
  }

  async getCountries(): Promise<Country[]> {
    const COUNTRIES_QUERY = gql`
      query Countries {
        countries {
          name
          code
        }
      }
    `
    try {
      const queryResult = await this.anonymousApiClient.query({
        query: COUNTRIES_QUERY
      })

      return queryResult.data.countries as Country[]
    } catch (error) {
      return []
    }
  }

  async getCountry(countryCode: string): Promise<Country | null> {
    const COUNTRY_QUERY = gql`
      query country($countryCode: String!) {
        country(countryCode: $countryCode) {
          name
          code
          states {
            name
            code
          }
        }
      }
    `
    try {
      const queryResult = await this.anonymousApiClient.query({
        query: COUNTRY_QUERY,
        variables: {
          countryCode: countryCode
        }
      })

      return queryResult.data.country as Country
    } catch (error) {
      return null
    }
  }

  async registerIdentifiableUser(site: SiteEnum, input: RegisterUserInput): Promise<string> {
    const mutation = gql`
      mutation registerUser($site: SiteEnum!, $input: RegisterUserInput!) {
        registerIdentifiableUser(site: $site, input: $input) {
          id
        }
      }
    `
    try {
      const result = await this.authApiClient.mutate({
        mutation: mutation,
        variables: {
          site: site,
          input: input
        }
      })

      const registerIdentifiableUser = result.data.registerIdentifiableUser as IdentifiableUser
      return registerIdentifiableUser.id!
    } catch (error) {
      if (error instanceof ApolloError) {
        if (error.graphQLErrors[0].message === 'register.user_already_registered') {
          throw new ValidationError(
            'Your email address is already registered with us. Please login directly to your account.'
          )
        } else if (error.graphQLErrors[0].message === 'minimum_password_length_is_four_chars') {
          throw new ValidationError('The password must contain at least 8 characters.')
        } else if (error.graphQLErrors[0].message === 'password_must_contain_letter_or_number') {
          throw new ValidationError('The password must contain a letter and a number.')
        } else {
          throw error
        }
      } else {
        throw error
      }
    }
  }
}
