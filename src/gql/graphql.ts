/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Format: Y-m-d */
  Date: any
  DateTime: any
  DateTimeWithoutTimeZone: any
}

export type AcceptLateCancelledSpotInClassInput = {
  waitlistEntryId: Scalars['ID']
}

export type AcceptLateCancelledSpotInClassResultUnion =
  | AcceptLateCancelledSpotInClassSuccess
  | ClassIsFullError
  | ClientIsAlreadyBookedError
  | ClientIsOutsideSchedulingWindowError
  | PaymentRequiredError
  | UnknownError

export type AcceptLateCancelledSpotInClassSuccess = {
  __typename: 'AcceptLateCancelledSpotInClassSuccess'
  success: Scalars['Boolean']
}

export type AddedToWaitlistSuccess = {
  __typename: 'AddedToWaitlistSuccess'
  status: Scalars['Boolean']
}

export type AdminUser = {
  __typename: 'AdminUser'
  email: Scalars['String']
  id: Scalars['ID']
  linkedInstructors?: Maybe<Array<Instructor>>
  linkedSites?: Maybe<Array<Site>>
  roles?: Maybe<Array<Scalars['String']>>
  username: Scalars['String']
}

export type AdminUserDataInput = {
  email?: InputMaybe<Scalars['String']>
  linkedInstructorIds?: InputMaybe<Array<Scalars['ID']>>
  linkedSiteCodes?: InputMaybe<Array<SiteEnum>>
  role: Scalars['String']
  username?: InputMaybe<Scalars['String']>
}

export type AdminUserResultUnion = AdminUser | EmailAlreadyUsedError | UsernameAlreadyUsedError

export type BookClassInput = {
  classId: Scalars['ID']
  isWaitlistBooking?: InputMaybe<Scalars['Boolean']>
  spotNumber?: InputMaybe<Scalars['Int']>
}

export type BookClassResultUnion =
  | AddedToWaitlistSuccess
  | BookClassSuccess
  | BookedButInOtherSpotError
  | BookingOverlapsAnotherOneError
  | ClassIsFullError
  | ClientIsAlreadyBookedError
  | ClientIsAlreadyOnWaitlistError
  | ClientIsOutsideSchedulingWindowError
  | PaymentRequiredError
  | SpotAlreadyReservedError
  | SpotIsDisabledError
  | UnknownError
  | WaitlistFullError

export type BookClassSuccess = {
  __typename: 'BookClassSuccess'
  status: Scalars['Boolean']
}

export type BookUserIntoClassInput = {
  classId: Scalars['ID']
  isPaymentRequired?: InputMaybe<Scalars['Boolean']>
  isWaitlistBooking?: InputMaybe<Scalars['Boolean']>
  siteUserId: Scalars['ID']
  spotNumber?: InputMaybe<Scalars['Int']>
}

export type BookableSpot = ClassPositionInterface & {
  __typename: 'BookableSpot'
  enabled?: Maybe<Scalars['Boolean']>
  icon: PositionIconEnum
  /** @deprecated isBooked should be moved somewhere else and spotNumber has been moved to the root. */
  spotInfo: SpotInfo
  spotNumber: Scalars['Int']
  x: Scalars['Int']
  y: Scalars['Int']
}

export type BookedButInOtherSpotError = Error & {
  __typename: 'BookedButInOtherSpotError'
  code: Scalars['String']
  givenSpot: Scalars['Int']
  requiredSpot: Scalars['Int']
}

export type BookingOverlapsAnotherOneError = Error & {
  __typename: 'BookingOverlapsAnotherOneError'
  code: Scalars['String']
}

export type BookingWindow = {
  __typename: 'BookingWindow'
  endDateTime: Scalars['DateTime']
  startDateTime: Scalars['DateTime']
}

export type CalendarClassesParams = {
  endDate?: InputMaybe<Scalars['Date']>
  startDate?: InputMaybe<Scalars['Date']>
}

export type CancelEnrollmentInput = {
  enrollmentId: Scalars['ID']
  lateCancel?: InputMaybe<Scalars['Boolean']>
}

export type CancelEnrollmentResultUnion =
  | CancelUserEnrollmentSuccess
  | LateCancellationRequiredError
  | UnknownError

export type CancelUserEnrollmentSuccess = {
  __typename: 'CancelUserEnrollmentSuccess'
  status?: Maybe<Scalars['Boolean']>
}

export type ChartPoint = {
  __typename: 'ChartPoint'
  power?: Maybe<Scalars['Int']>
  rpm?: Maybe<Scalars['Int']>
  time?: Maybe<Scalars['Int']>
}

export type CheckinResultUnion = CheckinSuccess | EnrollmentNotFoundError

export type CheckinSuccess = {
  __typename: 'CheckinSuccess'
  success: Scalars['Boolean']
}

export type CheckinUserInClass = {
  enrollmentId: Scalars['ID']
}

export type CheckoutResultUnion = CheckoutSuccess | EnrollmentNotFoundError

export type CheckoutSuccess = {
  __typename: 'CheckoutSuccess'
  success: Scalars['Boolean']
}

export type CheckoutUserInClass = {
  enrollmentId: Scalars['ID']
}

export type Class = {
  __typename: 'Class'
  bookingWindow: BookingWindow
  description: Scalars['String']
  duration: Scalars['Int']
  hasClassStats: Scalars['Boolean']
  id: Scalars['ID']
  instructorName: Scalars['String']
  isSubstitute: Scalars['Boolean']
  isSynchronizing: Scalars['Boolean']
  maxCapacity: Scalars['Int']
  name: Scalars['String']
  showAsDisabled: Scalars['Boolean']
  start: Scalars['DateTime']
  /** Same as start but without timezone. If start is 2023-11-04T10:15:00+04:00 then this value will be 2023-11-04T10:15:00 */
  startWithNoTimeZone: Scalars['DateTimeWithoutTimeZone']
  totalBooked: Scalars['Int']
  totalUnderMaintenanceSpots: Scalars['Int']
  waitListAvailable: Scalars['Boolean']
}

export type ClassInfo = {
  __typename: 'ClassInfo'
  class: Class
  enrollments: Array<EnrollmentInfoInterface>
  onHoldSpots: Scalars['Int']
  orphanedClassStatsSpots: Array<Scalars['Int']>
  roomLayout?: Maybe<RoomLayout>
  usedSpots?: Maybe<Array<Scalars['Int']>>
}

export type ClassInfoEnrollmentsArgs = {
  status?: InputMaybe<EnrollmentStatusEnum>
}

export type ClassIsFullError = Error & {
  __typename: 'ClassIsFullError'
  code: Scalars['String']
}

export type ClassPositionInterface = {
  icon: PositionIconEnum
  x: Scalars['Int']
  y: Scalars['Int']
}

export type ClassSchedule = {
  __typename: 'ClassSchedule'
  capacity: Scalars['Int']
  dayOfWeek: Scalars['String']
  end: Scalars['DateTime']
  endWithNoTimeZone: Scalars['DateTimeWithoutTimeZone']
  id: Scalars['ID']
  instructorName: Scalars['String']
  roomLayout?: Maybe<RoomLayout>
  start: Scalars['DateTime']
  startWithNoTimeZone: Scalars['DateTimeWithoutTimeZone']
  type: Scalars['String']
}

export type ClassStat = {
  __typename: 'ClassStat'
  /** Amount of chart points adjusted to the amount of the requested ones. Values for each points are the average of each interval */
  adjustedChartPoints: Array<ChartPoint>
  averagePower?: Maybe<Scalars['Float']>
  averageRpm?: Maybe<Scalars['Float']>
  calories?: Maybe<Scalars['Float']>
  chartPoints: Array<ChartPoint>
  distance?: Maybe<Scalars['Float']>
  distanceUnit?: Maybe<Scalars['String']>
  enrollment: Enrollment
  highPower?: Maybe<Scalars['Float']>
  highRpm?: Maybe<Scalars['Float']>
  totalEnergy?: Maybe<Scalars['Float']>
}

export type ClassStatAdjustedChartPointsArgs = {
  amountOfPoints?: InputMaybe<Scalars['Int']>
}

/** Error returned when a client is already booked in a class */
export type ClientIsAlreadyBookedError = Error & {
  __typename: 'ClientIsAlreadyBookedError'
  code: Scalars['String']
}

export type ClientIsAlreadyOnWaitlistError = Error & {
  __typename: 'ClientIsAlreadyOnWaitlistError'
  code: Scalars['String']
}

/** Error returned when a client tries to book a class which is not permitted to book any longer. The booking window has passed. */
export type ClientIsOutsideSchedulingWindowError = Error & {
  __typename: 'ClientIsOutsideSchedulingWindowError'
  code: Scalars['String']
}

export type Country = {
  __typename: 'Country'
  code: Scalars['String']
  name: Scalars['String']
  states?: Maybe<Array<Maybe<State>>>
}

export type CreateCurrentUserInSiteSuccess = {
  __typename: 'CreateCurrentUserInSiteSuccess'
  result: Scalars['Boolean']
}

export type CreateCurrentUserInSiteUnion = CreateCurrentUserInSiteSuccess | UserAlreadyExistsError

export type CurrentUserEnrollmentsParams = {
  endDate?: InputMaybe<Scalars['Date']>
  enrollmentType?: InputMaybe<EnrollmentTypeEnum>
  startDate?: InputMaybe<Scalars['Date']>
}

export type DeleteCurrentUserAccountSuccess = {
  __typename: 'DeleteCurrentUserAccountSuccess'
  success: Scalars['Boolean']
}

export type DeleteCurrentUserAccountUnion =
  | DeleteCurrentUserAccountSuccess
  | UserPasswordDoesNotMatchError

export type DeviceTokenInput = {
  deviceToken: Scalars['String']
}

export type DisableEnableSpotInput = {
  classId: Scalars['ID']
  spotNumber?: InputMaybe<Scalars['Int']>
}

export type DisableEnableSpotResult = {
  __typename: 'DisableEnableSpotResult'
  result?: Maybe<Scalars['Boolean']>
}

export type DisableEnableSpotResultUnion = DisableEnableSpotResult | SpotNotFoundError

export type EditClassInput = {
  classId: Scalars['ID']
  onHoldSpots?: InputMaybe<Scalars['Int']>
  roomLayoutId?: InputMaybe<Scalars['ID']>
}

export type EditClassResultUnion = EditClassSuccessResult

export type EditClassSuccessResult = {
  __typename: 'EditClassSuccessResult'
  /** Whether the class was updated or not */
  updated: Scalars['Boolean']
}

