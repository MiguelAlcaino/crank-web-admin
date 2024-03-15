/* eslint-disable */
import * as types from './graphql'
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
  '\n      query siteSettings($site: SiteEnum!) {\n        siteSettings(site: $site) {\n          siteDateTimeNow\n        }\n      }\n    ':
    types.SiteSettingsDocument,
  '\n      query calendarClasses($site: SiteEnum!, $params: CalendarClassesParams) {\n        calendarClasses(site: $site, params: $params) {\n          id\n          name\n          description\n          instructorName\n          isSubstitute\n          start\n          startWithNoTimeZone\n          duration\n          waitListAvailable\n          bookingWindow {\n            startDateTime\n            endDateTime\n          }\n        }\n      }\n    ':
    types.CalendarClassesDocument,
  '\n      query classInfoAdmin($site: SiteEnum!, $id: ID!) {\n        classInfo(site: $site, id: $id) {\n          class {\n            id\n            name\n            description\n            instructorName\n            start\n            startWithNoTimeZone\n            duration\n            waitListAvailable\n            showAsDisabled\n            maxCapacity\n          }\n          roomLayout {\n            id\n            name\n            matrix {\n              x\n              y\n              icon\n              ... on BookableSpot {\n                enabled\n                spotNumber\n              }\n            }\n          }\n          enrollments(status: active) {\n            id\n            enrollmentStatus\n            enrollmentDateTime\n            identifiableSiteUser {\n              id\n               identifiableUser {\n                id\n                user {\n                  firstName\n                  lastName\n                  email\n                  leaderboardUsername\n                }\n              }\n            }\n           \n            ... on EnrollmentInfo {\n              isCheckedIn\n              spotNumber\n            }\n          }\n          onHoldSpots\n        }\n      }\n    ':
    types.ClassInfoAdminDocument,
  '\n      mutation disableSpot($input: DisableEnableSpotInput) {\n        disableSpot(input: $input) {\n          __typename\n          ... on DisableEnableSpotResult {\n            __typename\n            result\n          }\n          ... on SpotNotFoundError {\n            __typename\n            code\n          }\n        }\n      }\n    ':
    types.DisableSpotDocument,
  '\n      mutation enableSpot($input: DisableEnableSpotInput) {\n        enableSpot(input: $input) {\n          __typename\n          ... on DisableEnableSpotResult {\n            __typename\n            result\n          }\n          ... on SpotNotFoundError {\n            __typename\n            code\n          }\n        }\n      }\n    ':
    types.EnableSpotDocument,
  '\n      query searchSiteUser($site: SiteEnum!, $query: String) {\n        searchSiteUser(site: $site, query: $query) {\n          id\n          identifiableUser {\n            id\n            user {\n              firstName\n              lastName\n              email\n            }\n          }\n        }\n      }\n    ':
    types.SearchSiteUserDocument,
  '\n      mutation bookUserIntoClass($input: BookUserIntoClassInput!) {\n        bookUserIntoClass(input: $input) {\n          __typename\n        }\n      }\n    ':
    types.BookUserIntoClassDocument,
  '\n      mutation removeUserFromClass($input: CancelEnrollmentInput!) {\n        removeUserFromClass(input: $input) {\n          __typename\n        }\n      }\n    ':
    types.RemoveUserFromClassDocument,
  '\n      mutation editClass($input: EditClassInput!) {\n        editClass(input: $input) {\n          __typename\n          ... on EditClassSuccessResult {\n            __typename\n            updated\n          }\n        }\n      }\n    ':
    types.EditClassDocument,
  '\n      query roomLayouts($site: SiteEnum!, $params: RoomLayoutsInput) {\n        roomLayouts(site: $site, params: $params) {\n          id\n          name\n        }\n      }\n    ':
    types.RoomLayoutsDocument,
  '\n      query roomLayout($site: SiteEnum!, $id: ID!) {\n        roomLayout(site: $site, id: $id) {\n          id\n          name\n          columns\n          rows\n          matrix {\n            x\n            y\n            icon\n            ... on BookableSpot {\n              spotNumber\n            }\n          }\n        }\n      }\n    ':
    types.RoomLayoutDocument,
  '\n      mutation createRoomLayout($site: SiteEnum!, $input: RoomLayoutInput!) {\n        createRoomLayout(site: $site, input: $input) {\n          id\n        }\n      }\n    ':
    types.CreateRoomLayoutDocument,
  '\n      mutation editRoomLayout($site: SiteEnum!, $input: EditRoomLayoutInput!) {\n        editRoomLayout(site: $site, input: $input) {\n          id\n        }\n      }\n    ':
    types.EditRoomLayoutDocument,
  '\n      query classWaitlistEntries($site: SiteEnum!, $id: ID!) {\n        classInfo(site: $site, id: $id) {\n          enrollments(status: waitlisted) {\n            id\n            enrollmentStatus\n            enrollmentDateTime\n            identifiableSiteUser {\n              id\n              identifiableUser {\n                id\n                user {\n                  firstName\n                  lastName\n                }\n              }              \n            }\n          }\n        }\n      }\n    ':
    types.ClassWaitlistEntriesDocument,
  '\n      mutation removeUserFromWaitlist($input: RemoveUserFromWaitlistInput!) {\n        removeUserFromWaitlist(input: $input) {\n          ... on RemoveFromWaitlistResult {\n            success\n          }\n          ... on WaitlistEntryNotFoundError {\n            code\n          }\n        }\n      }\n    ':
    types.RemoveUserFromWaitlistDocument,
  '\n      mutation checkinUserInClass($site: SiteEnum!, $input: CheckinUserInClass!) {\n        checkinUserInClass(site: $site, input: $input) {\n          __typename\n          ... on CheckinSuccess {\n            success\n          }\n          ... on EnrollmentNotFoundError {\n            code\n          }\n        }\n      }\n    ':
    types.CheckinUserInClassDocument,
  '\n      mutation checkoutUserInClass($site: SiteEnum!, $input: CheckoutUserInClass!) {\n        checkoutUserInClass(site: $site, input: $input) {\n          __typename\n          ... on CheckoutSuccess {\n            success\n          }\n          ... on EnrollmentNotFoundError {\n            code\n          }\n        }\n      }\n    ':
    types.CheckoutUserInClassDocument,
  '\n      mutation editEnrollment($site: SiteEnum!, $input: EditEnrollmentInput!) {\n        editEnrollment(site: $site, input: $input) {\n          __typename\n          ... on Enrollment {\n            __typename\n          }\n          ... on SpotAlreadyReservedError {\n            code\n          }\n          ... on TryToSwitchToSameSpotError {\n            code\n          }\n          ... on ClientIsOutsideSchedulingWindowError {\n            code\n          }\n        }\n      }\n    ':
    types.EditEnrollmentDocument,
  '\n      mutation swapSpot($site: SiteEnum!, $input: EditEnrollmentInput!) {\n        swapSpot(site: $site, input: $input) {\n          __typename\n          ... on SwapSpotSuccess {\n            __typename\n          }\n          ... on TryToSwitchToSameSpotError {\n            __typename\n            code\n          }\n        }\n      }\n    ':
    types.SwapSpotDocument,
  '\n      query getCalendarClassesForList($site: SiteEnum!, $params: CalendarClassesParams) {\n        calendarClasses(site: $site, params: $params) {\n          id\n          name\n          startWithNoTimeZone\n          maxCapacity\n          totalBooked\n          totalUnderMaintenanceSpots\n          showAsDisabled\n        }\n      }\n    ':
    types.GetCalendarClassesForListDocument,
  '\n      query getUser($id: ID!) {\n        user(id: $id) {\n          id\n          user {\n            firstName\n            lastName\n            email\n            leaderboardUsername\n            weight\n            gender\n            birthdate\n            country {\n              code\n              name\n            }\n            state {\n              code\n              name\n            }\n            city\n            address1\n            address2\n            zipCode\n            phone\n            emergencyContactName\n            emergencyContactPhone\n            emergencyContactRelationship\n            hideMetrics\n            existsInSites\n          }\n        }\n      }\n    ':
    types.GetUserDocument,
  '\n      query classWaitlistIsEnabled($site: SiteEnum!, $id: ID!) {\n        classInfo(site: $site, id: $id) {\n          class {\n            waitListAvailable\n          }\n        }\n      }\n    ':
    types.ClassWaitlistIsEnabledDocument,
  '\n      mutation syncClass($site: SiteEnum!, $classId: ID!) {\n        syncClass(site: $site, classId: $classId) {\n          class {\n            id\n            name\n            description\n            instructorName\n            start\n            startWithNoTimeZone\n            duration\n            waitListAvailable\n          }\n          roomLayout {\n            id\n            name\n            matrix {\n              __typename\n              x\n              y\n              icon\n              ... on BookableSpot {\n                enabled\n                spotNumber\n              }\n            }\n          }\n          enrollments(status: active) {\n            id\n            enrollmentStatus\n            enrollmentDateTime\n            identifiableSiteUser {\n              id\n              identifiableUser {\n                id\n                user {\n                  __typename\n                  firstName\n                  lastName\n                  email\n                  leaderboardUsername\n                }\n              }\n            }\n           \n\n            ... on EnrollmentInfo {\n              isCheckedIn\n              spotNumber\n            }\n          }\n          onHoldSpots\n        }\n      }\n    ':
    types.SyncClassDocument,
  '\n      mutation syncAllClasses($site: SiteEnum!) {\n        syncAllClasses(site: $site) {\n          id\n        }\n      }\n    ':
    types.SyncAllClassesDocument,
  '\n      query Countries {\n        countries {\n          name\n          code\n        }\n      }\n    ':
    types.CountriesDocument,
  '\n      query country($countryCode: String!) {\n        country(countryCode: $countryCode) {\n          name\n          code\n          states {\n            name\n            code\n          }\n        }\n      }\n    ':
    types.CountryDocument,
  '\n      mutation registerUser($site: SiteEnum!, $input: RegisterUserInput!) {\n        registerIdentifiableUser(site: $site, input: $input) {\n          id\n        }\n      }\n    ':
    types.RegisterUserDocument
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query siteSettings($site: SiteEnum!) {\n        siteSettings(site: $site) {\n          siteDateTimeNow\n        }\n      }\n    '
): (typeof documents)['\n      query siteSettings($site: SiteEnum!) {\n        siteSettings(site: $site) {\n          siteDateTimeNow\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query calendarClasses($site: SiteEnum!, $params: CalendarClassesParams) {\n        calendarClasses(site: $site, params: $params) {\n          id\n          name\n          description\n          instructorName\n          isSubstitute\n          start\n          startWithNoTimeZone\n          duration\n          waitListAvailable\n          bookingWindow {\n            startDateTime\n            endDateTime\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query calendarClasses($site: SiteEnum!, $params: CalendarClassesParams) {\n        calendarClasses(site: $site, params: $params) {\n          id\n          name\n          description\n          instructorName\n          isSubstitute\n          start\n          startWithNoTimeZone\n          duration\n          waitListAvailable\n          bookingWindow {\n            startDateTime\n            endDateTime\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query classInfoAdmin($site: SiteEnum!, $id: ID!) {\n        classInfo(site: $site, id: $id) {\n          class {\n            id\n            name\n            description\n            instructorName\n            start\n            startWithNoTimeZone\n            duration\n            waitListAvailable\n            showAsDisabled\n            maxCapacity\n          }\n          roomLayout {\n            id\n            name\n            matrix {\n              x\n              y\n              icon\n              ... on BookableSpot {\n                enabled\n                spotNumber\n              }\n            }\n          }\n          enrollments(status: active) {\n            id\n            enrollmentStatus\n            enrollmentDateTime\n            identifiableSiteUser {\n              id\n               identifiableUser {\n                id\n                user {\n                  firstName\n                  lastName\n                  email\n                  leaderboardUsername\n                }\n              }\n            }\n           \n            ... on EnrollmentInfo {\n              isCheckedIn\n              spotNumber\n            }\n          }\n          onHoldSpots\n        }\n      }\n    '
): (typeof documents)['\n      query classInfoAdmin($site: SiteEnum!, $id: ID!) {\n        classInfo(site: $site, id: $id) {\n          class {\n            id\n            name\n            description\n            instructorName\n            start\n            startWithNoTimeZone\n            duration\n            waitListAvailable\n            showAsDisabled\n            maxCapacity\n          }\n          roomLayout {\n            id\n            name\n            matrix {\n              x\n              y\n              icon\n              ... on BookableSpot {\n                enabled\n                spotNumber\n              }\n            }\n          }\n          enrollments(status: active) {\n            id\n            enrollmentStatus\n            enrollmentDateTime\n            identifiableSiteUser {\n              id\n               identifiableUser {\n                id\n                user {\n                  firstName\n                  lastName\n                  email\n                  leaderboardUsername\n                }\n              }\n            }\n           \n            ... on EnrollmentInfo {\n              isCheckedIn\n              spotNumber\n            }\n          }\n          onHoldSpots\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation disableSpot($input: DisableEnableSpotInput) {\n        disableSpot(input: $input) {\n          __typename\n          ... on DisableEnableSpotResult {\n            __typename\n            result\n          }\n          ... on SpotNotFoundError {\n            __typename\n            code\n          }\n        }\n      }\n    '
): (typeof documents)['\n      mutation disableSpot($input: DisableEnableSpotInput) {\n        disableSpot(input: $input) {\n          __typename\n          ... on DisableEnableSpotResult {\n            __typename\n            result\n          }\n          ... on SpotNotFoundError {\n            __typename\n            code\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation enableSpot($input: DisableEnableSpotInput) {\n        enableSpot(input: $input) {\n          __typename\n          ... on DisableEnableSpotResult {\n            __typename\n            result\n          }\n          ... on SpotNotFoundError {\n            __typename\n            code\n          }\n        }\n      }\n    '
): (typeof documents)['\n      mutation enableSpot($input: DisableEnableSpotInput) {\n        enableSpot(input: $input) {\n          __typename\n          ... on DisableEnableSpotResult {\n            __typename\n            result\n          }\n          ... on SpotNotFoundError {\n            __typename\n            code\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query searchSiteUser($site: SiteEnum!, $query: String) {\n        searchSiteUser(site: $site, query: $query) {\n          id\n          identifiableUser {\n            id\n            user {\n              firstName\n              lastName\n              email\n            }\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query searchSiteUser($site: SiteEnum!, $query: String) {\n        searchSiteUser(site: $site, query: $query) {\n          id\n          identifiableUser {\n            id\n            user {\n              firstName\n              lastName\n              email\n            }\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation bookUserIntoClass($input: BookUserIntoClassInput!) {\n        bookUserIntoClass(input: $input) {\n          __typename\n        }\n      }\n    '
): (typeof documents)['\n      mutation bookUserIntoClass($input: BookUserIntoClassInput!) {\n        bookUserIntoClass(input: $input) {\n          __typename\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation removeUserFromClass($input: CancelEnrollmentInput!) {\n        removeUserFromClass(input: $input) {\n          __typename\n        }\n      }\n    '
): (typeof documents)['\n      mutation removeUserFromClass($input: CancelEnrollmentInput!) {\n        removeUserFromClass(input: $input) {\n          __typename\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation editClass($input: EditClassInput!) {\n        editClass(input: $input) {\n          __typename\n          ... on EditClassSuccessResult {\n            __typename\n            updated\n          }\n        }\n      }\n    '
): (typeof documents)['\n      mutation editClass($input: EditClassInput!) {\n        editClass(input: $input) {\n          __typename\n          ... on EditClassSuccessResult {\n            __typename\n            updated\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query roomLayouts($site: SiteEnum!, $params: RoomLayoutsInput) {\n        roomLayouts(site: $site, params: $params) {\n          id\n          name\n        }\n      }\n    '
): (typeof documents)['\n      query roomLayouts($site: SiteEnum!, $params: RoomLayoutsInput) {\n        roomLayouts(site: $site, params: $params) {\n          id\n          name\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query roomLayout($site: SiteEnum!, $id: ID!) {\n        roomLayout(site: $site, id: $id) {\n          id\n          name\n          columns\n          rows\n          matrix {\n            x\n            y\n            icon\n            ... on BookableSpot {\n              spotNumber\n            }\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query roomLayout($site: SiteEnum!, $id: ID!) {\n        roomLayout(site: $site, id: $id) {\n          id\n          name\n          columns\n          rows\n          matrix {\n            x\n            y\n            icon\n            ... on BookableSpot {\n              spotNumber\n            }\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation createRoomLayout($site: SiteEnum!, $input: RoomLayoutInput!) {\n        createRoomLayout(site: $site, input: $input) {\n          id\n        }\n      }\n    '
): (typeof documents)['\n      mutation createRoomLayout($site: SiteEnum!, $input: RoomLayoutInput!) {\n        createRoomLayout(site: $site, input: $input) {\n          id\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation editRoomLayout($site: SiteEnum!, $input: EditRoomLayoutInput!) {\n        editRoomLayout(site: $site, input: $input) {\n          id\n        }\n      }\n    '
): (typeof documents)['\n      mutation editRoomLayout($site: SiteEnum!, $input: EditRoomLayoutInput!) {\n        editRoomLayout(site: $site, input: $input) {\n          id\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query classWaitlistEntries($site: SiteEnum!, $id: ID!) {\n        classInfo(site: $site, id: $id) {\n          enrollments(status: waitlisted) {\n            id\n            enrollmentStatus\n            enrollmentDateTime\n            identifiableSiteUser {\n              id\n              identifiableUser {\n                id\n                user {\n                  firstName\n                  lastName\n                }\n              }              \n            }\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query classWaitlistEntries($site: SiteEnum!, $id: ID!) {\n        classInfo(site: $site, id: $id) {\n          enrollments(status: waitlisted) {\n            id\n            enrollmentStatus\n            enrollmentDateTime\n            identifiableSiteUser {\n              id\n              identifiableUser {\n                id\n                user {\n                  firstName\n                  lastName\n                }\n              }              \n            }\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation removeUserFromWaitlist($input: RemoveUserFromWaitlistInput!) {\n        removeUserFromWaitlist(input: $input) {\n          ... on RemoveFromWaitlistResult {\n            success\n          }\n          ... on WaitlistEntryNotFoundError {\n            code\n          }\n        }\n      }\n    '
): (typeof documents)['\n      mutation removeUserFromWaitlist($input: RemoveUserFromWaitlistInput!) {\n        removeUserFromWaitlist(input: $input) {\n          ... on RemoveFromWaitlistResult {\n            success\n          }\n          ... on WaitlistEntryNotFoundError {\n            code\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation checkinUserInClass($site: SiteEnum!, $input: CheckinUserInClass!) {\n        checkinUserInClass(site: $site, input: $input) {\n          __typename\n          ... on CheckinSuccess {\n            success\n          }\n          ... on EnrollmentNotFoundError {\n            code\n          }\n        }\n      }\n    '
): (typeof documents)['\n      mutation checkinUserInClass($site: SiteEnum!, $input: CheckinUserInClass!) {\n        checkinUserInClass(site: $site, input: $input) {\n          __typename\n          ... on CheckinSuccess {\n            success\n          }\n          ... on EnrollmentNotFoundError {\n            code\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation checkoutUserInClass($site: SiteEnum!, $input: CheckoutUserInClass!) {\n        checkoutUserInClass(site: $site, input: $input) {\n          __typename\n          ... on CheckoutSuccess {\n            success\n          }\n          ... on EnrollmentNotFoundError {\n            code\n          }\n        }\n      }\n    '
): (typeof documents)['\n      mutation checkoutUserInClass($site: SiteEnum!, $input: CheckoutUserInClass!) {\n        checkoutUserInClass(site: $site, input: $input) {\n          __typename\n          ... on CheckoutSuccess {\n            success\n          }\n          ... on EnrollmentNotFoundError {\n            code\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation editEnrollment($site: SiteEnum!, $input: EditEnrollmentInput!) {\n        editEnrollment(site: $site, input: $input) {\n          __typename\n          ... on Enrollment {\n            __typename\n          }\n          ... on SpotAlreadyReservedError {\n            code\n          }\n          ... on TryToSwitchToSameSpotError {\n            code\n          }\n          ... on ClientIsOutsideSchedulingWindowError {\n            code\n          }\n        }\n      }\n    '
): (typeof documents)['\n      mutation editEnrollment($site: SiteEnum!, $input: EditEnrollmentInput!) {\n        editEnrollment(site: $site, input: $input) {\n          __typename\n          ... on Enrollment {\n            __typename\n          }\n          ... on SpotAlreadyReservedError {\n            code\n          }\n          ... on TryToSwitchToSameSpotError {\n            code\n          }\n          ... on ClientIsOutsideSchedulingWindowError {\n            code\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation swapSpot($site: SiteEnum!, $input: EditEnrollmentInput!) {\n        swapSpot(site: $site, input: $input) {\n          __typename\n          ... on SwapSpotSuccess {\n            __typename\n          }\n          ... on TryToSwitchToSameSpotError {\n            __typename\n            code\n          }\n        }\n      }\n    '
): (typeof documents)['\n      mutation swapSpot($site: SiteEnum!, $input: EditEnrollmentInput!) {\n        swapSpot(site: $site, input: $input) {\n          __typename\n          ... on SwapSpotSuccess {\n            __typename\n          }\n          ... on TryToSwitchToSameSpotError {\n            __typename\n            code\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query getCalendarClassesForList($site: SiteEnum!, $params: CalendarClassesParams) {\n        calendarClasses(site: $site, params: $params) {\n          id\n          name\n          startWithNoTimeZone\n          maxCapacity\n          totalBooked\n          totalUnderMaintenanceSpots\n          showAsDisabled\n        }\n      }\n    '
): (typeof documents)['\n      query getCalendarClassesForList($site: SiteEnum!, $params: CalendarClassesParams) {\n        calendarClasses(site: $site, params: $params) {\n          id\n          name\n          startWithNoTimeZone\n          maxCapacity\n          totalBooked\n          totalUnderMaintenanceSpots\n          showAsDisabled\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query getUser($id: ID!) {\n        user(id: $id) {\n          id\n          user {\n            firstName\n            lastName\n            email\n            leaderboardUsername\n            weight\n            gender\n            birthdate\n            country {\n              code\n              name\n            }\n            state {\n              code\n              name\n            }\n            city\n            address1\n            address2\n            zipCode\n            phone\n            emergencyContactName\n            emergencyContactPhone\n            emergencyContactRelationship\n            hideMetrics\n            existsInSites\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query getUser($id: ID!) {\n        user(id: $id) {\n          id\n          user {\n            firstName\n            lastName\n            email\n            leaderboardUsername\n            weight\n            gender\n            birthdate\n            country {\n              code\n              name\n            }\n            state {\n              code\n              name\n            }\n            city\n            address1\n            address2\n            zipCode\n            phone\n            emergencyContactName\n            emergencyContactPhone\n            emergencyContactRelationship\n            hideMetrics\n            existsInSites\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query classWaitlistIsEnabled($site: SiteEnum!, $id: ID!) {\n        classInfo(site: $site, id: $id) {\n          class {\n            waitListAvailable\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query classWaitlistIsEnabled($site: SiteEnum!, $id: ID!) {\n        classInfo(site: $site, id: $id) {\n          class {\n            waitListAvailable\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation syncClass($site: SiteEnum!, $classId: ID!) {\n        syncClass(site: $site, classId: $classId) {\n          class {\n            id\n            name\n            description\n            instructorName\n            start\n            startWithNoTimeZone\n            duration\n            waitListAvailable\n          }\n          roomLayout {\n            id\n            name\n            matrix {\n              __typename\n              x\n              y\n              icon\n              ... on BookableSpot {\n                enabled\n                spotNumber\n              }\n            }\n          }\n          enrollments(status: active) {\n            id\n            enrollmentStatus\n            enrollmentDateTime\n            identifiableSiteUser {\n              id\n              identifiableUser {\n                id\n                user {\n                  __typename\n                  firstName\n                  lastName\n                  email\n                  leaderboardUsername\n                }\n              }\n            }\n           \n\n            ... on EnrollmentInfo {\n              isCheckedIn\n              spotNumber\n            }\n          }\n          onHoldSpots\n        }\n      }\n    '
): (typeof documents)['\n      mutation syncClass($site: SiteEnum!, $classId: ID!) {\n        syncClass(site: $site, classId: $classId) {\n          class {\n            id\n            name\n            description\n            instructorName\n            start\n            startWithNoTimeZone\n            duration\n            waitListAvailable\n          }\n          roomLayout {\n            id\n            name\n            matrix {\n              __typename\n              x\n              y\n              icon\n              ... on BookableSpot {\n                enabled\n                spotNumber\n              }\n            }\n          }\n          enrollments(status: active) {\n            id\n            enrollmentStatus\n            enrollmentDateTime\n            identifiableSiteUser {\n              id\n              identifiableUser {\n                id\n                user {\n                  __typename\n                  firstName\n                  lastName\n                  email\n                  leaderboardUsername\n                }\n              }\n            }\n           \n\n            ... on EnrollmentInfo {\n              isCheckedIn\n              spotNumber\n            }\n          }\n          onHoldSpots\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation syncAllClasses($site: SiteEnum!) {\n        syncAllClasses(site: $site) {\n          id\n        }\n      }\n    '
): (typeof documents)['\n      mutation syncAllClasses($site: SiteEnum!) {\n        syncAllClasses(site: $site) {\n          id\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query Countries {\n        countries {\n          name\n          code\n        }\n      }\n    '
): (typeof documents)['\n      query Countries {\n        countries {\n          name\n          code\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query country($countryCode: String!) {\n        country(countryCode: $countryCode) {\n          name\n          code\n          states {\n            name\n            code\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query country($countryCode: String!) {\n        country(countryCode: $countryCode) {\n          name\n          code\n          states {\n            name\n            code\n          }\n        }\n      }\n    ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation registerUser($site: SiteEnum!, $input: RegisterUserInput!) {\n        registerIdentifiableUser(site: $site, input: $input) {\n          id\n        }\n      }\n    '
): (typeof documents)['\n      mutation registerUser($site: SiteEnum!, $input: RegisterUserInput!) {\n        registerIdentifiableUser(site: $site, input: $input) {\n          id\n        }\n      }\n    ']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
