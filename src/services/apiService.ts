import type {
  CreateInstructorProfileInput,
  CreateSessionTypeInput,
  InstructorProfile,
  MindbodySessionTypeInfo,
  MindbodyStaffInfo,
  SessionType,
  SiteSetting,
  UpdateInstructorProfileInput,
  UpdateSessionTypeInput
} from '@/gql/graphql'
import {
  CreateInstructorProfileDocument,
  CreatePaymentLinkDocument,
  CreateSessionTypeDocument,
  DeleteInstructorProfileDocument,
  DeletePaymentLinkDocument,
  DeleteSessionTypeDocument,
  InstructorProfilesDocument,
  MindbodySessionTypesDocument,
  MindbodyStaffsDocument,
  PaymentLinkDocument,
  PaymentLinksDocument,
  SessionTypesDocument,
  UpdateInstructorProfileDocument,
  UpdatePaymentLinkDocument,
  UpdateSessionTypeDocument,
  type AdminUser,
  type AdminUserDataInput,
  type AdminUserResultUnion,
  type BookUserIntoClassInput,
  type CalendarClassesParams,
  type CancelEnrollmentInput,
  type CheckinResultUnion,
  type CheckinUserInClass,
  type CheckoutResultUnion,
  type CheckoutUserInClass,
  type Class,
  type ClassInfo,
  type ClassSchedule,
  type ClassStat,
  type Country,
  type CreatePaymentLinkInput,
  type DisableEnableSpotInput,
  type DisableEnableSpotResult,
  type DisableEnableSpotResultUnion,
  type EditClassInput,
  type EditClassResultUnion,
  type EditEnrollmentInput,
  type EditEnrollmentResultUnion,
  type EditRoomLayoutInput,
  type EditUserInput,
  type EditUserResultUnion,
  type GiftCard,
  type IdentifiableSiteUser,
  type IdentifiableUser,
  type Instructor,
  type PaginatedClassStats,
  type PaginationInput,
  type PaymentLink,
  type RegisterUserInput,
  type RemoveUserFromWaitlistInput,
  type RemoveUserFromWaitlistUnion,
  type RequestPasswordLinkInput,
  type ResetPasswordLinkResultUnion,
  type RoomLayout,
  type RoomLayoutInput,
  type RoomLayoutsInput,
  type SendClassStatsToEmailInput,
  type SetRoomLayoutForClassSchedulesInput,
  type SimpleSiteUser,
  type Site,
  type SiteEnum,
  type SiteUserInput,
  type SwapSpotResultUnion,
  type UpdateAdminUserInput,
  type UpdateCurrentAdminUserFavoriteSiteInput,
  type UpdateCurrentAdminUserInput,
  type UpdateCurrentUserPasswordInput,
  type UpdateGiftCardInput,
  type UpdatePaymentLinkInput,
  type UpdateUserPasswordInput,
  type UserInClassRanking,
  type UserInput,
  type WaitlistEntry
} from '@/gql/graphql'
import { DomainError } from '@/utils/errors/domainError'
import { ValidationError } from '@/utils/errors/saveUserErrors'
import { ApolloError, gql } from '@apollo/client'
import type { ApolloClient } from '@apollo/client/core'
import dayjs from 'dayjs'

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
            showAsDisabled
            maxCapacity
            isSubstitute
            hasClassStats
            isSynchronizing
          }
          roomLayout {
            id
            name
            matrix {
              x
              y
              icon
              ... on BookableSpot {
                enabled
                spotNumber
              }
            }
          }
          enrollments(status: active) {
            id
            enrollmentStatus
            enrollmentDateTime
            identifiableSiteUser {
              id
              identifiableUser {
                id
                user {
                  firstName
                  lastName
                  email
                  leaderboardUsername
                }
              }
            }

            ... on EnrollmentInfo {
              isCheckedIn
              spotNumber
              isBookedForFree
              hasStats
              isFirstTimeInThisTypeOfClass
              isFirstTimeWithThisInstructor
              isTodayUserBirthday
              isUserLeaderboardEnabled
              bookedViaClassPass
            }
          }
          onHoldSpots
          orphanedClassStatsSpots
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

  async searchSiteUser(site: SiteEnum, query: string): Promise<IdentifiableSiteUser[]> {
    if (query.length < 3) return []

    const SEARCH_USER_QUERY = gql`
      query searchSiteUser($site: SiteEnum!, $query: String) {
        searchSiteUser(site: $site, query: $query) {
          id
          identifiableUser {
            id
            user {
              firstName
              lastName
              email
            }
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

      return queryResult.data.searchSiteUser as IdentifiableSiteUser[]
    } catch (error) {
      return [] as IdentifiableSiteUser[]
    }
  }

  async bookUserIntoClass(
    classId: string,
    siteUserId: string,
    spotNumber?: number | null,
    isPaymentRequired?: boolean | null,
    isWaitlistBooking?: boolean | null
  ): Promise<string> {
    const input = {
      classId: classId,
      spotNumber: spotNumber,
      siteUserId: siteUserId,
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
    const input = {
      enrollmentId: enrollmentId,
      lateCancel: lateCancel
    } as CancelEnrollmentInput

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

  async roomLayouts(site: SiteEnum, userCapacity?: number | null): Promise<RoomLayout[] | null> {
    const params = userCapacity ? ({ usersCapacity: userCapacity } as RoomLayoutsInput) : undefined
    const query = gql`
      query roomLayouts($site: SiteEnum!, $params: RoomLayoutsInput) {
        roomLayouts(site: $site, params: $params) {
          id
          name
          capacity
        }
      }
    `
    try {
      const queryResult = await this.authApiClient.query({
        query: query,
        variables: {
          site: site,
          params: params,
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
    const mutation = gql`
      mutation createRoomLayout($site: SiteEnum!, $input: RoomLayoutInput!) {
        createRoomLayout(site: $site, input: $input) {
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
        },
        fetchPolicy: 'network-only'
      })

      return result.data.createRoomLayout as RoomLayout
    } catch (error) {
      return null
    }
  }

  async editRoomLayout(site: SiteEnum, input: EditRoomLayoutInput): Promise<RoomLayout | null> {
    const mutation = gql`
      mutation editRoomLayout($site: SiteEnum!, $input: EditRoomLayoutInput!) {
        editRoomLayout(site: $site, input: $input) {
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
        },
        fetchPolicy: 'network-only'
      })

      return result.data.editRoomLayout as RoomLayout
    } catch (error) {
      return null
    }
  }

  async getClassWaitlistEntries(site: SiteEnum, classId: string): Promise<WaitlistEntry[] | null> {
    const query = gql`
      query classWaitlistEntries($site: SiteEnum!, $id: ID!) {
        classInfo(site: $site, id: $id) {
          enrollments(status: waitlisted) {
            id
            enrollmentStatus
            enrollmentDateTime
            identifiableSiteUser {
              id
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

    return classInfo.enrollments as WaitlistEntry[]
  }

  async removeUserFromWaitlist(waitlistEntryId: string): Promise<RemoveUserFromWaitlistUnion> {
    const input = { waitlistEntryId: waitlistEntryId } as RemoveUserFromWaitlistInput

    const mutation = gql`
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
      mutation: mutation,
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
          showAsDisabled
          instructorName
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
            siteUsers {
              externalUserId
              site
            }
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

  async syncClass(site: SiteEnum, classId: string): Promise<boolean> {
    const mutation = gql`
      mutation syncClass($site: SiteEnum!, $classId: ID!) {
        syncClass(site: $site, classId: $classId) {
          class {
            isSynchronizing
          }
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

    const classInfo = result.data.syncClass as ClassInfo
    return classInfo.class.isSynchronizing
  }

  async syncAllClasses(site: SiteEnum): Promise<boolean> {
    const mutation = gql`
      mutation syncAllClasses($site: SiteEnum!) {
        syncAllClasses(site: $site)
      }
    `
    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        site: site
      },
      fetchPolicy: 'no-cache'
    })

    return result.data.syncAllClasses as boolean
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
          identifiableUser {
            id
          }
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

      const registerIdentifiableUser = result.data.registerIdentifiableUser as IdentifiableSiteUser
      return registerIdentifiableUser.identifiableUser?.id!
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

  async editUser(userId: string, userDataInput: UserInput): Promise<EditUserResultUnion> {
    const input: EditUserInput = {
      userId: userId,
      userDataInput: userDataInput
    } as EditUserInput

    const mutation = gql`
      mutation editUser($input: EditUserInput!) {
        editUser(input: $input) {
          ... on IdentifiableUser {
            id
            user {
              email
            }
          }
        }
      }
    `
    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        input: input
      },
      fetchPolicy: 'no-cache'
    })

    return result.data.editUser as EditUserResultUnion
  }

  async requestPasswordLink(email: string): Promise<ResetPasswordLinkResultUnion | null> {
    const input = { email: email } as RequestPasswordLinkInput

    const mutation = gql`
      mutation requestPasswordLink($input: RequestPasswordLinkInput) {
        requestPasswordLink(input: $input) {
          ... on TooManyResetPasswordLinkRequestsError {
            availableAgainAt
          }
          ... on ResetPasswordLinkSentSuccessfully {
            status
          }
        }
      }
    `

    try {
      const result = await this.authApiClient.mutate({
        mutation: mutation,
        variables: {
          input: input
        },
        fetchPolicy: 'network-only'
      })

      return result.data.requestPasswordLink as ResetPasswordLinkResultUnion
    } catch (error) {
      return null
    }
  }

  async getUserSites(id: string): Promise<SimpleSiteUser[]> {
    const query = gql`
      query getUserSites($id: ID!) {
        user(id: $id) {
          id
          user {
            siteUsers {
              externalUserId
              site
            }
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

    const identifiableUser = queryResult.data.user as IdentifiableUser

    return identifiableUser.user?.siteUsers as SimpleSiteUser[]
  }

  async editUserSites(
    userId: string,
    simpleSiteUsers: SimpleSiteUser[]
  ): Promise<EditUserResultUnion> {
    const siteUserInput = [] as SiteUserInput[]

    for (let index = 0; index < simpleSiteUsers.length; index++) {
      siteUserInput.push({
        externalUserId: simpleSiteUsers[index].externalUserId,
        site: simpleSiteUsers[index].site
      } as SiteUserInput)
    }

    const input = { userId: userId, siteUserInput: siteUserInput } as EditUserInput

    const mutation = gql`
      mutation editUserSites($input: EditUserInput!) {
        editUser(input: $input) {
          ... on IdentifiableUser {
            id
            user {
              email
            }
          }
          ... on OtherUserHasThisExternalIdError {
            siteUser {
              siteUserInfo {
                externalUserId
                site
              }
              identifiableUser {
                user {
                  email
                }
              }
            }
          }
        }
      }
    `
    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        input: input
      },
      fetchPolicy: 'no-cache'
    })

    return result.data.editUser as EditUserResultUnion
  }

  async classSchedules(site: SiteEnum): Promise<ClassSchedule[]> {
    const query = gql`
      query classSchedules($site: SiteEnum!) {
        classSchedules(site: $site) {
          id
          instructorName
          dayOfWeek
          startWithNoTimeZone
          endWithNoTimeZone
          type
          capacity
          roomLayout {
            id
            name
          }
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

      return queryResult.data.classSchedules as ClassSchedule[]
    } catch (error) {
      return [] as ClassSchedule[]
    }
  }

  async availableClassTypes(site: SiteEnum): Promise<string[]> {
    const query = gql`
      query availableClassTypes($site: SiteEnum!) {
        availableClassTypes(site: $site)
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

      return queryResult.data.availableClassTypes as string[]
    } catch (error) {
      return [] as string[]
    }
  }

  async setRoomLayoutForClassSchedules(
    classSchedulesIds: string[],
    roomLayoutId: string
  ): Promise<ClassSchedule[]> {
    const input = {
      classSchedulesIds: classSchedulesIds,
      roomLayoutId: roomLayoutId
    } as SetRoomLayoutForClassSchedulesInput

    const mutation = gql`
      mutation setRoomLayoutForClassSchedules($input: SetRoomLayoutForClassSchedulesInput!) {
        setRoomLayoutForClassSchedules(input: $input) {
          id
          instructorName
          dayOfWeek
          start
          end
          type
          roomLayout {
            id
            name
            capacity
          }
          capacity
        }
      }
    `
    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        input: input
      },
      fetchPolicy: 'no-cache'
    })

    return result.data.setRoomLayoutForClassSchedules as ClassSchedule[]
  }

  async userWorkoutStats(site: SiteEnum, userId: string): Promise<ClassStat[]> {
    const query = gql`
      query userWorkoutStats($site: SiteEnum!, $userId: ID!) {
        userWorkoutStats(site: $site, userId: $userId) {
          enrollment {
            enrollmentInfo {
              id
              ... on EnrollmentInfo {
                spotNumber
              }
            }
            class {
              id
              name
              start
              duration
            }
          }
          totalEnergy
        }
      }
    `

    const queryResult = await this.authApiClient.query({
      query: query,
      variables: {
        site: site,
        userId: userId
      }
    })

    return queryResult.data.userWorkoutStats as ClassStat[]
  }

  async singleWorkoutStat(enrollmentId: string): Promise<ClassStat> {
    const query = gql`
      query singleWorkoutStat($enrollmentId: ID!) {
        singleWorkoutStat(enrollmentId: $enrollmentId) {
          enrollment {
            enrollmentInfo {
              id
              ... on EnrollmentInfo {
                spotNumber
              }
            }
            class {
              id
              name
              start
              duration
              instructorName
            }
          }
          averagePower
          highPower
          averageRpm
          highRpm
          totalEnergy
          calories
          distance
          adjustedChartPoints(amountOfPoints: 62) {
            time
            rpm
            power
          }
        }
      }
    `

    const queryResult = await this.authApiClient.query({
      query: query,
      variables: {
        enrollmentId: enrollmentId
      },
      fetchPolicy: 'network-only'
    })

    return queryResult.data.singleWorkoutStat as ClassStat
  }

  async userRankingInClass(userId: string, classId: string): Promise<UserInClassRanking> {
    const query = gql`
      query userRankingInClass($userId: ID!, $classId: ID!) {
        userRankingInClass(userId: $userId, classId: $classId) {
          totalRanking {
            positionInRanking
            totalMembersInRanking
          }
          genderRanking {
            gender
            ranking {
              positionInRanking
              totalMembersInRanking
            }
          }
        }
      }
    `

    const queryResult = await this.authApiClient.query({
      query: query,
      variables: {
        userId: userId,
        classId: classId
      },
      fetchPolicy: 'network-only'
    })

    return queryResult.data.userRankingInClass as UserInClassRanking
  }

  async sendClassStatsToUsers(classId: string): Promise<boolean> {
    const query = gql`
      mutation sendClassStatsToUsers($classId: ID!) {
        sendClassStatsToUsers(classId: $classId)
      }
    `

    const queryResult = await this.authApiClient.query({
      query: query,
      fetchPolicy: 'no-cache',
      variables: {
        classId: classId
      }
    })

    return queryResult.data.sendClassStatsToUsers as boolean
  }

  async sendClassStatsToEmail(email: string, enrollmentId: string): Promise<boolean> {
    const input = { email: email, enrollmentId: enrollmentId } as SendClassStatsToEmailInput

    const query = gql`
      mutation sendClassStatsToEmail($input: SendClassStatsToEmailInput!) {
        sendClassStatsToEmail(input: $input)
      }
    `
    const queryResult = await this.authApiClient.query({
      query: query,
      fetchPolicy: 'no-cache',
      variables: {
        input: input
      }
    })

    return queryResult.data.sendClassStatsToEmail as boolean
  }

  async userWorkoutStatsPaginated(
    site: SiteEnum,
    userId: string,
    pagination: PaginationInput
  ): Promise<PaginatedClassStats> {
    const query = gql`
      query userWorkoutStatsPaginated(
        $site: SiteEnum!
        $userId: ID!
        $pagination: PaginationInput
      ) {
        userWorkoutStatsPaginated(site: $site, userId: $userId, pagination: $pagination) {
          classStats {
            enrollment {
              enrollmentInfo {
                id
                ... on EnrollmentInfo {
                  spotNumber
                }
              }
              class {
                id
                name
                start
                duration
                startWithNoTimeZone
                instructorName
              }
            }
            totalEnergy
          }
          total
        }
      }
    `

    const queryResult = await this.authApiClient.query({
      query: query,
      variables: {
        site: site,
        userId: userId,
        pagination: pagination
      },
      fetchPolicy: 'network-only'
    })

    return queryResult.data.userWorkoutStatsPaginated as PaginatedClassStats
  }

  async syncClassWithPIQ(site: SiteEnum, classId: string): Promise<boolean> {
    const mutation = gql`
      mutation syncClassWithPIQ($site: SiteEnum!, $classId: ID!) {
        syncClassWithPIQ(site: $site, classId: $classId) {
          class {
            isSynchronizing
          }
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

    const classInfo = result.data.syncClassWithPIQ as ClassInfo

    return classInfo.class.isSynchronizing
  }

  async checkIfClassIsSynchronized(site: SiteEnum, id: string): Promise<boolean> {
    const query = gql`
      query checkIfClassIsSynchronized($site: SiteEnum!, $id: ID!) {
        classInfo(site: $site, id: $id) {
          class {
            isSynchronizing
          }
        }
      }
    `

    const queryResult = await this.authApiClient.query({
      query: query,
      variables: {
        site: site,
        id: id
      },
      fetchPolicy: 'network-only'
    })

    const classInfo = queryResult.data.classInfo as ClassInfo

    return classInfo.class.isSynchronizing
  }

  async checkIfAllClassAreSynchronized(site: SiteEnum): Promise<boolean> {
    const query = gql`
      query checkIfAllClassAreSynchronized($site: SiteEnum!) {
        siteSettings(site: $site) {
          isSynchronizingClasses
        }
      }
    `

    const queryResult = await this.authApiClient.query({
      query: query,
      variables: {
        site: site
      },
      fetchPolicy: 'network-only'
    })

    const siteSetting = queryResult.data.siteSettings as SiteSetting

    return siteSetting.isSynchronizingClasses
  }

  async updateUserPassword(userId: string, newPassword: string): Promise<boolean> {
    const input = { userId, newPassword } as UpdateUserPasswordInput

    const mutation = gql`
      mutation updateUserPassword($input: UpdateUserPasswordInput!) {
        updateUserPassword(input: $input)
      }
    `

    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        input: input
      },
      fetchPolicy: 'network-only'
    })

    return result.data.updateUserPassword as boolean
  }

  async getGiftCards(): Promise<GiftCard[]> {
    const query = gql`
      query GiftCards {
        giftCards {
          id
          description
          salePrice
          grandTotal
          terms
          purchaseUrl
          site {
            name
            code
          }
        }
      }
    `

    const queryResult = await this.authApiClient.query({
      query: query,
      fetchPolicy: 'network-only'
    })

    return queryResult.data.giftCards as GiftCard[]
  }

  async updateGiftCard(id: string, grandTotal: number): Promise<GiftCard> {
    const input = { grandTotal, id } as UpdateGiftCardInput

    const mutation = gql`
      mutation UpdateGiftCard($input: UpdateGiftCardInput!) {
        updateGiftCard(input: $input) {
          id
          description
          salePrice
          grandTotal
          terms
          purchaseUrl
          site {
            name
            code
          }
        }
      }
    `

    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        input: input
      },
      fetchPolicy: 'network-only'
    })

    return result.data.updateGiftCard as GiftCard
  }

  async syncAllGiftCards(): Promise<boolean> {
    const query = gql`
      mutation SyncAllGiftCards {
        syncAllGiftCards
      }
    `

    const result = await this.authApiClient.query({
      query: query,
      fetchPolicy: 'no-cache'
    })

    return result.data.syncAllGiftCards as boolean
  }

  async getAvailableSites(): Promise<Site[]> {
    const query = gql`
      query availableSites {
        availableSites {
          name
          code
        }
      }
    `

    const queryResult = await this.authApiClient.query({
      query: query
    })

    return queryResult.data.availableSites as Site[]
  }

  async getAdminUser(id: string): Promise<AdminUser> {
    const query = gql`
      query adminUser($id: ID!) {
        adminUser(id: $id) {
          id
          username
          email
          roles
          linkedInstructors {
            id
            name
            site {
              code
              name
            }
          }
          linkedSites {
            name
            code
          }
        }
      }
    `
    const queryResult = await this.authApiClient.query({
      query: query,
      variables: {
        id: id
      },
      fetchPolicy: 'network-only'
    })

    return queryResult.data.adminUser as AdminUser
  }

  async getAdminUsers(): Promise<AdminUser[]> {
    const query = gql`
      query adminUsers {
        adminUsers {
          id
          username
          email
          roles
          linkedInstructors {
            id
            name
            site {
              name
              code
            }
          }
          linkedSites {
            name
            code
          }
          favoriteSite {
            name
            code
          }
        }
      }
    `

    const resultQuery = await this.authApiClient.query({
      query: query,
      fetchPolicy: 'network-only'
    })

    return resultQuery.data.adminUsers as AdminUser[]
  }

  async getAvailableInstructors(): Promise<Instructor[]> {
    const query = gql`
      query availableInstructors {
        availableInstructors {
          id
          name
          site {
            name
            code
          }
        }
      }
    `

    const resultQuery = await this.authApiClient.query({ query: query })

    return resultQuery.data.availableInstructors as Instructor[]
  }

  async resetAdminUserPassword(id: string): Promise<boolean> {
    const mutation = gql`
      mutation resetAdminUserPassword($id: ID!) {
        resetAdminUserPassword(id: $id)
      }
    `

    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        id: id
      },
      fetchPolicy: 'network-only'
    })

    return result.data.resetAdminUserPassword as boolean
  }

  async updateAdminUser(input: UpdateAdminUserInput): Promise<AdminUserResultUnion> {
    const mutation = gql`
      mutation updateAdminUser($input: UpdateAdminUserInput!) {
        updateAdminUser(input: $input) {
          ... on AdminUser {
            id
            username
            email
            roles
            linkedInstructors {
              id
              name
              site {
                name
                code
              }
            }
            linkedSites {
              name
              code
            }
          }
          ... on EmailAlreadyUsedError {
            code
          }
          ... on UsernameAlreadyUsedError {
            code
          }
        }
      }
    `

    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        input: input
      },
      fetchPolicy: 'network-only'
    })

    return result.data.updateAdminUser as AdminUserResultUnion
  }

  async addAdminUser(input: AdminUserDataInput): Promise<AdminUserResultUnion> {
    const mutation = gql`
      mutation addAdminUser($input: AdminUserDataInput!) {
        addAdminUser(input: $input) {
          ... on AdminUser {
            id
            username
            email
            roles
            linkedInstructors {
              id
              name
              site {
                name
                code
              }
            }
            linkedSites {
              name
              code
            }
          }
          ... on EmailAlreadyUsedError {
            code
          }
          ... on UsernameAlreadyUsedError {
            code
          }
        }
      }
    `

    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        input: input
      },
      fetchPolicy: 'network-only'
    })

    return result.data.addAdminUser as AdminUserResultUnion
  }

  async removeAdminUser(id: string): Promise<boolean> {
    const mutation = gql`
      mutation removeAdminUser($id: ID!) {
        removeAdminUser(id: $id)
      }
    `

    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        id: id
      },
      fetchPolicy: 'network-only'
    })

    return result.data.removeAdminUser as boolean
  }

  async getCurrentAdminUserSites(): Promise<AdminUser> {
    const query = gql`
      query currentAdminUserSites {
        currentAdminUser {
          linkedSites {
            name
            code
          }
          favoriteSite {
            name
            code
          }
        }
      }
    `

    const resultQuery = await this.authApiClient.query({
      query: query,
      fetchPolicy: 'network-only'
    })

    return resultQuery.data.currentAdminUser as AdminUser
  }

  async updateCurrentAdminUserPassword(input: UpdateCurrentUserPasswordInput): Promise<string> {
    const mutation = gql`
      mutation updateCurrentAdminUserPassword($input: UpdateCurrentUserPasswordInput!) {
        updateCurrentAdminUserPassword(input: $input)
      }
    `

    try {
      await this.authApiClient.mutate({
        mutation: mutation,
        variables: {
          input: input
        },
        fetchPolicy: 'network-only'
      })

      return 'Success'
    } catch (error) {
      if (error instanceof ApolloError) {
        if (error.graphQLErrors[0].message === 'password_must_contain_letter_or_number') {
          return 'PasswordMustContainLetterOrNumberException'
        } else if (error.graphQLErrors[0].message === 'minimum_password_length_is_four_chars') {
          return 'MinimumPasswordLengthException'
        } else if (error.graphQLErrors[0].message === 'incorrect_password') {
          return 'IncorrectPasswordException'
        } else {
          return 'UnknownError'
        }
      }
      return 'UnknownError'
    }
  }

  async updateCurrentAdminUserFavoriteSite(
    input: UpdateCurrentAdminUserFavoriteSiteInput
  ): Promise<AdminUser> {
    const mutation = gql`
      mutation updateCurrentAdminUserFavoriteSite($input: UpdateCurrentAdminUserFavoriteSiteInput) {
        updateCurrentAdminUserFavoriteSite(input: $input) {
          linkedSites {
            name
            code
          }
          favoriteSite {
            name
            code
          }
        }
      }
    `

    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: {
        input: input
      },
      fetchPolicy: 'network-only'
    })

    return result.data.updateCurrentAdminUserFavoriteSite as AdminUser
  }

  async updateCurrentAdminUser(input: UpdateCurrentAdminUserInput): Promise<AdminUser> {
    const mutation = gql`
      mutation updateCurrentAdminUser($input: UpdateCurrentAdminUserInput!) {
        updateCurrentAdminUser(input: $input) {
          id
          username
          email
          roles
          linkedInstructors {
            id
            name
            site {
              code
              name
            }
          }
          linkedSites {
            name
            code
          }
          favoriteSite {
            name
            code
          }
          showCancelledClasses
        }
      }
    `

    const result = await this.authApiClient.mutate({
      mutation: mutation,
      variables: { input: input },
      fetchPolicy: 'network-only'
    })

    return result.data.updateCurrentAdminUser as AdminUser
  }

  async getShowCancelledClassesForCurrentAdminUser(): Promise<boolean> {
    const query = gql`
      query GetShowCancelledClasses {
        currentAdminUser {
          showCancelledClasses
        }
      }
    `

    const result = await this.authApiClient.query({
      query,
      fetchPolicy: 'no-cache'
    })

    return result.data.currentAdminUser?.showCancelledClasses ?? false
  }

  // Payment Links
  async getPaymentLinks(site: SiteEnum | null): Promise<PaymentLink[]> {
    try {
      const { data, errors } = await this.authApiClient.query({
        query: PaymentLinksDocument,
        variables: { site: site },
        fetchPolicy: 'network-only'
      })

      if (errors && errors.length > 0) {
        throw new Error(`GraphQL Error: ${errors[0].message}`)
      }

      if (!data || !data.paymentLinks) {
        throw new Error('No data returned from paymentLinks query')
      }

      return data.paymentLinks as PaymentLink[]
    } catch (error) {
      console.error('Error fetching payment links:', error)
      throw error
    }
  }

  async getPaymentLink(id: string): Promise<PaymentLink | null> {
    try {
      const { data, errors } = await this.authApiClient.query({
        query: PaymentLinkDocument,
        variables: { id: id },
        fetchPolicy: 'network-only'
      })

      if (errors && errors.length > 0) {
        throw new Error(`GraphQL Error: ${errors[0].message}`)
      }

      if (!data || !data.paymentLink) {
        return null
      }

      return data.paymentLink as PaymentLink
    } catch (error) {
      console.error('Error fetching payment link:', error)
      throw error
    }
  }

  async updatePaymentLink(input: UpdatePaymentLinkInput): Promise<PaymentLink> {
    try {
      const { data, errors } = await this.authApiClient.mutate({
        mutation: UpdatePaymentLinkDocument,
        variables: { input: input },
        fetchPolicy: 'network-only'
      })

      if (errors && errors.length > 0) {
        throw new Error(`GraphQL Error: ${errors[0].message}`)
      }

      if (!data || !data.updatePaymentLink) {
        throw new Error('No data returned from updatePaymentLink mutation')
      }

      return data.updatePaymentLink as PaymentLink
    } catch (error) {
      console.error('Error updating payment link:', error)
      throw error
    }
  }

  async createPaymentLink(input: CreatePaymentLinkInput): Promise<PaymentLink> {
    try {
      const { data, errors } = await this.authApiClient.mutate({
        mutation: CreatePaymentLinkDocument,
        variables: { input: input },
        fetchPolicy: 'network-only'
      })

      if (errors && errors.length > 0) {
        throw new Error(`GraphQL Error: ${errors[0].message}`)
      }

      if (!data || !data.createPaymentLink) {
        throw new Error('No data returned from createPaymentLink mutation')
      }

      return data.createPaymentLink as PaymentLink
    } catch (error) {
      console.error('Error creating payment link:', error)
      throw error
    }
  }

  async deletePaymentLink(id: string): Promise<boolean> {
    try {
      const { data, errors } = await this.authApiClient.mutate({
        mutation: DeletePaymentLinkDocument,
        variables: { id: id },
        fetchPolicy: 'network-only'
      })

      if (errors && errors.length > 0) {
        throw new Error(`GraphQL Error: ${errors[0].message}`)
      }

      if (!data || data.deletePaymentLink === undefined) {
        throw new Error('No data returned from deletePaymentLink mutation')
      }

      return data.deletePaymentLink as boolean
    } catch (error) {
      console.error('Error deleting payment link:', error)
      throw error
    }
  }

  // Session Types
  async getSessionTypes(site: SiteEnum): Promise<SessionType[]> {
    try {
      const { data, errors } = await this.authApiClient.query({
        query: SessionTypesDocument,
        variables: { site: site },
        fetchPolicy: 'network-only'
      })

      if (errors && errors.length > 0) {
        throw new Error(`GraphQL Error: ${errors[0].message}`)
      }

      if (!data || !data.sessionTypes) {
        throw new Error('No data returned from sessionTypes query')
      }

      return data.sessionTypes as SessionType[]
    } catch (error) {
      console.error('Error fetching session types:', error)
      throw error
    }
  }

  async createSessionType(input: CreateSessionTypeInput): Promise<SessionType> {
    const { data, errors } = await this.authApiClient.mutate({
      mutation: CreateSessionTypeDocument,
      variables: { input: input },
      fetchPolicy: 'network-only'
    })

    if (errors?.length) {
      throw new Error(`GraphQL Error: ${errors[0].message}`)
    }

    const result = data?.createSessionType

    if (!result) {
      throw new Error('No data returned from createSessionType mutation')
    }

    if (result.__typename !== 'SessionType') {
      throw new DomainError(result.code, 'Create session type failed')
    }

    return result
  }

  async updateSessionType(id: string, input: UpdateSessionTypeInput): Promise<SessionType> {
    const { data, errors } = await this.authApiClient.mutate({
      mutation: UpdateSessionTypeDocument,
      variables: { id, input },
      fetchPolicy: 'network-only'
    })

    if (errors?.length) {
      throw new Error(`GraphQL Error: ${errors[0].message}`)
    }

    const result = data?.updateSessionType
    if (!result) {
      throw new Error('No data returned from updateSessionType mutation')
    }

    if (result.__typename !== 'SessionType') {
      throw new DomainError(result.code, 'Update session type failed')
    }

    return result
  }

  async deleteSessionType(id: string): Promise<boolean> {
    try {
      const { data, errors } = await this.authApiClient.mutate({
        mutation: DeleteSessionTypeDocument,
        variables: { id: id },
        fetchPolicy: 'network-only'
      })

      if (errors && errors.length > 0) {
        throw new Error(`GraphQL Error: ${errors[0].message}`)
      }

      if (!data || data.deleteSessionType === undefined) {
        throw new Error('No data returned from deleteSessionType mutation')
      }

      return data.deleteSessionType as boolean
    } catch (error) {
      console.error('Error deleting session type:', error)
      throw error
    }
  }

  async getMindbodySessionTypes(site: SiteEnum): Promise<MindbodySessionTypeInfo[]> {
    try {
      const { data, errors } = await this.authApiClient.query({
        query: MindbodySessionTypesDocument,
        variables: { site: site },
        fetchPolicy: 'network-only'
      })

      if (errors && errors.length > 0) {
        throw new Error(`GraphQL Error: ${errors[0].message}`)
      }

      if (!data || !data.mindbodySessionTypes) {
        throw new Error('No data returned from mindbodySessionTypes query')
      }

      return data.mindbodySessionTypes
    } catch (error) {
      console.error('Error fetching mindbody session types:', error)
      throw error
    }
  }

  // Instructor Profiles
  async getInstructorProfiles(
    site: SiteEnum,
    activeOnly: boolean | null
  ): Promise<InstructorProfile[]> {
    try {
      const { data, errors } = await this.authApiClient.query({
        query: InstructorProfilesDocument,
        variables: { site: site, activeOnly: activeOnly },
        fetchPolicy: 'network-only'
      })

      if (errors && errors.length > 0) {
        throw new Error(`GraphQL Error: ${errors[0].message}`)
      }

      if (!data || !data.instructorProfiles) {
        throw new Error('No data returned from instructorProfiles query')
      }

      return data.instructorProfiles.map((profile: any) => ({
        ...profile,
        createdAt: new Date(profile.createdAt),
        updatedAt: new Date(profile.updatedAt)
      })) as InstructorProfile[]
    } catch (error) {
      console.error('Error fetching instructor profiles:', error)
      throw error
    }
  }

  async createInstructorProfile(input: CreateInstructorProfileInput): Promise<InstructorProfile> {
    const { data, errors } = await this.authApiClient.mutate({
      mutation: CreateInstructorProfileDocument,
      variables: { input: input },
      fetchPolicy: 'network-only'
    })

    if (errors?.length) {
      throw new Error(`GraphQL Error: ${errors[0].message}`)
    }

    const result = data?.createInstructorProfile

    if (!result) {
      throw new Error('No data returned from createInstructorProfile mutation')
    }

    if (result.__typename !== 'InstructorProfile') {
      throw new DomainError(result.code, 'Create instructor profile failed')
    }

    return result
  }

  async updateInstructorProfile(
    id: string,
    input: UpdateInstructorProfileInput
  ): Promise<InstructorProfile> {
    const { data, errors } = await this.authApiClient.mutate({
      mutation: UpdateInstructorProfileDocument,
      variables: { id, input },
      fetchPolicy: 'network-only'
    })

    if (errors?.length) {
      throw new Error(`GraphQL Error: ${errors[0].message}`)
    }

    const result = data?.updateInstructorProfile
    if (!result) {
      throw new Error('No data returned from updateInstructorProfile mutation')
    }

    if (result.__typename !== 'InstructorProfile') {
      throw new DomainError(result.code, 'Update instructor profile failed')
    }

    return result
  }

  async deleteInstructorProfile(id: string): Promise<boolean> {
    try {
      const { data, errors } = await this.authApiClient.mutate({
        mutation: DeleteInstructorProfileDocument,
        variables: { id: id },
        fetchPolicy: 'network-only'
      })

      if (errors && errors.length > 0) {
        throw new Error(`GraphQL Error: ${errors[0].message}`)
      }

      if (!data || data.deleteInstructorProfile === undefined) {
        throw new Error('No data returned from deleteInstructorProfile mutation')
      }

      return data.deleteInstructorProfile as boolean
    } catch (error) {
      console.error('Error deleting instructor profile:', error)
      throw error
    }
  }

  async getMindbodyStaffs(site: SiteEnum): Promise<MindbodyStaffInfo[]> {
    try {
      const { data, errors } = await this.authApiClient.query({
        query: MindbodyStaffsDocument,
        variables: { site: site },
        fetchPolicy: 'network-only'
      })

      if (errors && errors.length > 0) {
        throw new Error(`GraphQL Error: ${errors[0].message}`)
      }

      if (!data || !data.mindbodyStaffs) {
        throw new Error('No data returned from mindbodyStaffs query')
      }

      return data.mindbodyStaffs
    } catch (error) {
      console.error('Error fetching instructor profiles:', error)
      throw error
    }
  }
}