export type EditEnrollmentInput = {
  enrollmentId: Scalars['ID']
  newSpotNumber: Scalars['Int']
}

export type EditEnrollmentResultUnion =
  | ClientIsOutsideSchedulingWindowError
  | Enrollment
  | SpotAlreadyReservedError
  | TryToSwitchToSameSpotError

export type EditRoomLayoutInput = {
  roomLayoutId: Scalars['ID']
  roomLayoutInput: RoomLayoutInput
}

export type EditUserInput = {
  siteUserInput?: InputMaybe<Array<SiteUserInput>>
  userDataInput?: InputMaybe<UserInput>
  /** This is not the same ID as the IdentifiableUser. This is the ID of the user not linked to any site */
  userId: Scalars['ID']
}

export type EditUserResultUnion = IdentifiableUser | OtherUserHasThisExternalIdError

export type EmailAlreadyUsedError = Error & {
  __typename: 'EmailAlreadyUsedError'
  code: Scalars['String']
}

export type Enrollment = {
  __typename: 'Enrollment'
  class: Class
  enrollmentInfo: EnrollmentInfoInterface
}

export type EnrollmentInfo = EnrollmentInfoInterface & {
  __typename: 'EnrollmentInfo'
  enrollmentDateTime: Scalars['DateTime']
  enrollmentDateTimeWithNoTimeZone: Scalars['DateTimeWithoutTimeZone']
  enrollmentStatus: EnrollmentStatusEnum
  /**
   * Whether this enrollment has stats or not. If null, it means that the class that the enrollment belongs to
   * has not received stats yet. If the result is false, it means that the class has received stats but the enrollment
   * has not.
   */
  hasStats?: Maybe<Scalars['Boolean']>
  id: Scalars['ID']
  identifiableSiteUser?: Maybe<IdentifiableSiteUser>
  isBookedForFree: Scalars['Boolean']
  isCheckedIn: Scalars['Boolean']
  isFirstTimeInAClass: Scalars['Boolean']
  /** @deprecated Use spotNumber instead. */
  spotInfo?: Maybe<SpotInfo>
  spotNumber?: Maybe<Scalars['Int']>
}

export type EnrollmentInfoInterface = {
  enrollmentDateTime: Scalars['DateTime']
  enrollmentDateTimeWithNoTimeZone: Scalars['DateTimeWithoutTimeZone']
  enrollmentStatus: EnrollmentStatusEnum
  id: Scalars['ID']
  identifiableSiteUser?: Maybe<IdentifiableSiteUser>
}

export type EnrollmentNotFoundError = Error & {
  __typename: 'EnrollmentNotFoundError'
  code: Scalars['String']
}

export enum EnrollmentStatusEnum {
  Active = 'active',
  /** @deprecated It does not make sense to have a cancelled status for an enrollment. Use lateCancelled instead */
  Cancelled = 'cancelled',
  LateCancelled = 'lateCancelled',
  Unknown = 'unknown',
  Waitlisted = 'waitlisted'
}

export enum EnrollmentTypeEnum {
  Historical = 'historical',
  Upcoming = 'upcoming',
  Waitlist = 'waitlist'
}

export type Error = {
  code: Scalars['String']
}

export enum GenderEnum {
  /** Feminine */
  F = 'F',
  /** Masculine */
  M = 'M',
  /** Not defined */
  N = 'N'
}

export type GenderRanking = {
  __typename: 'GenderRanking'
  gender?: Maybe<GenderEnum>
  ranking?: Maybe<UserRanking>
}

export type GiftCard = {
  __typename: 'GiftCard'
  description: Scalars['String']
  grandTotal: Scalars['Float']
  id: Scalars['ID']
  purchaseUrl: Scalars['String']
  salePrice: Scalars['Float']
  site: Site
  terms: Scalars['String']
}

export type IconPosition = ClassPositionInterface & {
  __typename: 'IconPosition'
  icon: PositionIconEnum
  x: Scalars['Int']
  y: Scalars['Int']
}

export type IconPositionInput = {
  icon: PositionIconEnum
  spotNumber?: InputMaybe<Scalars['Int']>
  x: Scalars['Int']
  y: Scalars['Int']
}

export type IdentifiableSiteUser = {
  __typename: 'IdentifiableSiteUser'
  id?: Maybe<Scalars['ID']>
  identifiableUser?: Maybe<IdentifiableUser>
  siteUserInfo?: Maybe<SimpleSiteUser>
}

export type IdentifiableUser = {
  __typename: 'IdentifiableUser'
  id?: Maybe<Scalars['ID']>
  user?: Maybe<User>
}

export type Instructor = {
  __typename: 'Instructor'
  id: Scalars['ID']
  name: Scalars['String']
  site: Site
}

export type IsSmsValidationCodeValidUnion =
  | MobilePhoneAlreadyVerifiedError
  | RequestSmsValidationNeededError
  | SmsCodeValidatedSuccessfully
  | SmsValidationCodeError

export type LateCancellationRequiredError = Error & {
  __typename: 'LateCancellationRequiredError'
  code: Scalars['String']
}

export type MobilePhoneAlreadyVerifiedError = Error & {
  __typename: 'MobilePhoneAlreadyVerifiedError'
  code: Scalars['String']
}

export type MobilePhoneNotValidError = Error & {
  __typename: 'MobilePhoneNotValidError'
  code: Scalars['String']
}

export type Mutation = {
  __typename: 'Mutation'
  /** Accepts a late-cancelled spot in a class */
  acceptLateCancelledSpotInClass?: Maybe<AcceptLateCancelledSpotInClassResultUnion>
  /** Creates a new admin user */
  addAdminUser: AdminUserResultUnion
  /** Adds a new device token to be used for device notifications */
  addDeviceTokenToCurrentUser?: Maybe<Scalars['Boolean']>
  /** Books the current user in a class */
  bookClass: BookClassResultUnion
  /** Adds a user into a given class */
  bookUserIntoClass: BookClassResultUnion
  /** Cancels an enrollment done by the current user */
  cancelCurrentUserEnrollment?: Maybe<CancelEnrollmentResultUnion>
  /** Checks in a user in a class */
  checkinUserInClass?: Maybe<CheckinResultUnion>
  /** Checks out a user from a class */
  checkoutUserInClass?: Maybe<CheckoutResultUnion>
  /** Creates a copy of the current user in the given site */
  createCurrentUserInSite?: Maybe<CreateCurrentUserInSiteUnion>
  /** Creates a new room layout */
  createRoomLayout: RoomLayout
  /** It deletes the current user's account */
  deleteCurrentUserAccount?: Maybe<DeleteCurrentUserAccountUnion>
  /** Removes a devices token */
  deleteDeviceTokenToCurrentUser?: Maybe<Scalars['Boolean']>
  /** Disables a spot in a class */
  disableSpot?: Maybe<DisableEnableSpotResultUnion>
  /** Edits a class */
  editClass: EditClassResultUnion
  /** Edits an enrollment made by the current user */
  editCurrentUserEnrollment?: Maybe<EditEnrollmentResultUnion>
  /** Edits an enrollment */
  editEnrollment?: Maybe<EditEnrollmentResultUnion>
  /** Edits a room layout */
  editRoomLayout: RoomLayout
  /** Edits a user */
  editUser?: Maybe<EditUserResultUnion>
  /** Enabled a spot in a class */
  enableSpot?: Maybe<DisableEnableSpotResultUnion>
  /** Registers a new user and returns an IdentifiableUser type */
  registerIdentifiableUser?: Maybe<IdentifiableSiteUser>
  /** Registers a new user */
  registerUser?: Maybe<User>
  /** Rejects a late-cancelled spot in a class */
  rejectLateCancelledSpotInClass?: Maybe<RejectLateBookingResultUnion>
  /** Deletes an admin user */
  removeAdminUser: Scalars['Boolean']
  /** Removes the current user's waitlist entry from a class */
  removeCurrentUserFromWaitlist?: Maybe<RemoveCurrentUserFromWaitlistUnion>
  /** Removes a user from a class */
  removeUserFromClass: CancelEnrollmentResultUnion
  /** Removes a waitlist entry */
  removeUserFromWaitlist: RemoveUserFromWaitlistUnion
  /** Request a reset password link */
  requestPasswordLink?: Maybe<ResetPasswordLinkResultUnion>
  /** Requests an SMS validation code */
  requestSMSValidation?: Maybe<SmsValidationUnion>
  /** Resets the password of an admin user and sends an email with the new password */
  resetAdminUserPassword: Scalars['Boolean']
  /** Resets the current user's password */
  resetPasswordForCurrentUser?: Maybe<ResetPasswordForCurrentUserUnion>
  /** Sends a single class stats to an email */
  sendClassStatsToEmail?: Maybe<Scalars['Boolean']>
  /** Sends the class stats to the users booked in a class */
  sendClassStatsToUsers?: Maybe<Scalars['Boolean']>
  /** Sets a room layout for a list of class schedules */
  setRoomLayoutForClassSchedules: Array<ClassSchedule>
  /** Swaps a spot in a class */
  swapSpot?: Maybe<SwapSpotResultUnion>
  /** Sync all classes */
  syncAllClasses: Scalars['Boolean']
  /** Sync all gift cards from Mindbody with the local database */
  syncAllGiftCards: Scalars['Boolean']
  /** Sync one class */
  syncClass: ClassInfo
  /** Sync a class with PIQ */
  syncClassWithPIQ: ClassInfo
  /** Updates an admin user */
  updateAdminUser: AdminUserResultUnion
  /** Updates the current user */
  updateCurrentUser?: Maybe<User>
  /** Updates a user's password in all the sites */
  updateCurrentUserPassword?: Maybe<Scalars['Boolean']>
  /** Updates a gift card */
  updateGiftCard: GiftCard
  updateUserPassword?: Maybe<Scalars['Boolean']>
}

export type MutationAcceptLateCancelledSpotInClassArgs = {
  input: AcceptLateCancelledSpotInClassInput
  site?: InputMaybe<SiteEnum>
}

export type MutationAddAdminUserArgs = {
  input: AdminUserDataInput
}

export type MutationAddDeviceTokenToCurrentUserArgs = {
  input?: InputMaybe<DeviceTokenInput>
  site?: InputMaybe<SiteEnum>
}

export type MutationBookClassArgs = {
  input: BookClassInput
  site: SiteEnum
}

export type MutationBookUserIntoClassArgs = {
  input: BookUserIntoClassInput
}

export type MutationCancelCurrentUserEnrollmentArgs = {
  input: CancelEnrollmentInput
  site: SiteEnum
}

export type MutationCheckinUserInClassArgs = {
  input: CheckinUserInClass
  site: SiteEnum
}

export type MutationCheckoutUserInClassArgs = {
  input: CheckoutUserInClass
  site: SiteEnum
}

export type MutationCreateCurrentUserInSiteArgs = {
  fromSite: SiteEnum
  toSite: SiteEnum
}

export type MutationCreateRoomLayoutArgs = {
  input: RoomLayoutInput
  site: SiteEnum
}

export type MutationDeleteCurrentUserAccountArgs = {
  site: SiteEnum
  userPassword: Scalars['String']
}

export type MutationDeleteDeviceTokenToCurrentUserArgs = {
  input?: InputMaybe<DeviceTokenInput>
  site?: InputMaybe<SiteEnum>
}

export type MutationDisableSpotArgs = {
  input?: InputMaybe<DisableEnableSpotInput>
}

export type MutationEditClassArgs = {
  input: EditClassInput
}

export type MutationEditCurrentUserEnrollmentArgs = {
  input: EditEnrollmentInput
  site: SiteEnum
}

export type MutationEditEnrollmentArgs = {
  input: EditEnrollmentInput
  site: SiteEnum
}

export type MutationEditRoomLayoutArgs = {
  input: EditRoomLayoutInput
  site: SiteEnum
}

export type MutationEditUserArgs = {
  input: EditUserInput
}

export type MutationEnableSpotArgs = {
  input?: InputMaybe<DisableEnableSpotInput>
}

export type MutationRegisterIdentifiableUserArgs = {
  input: RegisterUserInput
  site: SiteEnum
}

export type MutationRegisterUserArgs = {
  input: RegisterUserInput
  site: SiteEnum
}

export type MutationRejectLateCancelledSpotInClassArgs = {
  input: RejectLateCancelledSpotInClassInput
  site?: InputMaybe<SiteEnum>
}

export type MutationRemoveAdminUserArgs = {
  id: Scalars['ID']
}

export type MutationRemoveCurrentUserFromWaitlistArgs = {
  input: RemoveCurrentUserFromWaitlistInput
  site: SiteEnum
}

export type MutationRemoveUserFromClassArgs = {
  input: CancelEnrollmentInput
}

export type MutationRemoveUserFromWaitlistArgs = {
  input: RemoveUserFromWaitlistInput
}

export type MutationRequestPasswordLinkArgs = {
  input?: InputMaybe<RequestPasswordLinkInput>
}

export type MutationRequestSmsValidationArgs = {
  input: RequestSmsValidationInput
}

export type MutationResetAdminUserPasswordArgs = {
  id: Scalars['ID']
}

export type MutationResetPasswordForCurrentUserArgs = {
  input?: InputMaybe<ResetPasswordForCurrentUserInput>
}

export type MutationSendClassStatsToEmailArgs = {
  input: SendClassStatsToEmailInput
}

export type MutationSendClassStatsToUsersArgs = {
  classId: Scalars['ID']
}

export type MutationSetRoomLayoutForClassSchedulesArgs = {
  input: SetRoomLayoutForClassSchedulesInput
}

export type MutationSwapSpotArgs = {
  input: EditEnrollmentInput
  site: SiteEnum
}

export type MutationSyncAllClassesArgs = {
  site: SiteEnum
}

export type MutationSyncClassArgs = {
  classId: Scalars['ID']
  site: SiteEnum
}

export type MutationSyncClassWithPiqArgs = {
  classId: Scalars['ID']
  site: SiteEnum
}

export type MutationUpdateAdminUserArgs = {
  input: UpdateAdminUserInput
}

export type MutationUpdateCurrentUserArgs = {
  input: UserInput
}

export type MutationUpdateCurrentUserPasswordArgs = {
  input: UpdateCurrentUserPasswordInput
  site: SiteEnum
}

export type MutationUpdateGiftCardArgs = {
  input: UpdateGiftCardInput
}

export type MutationUpdateUserPasswordArgs = {
  input: UpdateUserPasswordInput
}

export type OtherUserHasThisExternalIdError = Error & {
  __typename: 'OtherUserHasThisExternalIdError'
  code: Scalars['String']
  siteUser: IdentifiableSiteUser
}

export type PaginatedClassStats = PaginatedResult & {
  __typename: 'PaginatedClassStats'
  classStats: Array<ClassStat>
  total: Scalars['Int']
}

export type PaginatedEnrollments = PaginatedResult & {
  __typename: 'PaginatedEnrollments'
  enrollments: Array<Enrollment>
  total: Scalars['Int']
}

export type PaginatedPurchases = PaginatedResult & {
  __typename: 'PaginatedPurchases'
  purchases: Array<Purchase>
  total: Scalars['Int']
}

export type PaginatedResult = {
  total: Scalars['Int']
}

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']>
  page?: InputMaybe<Scalars['Int']>
}

export type PasswordsDontMatchError = Error & {
  __typename: 'PasswordsDontMatchError'
  code: Scalars['String']
}

/** Error returned when a client does not have enough credit or allowance to book a class */
export type PaymentRequiredError = Error & {
  __typename: 'PaymentRequiredError'
  code: Scalars['String']
}

export type PositionAlreadyTakenError = Error & {
  __typename: 'PositionAlreadyTakenError'
  code: Scalars['String']
}

export enum PositionIconEnum {
  Empty = 'empty',
  Fan = 'fan',
  Instructor = 'instructor',
  Speaker = 'speaker',
  Spot = 'spot',
  Tv = 'tv'
}

export type Purchase = {
  __typename: 'Purchase'
  activationDateTime: Scalars['DateTime']
  allowanceObtained: Scalars['Int']
  allowanceRemaining: Scalars['Int']
  /** Whether a package can be used or not */
  current: Scalars['Boolean']
  expirationDateTime: Scalars['DateTime']
  packageName: Scalars['String']
  paymentDateTime: Scalars['DateTime']
}

export type Query = {
  __typename: 'Query'
  /** Returns a single admin user */
  adminUser?: Maybe<AdminUser>
  /** Lists all the admin users */
  adminUsers: Array<AdminUser>
  /** Returns a list of all the available class types for a given site */
  availableClassTypes: Array<Scalars['String']>
  /** Returns a list of all the available instructors */
  availableInstructors: Array<Instructor>
  /** Returns a list of all the available sites */
  availableSites?: Maybe<Array<Site>>
  /** Get next classes */
  calendarClasses: Array<Class>
  /** Get a single class information */
  classInfo?: Maybe<ClassInfo>
  /** Returns a list of all the class schedules for a given site */
  classSchedules: Array<ClassSchedule>
  /** Returns the list of all available countries */
  countries?: Maybe<Array<Maybe<Country>>>
  /** Returns a specific country by a given country code */
  country?: Maybe<Country>
  /** Returns the current user by the given Authentication header */
  currentUser?: Maybe<User>
  /**
   * List of classes where the user is already enrolled
   * @deprecated Use currentUserEnrollmentsPaginated instead
   */
  currentUserEnrollments: Array<Enrollment>
  currentUserEnrollmentsPaginated: PaginatedEnrollments
  /** List of purchases made by the current */
  currentUserPurchases?: Maybe<Array<Maybe<Purchase>>>
  currentUserPurchasesPaginated: PaginatedPurchases
  /** Get current user's ranking on a specific class */
  currentUserRankingInClass: UserInClassRanking
  /** Get current user's workout stats for a specific enrollment */
  currentUserSingleWorkoutStat?: Maybe<ClassStat>
  /**
   * Get current user's workout stats
   * @deprecated Use currentUserWorkoutStatsPaginated instead
   */
  currentUserWorkoutStats: Array<Maybe<ClassStat>>
  currentUserWorkoutStatsPaginated: PaginatedClassStats
  /** Returns the list of all the available gift cards */
  giftCards: Array<GiftCard>
  /** Verifies whether an sms validation code is valid */
  isSMSValidationCodeValid?: Maybe<IsSmsValidationCodeValidUnion>
  /** Returns a specific room layout */
  roomLayout?: Maybe<RoomLayout>
  /** Returns a list of available RoomLayouts for a site */
  roomLayouts: Array<RoomLayout>
  /** Returns the matched users given the query provided */
  searchSiteUser?: Maybe<Array<Maybe<IdentifiableSiteUser>>>
  /** Returns a single workout stat */
  singleWorkoutStat?: Maybe<ClassStat>
  /** Settings of a site */
  siteSettings: SiteSetting
  /** Returns a user in a specific site */
  siteUser?: Maybe<IdentifiableSiteUser>
  /** Returns a user */
  user?: Maybe<IdentifiableUser>
  /** Returns the ranking of a user in a specific class */
  userRankingInClass?: Maybe<UserInClassRanking>
  /** Returns a list of workhout stats */
  userWorkoutStats: Array<Maybe<ClassStat>>
  userWorkoutStatsPaginated: PaginatedClassStats
}

export type QueryAdminUserArgs = {
  id: Scalars['ID']
}

export type QueryAvailableClassTypesArgs = {
  site?: InputMaybe<SiteEnum>
}

export type QueryCalendarClassesArgs = {
  params?: InputMaybe<CalendarClassesParams>
  site: SiteEnum
}

export type QueryClassInfoArgs = {
  id: Scalars['ID']
  site: SiteEnum
}

export type QueryClassSchedulesArgs = {
  site: SiteEnum
}

export type QueryCountryArgs = {
  countryCode: Scalars['String']
}

export type QueryCurrentUserEnrollmentsArgs = {
  params?: InputMaybe<CurrentUserEnrollmentsParams>
  site?: InputMaybe<SiteEnum>
}

export type QueryCurrentUserEnrollmentsPaginatedArgs = {
  pagination?: InputMaybe<PaginationInput>
  params?: InputMaybe<CurrentUserEnrollmentsParams>
  site?: InputMaybe<SiteEnum>
}

export type QueryCurrentUserPurchasesArgs = {
  site?: InputMaybe<SiteEnum>
}

export type QueryCurrentUserPurchasesPaginatedArgs = {
  pagination?: InputMaybe<PaginationInput>
  site?: InputMaybe<SiteEnum>
}

export type QueryCurrentUserRankingInClassArgs = {
  params?: InputMaybe<UserInRankingParams>
  site: SiteEnum
}

export type QueryCurrentUserSingleWorkoutStatArgs = {
  enrollmentId: Scalars['ID']
}

export type QueryCurrentUserWorkoutStatsArgs = {
  site: SiteEnum
}

export type QueryCurrentUserWorkoutStatsPaginatedArgs = {
  pagination?: InputMaybe<PaginationInput>
  site: SiteEnum
}

export type QueryIsSmsValidationCodeValidArgs = {
  smsCode: Scalars['String']
}

export type QueryRoomLayoutArgs = {
  id: Scalars['ID']
  site: SiteEnum
}

export type QueryRoomLayoutsArgs = {
  params?: InputMaybe<RoomLayoutsInput>
  site: SiteEnum
}

export type QuerySearchSiteUserArgs = {
  query?: InputMaybe<Scalars['String']>
  site?: InputMaybe<SiteEnum>
}

export type QuerySingleWorkoutStatArgs = {
  enrollmentId: Scalars['ID']
}

export type QuerySiteSettingsArgs = {
  site?: InputMaybe<SiteEnum>
}

export type QuerySiteUserArgs = {
  id: Scalars['ID']
}

export type QueryUserArgs = {
  id: Scalars['ID']
}

export type QueryUserRankingInClassArgs = {
  classId: Scalars['ID']
  userId: Scalars['ID']
}

export type QueryUserWorkoutStatsArgs = {
  site: SiteEnum
  userId: Scalars['ID']
}

export type QueryUserWorkoutStatsPaginatedArgs = {
  pagination?: InputMaybe<PaginationInput>
  site: SiteEnum
  userId: Scalars['ID']
}

export type RegisterUserInput = {
  address1?: InputMaybe<Scalars['String']>
  address2?: InputMaybe<Scalars['String']>
  birthdate: Scalars['Date']
  city?: InputMaybe<Scalars['String']>
  country: Scalars['String']
  email: Scalars['String']
  emergencyContactName: Scalars['String']
  emergencyContactPhone: Scalars['String']
  emergencyContactRelationship?: InputMaybe<Scalars['String']>
  firstName: Scalars['String']
  gender: GenderEnum
  lastName: Scalars['String']
  leaderboardUsername: Scalars['String']
  password: Scalars['String']
  phone: Scalars['String']
  state?: InputMaybe<Scalars['String']>
  weight?: InputMaybe<Scalars['Float']>
  zipCode: Scalars['String']
}

export type RejectLateBookingResultUnion =
  | PositionAlreadyTakenError
  | RejectLateCancelledSpotInClassSuccess

export type RejectLateCancelledSpotInClassInput = {
  waitlistEntryId: Scalars['ID']
}

export type RejectLateCancelledSpotInClassSuccess = {
  __typename: 'RejectLateCancelledSpotInClassSuccess'
  success: Scalars['Boolean']
}

export type RemoveCurrentUserFromWaitlistInput = {
  waitlistEntryId: Scalars['ID']
}

export type RemoveCurrentUserFromWaitlistUnion =
  | RemoveFromWaitlistResult
  | WaitlistEntryNotFoundError

export type RemoveFromWaitlistResult = {
  __typename: 'RemoveFromWaitlistResult'
  success: Scalars['Boolean']
}

export type RemoveUserFromWaitlistInput = {
  waitlistEntryId: Scalars['ID']
}

export type RemoveUserFromWaitlistUnion = RemoveFromWaitlistResult | WaitlistEntryNotFoundError

export type RequestPasswordLinkInput = {
  email: Scalars['String']
}

export type RequestSmsValidationInput = {
  countryCode: Scalars['String']
  mobilePhone: Scalars['String']
}

export type RequestSmsValidationNeededError = Error & {
  __typename: 'RequestSMSValidationNeededError'
  code: Scalars['String']
}

export type ResetPasswordForCurrentUserInput = {
  password: Scalars['String']
  repeatedPassword: Scalars['String']
}

export type ResetPasswordForCurrentUserUnion = PasswordsDontMatchError | ResetPasswordSuccess

export type ResetPasswordLinkResultUnion =
  | ResetPasswordLinkSentSuccessfully
  | TooManyResetPasswordLinkRequestsError

export type ResetPasswordLinkSentSuccessfully = {
  __typename: 'ResetPasswordLinkSentSuccessfully'
  status: Scalars['Boolean']
}

export type ResetPasswordSuccess = {
  __typename: 'ResetPasswordSuccess'
  status: Scalars['Boolean']
}

export type RoomLayout = {
  __typename: 'RoomLayout'
  capacity: Scalars['Int']
  columns: Scalars['Int']
  id: Scalars['ID']
  matrix?: Maybe<Array<ClassPositionInterface>>
  name: Scalars['String']
  rows: Scalars['Int']
}

export type RoomLayoutInput = {
  columns: Scalars['Int']
  matrix: Array<IconPositionInput>
  name: Scalars['String']
  rows: Scalars['Int']
}

export type RoomLayoutsInput = {
  /** Amount of usable spots in the class */
  usersCapacity?: InputMaybe<Scalars['Int']>
}

export type SmsCodeValidatedSuccessfully = {
  __typename: 'SMSCodeValidatedSuccessfully'
  success: Scalars['Boolean']
}

export type SmsValidationCodeError = Error & {
  __typename: 'SMSValidationCodeError'
  code: Scalars['String']
}

export type SmsValidationUnion =
  | MobilePhoneAlreadyVerifiedError
  | MobilePhoneNotValidError
  | SuccessfulRequestSmsValidation

export type SendClassStatsToEmailInput = {
  email: Scalars['String']
  enrollmentId: Scalars['ID']
}

export type SetRoomLayoutForClassSchedulesInput = {
  classSchedulesIds: Array<Scalars['ID']>
  roomLayoutId?: InputMaybe<Scalars['ID']>
}

export type SimpleSiteUser = {
  __typename: 'SimpleSiteUser'
  externalUserId: Scalars['ID']
  site: SiteEnum
}

export type Site = {
  __typename: 'Site'
  code: SiteEnum
  name: Scalars['String']
}

export enum SiteEnum {
  AbuDhabi = 'abu_dhabi',
  Dubai = 'dubai'
}

export type SiteSetting = {
  __typename: 'SiteSetting'
  isSynchronizingClasses: Scalars['Boolean']
  siteDateTimeNow?: Maybe<Scalars['DateTime']>
  siteTimezone?: Maybe<Scalars['String']>
}

export type SiteUserInput = {
  externalUserId: Scalars['ID']
  site: SiteEnum
}

/** Error returned when trying to book a class with a spot that is already booked */
export type SpotAlreadyReservedError = Error & {
  __typename: 'SpotAlreadyReservedError'
  code: Scalars['String']
}

export type SpotInfo = {
  __typename: 'SpotInfo'
  /** @deprecated Array of booked spots should be returned by other query to reduce complexity of creating SpotInfo instances. */
  isBooked: Scalars['Boolean']
  spotNumber: Scalars['Int']
}

export type SpotIsDisabledError = Error & {
  __typename: 'SpotIsDisabledError'
  code: Scalars['String']
}

export type SpotNotFoundError = Error & {
  __typename: 'SpotNotFoundError'
  code: Scalars['String']
}

export type State = {
  __typename: 'State'
  code: Scalars['String']
  name: Scalars['String']
}

export type SuccessfulRequestSmsValidation = {
  __typename: 'SuccessfulRequestSMSValidation'
  success: Scalars['Boolean']
}

export type SwapSpotResultUnion = SwapSpotSuccess | TryToSwitchToSameSpotError

export type SwapSpotSuccess = {
  __typename: 'SwapSpotSuccess'
  affectedEnrollment?: Maybe<EnrollmentInfoInterface>
  selectedEnrollment: EnrollmentInfoInterface
}

export type TooManyResetPasswordLinkRequestsError = Error & {
  __typename: 'TooManyResetPasswordLinkRequestsError'
  availableAgainAt?: Maybe<Scalars['DateTime']>
  code: Scalars['String']
}

export type TryToSwitchToSameSpotError = Error & {
  __typename: 'TryToSwitchToSameSpotError'
  code: Scalars['String']
}

export type UnknownError = Error & {
  __typename: 'UnknownError'
  code: Scalars['String']
}

export type UpdateAdminUserInput = {
  adminUserId: Scalars['ID']
  userDataInput: AdminUserDataInput
}

export type UpdateCurrentUserPasswordInput = {
  currentPassword: Scalars['String']
  newPassword: Scalars['String']
}

export type UpdateGiftCardInput = {
  grandTotal?: InputMaybe<Scalars['Float']>
  id: Scalars['ID']
}

export type UpdateUserPasswordInput = {
  newPassword: Scalars['String']
  userId: Scalars['ID']
}

export type User = {
  __typename: 'User'
  address1: Scalars['String']
  address2?: Maybe<Scalars['String']>
  birthdate?: Maybe<Scalars['Date']>
  city: Scalars['String']
  country?: Maybe<Country>
  doesExistInSite: Scalars['Boolean']
  email: Scalars['String']
  emergencyContactName: Scalars['String']
  emergencyContactPhone: Scalars['String']
  emergencyContactRelationship?: Maybe<Scalars['String']>
  enrollmentInClass?: Maybe<EnrollmentInfoInterface>
  /** @deprecated Use siteUsers instead */
  existsInSites: Array<SiteEnum>
  firstName: Scalars['String']
  gender?: Maybe<GenderEnum>
  hideMetrics?: Maybe<Scalars['Boolean']>
  lastName: Scalars['String']
  leaderboardUsername?: Maybe<Scalars['String']>
  phone: Scalars['String']
  siteUsers: Array<SimpleSiteUser>
  state?: Maybe<State>
  weight?: Maybe<Scalars['Float']>
  zipCode: Scalars['String']
}

export type UserDoesExistInSiteArgs = {
  site: SiteEnum
}

export type UserEnrollmentInClassArgs = {
  classId: Scalars['ID']
}

export type UserAlreadyExistsError = Error & {
  __typename: 'UserAlreadyExistsError'
  code: Scalars['String']
}

export type UserInClassRanking = {
  __typename: 'UserInClassRanking'
  genderRanking?: Maybe<GenderRanking>
  totalRanking?: Maybe<UserRanking>
}

export type UserInRankingParams = {
  classId?: InputMaybe<Scalars['ID']>
}

export type UserInput = {
  address1?: InputMaybe<Scalars['String']>
  address2?: InputMaybe<Scalars['String']>
  birthdate?: InputMaybe<Scalars['Date']>
  city?: InputMaybe<Scalars['String']>
  country?: InputMaybe<Scalars['String']>
  emergencyContactName?: InputMaybe<Scalars['String']>
  emergencyContactPhone?: InputMaybe<Scalars['String']>
  emergencyContactRelationship?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  gender?: InputMaybe<GenderEnum>
  hideMetrics?: InputMaybe<Scalars['Boolean']>
  lastName?: InputMaybe<Scalars['String']>
  leaderboardUsername?: InputMaybe<Scalars['String']>
  phone?: InputMaybe<Scalars['String']>
  state?: InputMaybe<Scalars['String']>
  weight?: InputMaybe<Scalars['Float']>
  zipCode?: InputMaybe<Scalars['String']>
}

export type UserPasswordDoesNotMatchError = Error & {
  __typename: 'UserPasswordDoesNotMatchError'
  code: Scalars['String']
}

export type UserRanking = {
  __typename: 'UserRanking'
  positionInRanking?: Maybe<Scalars['Int']>
  totalMembersInRanking?: Maybe<Scalars['Int']>
}

export type UsernameAlreadyUsedError = Error & {
  __typename: 'UsernameAlreadyUsedError'
  code: Scalars['String']
}

export type ValidateResetPasswordTokenInput = {
  token: Scalars['String']
}

export type WaitlistEntry = EnrollmentInfoInterface & {
  __typename: 'WaitlistEntry'
  canBeTurnedIntoEnrollment: Scalars['Boolean']
  enrollmentDateTime: Scalars['DateTime']
  enrollmentDateTimeWithNoTimeZone: Scalars['DateTimeWithoutTimeZone']
  enrollmentStatus: EnrollmentStatusEnum
  id: Scalars['ID']
  identifiableSiteUser?: Maybe<IdentifiableSiteUser>
}

export type WaitlistEntryNotFoundError = Error & {
  __typename: 'WaitlistEntryNotFoundError'
  code: Scalars['String']
}

export type WaitlistFullError = Error & {
  __typename: 'WaitlistFullError'
  code: Scalars['String']
}

export type SiteSettingsQueryVariables = Exact<{
  site: SiteEnum
}>

export type SiteSettingsQuery = {
  __typename: 'Query'
  siteSettings: { __typename: 'SiteSetting'; siteDateTimeNow?: any | null }
}

export type ClassInfoAdminQueryVariables = Exact<{
  site: SiteEnum
  id: Scalars['ID']
}>

export type ClassInfoAdminQuery = {
  __typename: 'Query'
  classInfo?: {
    __typename: 'ClassInfo'
    onHoldSpots: number
    orphanedClassStatsSpots: Array<number>
    class: {
      __typename: 'Class'
      id: string
      name: string
      description: string
      instructorName: string
      start: any
      startWithNoTimeZone: any
      duration: number
      waitListAvailable: boolean
      showAsDisabled: boolean
      maxCapacity: number
      isSubstitute: boolean
      hasClassStats: boolean
      isSynchronizing: boolean
    }
    roomLayout?: {
      __typename: 'RoomLayout'
      id: string
      name: string
      matrix?: Array<
        | {
            __typename: 'BookableSpot'
            enabled?: boolean | null
            spotNumber: number
            x: number
            y: number
            icon: PositionIconEnum
          }
        | { __typename: 'IconPosition'; x: number; y: number; icon: PositionIconEnum }
      > | null
    } | null
    enrollments: Array<
      | {
          __typename: 'EnrollmentInfo'
          isCheckedIn: boolean
          spotNumber?: number | null
          isBookedForFree: boolean
          hasStats?: boolean | null
          isFirstTimeInAClass: boolean
          id: string
          enrollmentStatus: EnrollmentStatusEnum
          enrollmentDateTime: any
          identifiableSiteUser?: {
            __typename: 'IdentifiableSiteUser'
            id?: string | null
            identifiableUser?: {
              __typename: 'IdentifiableUser'
              id?: string | null
              user?: {
                __typename: 'User'
                firstName: string
                lastName: string
                email: string
                leaderboardUsername?: string | null
              } | null
            } | null
          } | null
        }
      | {
          __typename: 'WaitlistEntry'
          id: string
          enrollmentStatus: EnrollmentStatusEnum
          enrollmentDateTime: any
          identifiableSiteUser?: {
            __typename: 'IdentifiableSiteUser'
            id?: string | null
            identifiableUser?: {
              __typename: 'IdentifiableUser'
              id?: string | null
              user?: {
                __typename: 'User'
                firstName: string
                lastName: string
                email: string
                leaderboardUsername?: string | null
              } | null
            } | null
          } | null
        }
    >
  } | null
}

export type DisableSpotMutationVariables = Exact<{
  input?: InputMaybe<DisableEnableSpotInput>
}>

export type DisableSpotMutation = {
  __typename: 'Mutation'
  disableSpot?:
    | { __typename: 'DisableEnableSpotResult'; result?: boolean | null }
    | { __typename: 'SpotNotFoundError'; code: string }
    | null
}

export type EnableSpotMutationVariables = Exact<{
  input?: InputMaybe<DisableEnableSpotInput>
}>

export type EnableSpotMutation = {
  __typename: 'Mutation'
  enableSpot?:
    | { __typename: 'DisableEnableSpotResult'; result?: boolean | null }
    | { __typename: 'SpotNotFoundError'; code: string }
    | null
}

export type SearchSiteUserQueryVariables = Exact<{
  site: SiteEnum
  query?: InputMaybe<Scalars['String']>
}>

export type SearchSiteUserQuery = {
  __typename: 'Query'
  searchSiteUser?: Array<{
    __typename: 'IdentifiableSiteUser'
    id?: string | null
    identifiableUser?: {
      __typename: 'IdentifiableUser'
      id?: string | null
      user?: { __typename: 'User'; firstName: string; lastName: string; email: string } | null
    } | null
  } | null> | null
}

export type BookUserIntoClassMutationVariables = Exact<{
  input: BookUserIntoClassInput
}>

export type BookUserIntoClassMutation = {
  __typename: 'Mutation'
  bookUserIntoClass:
    | { __typename: 'AddedToWaitlistSuccess' }
    | { __typename: 'BookClassSuccess' }
    | { __typename: 'BookedButInOtherSpotError' }
    | { __typename: 'BookingOverlapsAnotherOneError' }
    | { __typename: 'ClassIsFullError' }
    | { __typename: 'ClientIsAlreadyBookedError' }
    | { __typename: 'ClientIsAlreadyOnWaitlistError' }
    | { __typename: 'ClientIsOutsideSchedulingWindowError' }
    | { __typename: 'PaymentRequiredError' }
    | { __typename: 'SpotAlreadyReservedError' }
    | { __typename: 'SpotIsDisabledError' }
    | { __typename: 'UnknownError' }
    | { __typename: 'WaitlistFullError' }
}

export type RemoveUserFromClassMutationVariables = Exact<{
  input: CancelEnrollmentInput
}>

export type RemoveUserFromClassMutation = {
  __typename: 'Mutation'
  removeUserFromClass:
    | { __typename: 'CancelUserEnrollmentSuccess' }
    | { __typename: 'LateCancellationRequiredError' }
    | { __typename: 'UnknownError' }
}

export type EditClassMutationVariables = Exact<{
  input: EditClassInput
}>

export type EditClassMutation = {
  __typename: 'Mutation'
  editClass: { __typename: 'EditClassSuccessResult'; updated: boolean }
}

export type RoomLayoutsQueryVariables = Exact<{
  site: SiteEnum
  params?: InputMaybe<RoomLayoutsInput>
}>

export type RoomLayoutsQuery = {
  __typename: 'Query'
  roomLayouts: Array<{ __typename: 'RoomLayout'; id: string; name: string; capacity: number }>
}

export type RoomLayoutQueryVariables = Exact<{
  site: SiteEnum
  id: Scalars['ID']
}>

export type RoomLayoutQuery = {
  __typename: 'Query'
  roomLayout?: {
    __typename: 'RoomLayout'
    id: string
    name: string
    columns: number
    rows: number
    matrix?: Array<
      | {
          __typename: 'BookableSpot'
          spotNumber: number
          x: number
          y: number
          icon: PositionIconEnum
        }
      | { __typename: 'IconPosition'; x: number; y: number; icon: PositionIconEnum }
    > | null
  } | null
}

export type CreateRoomLayoutMutationVariables = Exact<{
  site: SiteEnum
  input: RoomLayoutInput
}>

export type CreateRoomLayoutMutation = {
  __typename: 'Mutation'
  createRoomLayout: { __typename: 'RoomLayout'; id: string }
}

export type EditRoomLayoutMutationVariables = Exact<{
  site: SiteEnum
  input: EditRoomLayoutInput
}>

export type EditRoomLayoutMutation = {
  __typename: 'Mutation'
  editRoomLayout: { __typename: 'RoomLayout'; id: string }
}

export type ClassWaitlistEntriesQueryVariables = Exact<{
  site: SiteEnum
  id: Scalars['ID']
}>

export type ClassWaitlistEntriesQuery = {
  __typename: 'Query'
  classInfo?: {
    __typename: 'ClassInfo'
    enrollments: Array<
      | {
          __typename: 'EnrollmentInfo'
          id: string
          enrollmentStatus: EnrollmentStatusEnum
          enrollmentDateTime: any
          identifiableSiteUser?: {
            __typename: 'IdentifiableSiteUser'
            id?: string | null
            identifiableUser?: {
              __typename: 'IdentifiableUser'
              id?: string | null
              user?: { __typename: 'User'; firstName: string; lastName: string } | null
            } | null
          } | null
        }
      | {
          __typename: 'WaitlistEntry'
          id: string
          enrollmentStatus: EnrollmentStatusEnum
          enrollmentDateTime: any
          identifiableSiteUser?: {
            __typename: 'IdentifiableSiteUser'
            id?: string | null
            identifiableUser?: {
              __typename: 'IdentifiableUser'
              id?: string | null
              user?: { __typename: 'User'; firstName: string; lastName: string } | null
            } | null
          } | null
        }
    >
  } | null
}

export type RemoveUserFromWaitlistMutationVariables = Exact<{
  input: RemoveUserFromWaitlistInput
}>

export type RemoveUserFromWaitlistMutation = {
  __typename: 'Mutation'
  removeUserFromWaitlist:
    | { __typename: 'RemoveFromWaitlistResult'; success: boolean }
    | { __typename: 'WaitlistEntryNotFoundError'; code: string }
}

export type CheckinUserInClassMutationVariables = Exact<{
  site: SiteEnum
  input: CheckinUserInClass
}>

export type CheckinUserInClassMutation = {
  __typename: 'Mutation'
  checkinUserInClass?:
    | { __typename: 'CheckinSuccess'; success: boolean }
    | { __typename: 'EnrollmentNotFoundError'; code: string }
    | null
}

export type CheckoutUserInClassMutationVariables = Exact<{
  site: SiteEnum
  input: CheckoutUserInClass
}>

export type CheckoutUserInClassMutation = {
  __typename: 'Mutation'
  checkoutUserInClass?:
    | { __typename: 'CheckoutSuccess'; success: boolean }
    | { __typename: 'EnrollmentNotFoundError'; code: string }
    | null
}

export type EditEnrollmentMutationVariables = Exact<{
  site: SiteEnum
  input: EditEnrollmentInput
}>

export type EditEnrollmentMutation = {
  __typename: 'Mutation'
  editEnrollment?:
    | { __typename: 'ClientIsOutsideSchedulingWindowError'; code: string }
    | { __typename: 'Enrollment' }
    | { __typename: 'SpotAlreadyReservedError'; code: string }
    | { __typename: 'TryToSwitchToSameSpotError'; code: string }
    | null
}

export type SwapSpotMutationVariables = Exact<{
  site: SiteEnum
  input: EditEnrollmentInput
}>

export type SwapSpotMutation = {
  __typename: 'Mutation'
  swapSpot?:
    | { __typename: 'SwapSpotSuccess' }
    | { __typename: 'TryToSwitchToSameSpotError'; code: string }
    | null
}

export type GetCalendarClassesForListQueryVariables = Exact<{
  site: SiteEnum
  params?: InputMaybe<CalendarClassesParams>
}>

export type GetCalendarClassesForListQuery = {
  __typename: 'Query'
  calendarClasses: Array<{
    __typename: 'Class'
    id: string
    name: string
    startWithNoTimeZone: any
    maxCapacity: number
    totalBooked: number
    totalUnderMaintenanceSpots: number
    showAsDisabled: boolean
    instructorName: string
  }>
}

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetUserQuery = {
  __typename: 'Query'
  user?: {
    __typename: 'IdentifiableUser'
    id?: string | null
    user?: {
      __typename: 'User'
      firstName: string
      lastName: string
      email: string
      leaderboardUsername?: string | null
      weight?: number | null
      gender?: GenderEnum | null
      birthdate?: any | null
      city: string
      address1: string
      address2?: string | null
      zipCode: string
      phone: string
      emergencyContactName: string
      emergencyContactPhone: string
      emergencyContactRelationship?: string | null
      hideMetrics?: boolean | null
      existsInSites: Array<SiteEnum>
      country?: { __typename: 'Country'; code: string; name: string } | null
      state?: { __typename: 'State'; code: string; name: string } | null
      siteUsers: Array<{ __typename: 'SimpleSiteUser'; externalUserId: string; site: SiteEnum }>
    } | null
  } | null
}

export type ClassWaitlistIsEnabledQueryVariables = Exact<{
  site: SiteEnum
  id: Scalars['ID']
}>

export type ClassWaitlistIsEnabledQuery = {
  __typename: 'Query'
  classInfo?: {
    __typename: 'ClassInfo'
    class: { __typename: 'Class'; waitListAvailable: boolean }
  } | null
}

export type SyncClassMutationVariables = Exact<{
  site: SiteEnum
  classId: Scalars['ID']
}>

export type SyncClassMutation = {
  __typename: 'Mutation'
  syncClass: { __typename: 'ClassInfo'; class: { __typename: 'Class'; isSynchronizing: boolean } }
}

export type SyncAllClassesMutationVariables = Exact<{
  site: SiteEnum
}>

export type SyncAllClassesMutation = { __typename: 'Mutation'; syncAllClasses: boolean }

export type CountriesQueryVariables = Exact<{ [key: string]: never }>

export type CountriesQuery = {
  __typename: 'Query'
  countries?: Array<{ __typename: 'Country'; name: string; code: string } | null> | null
}

export type CountryQueryVariables = Exact<{
  countryCode: Scalars['String']
}>

export type CountryQuery = {
  __typename: 'Query'
  country?: {
    __typename: 'Country'
    name: string
    code: string
    states?: Array<{ __typename: 'State'; name: string; code: string } | null> | null
  } | null
}

export type RegisterUserMutationVariables = Exact<{
  site: SiteEnum
  input: RegisterUserInput
}>

export type RegisterUserMutation = {
  __typename: 'Mutation'
  registerIdentifiableUser?: {
    __typename: 'IdentifiableSiteUser'
    identifiableUser?: { __typename: 'IdentifiableUser'; id?: string | null } | null
  } | null
}

export type EditUserMutationVariables = Exact<{
  input: EditUserInput
}>

export type EditUserMutation = {
  __typename: 'Mutation'
  editUser?:
    | {
        __typename: 'IdentifiableUser'
        id?: string | null
        user?: { __typename: 'User'; email: string } | null
      }
    | { __typename: 'OtherUserHasThisExternalIdError' }
    | null
}

export type RequestPasswordLinkMutationVariables = Exact<{
  input?: InputMaybe<RequestPasswordLinkInput>
}>

export type RequestPasswordLinkMutation = {
  __typename: 'Mutation'
  requestPasswordLink?:
    | { __typename: 'ResetPasswordLinkSentSuccessfully'; status: boolean }
    | { __typename: 'TooManyResetPasswordLinkRequestsError'; availableAgainAt?: any | null }
    | null
}

export type GetUserSitesQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetUserSitesQuery = {
  __typename: 'Query'
  user?: {
    __typename: 'IdentifiableUser'
    id?: string | null
    user?: {
      __typename: 'User'
      siteUsers: Array<{ __typename: 'SimpleSiteUser'; externalUserId: string; site: SiteEnum }>
    } | null
  } | null
}

export type EditUserSitesMutationVariables = Exact<{
  input: EditUserInput
}>

export type EditUserSitesMutation = {
  __typename: 'Mutation'
  editUser?:
    | {
        __typename: 'IdentifiableUser'
        id?: string | null
        user?: { __typename: 'User'; email: string } | null
      }
    | {
        __typename: 'OtherUserHasThisExternalIdError'
        siteUser: {
          __typename: 'IdentifiableSiteUser'
          siteUserInfo?: {
            __typename: 'SimpleSiteUser'
            externalUserId: string
            site: SiteEnum
          } | null
          identifiableUser?: {
            __typename: 'IdentifiableUser'
            user?: { __typename: 'User'; email: string } | null
          } | null
        }
      }
    | null
}

export type ClassSchedulesQueryVariables = Exact<{
  site: SiteEnum
}>

export type ClassSchedulesQuery = {
  __typename: 'Query'
  classSchedules: Array<{
    __typename: 'ClassSchedule'
    id: string
    instructorName: string
    dayOfWeek: string
    startWithNoTimeZone: any
    endWithNoTimeZone: any
    type: string
    capacity: number
    roomLayout?: { __typename: 'RoomLayout'; id: string; name: string } | null
  }>
}

export type AvailableClassTypesQueryVariables = Exact<{
  site: SiteEnum
}>

export type AvailableClassTypesQuery = { __typename: 'Query'; availableClassTypes: Array<string> }

export type SetRoomLayoutForClassSchedulesMutationVariables = Exact<{
  input: SetRoomLayoutForClassSchedulesInput
}>

export type SetRoomLayoutForClassSchedulesMutation = {
  __typename: 'Mutation'
  setRoomLayoutForClassSchedules: Array<{
    __typename: 'ClassSchedule'
    id: string
    instructorName: string
    dayOfWeek: string
    start: any
    end: any
    type: string
    capacity: number
    roomLayout?: { __typename: 'RoomLayout'; id: string; name: string; capacity: number } | null
  }>
}

export type UserWorkoutStatsQueryVariables = Exact<{
  site: SiteEnum
  userId: Scalars['ID']
}>

export type UserWorkoutStatsQuery = {
  __typename: 'Query'
  userWorkoutStats: Array<{
    __typename: 'ClassStat'
    totalEnergy?: number | null
    enrollment: {
      __typename: 'Enrollment'
      enrollmentInfo:
        | { __typename: 'EnrollmentInfo'; spotNumber?: number | null; id: string }
        | { __typename: 'WaitlistEntry'; id: string }
      class: { __typename: 'Class'; id: string; name: string; start: any; duration: number }
    }
  } | null>
}

export type SingleWorkoutStatQueryVariables = Exact<{
  enrollmentId: Scalars['ID']
}>

export type SingleWorkoutStatQuery = {
  __typename: 'Query'
  singleWorkoutStat?: {
    __typename: 'ClassStat'
    averagePower?: number | null
    highPower?: number | null
    averageRpm?: number | null
    highRpm?: number | null
    totalEnergy?: number | null
    calories?: number | null
    distance?: number | null
    enrollment: {
      __typename: 'Enrollment'
      enrollmentInfo:
        | { __typename: 'EnrollmentInfo'; spotNumber?: number | null; id: string }
        | { __typename: 'WaitlistEntry'; id: string }
      class: {
        __typename: 'Class'
        id: string
        name: string
        start: any
        duration: number
        instructorName: string
      }
    }
    adjustedChartPoints: Array<{
      __typename: 'ChartPoint'
      time?: number | null
      rpm?: number | null
      power?: number | null
    }>
  } | null
}

export type UserRankingInClassQueryVariables = Exact<{
  userId: Scalars['ID']
  classId: Scalars['ID']
}>

export type UserRankingInClassQuery = {
  __typename: 'Query'
  userRankingInClass?: {
    __typename: 'UserInClassRanking'
    totalRanking?: {
      __typename: 'UserRanking'
      positionInRanking?: number | null
      totalMembersInRanking?: number | null
    } | null
    genderRanking?: {
      __typename: 'GenderRanking'
      gender?: GenderEnum | null
      ranking?: {
        __typename: 'UserRanking'
        positionInRanking?: number | null
        totalMembersInRanking?: number | null
      } | null
    } | null
  } | null
}

export type SendClassStatsToUsersMutationVariables = Exact<{
  classId: Scalars['ID']
}>

export type SendClassStatsToUsersMutation = {
  __typename: 'Mutation'
  sendClassStatsToUsers?: boolean | null
}

export type SendClassStatsToEmailMutationVariables = Exact<{
  input: SendClassStatsToEmailInput
}>

export type SendClassStatsToEmailMutation = {
  __typename: 'Mutation'
  sendClassStatsToEmail?: boolean | null
}

export type UserWorkoutStatsPaginatedQueryVariables = Exact<{
  site: SiteEnum
  userId: Scalars['ID']
  pagination?: InputMaybe<PaginationInput>
}>

export type UserWorkoutStatsPaginatedQuery = {
  __typename: 'Query'
  userWorkoutStatsPaginated: {
    __typename: 'PaginatedClassStats'
    total: number
    classStats: Array<{
      __typename: 'ClassStat'
      totalEnergy?: number | null
      enrollment: {
        __typename: 'Enrollment'
        enrollmentInfo:
          | { __typename: 'EnrollmentInfo'; spotNumber?: number | null; id: string }
          | { __typename: 'WaitlistEntry'; id: string }
        class: {
          __typename: 'Class'
          id: string
          name: string
          start: any
          duration: number
          startWithNoTimeZone: any
          instructorName: string
        }
      }
    }>
  }
}

export type SyncClassWithPiqMutationVariables = Exact<{
  site: SiteEnum
  classId: Scalars['ID']
}>

export type SyncClassWithPiqMutation = {
  __typename: 'Mutation'
  syncClassWithPIQ: {
    __typename: 'ClassInfo'
    class: { __typename: 'Class'; isSynchronizing: boolean }
  }
}

export type CheckIfClassIsSynchronizedQueryVariables = Exact<{
  site: SiteEnum
  id: Scalars['ID']
}>

export type CheckIfClassIsSynchronizedQuery = {
  __typename: 'Query'
  classInfo?: {
    __typename: 'ClassInfo'
    class: { __typename: 'Class'; isSynchronizing: boolean }
  } | null
}

export type CheckIfAllClassAreSynchronizedQueryVariables = Exact<{
  site: SiteEnum
}>

export type CheckIfAllClassAreSynchronizedQuery = {
  __typename: 'Query'
  siteSettings: { __typename: 'SiteSetting'; isSynchronizingClasses: boolean }
}

export type UpdateUserPasswordMutationVariables = Exact<{
  input: UpdateUserPasswordInput
}>

export type UpdateUserPasswordMutation = {
  __typename: 'Mutation'
  updateUserPassword?: boolean | null
}

export type GiftCardsQueryVariables = Exact<{ [key: string]: never }>

export type GiftCardsQuery = {
  __typename: 'Query'
  giftCards: Array<{
    __typename: 'GiftCard'
    id: string
    description: string
    salePrice: number
    grandTotal: number
    terms: string
    purchaseUrl: string
    site: { __typename: 'Site'; name: string; code: SiteEnum }
  }>
}

export type UpdateGiftCardMutationVariables = Exact<{
  input: UpdateGiftCardInput
}>

export type UpdateGiftCardMutation = {
  __typename: 'Mutation'
  updateGiftCard: {
    __typename: 'GiftCard'
    id: string
    description: string
    salePrice: number
    grandTotal: number
    terms: string
    purchaseUrl: string
    site: { __typename: 'Site'; name: string; code: SiteEnum }
  }
}

export type SyncAllGiftCardsMutationVariables = Exact<{ [key: string]: never }>

export type SyncAllGiftCardsMutation = { __typename: 'Mutation'; syncAllGiftCards: boolean }

export type AvailableSitesQueryVariables = Exact<{ [key: string]: never }>

export type AvailableSitesQuery = {
  __typename: 'Query'
  availableSites?: Array<{ __typename: 'Site'; name: string; code: SiteEnum }> | null
}

export type AdminUserQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type AdminUserQuery = {
  __typename: 'Query'
  adminUser?: {
    __typename: 'AdminUser'
    id: string
    username: string
    email: string
    roles?: Array<string> | null
    linkedInstructors?: Array<{
      __typename: 'Instructor'
      id: string
      name: string
      site: { __typename: 'Site'; code: SiteEnum; name: string }
    }> | null
    linkedSites?: Array<{ __typename: 'Site'; name: string; code: SiteEnum }> | null
  } | null
}

export type AdminUsersQueryVariables = Exact<{ [key: string]: never }>

export type AdminUsersQuery = {
  __typename: 'Query'
  adminUsers: Array<{
    __typename: 'AdminUser'
    id: string
    username: string
    email: string
    roles?: Array<string> | null
    linkedInstructors?: Array<{
      __typename: 'Instructor'
      id: string
      name: string
      site: { __typename: 'Site'; name: string; code: SiteEnum }
    }> | null
    linkedSites?: Array<{ __typename: 'Site'; name: string; code: SiteEnum }> | null
  }>
}

export type AvailableInstructorsQueryVariables = Exact<{ [key: string]: never }>

export type AvailableInstructorsQuery = {
  __typename: 'Query'
  availableInstructors: Array<{
    __typename: 'Instructor'
    id: string
    name: string
    site: { __typename: 'Site'; name: string; code: SiteEnum }
  }>
}

export type ResetAdminUserPasswordMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type ResetAdminUserPasswordMutation = {
  __typename: 'Mutation'
  resetAdminUserPassword: boolean
}

export type UpdateAdminUserMutationVariables = Exact<{
  input: UpdateAdminUserInput
}>

export type UpdateAdminUserMutation = {
  __typename: 'Mutation'
  updateAdminUser:
    | {
        __typename: 'AdminUser'
        id: string
        username: string
        email: string
        roles?: Array<string> | null
        linkedInstructors?: Array<{
          __typename: 'Instructor'
          id: string
          name: string
          site: { __typename: 'Site'; name: string; code: SiteEnum }
        }> | null
        linkedSites?: Array<{ __typename: 'Site'; name: string; code: SiteEnum }> | null
      }
    | { __typename: 'EmailAlreadyUsedError'; code: string }
    | { __typename: 'UsernameAlreadyUsedError'; code: string }
}

export const SiteSettingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'siteSettings' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'siteSettings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'siteDateTimeNow' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SiteSettingsQuery, SiteSettingsQueryVariables>
export const ClassInfoAdminDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'classInfoAdmin' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'classInfo' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'class' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'instructorName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'start' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startWithNoTimeZone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'waitListAvailable' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'showAsDisabled' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'maxCapacity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isSubstitute' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasClassStats' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isSynchronizing' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'roomLayout' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'matrix' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'x' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'y' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'icon' } },
                            {
                              kind: 'InlineFragment',
                              typeCondition: {
                                kind: 'NamedType',
                                name: { kind: 'Name', value: 'BookableSpot' }
                              },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'enabled' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'spotNumber' } }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'enrollments' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'status' },
                      value: { kind: 'EnumValue', value: 'active' }
                    }
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'enrollmentStatus' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'enrollmentDateTime' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'identifiableSiteUser' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'identifiableUser' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'user' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'firstName' }
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'lastName' }
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'leaderboardUsername' }
                                        }
                                      ]
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'EnrollmentInfo' }
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'isCheckedIn' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'spotNumber' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'isBookedForFree' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'hasStats' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'isFirstTimeInAClass' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'onHoldSpots' } },
                { kind: 'Field', name: { kind: 'Name', value: 'orphanedClassStatsSpots' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<ClassInfoAdminQuery, ClassInfoAdminQueryVariables>
export const DisableSpotDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'disableSpot' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DisableEnableSpotInput' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'disableSpot' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'DisableEnableSpotResult' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'result' } }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'SpotNotFoundError' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<DisableSpotMutation, DisableSpotMutationVariables>
export const EnableSpotDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'enableSpot' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DisableEnableSpotInput' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'enableSpot' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'DisableEnableSpotResult' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'result' } }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'SpotNotFoundError' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<EnableSpotMutation, EnableSpotMutationVariables>
export const SearchSiteUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'searchSiteUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'query' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'searchSiteUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'query' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'query' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'identifiableUser' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SearchSiteUserQuery, SearchSiteUserQueryVariables>
export const BookUserIntoClassDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'bookUserIntoClass' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'BookUserIntoClassInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'bookUserIntoClass' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: '__typename' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<BookUserIntoClassMutation, BookUserIntoClassMutationVariables>
export const RemoveUserFromClassDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'removeUserFromClass' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CancelEnrollmentInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removeUserFromClass' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: '__typename' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RemoveUserFromClassMutation, RemoveUserFromClassMutationVariables>
export const EditClassDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'editClass' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'EditClassInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'editClass' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EditClassSuccessResult' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updated' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<EditClassMutation, EditClassMutationVariables>
export const RoomLayoutsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'roomLayouts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'params' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'RoomLayoutsInput' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roomLayouts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'params' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'params' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'capacity' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RoomLayoutsQuery, RoomLayoutsQueryVariables>
export const RoomLayoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'roomLayout' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roomLayout' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'columns' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rows' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'matrix' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'x' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'y' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'icon' } },
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'BookableSpot' }
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'spotNumber' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RoomLayoutQuery, RoomLayoutQueryVariables>
export const CreateRoomLayoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createRoomLayout' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RoomLayoutInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createRoomLayout' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CreateRoomLayoutMutation, CreateRoomLayoutMutationVariables>
export const EditRoomLayoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'editRoomLayout' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'EditRoomLayoutInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'editRoomLayout' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<EditRoomLayoutMutation, EditRoomLayoutMutationVariables>
export const ClassWaitlistEntriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'classWaitlistEntries' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'classInfo' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'enrollments' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'status' },
                      value: { kind: 'EnumValue', value: 'waitlisted' }
                    }
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'enrollmentStatus' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'enrollmentDateTime' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'identifiableSiteUser' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'identifiableUser' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'user' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'firstName' }
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'lastName' } }
                                      ]
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<ClassWaitlistEntriesQuery, ClassWaitlistEntriesQueryVariables>
export const RemoveUserFromWaitlistDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'removeUserFromWaitlist' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RemoveUserFromWaitlistInput' }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removeUserFromWaitlist' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'RemoveFromWaitlistResult' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'success' } }]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'WaitlistEntryNotFoundError' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'code' } }]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  RemoveUserFromWaitlistMutation,
  RemoveUserFromWaitlistMutationVariables
>
export const CheckinUserInClassDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'checkinUserInClass' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CheckinUserInClass' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'checkinUserInClass' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CheckinSuccess' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'success' } }]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EnrollmentNotFoundError' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'code' } }]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CheckinUserInClassMutation, CheckinUserInClassMutationVariables>
export const CheckoutUserInClassDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'checkoutUserInClass' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CheckoutUserInClass' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'checkoutUserInClass' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'CheckoutSuccess' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'success' } }]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EnrollmentNotFoundError' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'code' } }]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CheckoutUserInClassMutation, CheckoutUserInClassMutationVariables>
export const EditEnrollmentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'editEnrollment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'EditEnrollmentInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'editEnrollment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Enrollment' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: '__typename' } }]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'SpotAlreadyReservedError' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'code' } }]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'TryToSwitchToSameSpotError' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'code' } }]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ClientIsOutsideSchedulingWindowError' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'code' } }]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<EditEnrollmentMutation, EditEnrollmentMutationVariables>
export const SwapSpotDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'swapSpot' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'EditEnrollmentInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'swapSpot' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'SwapSpotSuccess' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: '__typename' } }]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'TryToSwitchToSameSpotError' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SwapSpotMutation, SwapSpotMutationVariables>
export const GetCalendarClassesForListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getCalendarClassesForList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'params' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'CalendarClassesParams' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'calendarClasses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'params' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'params' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startWithNoTimeZone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'maxCapacity' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalBooked' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalUnderMaintenanceSpots' } },
                { kind: 'Field', name: { kind: 'Name', value: 'showAsDisabled' } },
                { kind: 'Field', name: { kind: 'Name', value: 'instructorName' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetCalendarClassesForListQuery,
  GetCalendarClassesForListQueryVariables
>
export const GetUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'leaderboardUsername' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'gender' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'birthdate' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'state' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                          ]
                        }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'zipCode' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emergencyContactName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emergencyContactPhone' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'emergencyContactRelationship' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'hideMetrics' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'existsInSites' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'siteUsers' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'externalUserId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'site' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>
export const ClassWaitlistIsEnabledDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'classWaitlistIsEnabled' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'classInfo' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'class' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'waitListAvailable' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<ClassWaitlistIsEnabledQuery, ClassWaitlistIsEnabledQueryVariables>
export const SyncClassDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'syncClass' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'classId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'syncClass' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'classId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'classId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'class' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'isSynchronizing' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SyncClassMutation, SyncClassMutationVariables>
export const SyncAllClassesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'syncAllClasses' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'syncAllClasses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SyncAllClassesMutation, SyncAllClassesMutationVariables>
export const CountriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Countries' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'code' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CountriesQuery, CountriesQueryVariables>
export const CountryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'country' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'countryCode' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'country' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'countryCode' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'countryCode' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'states' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<CountryQuery, CountryQueryVariables>
export const RegisterUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'registerUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RegisterUserInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registerIdentifiableUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'identifiableUser' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>
export const EditUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'editUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'EditUserInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'editUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'IdentifiableUser' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<EditUserMutation, EditUserMutationVariables>
export const RequestPasswordLinkDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'requestPasswordLink' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'RequestPasswordLinkInput' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'requestPasswordLink' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'TooManyResetPasswordLinkRequestsError' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'availableAgainAt' } }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ResetPasswordLinkSentSuccessfully' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'status' } }]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<RequestPasswordLinkMutation, RequestPasswordLinkMutationVariables>
export const GetUserSitesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getUserSites' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'siteUsers' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'externalUserId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'site' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetUserSitesQuery, GetUserSitesQueryVariables>
export const EditUserSitesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'editUserSites' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'EditUserInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'editUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'IdentifiableUser' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'OtherUserHasThisExternalIdError' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'siteUser' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'siteUserInfo' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'externalUserId' }
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'site' } }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'identifiableUser' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'user' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'email' } }
                                      ]
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<EditUserSitesMutation, EditUserSitesMutationVariables>
export const ClassSchedulesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'classSchedules' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'classSchedules' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'instructorName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'dayOfWeek' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startWithNoTimeZone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endWithNoTimeZone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'roomLayout' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<ClassSchedulesQuery, ClassSchedulesQueryVariables>
export const AvailableClassTypesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'availableClassTypes' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'availableClassTypes' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AvailableClassTypesQuery, AvailableClassTypesQueryVariables>
export const SetRoomLayoutForClassSchedulesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'setRoomLayoutForClassSchedules' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'SetRoomLayoutForClassSchedulesInput' }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'setRoomLayoutForClassSchedules' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'instructorName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'dayOfWeek' } },
                { kind: 'Field', name: { kind: 'Name', value: 'start' } },
                { kind: 'Field', name: { kind: 'Name', value: 'end' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'roomLayout' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'capacity' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'capacity' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  SetRoomLayoutForClassSchedulesMutation,
  SetRoomLayoutForClassSchedulesMutationVariables
>
export const UserWorkoutStatsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'userWorkoutStats' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userWorkoutStats' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'enrollment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'enrollmentInfo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            {
                              kind: 'InlineFragment',
                              typeCondition: {
                                kind: 'NamedType',
                                name: { kind: 'Name', value: 'EnrollmentInfo' }
                              },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'spotNumber' } }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'class' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'start' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'duration' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalEnergy' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UserWorkoutStatsQuery, UserWorkoutStatsQueryVariables>
export const SingleWorkoutStatDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'singleWorkoutStat' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'enrollmentId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'singleWorkoutStat' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'enrollmentId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'enrollmentId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'enrollment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'enrollmentInfo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            {
                              kind: 'InlineFragment',
                              typeCondition: {
                                kind: 'NamedType',
                                name: { kind: 'Name', value: 'EnrollmentInfo' }
                              },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'spotNumber' } }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'class' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'start' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'instructorName' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'averagePower' } },
                { kind: 'Field', name: { kind: 'Name', value: 'highPower' } },
                { kind: 'Field', name: { kind: 'Name', value: 'averageRpm' } },
                { kind: 'Field', name: { kind: 'Name', value: 'highRpm' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalEnergy' } },
                { kind: 'Field', name: { kind: 'Name', value: 'calories' } },
                { kind: 'Field', name: { kind: 'Name', value: 'distance' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'adjustedChartPoints' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'amountOfPoints' },
                      value: { kind: 'IntValue', value: '62' }
                    }
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'time' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'rpm' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'power' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SingleWorkoutStatQuery, SingleWorkoutStatQueryVariables>
export const UserRankingInClassDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'userRankingInClass' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'classId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userRankingInClass' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'classId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'classId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalRanking' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'positionInRanking' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'totalMembersInRanking' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'genderRanking' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'gender' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ranking' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'positionInRanking' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'totalMembersInRanking' }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UserRankingInClassQuery, UserRankingInClassQueryVariables>
export const SendClassStatsToUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'sendClassStatsToUsers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'classId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sendClassStatsToUsers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'classId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'classId' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SendClassStatsToUsersMutation, SendClassStatsToUsersMutationVariables>
export const SendClassStatsToEmailDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'sendClassStatsToEmail' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SendClassStatsToEmailInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sendClassStatsToEmail' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SendClassStatsToEmailMutation, SendClassStatsToEmailMutationVariables>
export const UserWorkoutStatsPaginatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'userWorkoutStatsPaginated' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationInput' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userWorkoutStatsPaginated' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pagination' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'classStats' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'enrollment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'enrollmentInfo' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  {
                                    kind: 'InlineFragment',
                                    typeCondition: {
                                      kind: 'NamedType',
                                      name: { kind: 'Name', value: 'EnrollmentInfo' }
                                    },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'spotNumber' }
                                        }
                                      ]
                                    }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'class' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'start' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'startWithNoTimeZone' }
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'instructorName' } }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'totalEnergy' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  UserWorkoutStatsPaginatedQuery,
  UserWorkoutStatsPaginatedQueryVariables
>
export const SyncClassWithPiqDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'syncClassWithPIQ' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'classId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'syncClassWithPIQ' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'classId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'classId' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'class' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'isSynchronizing' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SyncClassWithPiqMutation, SyncClassWithPiqMutationVariables>
export const CheckIfClassIsSynchronizedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'checkIfClassIsSynchronized' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'classInfo' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'class' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'isSynchronizing' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  CheckIfClassIsSynchronizedQuery,
  CheckIfClassIsSynchronizedQueryVariables
>
export const CheckIfAllClassAreSynchronizedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'checkIfAllClassAreSynchronized' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteEnum' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'siteSettings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'isSynchronizingClasses' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  CheckIfAllClassAreSynchronizedQuery,
  CheckIfAllClassAreSynchronizedQueryVariables
>
export const UpdateUserPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateUserPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateUserPasswordInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUserPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>
export const GiftCardsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GiftCards' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'giftCards' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'salePrice' } },
                { kind: 'Field', name: { kind: 'Name', value: 'grandTotal' } },
                { kind: 'Field', name: { kind: 'Name', value: 'terms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'purchaseUrl' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'site' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GiftCardsQuery, GiftCardsQueryVariables>
export const UpdateGiftCardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateGiftCard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateGiftCardInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateGiftCard' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'salePrice' } },
                { kind: 'Field', name: { kind: 'Name', value: 'grandTotal' } },
                { kind: 'Field', name: { kind: 'Name', value: 'terms' } },
                { kind: 'Field', name: { kind: 'Name', value: 'purchaseUrl' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'site' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateGiftCardMutation, UpdateGiftCardMutationVariables>
export const SyncAllGiftCardsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SyncAllGiftCards' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'syncAllGiftCards' } }]
      }
    }
  ]
} as unknown as DocumentNode<SyncAllGiftCardsMutation, SyncAllGiftCardsMutationVariables>
export const AvailableSitesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'availableSites' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'availableSites' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'code' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AvailableSitesQuery, AvailableSitesQueryVariables>
export const AdminUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'adminUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'roles' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'linkedInstructors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'site' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'linkedSites' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminUserQuery, AdminUserQueryVariables>
export const AdminUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'adminUsers' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminUsers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'roles' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'linkedInstructors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'site' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'linkedSites' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AdminUsersQuery, AdminUsersQueryVariables>
export const AvailableInstructorsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'availableInstructors' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'availableInstructors' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'site' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<AvailableInstructorsQuery, AvailableInstructorsQueryVariables>
export const ResetAdminUserPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'resetAdminUserPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resetAdminUserPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  ResetAdminUserPasswordMutation,
  ResetAdminUserPasswordMutationVariables
>
export const UpdateAdminUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateAdminUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateAdminUserInput' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateAdminUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AdminUser' } },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'roles' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'linkedInstructors' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'site' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'code' } }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'linkedSites' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'EmailAlreadyUsedError' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'code' } }]
                  }
                },
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'UsernameAlreadyUsedError' }
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'code' } }]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UpdateAdminUserMutation, UpdateAdminUserMutationVariables>
