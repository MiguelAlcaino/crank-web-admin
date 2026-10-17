/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Format: Y-m-d */
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  DateTimeWithoutTimeZone: { input: any; output: any; }
  /** A file uploaded as a part of a GraphQL multipart request (https://github.com/jaydenseric/graphql-multipart-request-spec). Input only. */
  File: { input: any; output: any; }
};

export type AcceptLateCancelledSpotInClassInput = {
  waitlistEntryId: Scalars['ID']['input'];
};

export type AcceptLateCancelledSpotInClassResultUnion = AcceptLateCancelledSpotInClassSuccess | ClassIsFullError | ClientIsAlreadyBookedError | ClientIsOutsideSchedulingWindowError | PaymentRequiredError | UnknownError;

export type AcceptLateCancelledSpotInClassSuccess = {
  __typename: 'AcceptLateCancelledSpotInClassSuccess';
  success: Scalars['Boolean']['output'];
};

export type AddedToWaitlistSuccess = {
  __typename: 'AddedToWaitlistSuccess';
  status: Scalars['Boolean']['output'];
};

export type AdminCustomerVodPeriod = {
  __typename: 'AdminCustomerVodPeriod';
  /** How the period was granted: admin, a purchase, or unknown for periods older than the record. */
  addedBy: Scalars['String']['output'];
  /** The admin who granted it, when an admin did. */
  addedByAdmin?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  end: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  start: Scalars['DateTime']['output'];
};

export type AdminCustomersParams = {
  /** Registered until the end of this day. */
  registrationEndDate?: InputMaybe<Scalars['Date']['input']>;
  /** Registered from this day. Without registrationEndDate, until now. */
  registrationStartDate?: InputMaybe<Scalars['Date']['input']>;
  /** Matches the customer's full name, phone number or email. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** With a VOD period overlapping until the end of this day. Only read together with vodStartDate. */
  vodEndDate?: InputMaybe<Scalars['Date']['input']>;
  /** With a VOD period overlapping this day onwards. Without vodEndDate, until now. */
  vodStartDate?: InputMaybe<Scalars['Date']['input']>;
};

/** A generated admin file, downloadable through a short-lived link. */
export type AdminExport = {
  __typename: 'AdminExport';
  expiresAt: Scalars['DateTime']['output'];
  fileName: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type AdminMindbodyClient = {
  __typename: 'AdminMindbodyClient';
  clientId?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  mobilePhone?: Maybe<Scalars['String']['output']>;
};

export type AdminMindbodyClientsParams = {
  endDate?: InputMaybe<Scalars['Date']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

/** A package as the admin edits it: the raw fields of the local product, unlike ClassPackageProduct, which is the storefront's view of it. */
export type AdminProduct = {
  __typename: 'AdminProduct';
  category: ProductDisplayCategory;
  customTitle?: Maybe<Scalars['String']['output']>;
  /** Position within the category, lowest first. updateProductsOrder numbers from 1; a package never ordered has 0. */
  displayOrder: Scalars['Int']['output'];
  doesItRequireSmsVerification: Scalars['Boolean']['output'];
  errorMessageWhenTryingToPurchase?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isClassPassPackage: Scalars['Boolean']['output'];
  isMembership: Scalars['Boolean']['output'];
  isTrialPackage: Scalars['Boolean']['output'];
  isVisible: Scalars['Boolean']['output'];
  /** Mindbody service id, stored as product.merchant_id. */
  mindbodyId: Scalars['String']['output'];
  /** Whether buying the package grants VOD access. */
  muviEnabled: Scalars['Boolean']['output'];
  /** Days of VOD access the package grants. Null when muviEnabled is false. */
  muviNumberOfDays?: Maybe<Scalars['Int']['output']>;
  /** Name as Mindbody has it. customTitle replaces it on the storefront when set. */
  name: Scalars['String']['output'];
  popupDescriptionAfterClickOnBuy?: Maybe<Scalars['String']['output']>;
  popupTitleAfterClickOnBuy?: Maybe<Scalars['String']['output']>;
  /** Price as Mindbody has it. */
  price: Scalars['Float']['output'];
  subtitle?: Maybe<Scalars['String']['output']>;
  textPayButton?: Maybe<Scalars['String']['output']>;
};

export type AdminProductList = {
  __typename: 'AdminProductList';
  products: Array<AdminProduct>;
};

export type AdminUser = {
  __typename: 'AdminUser';
  email: Scalars['String']['output'];
  favoriteSite: Site;
  id: Scalars['ID']['output'];
  linkedInstructors?: Maybe<Array<Instructor>>;
  linkedSites?: Maybe<Array<Site>>;
  roles?: Maybe<Array<Scalars['String']['output']>>;
  showCancelledClasses: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

export type AdminUserDataInput = {
  email: Scalars['String']['input'];
  favoriteSite?: InputMaybe<SiteEnum>;
  linkedInstructorIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  linkedSiteCodes?: InputMaybe<Array<SiteEnum>>;
  role: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type AdminUserResultUnion = AdminUser | EmailAlreadyUsedError | UsernameAlreadyUsedError;

export type BookClassInput = {
  classId: Scalars['ID']['input'];
  isWaitlistBooking?: InputMaybe<Scalars['Boolean']['input']>;
  spotNumber?: InputMaybe<Scalars['Int']['input']>;
};

export type BookClassResultUnion = AddedToWaitlistSuccess | BookClassSuccess | BookedButInOtherSpotError | BookingOverlapsAnotherOneError | ClassIsFullError | ClientIsAlreadyBookedError | ClientIsAlreadyOnWaitlistError | ClientIsOutsideSchedulingWindowError | PaymentRequiredError | SpotAlreadyReservedError | SpotIsDisabledError | UnknownError | WaitlistFullError;

export type BookClassSuccess = {
  __typename: 'BookClassSuccess';
  status: Scalars['Boolean']['output'];
};

export type BookUserIntoClassInput = {
  classId: Scalars['ID']['input'];
  isPaymentRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isWaitlistBooking?: InputMaybe<Scalars['Boolean']['input']>;
  siteUserId: Scalars['ID']['input'];
  spotNumber?: InputMaybe<Scalars['Int']['input']>;
};

export type BookableSpot = ClassPositionInterface & {
  __typename: 'BookableSpot';
  enabled?: Maybe<Scalars['Boolean']['output']>;
  icon: PositionIconEnum;
  /** @deprecated isBooked should be moved somewhere else and spotNumber has been moved to the root. */
  spotInfo: SpotInfo;
  spotNumber: Scalars['Int']['output'];
  x: Scalars['Int']['output'];
  y: Scalars['Int']['output'];
};

export type BookedButInOtherSpotError = Error & {
  __typename: 'BookedButInOtherSpotError';
  code: Scalars['String']['output'];
  givenSpot: Scalars['Int']['output'];
  requiredSpot: Scalars['Int']['output'];
};

export type BookingOverlapsAnotherOneError = Error & {
  __typename: 'BookingOverlapsAnotherOneError';
  code: Scalars['String']['output'];
};

/**
 * Defines the time window during which a class can be booked or cancelled.
 *
 * Users cannot book or cancel outside this window. The window typically opens several days
 * before the class and closes a few hours before the class starts.
 */
export type BookingWindow = {
  __typename: 'BookingWindow';
  /** The latest date and time when booking is allowed for this class */
  endDateTime: Scalars['DateTime']['output'];
  /** The earliest date and time when booking becomes available for this class */
  startDateTime: Scalars['DateTime']['output'];
};

export type BulkActivateVodInput = {
  mindbodyIds: Array<Scalars['Int']['input']>;
  /** At least 1. */
  vodDays: Scalars['Int']['input'];
};

export type BulkVodResult = {
  __typename: 'BulkVodResult';
  /** How many customers the Mindbody ids matched, and so how many the operation reached. */
  processedCount: Scalars['Int']['output'];
};

/**
 * Filters for querying classes within a specific date range.
 *
 * If no dates are provided, returns classes starting from the current date and time.
 */
export type CalendarClassesParams = {
  /** End date for the class search range (format: YYYY-MM-DD). If omitted, it defaults to +1 week from now. */
  endDate?: InputMaybe<Scalars['Date']['input']>;
  /** Start date for the class search range (format: YYYY-MM-DD). If omitted, defaults to current date. If provided and end date should also be provided. */
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type CancelEnrollmentInput = {
  enrollmentId: Scalars['ID']['input'];
  lateCancel?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CancelEnrollmentResultUnion = CancelUserEnrollmentSuccess | LateCancellationRequiredError | UnknownError;

export type CancelUserEnrollmentSuccess = {
  __typename: 'CancelUserEnrollmentSuccess';
  status?: Maybe<Scalars['Boolean']['output']>;
};

export type ChallengeDisplay = {
  __typename: 'ChallengeDisplay';
  firstLine?: Maybe<Scalars['String']['output']>;
  secondLine?: Maybe<Scalars['String']['output']>;
  thirdLine?: Maybe<Scalars['String']['output']>;
};

export type ChallengeInterface = {
  challengeDisplay: ChallengeDisplay;
  id: Scalars['ID']['output'];
};

export type ChargeableProduct = {
  __typename: 'ChargeableProduct';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** Before VAT. The charge-client form shows it with 5% VAT added. */
  price: Scalars['Float']['output'];
  site: Site;
};

export type ChartPoint = {
  __typename: 'ChartPoint';
  power?: Maybe<Scalars['Int']['output']>;
  rpm?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
};

export type CheckinResultUnion = CheckinSuccess | EnrollmentNotFoundError;

export type CheckinSuccess = {
  __typename: 'CheckinSuccess';
  success: Scalars['Boolean']['output'];
};

export type CheckinUserInClass = {
  enrollmentId: Scalars['ID']['input'];
};

export type CheckoutResultUnion = CheckoutSuccess | EnrollmentNotFoundError;

export type CheckoutSuccess = {
  __typename: 'CheckoutSuccess';
  success: Scalars['Boolean']['output'];
};

export type CheckoutUserInClass = {
  enrollmentId: Scalars['ID']['input'];
};

/**
 * Represents a fitness class session with booking and scheduling information.
 *
 * Contains all details needed to display and book a class, including instructor information,
 * timing, capacity, and booking rules.
 */
export type Class = {
  __typename: 'Class';
  /** Time window during which users can book or cancel this class */
  bookingWindow: BookingWindow;
  /** Detailed description of the class */
  description: Scalars['String']['output'];
  /** Duration of the class in minutes */
  duration: Scalars['Int']['output'];
  /** Whether performance statistics are available for this class */
  hasClassStats: Scalars['Boolean']['output'];
  /** Unique identifier for the class */
  id: Scalars['ID']['output'];
  /** Full name of the instructor leading the class */
  instructorName: Scalars['String']['output'];
  /** Whether this class has a substitute instructor (different from the regularly scheduled instructor) */
  isSubstitute: Scalars['Boolean']['output'];
  /** Whether this class is currently being synchronized with external systems */
  isSynchronizing: Scalars['Boolean']['output'];
  /** Maximum number of participants that can book this class */
  maxCapacity: Scalars['Int']['output'];
  /** Name/type of the class (e.g., 'CRANK', 'RIDE', 'POWER') */
  name: Scalars['String']['output'];
  /** Whether this class should be displayed as disabled in the UI (typically for cancelled or past classes) */
  showAsDisabled: Scalars['Boolean']['output'];
  /** Class start date and time with timezone (ISO 8601 format) */
  start: Scalars['DateTime']['output'];
  /** Same as start but without timezone. If start is 2023-11-04T10:15:00+04:00 then this value will be 2023-11-04T10:15:00 */
  startWithNoTimeZone: Scalars['DateTimeWithoutTimeZone']['output'];
  /** Current number of participants booked in this class */
  totalBooked: Scalars['Int']['output'];
  /** Number of spots marked as under maintenance or disabled */
  totalUnderMaintenanceSpots: Scalars['Int']['output'];
  /** Whether the waitlist is available for this class when it's full */
  waitListAvailable: Scalars['Boolean']['output'];
};

export type ClassInfo = {
  __typename: 'ClassInfo';
  class: Class;
  enrollments: Array<EnrollmentInfoInterface>;
  onHoldSpots: Scalars['Int']['output'];
  orphanedClassStatsSpots: Array<Scalars['Int']['output']>;
  roomLayout?: Maybe<RoomLayout>;
  usedSpots?: Maybe<Array<Scalars['Int']['output']>>;
};


export type ClassInfoEnrollmentsArgs = {
  status?: InputMaybe<EnrollmentStatusEnum>;
};

export type ClassIsFullError = Error & {
  __typename: 'ClassIsFullError';
  code: Scalars['String']['output'];
};

export type ClassPackageProduct = SellableProductInterface & {
  __typename: 'ClassPackageProduct';
  alertBeforePurchasing?: Maybe<ProductAlertBeforePurchasing>;
  buttonText?: Maybe<Scalars['String']['output']>;
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isVisible: Scalars['Boolean']['output'];
  price: Scalars['Float']['output'];
  subtitle: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type?: Maybe<ClassPackageTypeEnum>;
};

export enum ClassPackageTypeEnum {
  Membership = 'membership',
  Regular = 'regular',
  Special = 'special',
  Trial = 'trial',
  Vod = 'vod'
}

export type ClassPositionInterface = {
  icon: PositionIconEnum;
  x: Scalars['Int']['output'];
  y: Scalars['Int']['output'];
};

export type ClassSchedule = {
  __typename: 'ClassSchedule';
  capacity: Scalars['Int']['output'];
  dayOfWeek: Scalars['String']['output'];
  end: Scalars['DateTime']['output'];
  endWithNoTimeZone: Scalars['DateTimeWithoutTimeZone']['output'];
  id: Scalars['ID']['output'];
  instructorName: Scalars['String']['output'];
  roomLayout?: Maybe<RoomLayout>;
  start: Scalars['DateTime']['output'];
  startWithNoTimeZone: Scalars['DateTimeWithoutTimeZone']['output'];
  type: Scalars['String']['output'];
};

export type ClassStat = {
  __typename: 'ClassStat';
  /** Amount of chart points adjusted to the amount of the requested ones. Values for each points are the average of each interval */
  adjustedChartPoints: Array<ChartPoint>;
  averagePower?: Maybe<Scalars['Float']['output']>;
  averageRpm?: Maybe<Scalars['Float']['output']>;
  calories?: Maybe<Scalars['Float']['output']>;
  chartPoints: Array<ChartPoint>;
  distance?: Maybe<Scalars['Float']['output']>;
  distanceUnit?: Maybe<Scalars['String']['output']>;
  enrollment: Enrollment;
  highPower?: Maybe<Scalars['Float']['output']>;
  highRpm?: Maybe<Scalars['Float']['output']>;
  totalEnergy?: Maybe<Scalars['Float']['output']>;
};


export type ClassStatAdjustedChartPointsArgs = {
  amountOfPoints?: InputMaybe<Scalars['Int']['input']>;
};

/** Error returned when a client is already booked in a class */
export type ClientIsAlreadyBookedError = Error & {
  __typename: 'ClientIsAlreadyBookedError';
  code: Scalars['String']['output'];
};

export type ClientIsAlreadyOnWaitlistError = Error & {
  __typename: 'ClientIsAlreadyOnWaitlistError';
  code: Scalars['String']['output'];
};

/** Error returned when a client tries to book a class which is not permitted to book any longer. The booking window has passed. */
export type ClientIsOutsideSchedulingWindowError = Error & {
  __typename: 'ClientIsOutsideSchedulingWindowError';
  code: Scalars['String']['output'];
};

export type Country = {
  __typename: 'Country';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  states?: Maybe<Array<Maybe<State>>>;
};

export type CountryWithPhoneCode = {
  __typename: 'CountryWithPhoneCode';
  formattedPhoneCode: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phoneCode: Scalars['String']['output'];
};

export type CreateCurrentUserInSiteSuccess = {
  __typename: 'CreateCurrentUserInSiteSuccess';
  result: Scalars['Boolean']['output'];
};

export type CreateCurrentUserInSiteUnion = CreateCurrentUserInSiteSuccess | UserAlreadyExistsError;

export type CreateCustomTransactionRequestInput = {
  customerId: Scalars['ID']['input'];
  emailBody: Scalars['String']['input'];
  /** A ChargeableProduct id. */
  productId: Scalars['ID']['input'];
};

export type CreateCustomTransactionRequestResultUnion = CustomTransactionRequestSent | CustomerNotFoundError | ProductNotFoundError;

export type CreateCustomerVodPeriodInput = {
  /** Has to be after start. */
  end: Scalars['DateTime']['input'];
  start: Scalars['DateTime']['input'];
};

export type CreateMobileNumberBlacklistInput = {
  countryId: Scalars['ID']['input'];
  mobilePhoneNumber: Scalars['String']['input'];
};

export type CreatePaymentLinkInput = {
  amount: Scalars['Int']['input'];
  currency: Scalars['String']['input'];
  /** After a successful purchase an email will be sent to this email address with details about the payment (meant to be used by admins) */
  notificationEmailAddress: Scalars['String']['input'];
  site: SiteEnum;
  title: Scalars['String']['input'];
};

export type CurrentUserEnrollmentsParams = {
  endDate?: InputMaybe<Scalars['Date']['input']>;
  enrollmentType?: InputMaybe<EnrollmentTypeEnum>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type CustomTransactionRequestSent = {
  __typename: 'CustomTransactionRequestSent';
  /** The purchase link the email carries. */
  paymentUrl: Scalars['String']['output'];
  recipientEmail: Scalars['String']['output'];
};

/** A gift card a customer bought. The admin issues its code by hand once it is paid. */
export type CustomerGiftCard = {
  __typename: 'CustomerGiftCard';
  createdAt: Scalars['DateTime']['output'];
  /** The customer who bought it. The code and the PDF are emailed to them. */
  customer: IdentifiableUser;
  giftCard: GiftCard;
  /** Null until an admin issues it. */
  giftCardCode?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  recipientEmail?: Maybe<Scalars['String']['output']>;
  recipientName?: Maybe<Scalars['String']['output']>;
  senderName?: Maybe<Scalars['String']['output']>;
  status: CustomerGiftCardStatusEnum;
  /** Every status the order went through, oldest first. */
  statusHistory: Array<CustomerGiftCardStatusChange>;
};

export type CustomerGiftCardNotFoundError = Error & {
  __typename: 'CustomerGiftCardNotFoundError';
  code: Scalars['String']['output'];
};

export type CustomerGiftCardStatusChange = {
  __typename: 'CustomerGiftCardStatusChange';
  createdAt: Scalars['DateTime']['output'];
  status: CustomerGiftCardStatusEnum;
};

export enum CustomerGiftCardStatusEnum {
  Completed = 'completed',
  EmailSentToRecipient = 'emailSentToRecipient',
  EmailSentToSender = 'emailSentToSender',
  GiftCardCodeGranted = 'giftCardCodeGranted',
  Paid = 'paid',
  Submitted = 'submitted',
  Uncompleted = 'uncompleted'
}

export type CustomerNotFoundError = Error & {
  __typename: 'CustomerNotFoundError';
  code: Scalars['String']['output'];
};

export type DeleteCurrentUserAccountSuccess = {
  __typename: 'DeleteCurrentUserAccountSuccess';
  success: Scalars['Boolean']['output'];
};

export type DeleteCurrentUserAccountUnion = DeleteCurrentUserAccountSuccess | UserPasswordDoesNotMatchError;

export type DeleteRoomLayoutResultUnion = DeleteRoomLayoutSuccess | RoomLayoutInUseError;

export type DeleteRoomLayoutSuccess = {
  __typename: 'DeleteRoomLayoutSuccess';
  success: Scalars['Boolean']['output'];
};

export type DeviceTokenInput = {
  deviceToken: Scalars['String']['input'];
};

export type DisableEnableSpotInput = {
  classId: Scalars['ID']['input'];
  spotNumber?: InputMaybe<Scalars['Int']['input']>;
};

export type DisableEnableSpotResult = {
  __typename: 'DisableEnableSpotResult';
  result?: Maybe<Scalars['Boolean']['output']>;
};

export type DisableEnableSpotResultUnion = DisableEnableSpotResult | SpotNotFoundError;

export type DistanceChallenge = ChallengeInterface & {
  __typename: 'DistanceChallenge';
  challengeDisplay: ChallengeDisplay;
  goalInKM: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  ranking?: Maybe<DistanceRanking>;
};

export type DistanceChallengeRankingPosition = {
  __typename: 'DistanceChallengeRankingPosition';
  totalKm: Scalars['Float']['output'];
  userPositionInRanking: UserPositionInRanking;
};

export type DistanceRanking = {
  __typename: 'DistanceRanking';
  amountOfUsersInRanking: Scalars['Int']['output'];
  rankingPositions: Array<DistanceChallengeRankingPosition>;
};

export type EditClassInput = {
  classId: Scalars['ID']['input'];
  onHoldSpots?: InputMaybe<Scalars['Int']['input']>;
  roomLayoutId?: InputMaybe<Scalars['ID']['input']>;
};

export type EditClassResultUnion = EditClassSuccessResult;

export type EditClassSuccessResult = {
  __typename: 'EditClassSuccessResult';
  /** Whether the class was updated or not */
  updated: Scalars['Boolean']['output'];
};

export type EditEnrollmentInput = {
  enrollmentId: Scalars['ID']['input'];
  newSpotNumber: Scalars['Int']['input'];
};

export type EditEnrollmentResultUnion = ClientIsOutsideSchedulingWindowError | Enrollment | SpotAlreadyReservedError | TryToSwitchToSameSpotError;

export type EditRoomLayoutInput = {
  roomLayoutId: Scalars['ID']['input'];
  roomLayoutInput: RoomLayoutInput;
};

export type EditUserInput = {
  siteUserInput?: InputMaybe<Array<SiteUserInput>>;
  userDataInput?: InputMaybe<UserInput>;
  /** This is not the same ID as the IdentifiableUser. This is the ID of the user not linked to any site */
  userId: Scalars['ID']['input'];
};

export type EditUserResultUnion = IdentifiableUser | OtherUserHasThisExternalIdError;

export type EmailAlreadyUsedError = Error & {
  __typename: 'EmailAlreadyUsedError';
  code: Scalars['String']['output'];
};

export type Enrollment = {
  __typename: 'Enrollment';
  class: Class;
  enrollmentInfo: EnrollmentInfoInterface;
};

export type EnrollmentInfo = EnrollmentInfoInterface & {
  __typename: 'EnrollmentInfo';
  /** Returns true if the user was booked via ClassPass */
  bookedViaClassPass: Scalars['Boolean']['output'];
  enrollmentDateTime: Scalars['DateTime']['output'];
  enrollmentDateTimeWithNoTimeZone: Scalars['DateTimeWithoutTimeZone']['output'];
  enrollmentStatus: EnrollmentStatusEnum;
  /**
   * Whether this enrollment has stats or not. If null, it means that the class that the enrollment belongs to
   * has not received stats yet. If the result is false, it means that the class has received stats but the enrollment
   * has not.
   */
  hasStats?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  identifiableSiteUser?: Maybe<IdentifiableSiteUser>;
  isBookedForFree: Scalars['Boolean']['output'];
  isCheckedIn: Scalars['Boolean']['output'];
  isFirstTimeInThisTypeOfClass: Scalars['Boolean']['output'];
  /** Whether this is the first time of this Enrollment's user with this class' instructor */
  isFirstTimeWithThisInstructor: Scalars['Boolean']['output'];
  /** Returns true if today is the user's birthday */
  isTodayUserBirthday: Scalars['Boolean']['output'];
  /** Whether the user leaderboard is enabled */
  isUserLeaderboardEnabled: Scalars['Boolean']['output'];
  /** Mindbody service name used to book this visit (e.g. the package/membership label). Null when not recorded. */
  serviceName?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use spotNumber instead. */
  spotInfo?: Maybe<SpotInfo>;
  spotNumber?: Maybe<Scalars['Int']['output']>;
};

export type EnrollmentInfoInterface = {
  enrollmentDateTime: Scalars['DateTime']['output'];
  enrollmentDateTimeWithNoTimeZone: Scalars['DateTimeWithoutTimeZone']['output'];
  enrollmentStatus: EnrollmentStatusEnum;
  id: Scalars['ID']['output'];
  identifiableSiteUser?: Maybe<IdentifiableSiteUser>;
};

export type EnrollmentNotFoundError = Error & {
  __typename: 'EnrollmentNotFoundError';
  code: Scalars['String']['output'];
};

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
  code: Scalars['String']['output'];
};

export type ExpiredResetPasswordTokenError = Error & {
  __typename: 'ExpiredResetPasswordTokenError';
  code: Scalars['String']['output'];
};

/** A Messenger message that exhausted its retries and landed in a failure queue */
export type FailedMessage = {
  __typename: 'FailedMessage';
  errorMessage?: Maybe<Scalars['String']['output']>;
  /** FQCN of the exception that caused the failure */
  exceptionClass?: Maybe<Scalars['String']['output']>;
  failedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  /** FQCN of the message */
  messageClass: Scalars['String']['output'];
  /** Name of the transport the message was originally consumed from */
  originalTransport?: Maybe<Scalars['String']['output']>;
  /** Payment details, only present for Payfort transaction feedback messages */
  payfortDetails?: Maybe<PayfortFailedMessageDetails>;
  queue: FailedMessageQueueEnum;
  /** Number of delivery retries before the message was moved to the failure queue */
  retryCount: Scalars['Int']['output'];
  /** Human-readable one-line description of the message */
  summary?: Maybe<Scalars['String']['output']>;
};

export type FailedMessageActionInput = {
  id: Scalars['ID']['input'];
  queue: FailedMessageQueueEnum;
};

export type FailedMessageActionResultUnion = FailedMessageActionSuccess | FailedMessageNotFoundError;

export type FailedMessageActionSuccess = {
  __typename: 'FailedMessageActionSuccess';
  success: Scalars['Boolean']['output'];
};

export type FailedMessageNotFoundError = Error & {
  __typename: 'FailedMessageNotFoundError';
  code: Scalars['String']['output'];
};

/** The Messenger failure queue a failed message sits in */
export enum FailedMessageQueueEnum {
  Default = 'default',
  PartnerPurchase = 'partnerPurchase',
  PayfortTransactionFeedback = 'payfortTransactionFeedback'
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
  __typename: 'GenderRanking';
  gender?: Maybe<GenderEnum>;
  ranking?: Maybe<UserRanking>;
};

export type GiftCard = {
  __typename: 'GiftCard';
  description: Scalars['String']['output'];
  /** Whether CRANK offers this card for sale. Admin-owned; the Mindbody sync never changes it. */
  enabled: Scalars['Boolean']['output'];
  grandTotal: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  purchaseUrl: Scalars['String']['output'];
  salePrice: Scalars['Float']['output'];
  site: Site;
  /** Null when Mindbody carries no terms for the card, which it often does not. */
  terms?: Maybe<Scalars['String']['output']>;
};

export type GiftCardCodeRequiredError = Error & {
  __typename: 'GiftCardCodeRequiredError';
  code: Scalars['String']['output'];
};

export type IconPosition = ClassPositionInterface & {
  __typename: 'IconPosition';
  icon: PositionIconEnum;
  x: Scalars['Int']['output'];
  y: Scalars['Int']['output'];
};

export type IconPositionInput = {
  icon: PositionIconEnum;
  spotNumber?: InputMaybe<Scalars['Int']['input']>;
  x: Scalars['Int']['input'];
  y: Scalars['Int']['input'];
};

export type IdentifiableSiteUser = {
  __typename: 'IdentifiableSiteUser';
  /** Mindbody ClientId for this customer in this site (== site_customer.merchant_id). */
  externalUserId: Scalars['ID']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  identifiableUser?: Maybe<IdentifiableUser>;
  /** Local mirror of the customer's Mindbody services in this site. Kept up to date by webhooks (classRosterBooking.created/cancelled, clientSale.created); aggregated as `User.remainingCreditsBySite`. */
  services: Array<Service>;
  siteUserInfo?: Maybe<SimpleSiteUser>;
};


export type IdentifiableSiteUserServicesArgs = {
  filter?: InputMaybe<ServiceFilterEnum>;
};

export type IdentifiableUser = {
  __typename: 'IdentifiableUser';
  id?: Maybe<Scalars['ID']['output']>;
  user?: Maybe<User>;
};

/** A TemporalTransaction whose Payfort feedback was received but not fully processed (status != COMPLETED). Admin only. */
export type IncompleteTransactionFeedback = {
  __typename: 'IncompleteTransactionFeedback';
  created: Scalars['DateTime']['output'];
  feedbackStatusUpdatedAt?: Maybe<Scalars['DateTime']['output']>;
  feedbackTryNumber: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  merchantReference?: Maybe<Scalars['Int']['output']>;
  /** Null for a purchase nobody was logged in for, such as a payment link. */
  siteCustomer?: Maybe<IdentifiableSiteUser>;
  status: Scalars['String']['output'];
};

export type IncompleteTransactionFeedbackFilterInput = {
  createdAfter?: InputMaybe<Scalars['DateTime']['input']>;
  /** Matches part of the customer's email. */
  email?: InputMaybe<Scalars['String']['input']>;
};

export type Instructor = {
  __typename: 'Instructor';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  site: Site;
};

/** The uploaded file is not a PDF, or is bigger than 2048 KB. Nothing was changed. */
export type InvalidGiftCardPdfError = Error & {
  __typename: 'InvalidGiftCardPdfError';
  code: Scalars['String']['output'];
  /** Why the file was refused, fit to show to the admin. */
  message: Scalars['String']['output'];
};

export type InvalidProductVodDaysError = Error & {
  __typename: 'InvalidProductVodDaysError';
  code: Scalars['String']['output'];
};

export type IsSmsValidationCodeValidUnion = MobilePhoneAlreadyVerifiedError | RequestSmsValidationNeededError | SmsCodeValidatedSuccessfully | SmsValidationCodeError;

export type ItemToShoppingCartInput = {
  quantity: Scalars['Int']['input'];
  sellableProductId: Scalars['ID']['input'];
};

export type LateCancellationRequiredError = Error & {
  __typename: 'LateCancellationRequiredError';
  code: Scalars['String']['output'];
};

export type LegacyAlertBeforePurchasing = {
  __typename: 'LegacyAlertBeforePurchasing';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

/** The gateway refused the charge. `message` is displayable — call ApplePaySession.completePayment(FAILURE) and show it. Nothing was charged. */
export type LegacyApplePayDeclinedError = Error & {
  __typename: 'LegacyApplePayDeclinedError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

/** Apple's merchant session, verbatim. Opaque JSON: JSON.parse it and pass the object to ApplePaySession.completeMerchantValidation(). */
export type LegacyApplePayMerchantSession = {
  __typename: 'LegacyApplePayMerchantSession';
  merchantSession: Scalars['String']['output'];
};

export type LegacyApplePayMerchantSessionResultUnion = LegacyApplePayMerchantSession | LegacyApplePayValidationFailedError | LegacyPaymentLinkNotFoundError;

export type LegacyApplePayResultUnion = LegacyApplePayDeclinedError | LegacyApplePayTokenInvalidError | LegacyCheckoutAlreadyCompletedError | LegacyCheckoutGenericError | LegacyNothingToPayError | LegacyOperationNotSupportedForItemError | LegacyPaymentStatus | LegacyTemporalTransactionNotFoundError;

/** paymentToken was not JSON, or lacked the fields Apple's token always carries. Checked before the gateway is contacted, so nothing was charged — almost always a frontend bug. */
export type LegacyApplePayTokenInvalidError = Error & {
  __typename: 'LegacyApplePayTokenInvalidError';
  code: Scalars['String']['output'];
};

/** Apple would not issue a merchant session — the URL was not one of Apple's, or Apple rejected the merchant (usually the page's domain not matching the one registered for the merchant identifier). */
export type LegacyApplePayValidationFailedError = Error & {
  __typename: 'LegacyApplePayValidationFailedError';
  code: Scalars['String']['output'];
};

/** There is an amount due — this checkout must be paid by card via legacyPayfortForm. */
export type LegacyCardPaymentRequiredError = Error & {
  __typename: 'LegacyCardPaymentRequiredError';
  code: Scalars['String']['output'];
};

/** The checkout was already completed; poll legacyPaymentStatus. */
export type LegacyCheckoutAlreadyCompletedError = Error & {
  __typename: 'LegacyCheckoutAlreadyCompletedError';
  code: Scalars['String']['output'];
};

export type LegacyCheckoutGenericError = Error & {
  __typename: 'LegacyCheckoutGenericError';
  code: Scalars['String']['output'];
};

export type LegacyCheckoutResultUnion = LegacyCheckoutGenericError | LegacyCheckoutSummary | LegacyDiscountCodeIsInvalidError | LegacyEmptyCodeError | LegacyGiftCardEmptyBalanceError | LegacyGiftCardNotFoundError | LegacyItemNotFoundError | LegacyNotAllowedToBuyError | LegacyOperationNotSupportedForItemError | LegacySmsVerificationRequiredError | LegacyTemporalTransactionNotFoundError;

/** The single summary shape every legacy checkout operation returns, always recalculated through Mindbody. */
export type LegacyCheckoutSummary = {
  __typename: 'LegacyCheckoutSummary';
  /** What will be charged to the card: grandTotal minus the gift card contribution. */
  amountToPay: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  discountAmount: Scalars['Float']['output'];
  discountCode?: Maybe<Scalars['String']['output']>;
  giftCard?: Maybe<LegacyGiftCardApplication>;
  /** Total after discount, taxes included, before the gift card is applied. */
  grandTotal: Scalars['Float']['output'];
  /** True when amountToPay is 0 — free product, or fully covered by the gift card. Route to the free-item flow; do not touch the payment gateway. */
  isFreeItem: Scalars['Boolean']['output'];
  itemName: Scalars['String']['output'];
  merchantReference: Scalars['ID']['output'];
  subTotal: Scalars['Float']['output'];
  taxTotal: Scalars['Float']['output'];
};

export type LegacyCreditCardNotFoundError = Error & {
  __typename: 'LegacyCreditCardNotFoundError';
  code: Scalars['String']['output'];
};

export type LegacyDeleteSavedCardResultUnion = LegacyCreditCardNotFoundError | LegacySavedCards;

export type LegacyDiscountCodeIsInvalidError = Error & {
  __typename: 'LegacyDiscountCodeIsInvalidError';
  code: Scalars['String']['output'];
};

/** code distinguishes the empty discount code and the empty gift card code cases. */
export type LegacyEmptyCodeError = Error & {
  __typename: 'LegacyEmptyCodeError';
  code: Scalars['String']['output'];
};

export type LegacyGiftCard = {
  __typename: 'LegacyGiftCard';
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Mindbody list price (GiftCard.salePrice); may differ from price. */
  listPrice: Scalars['Float']['output'];
  /** Amount actually charged (GiftCard.grandTotal). */
  price: Scalars['Float']['output'];
  terms?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type LegacyGiftCardApplication = {
  __typename: 'LegacyGiftCardApplication';
  balance: Scalars['Float']['output'];
  balanceAfterPayment: Scalars['Float']['output'];
  code: Scalars['String']['output'];
  /** What the gift card will actually cover: min(balance, grandTotal). */
  willPay: Scalars['Float']['output'];
};

export type LegacyGiftCardEmptyBalanceError = Error & {
  __typename: 'LegacyGiftCardEmptyBalanceError';
  code: Scalars['String']['output'];
};

export type LegacyGiftCardNotFoundError = Error & {
  __typename: 'LegacyGiftCardNotFoundError';
  code: Scalars['String']['output'];
};

/** An unpaid gift card order. Hand customerGiftCardId to legacyStartCheckout; nothing else is known about it yet. */
export type LegacyGiftCardOrder = {
  __typename: 'LegacyGiftCardOrder';
  customerGiftCardId: Scalars['ID']['output'];
};

export type LegacyGiftCardOrderResultUnion = LegacyGiftCardNotFoundError | LegacyGiftCardOrder;

export type LegacyItemNotFoundError = Error & {
  __typename: 'LegacyItemNotFoundError';
  code: Scalars['String']['output'];
};

export type LegacyNotAllowedToBuyError = Error & {
  __typename: 'LegacyNotAllowedToBuyError';
  code: Scalars['String']['output'];
  /** Product-specific errorMessageWhenTryingToPurchase, or the generic not-allowed translation. */
  message: Scalars['String']['output'];
};

/** Nothing to charge — complete this checkout with legacyCompleteFreeCheckout instead. */
export type LegacyNothingToPayError = Error & {
  __typename: 'LegacyNothingToPayError';
  code: Scalars['String']['output'];
};

export type LegacyOperationNotSupportedForItemError = Error & {
  __typename: 'LegacyOperationNotSupportedForItemError';
  code: Scalars['String']['output'];
};

export type LegacyPayWithApplePayInput = {
  merchantReference: Scalars['ID']['input'];
  /** JSON.stringify(event.payment.token) from onpaymentauthorized — the token object itself, not the whole event. */
  paymentToken: Scalars['String']['input'];
};

export type LegacyPayWithSavedCardInput = {
  creditCardId: Scalars['ID']['input'];
  /** The card's security code, re-entered by the customer. Never stored. */
  cvv: Scalars['String']['input'];
  /** Payfort device fingerprint collected by the frontend (iovation snare.js). */
  deviceFingerprint: Scalars['String']['input'];
  merchantReference: Scalars['ID']['input'];
};

export type LegacyPayWithSavedCardResultUnion = LegacyCheckoutAlreadyCompletedError | LegacyCheckoutGenericError | LegacyCreditCardNotFoundError | LegacyNothingToPayError | LegacyPaymentStatus | LegacyTemporalTransactionNotFoundError | LegacyThreeDSecureRequired;

export type LegacyPayWithTabbyInput = {
  /** Overrides the number on the customer's record for this payment only; it is not saved. Omit it to use the stored one — if there is none, LegacyPhoneNumberRequiredError comes back. */
  customerPhone?: InputMaybe<Scalars['String']['input']>;
  merchantReference: Scalars['ID']['input'];
};

/** The signed Payfort tokenization form. Either POST params (plus the card fields, added in the browser) to gatewayUrl, or inject htmlForm — it already carries gatewayUrl as its action. */
export type LegacyPayfortForm = {
  __typename: 'LegacyPayfortForm';
  gatewayUrl: Scalars['String']['output'];
  htmlForm: Scalars['String']['output'];
  params: Array<LegacyPayfortFormParam>;
};

export type LegacyPayfortFormInput = {
  /** Payfort device fingerprint collected by the frontend (iovation snare.js). */
  deviceFingerprint: Scalars['String']['input'];
  merchantReference: Scalars['ID']['input'];
  savePaymentCard: Scalars['Boolean']['input'];
};

export type LegacyPayfortFormParam = {
  __typename: 'LegacyPayfortFormParam';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type LegacyPayfortFormResultUnion = LegacyCheckoutAlreadyCompletedError | LegacyCheckoutGenericError | LegacyNothingToPayError | LegacyOperationNotSupportedForItemError | LegacyPayfortForm | LegacyPhoneNumberRequiredError | LegacyTabbyNotAvailableError | LegacyTemporalTransactionNotFoundError;

/** A payment link as an anonymous payer sees it. Internal fields (the notification address) are never exposed. */
export type LegacyPaymentLink = {
  __typename: 'LegacyPaymentLink';
  amount: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  siteName: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

/** A started payment-link checkout. merchantReference is the only credential the anonymous payer holds — keep it out of logs and analytics. */
export type LegacyPaymentLinkCheckout = {
  __typename: 'LegacyPaymentLinkCheckout';
  amount: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  itemName: Scalars['String']['output'];
  merchantReference: Scalars['ID']['output'];
  siteName: Scalars['String']['output'];
};

export type LegacyPaymentLinkCheckoutResultUnion = LegacyPaymentLinkCheckout | LegacyPaymentLinkNotFoundError;

/** The link does not exist, or has been deleted. The two are deliberately indistinguishable. */
export type LegacyPaymentLinkNotFoundError = Error & {
  __typename: 'LegacyPaymentLinkNotFoundError';
  code: Scalars['String']['output'];
};

export type LegacyPaymentLinkPayWithApplePayInput = {
  customerEmail: Scalars['String']['input'];
  customerName: Scalars['String']['input'];
  /** Optional; stored against the purchase when supplied. */
  customerPhone?: InputMaybe<Scalars['String']['input']>;
  merchantReference: Scalars['ID']['input'];
  /** JSON.stringify(event.payment.token) from onpaymentauthorized — the token object itself, not the whole event. */
  paymentToken: Scalars['String']['input'];
};

export type LegacyPaymentLinkPayWithTabbyInput = {
  customerEmail: Scalars['String']['input'];
  customerName: Scalars['String']['input'];
  /** Required, unlike the card flow: the gateway makes phone_number mandatory for Tabby. */
  customerPhone: Scalars['String']['input'];
  merchantReference: Scalars['ID']['input'];
};

export type LegacyPaymentLinkPayfortFormInput = {
  /** Stored on the PaymentLinkPurchase; the receipt goes here. */
  customerEmail: Scalars['String']['input'];
  /** Stored on the PaymentLinkPurchase and sent to the gateway as the cardholder. */
  customerName: Scalars['String']['input'];
  /** Optional here, required by legacyPaymentLinkPayWithTabby — the gateway makes phone_number mandatory for BNPL. */
  customerPhone?: InputMaybe<Scalars['String']['input']>;
  /** Payfort device fingerprint collected by the frontend (iovation snare.js). */
  deviceFingerprint: Scalars['String']['input'];
  merchantReference: Scalars['ID']['input'];
};

export type LegacyPaymentLinkResultUnion = LegacyPaymentLink | LegacyPaymentLinkNotFoundError;

export type LegacyPaymentStatus = {
  __typename: 'LegacyPaymentStatus';
  status: LegacyPaymentStatusEnum;
};

export enum LegacyPaymentStatusEnum {
  Rejected = 'rejected',
  Successful = 'successful',
  /** The gateway answered (or may still answer successfully); the asynchronous feedback webhook has not finished the purchase yet. Keep polling. */
  WaitingForConfirmation = 'waitingForConfirmation',
  /** The gateway has not reported back yet (the customer may still be on the payment page). */
  WaitingForPayment = 'waitingForPayment'
}

export type LegacyPaymentStatusResultUnion = LegacyCardPaymentRequiredError | LegacyCheckoutAlreadyCompletedError | LegacyCheckoutGenericError | LegacyOperationNotSupportedForItemError | LegacyPaymentStatus | LegacySmsVerificationRequiredError | LegacyTemporalTransactionNotFoundError;

/** Tabby needs a phone number, the customer has none on record, and none was supplied. Ask for one and retry. */
export type LegacyPhoneNumberRequiredError = Error & {
  __typename: 'LegacyPhoneNumberRequiredError';
  code: Scalars['String']['output'];
};

export type LegacyProduct = {
  __typename: 'LegacyProduct';
  alertBeforePurchasing?: Maybe<LegacyAlertBeforePurchasing>;
  buttonText?: Maybe<Scalars['String']['output']>;
  category: LegacyProductCategoryEnum;
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isVisible: Scalars['Boolean']['output'];
  /** Mindbody service id — the identifier the checkout flow is keyed on. Stored as product.merchant_id. */
  mindbodyId: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  requiresSmsVerification: Scalars['Boolean']['output'];
  subtitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export enum LegacyProductCategoryEnum {
  Membership = 'membership',
  Regular = 'regular',
  Special = 'special',
  Trial = 'trial',
  Vod = 'vod'
}

/** A card the customer has stored with the gateway. The gateway token itself is never exposed, and no expiry is stored. */
export type LegacySavedCard = {
  __typename: 'LegacySavedCard';
  /** Card brand as the gateway reports it, e.g. VISA or MASTERCARD. */
  brand: Scalars['String']['output'];
  cardHolderName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastFourDigits: Scalars['String']['output'];
};

/** The customer's remaining active cards after the change. */
export type LegacySavedCards = {
  __typename: 'LegacySavedCards';
  cards: Array<LegacySavedCard>;
};

export type LegacySmsVerificationRequiredError = Error & {
  __typename: 'LegacySmsVerificationRequiredError';
  code: Scalars['String']['output'];
};

export type LegacyStartCheckoutInput = {
  /** Id of a CustomerGiftCard the current user created (gift-card purchase flow). */
  customerGiftCardId?: InputMaybe<Scalars['ID']['input']>;
  /** Mindbody service id of the product to buy (LegacyProduct.mindbodyId). Exactly one of productMerchantId / customerGiftCardId must be set. */
  productMerchantId?: InputMaybe<Scalars['String']['input']>;
};

/** Tabby is switched off, or the amount is below the minimum its contract allows. Nothing advertises availability up front, so this is how a frontend finds out — and a discount or gift card can push a checkout under the minimum after the fact. */
export type LegacyTabbyNotAvailableError = Error & {
  __typename: 'LegacyTabbyNotAvailableError';
  code: Scalars['String']['output'];
};

export type LegacyTemporalTransactionNotFoundError = Error & {
  __typename: 'LegacyTemporalTransactionNotFoundError';
  code: Scalars['String']['output'];
};

/** The gateway requires 3-D Secure: send the browser to redirectUrl, then poll legacyPaymentStatus with the merchantReference. */
export type LegacyThreeDSecureRequired = {
  __typename: 'LegacyThreeDSecureRequired';
  redirectUrl: Scalars['String']['output'];
};

export type MindbodyStaffInfo = {
  __typename: 'MindbodyStaffInfo';
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
};

export type MobileNumberBlackListEntry = {
  __typename: 'MobileNumberBlackListEntry';
  countryId: Scalars['ID']['output'];
  countryName: Scalars['String']['output'];
  countryPhoneCode: Scalars['String']['output'];
  fullPhoneNumber: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mobilePhoneNumber: Scalars['String']['output'];
};

export type MobilePhoneAlreadyVerifiedError = Error & {
  __typename: 'MobilePhoneAlreadyVerifiedError';
  code: Scalars['String']['output'];
};

export type MobilePhoneNotValidError = Error & {
  __typename: 'MobilePhoneNotValidError';
  code: Scalars['String']['output'];
};

export type Mutation = {
  __typename: 'Mutation';
  /** Accepts a late-cancelled spot in a class */
  acceptLateCancelledSpotInClass?: Maybe<AcceptLateCancelledSpotInClassResultUnion>;
  /** Creates a new admin user */
  addAdminUser: AdminUserResultUnion;
  /** Adds a new device token to be used for device notifications */
  addDeviceTokenToCurrentUser?: Maybe<Scalars['Boolean']['output']>;
  /** Allows to add a discount code code to a shopping cart for current user */
  addDiscountCodeToShoppingCart: Scalars['Boolean']['output'];
  /** Allows to add a giftcard code to a shopping cart for current user */
  addGiftCardCodeToShoppingCart: Scalars['Boolean']['output'];
  /** Allows to add item to shopping cart */
  addItemToShoppingCart: Scalars['Boolean']['output'];
  /** Books the current user in a class */
  bookClass: BookClassResultUnion;
  /** Adds a user into a given class */
  bookUserIntoClass: BookClassResultUnion;
  /** Bulk activate VOD periods for multiple customers by Mindbody IDs. Admin only. Errors: customer_vod_period.invalid. */
  bulkActivateVod: BulkVodResult;
  /** Bulk deactivate the active VOD periods of multiple customers by Mindbody IDs. Admin only. */
  bulkDeactivateVod: BulkVodResult;
  /** Cancels an enrollment done by the current user */
  cancelCurrentUserEnrollment?: Maybe<CancelEnrollmentResultUnion>;
  /** Checks in a user in a class */
  checkinUserInClass?: Maybe<CheckinResultUnion>;
  /** Checks out a user from a class */
  checkoutUserInClass?: Maybe<CheckoutResultUnion>;
  /** Clears the application cache. ROLE_SUPER_ADMIN only. */
  clearSystemCache: Scalars['Boolean']['output'];
  /** Creates a copy of the current user in the given site */
  createCurrentUserInSite?: Maybe<CreateCurrentUserInSiteUnion>;
  /** Admin only. The charge-client email: sends the customer a link to buy the product. In emailBody, [#firstName], [#lastName] and [#link] are replaced with the customer's names and the purchase link. Nothing is stored. */
  createCustomTransactionRequest: CreateCustomTransactionRequestResultUnion;
  /** Creates a new VOD period for a customer, recorded as added by the calling admin. Admin only. Errors: customer.not_found, customer_vod_period.invalid. */
  createCustomerVodPeriod: AdminCustomerVodPeriod;
  /** Creates a new blacklisted mobile number entry. ROLE_STAFF only. */
  createMobileNumberBlacklistEntry: MobileNumberBlackListEntry;
  /** Creates a new payment link */
  createPaymentLink: PaymentLink;
  /** Creates a new room layout */
  createRoomLayout: RoomLayout;
  /** It deletes the current user's account */
  deleteCurrentUserAccount?: Maybe<DeleteCurrentUserAccountUnion>;
  /** Deletes a VOD period (soft delete). Admin only. Errors: customer_vod_period.not_found. */
  deleteCustomerVodPeriod: Scalars['Boolean']['output'];
  /** Removes a devices token */
  deleteDeviceTokenToCurrentUser?: Maybe<Scalars['Boolean']['output']>;
  /** Deletes a blacklisted mobile number entry. False when the id does not exist. ROLE_STAFF only. */
  deleteMobileNumberBlacklistEntry: Scalars['Boolean']['output'];
  /** Soft deletes a payment link */
  deletePaymentLink: Scalars['Boolean']['output'];
  /** Deletes a room layout (soft delete). Fails if the layout is in use by a class or schedule. ROLE_SUPER_ADMIN only. */
  deleteRoomLayout: DeleteRoomLayoutResultUnion;
  /** Disables a spot in a class */
  disableSpot?: Maybe<DisableEnableSpotResultUnion>;
  /** Permanently discards a failed message from the failure queue. Super admin only. Errors: failed_message.not_found. */
  discardFailedMessage: FailedMessageActionResultUnion;
  /** Edits a class */
  editClass: EditClassResultUnion;
  /** Edits an enrollment made by the current user */
  editCurrentUserEnrollment?: Maybe<EditEnrollmentResultUnion>;
  /** Edits an enrollment */
  editEnrollment?: Maybe<EditEnrollmentResultUnion>;
  /** Edits a room layout */
  editRoomLayout: RoomLayout;
  /** Edits a user */
  editUser?: Maybe<EditUserResultUnion>;
  /** Enabled a spot in a class */
  enableSpot?: Maybe<DisableEnableSpotResultUnion>;
  /** Builds the customer VOD spreadsheet for the same params as customers and returns a link to download it, valid for 15 minutes. Admin only. */
  exportCustomerVod: AdminExport;
  /** Builds the transactions spreadsheet for the same filter as transactionRecords and returns a link to download it, valid for 15 minutes. Staff only (ROLE_STAFF). */
  exportTransactionRecords: AdminExport;
  /**
   * TEMPORARY. Answers Safari's onvalidatemerchant for an Apple Pay session. Pass event.validationURL; hand the returned merchantSession to ApplePaySession.completeMerchantValidation() after JSON.parse. A mutation because the session is single-use — a cached one breaks the payment.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges.
   */
  legacyApplePayMerchantSession: LegacyApplePayMerchantSessionResultUnion;
  /**
   * TEMPORARY. Applies a Mindbody promotion code to the temporal transaction and persists the recalculated total.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges; replaced by addDiscountCodeToShoppingCart.
   */
  legacyApplyDiscountCode: LegacyCheckoutResultUnion;
  /**
   * TEMPORARY. Applies a gift card code to the temporal transaction; the persisted total becomes the remainder the gateway will charge.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges; replaced by addGiftCardCodeToShoppingCart.
   */
  legacyApplyGiftCardCode: LegacyCheckoutResultUnion;
  /**
   * TEMPORARY. Completes a checkout whose amount due is zero — a free product, or a gift card covering the full total — without touching the payment gateway.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges.
   */
  legacyCompleteFreeCheckout: LegacyPaymentStatusResultUnion;
  /**
   * TEMPORARY. Creates an unpaid gift card order and returns its id, to be passed to legacyStartCheckout as customerGiftCardId. Paying it does NOT produce a code: an admin issues the code and the PDF by hand afterwards, and they reach the customer by email.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges.
   */
  legacyCreateGiftCardOrder: LegacyGiftCardOrderResultUnion;
  /**
   * TEMPORARY. Soft-deletes one of the authenticated customer's saved cards and detaches it from any subscription that charges it.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges.
   */
  legacyDeleteSavedCard: LegacyDeleteSavedCardResultUnion;
  /**
   * TEMPORARY. Charges a checkout with an Apple Pay token. No redirect and no 3-D Secure leg — the wallet has already done the cardholder challenge — so the answer is a pollable status.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges.
   */
  legacyPayWithApplePay: LegacyApplePayResultUnion;
  /**
   * TEMPORARY. Charges one of the customer's saved cards for a checkout. Returns either a pollable status or a 3-D Secure URL the browser must visit.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges.
   */
  legacyPayWithSavedCard: LegacyPayWithSavedCardResultUnion;
  /**
   * TEMPORARY. Pays a checkout with Tabby (BNPL). Returns a signed redirection form for Payfort's hosted page — submit it as-is; there is no tokenization and no card data. The customer's saved phone number is used unless one is supplied, and a supplied one is not persisted.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges.
   */
  legacyPayWithTabby: LegacyPayfortFormResultUnion;
  /**
   * TEMPORARY. Persists deviceFingerprint/saveCard on the temporal transaction and returns the signed Payfort tokenization form. Card data is appended by the frontend and POSTed straight to Payfort.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges; replaced by payfortForm.
   */
  legacyPayfortForm: LegacyPayfortFormResultUnion;
  /**
   * TEMPORARY. The same, for a payment-link checkout. No authentication: the Apple Pay certificate is chosen by the link's site rather than by a logged-in customer.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges.
   */
  legacyPaymentLinkApplePayMerchantSession: LegacyApplePayMerchantSessionResultUnion;
  /**
   * TEMPORARY. The same, for a payment-link checkout. No authentication; the payer's details come from the input.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges.
   */
  legacyPaymentLinkPayWithApplePay: LegacyApplePayResultUnion;
  /**
   * TEMPORARY. Pays a payment-link checkout with Tabby (BNPL). No authentication. Same redirection form as legacyPayWithTabby, but the payer's details come from the input and the phone number is required.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges.
   */
  legacyPaymentLinkPayWithTabby: LegacyPayfortFormResultUnion;
  /**
   * TEMPORARY. Records the anonymous payer's details against a payment-link checkout and returns the signed Payfort tokenization form. No authentication. Card data is appended by the frontend and POSTed straight to Payfort. A payment-link card is never saved: there is no customer to attach it to.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges; replaced by payfortForm.
   */
  legacyPaymentLinkPayfortForm: LegacyPayfortFormResultUnion;
  /**
   * TEMPORARY. Removes the promotion code from the temporal transaction and persists the recalculated total.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges; replaced by removeDiscountCodeForCurrentShoppingCart.
   */
  legacyRemoveDiscountCode: LegacyCheckoutResultUnion;
  /**
   * TEMPORARY. Removes the gift card code from the temporal transaction and persists the recalculated total.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges; replaced by removeGiftCardFromCurrentShoppingCart.
   */
  legacyRemoveGiftCardCode: LegacyCheckoutResultUnion;
  /**
   * TEMPORARY. Prices one item via Mindbody and creates the TemporalTransaction that acts as the one-item cart.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges; replaced by addItemToShoppingCart.
   */
  legacyStartCheckout: LegacyCheckoutResultUnion;
  /**
   * TEMPORARY. Starts an anonymous checkout for a payment link and returns its merchantReference. No authentication. Each call starts a new checkout.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges.
   */
  legacyStartPaymentLinkCheckout: LegacyPaymentLinkCheckoutResultUnion;
  /** Partner only (X-API-Key with canIssueUserTokens). Mints a short-lived access token for a user the calling key registered, to send as `Authorization: Bearer` alongside the key on the operations that act as that user. The token can read the calendar and credits, book and cancel; it cannot touch saved cards, start or pay for a checkout, or change the password. There is no refresh token: mint again when it expires. An id the key did not register answers PartnerUserNotLinkedError. */
  partnerIssueAccessToken: PartnerIssueAccessTokenResultUnion;
  /** Partner only (X-API-Key with canIssueUserTokens, granted this site). Registers a user of the calling partner without a password and returns the crankUserId the partner keys everything on afterwards. Idempotent per email for the key that created the customer; an email in use by anyone else answers UserAlreadyRegisteredError and creates nothing. Sends no email. */
  partnerRegisterUser: PartnerRegisterUserResultUnion;
  /** Refunds a transaction. A paid one goes through Payfort; a zero-amount one is only marked refunded. Staff only (ROLE_STAFF). Errors: transaction_record.not_found, transaction_record.already_refunded, transaction_record.refund_window_expired, transaction_record.payfort_refund_failed. */
  refundTransaction: Scalars['Boolean']['output'];
  /** Registers a new user and returns an IdentifiableUser type */
  registerIdentifiableUser?: Maybe<IdentifiableSiteUser>;
  /** Registers a new user */
  registerUser?: Maybe<User>;
  /** Rejects a late-cancelled spot in a class */
  rejectLateCancelledSpotInClass?: Maybe<RejectLateBookingResultUnion>;
  /** Deletes an admin user */
  removeAdminUser: Scalars['Boolean']['output'];
  /** Removes the current user's waitlist entry from a class */
  removeCurrentUserFromWaitlist?: Maybe<RemoveCurrentUserFromWaitlistUnion>;
  /** Removes phone number verification for a customer. Admin only. Errors: customer.not_found, customer.phone_verification_not_found. */
  removeCustomerPhoneVerification: Scalars['Boolean']['output'];
  /** Remove Item from shopping cart */
  removeItemFromShoppingCart: Scalars['Boolean']['output'];
  /** Removes a user from a class */
  removeUserFromClass: CancelEnrollmentResultUnion;
  /** Removes a waitlist entry */
  removeUserFromWaitlist: RemoveUserFromWaitlistUnion;
  /** Request a reset password link */
  requestPasswordLink?: Maybe<ResetPasswordLinkResultUnion>;
  /** Requests an SMS validation code */
  requestSMSValidation?: Maybe<SmsValidationUnion>;
  /** Resets the password of an admin user and sends an email with the new password */
  resetAdminUserPassword: Scalars['Boolean']['output'];
  /** Sets a new password. Requires both the JWT from validateResetPasswordToken and the token that produced it; the token is removed on success. */
  resetPassword: ResetPasswordResultUnion;
  /**
   * Resets the current user's password
   * @deprecated Accepts a bare JWT and never asks for the current password, so any holder of a customer's token can change it. Use resetPassword, which also requires the token from the reset email. Removed once the remaining caller has migrated.
   */
  resetPasswordForCurrentUser?: Maybe<ResetPasswordForCurrentUserUnion>;
  /** Re-dispatches a failed message to its original transport with a fresh retry budget and removes it from the failure queue. Super admin only. Errors: failed_message.not_found. */
  retryFailedMessage: FailedMessageActionResultUnion;
  /** Re-dispatches the Payfort feedback message for an incomplete TemporalTransaction. Admin only. Errors: temporal_transaction.not_found, temporal_transaction.already_completed, temporal_transaction.feedback_in_progress, temporal_transaction.already_sold. */
  retryTransactionFeedback: Scalars['Boolean']['output'];
  /** Sends a single class stats to an email */
  sendClassStatsToEmail?: Maybe<Scalars['Boolean']['output']>;
  /** Sends the class stats to the users booked in a class */
  sendClassStatsToUsers?: Maybe<Scalars['Boolean']['output']>;
  /** Sets a room layout for a list of class schedules */
  setRoomLayoutForClassSchedules: Array<ClassSchedule>;
  /** Swaps a spot in a class */
  swapSpot?: Maybe<SwapSpotResultUnion>;
  /** Re-reads every class schedule of a site from Mindbody, from nine years back to four years ahead. Runs inside the request. ROLE_SUPER_ADMIN only. */
  syncAllClassSchedules: Scalars['Boolean']['output'];
  /** Sync all classes */
  syncAllClasses: Scalars['Boolean']['output'];
  /** Sync all gift cards from Mindbody with the local database */
  syncAllGiftCards: Scalars['Boolean']['output'];
  /** Syncs all Mindbody staff members for a site. Admin only. */
  syncAllMindbodyStaff: Scalars['Boolean']['output'];
  /** Sync one class */
  syncClass: ClassInfo;
  /** Sync a class with PIQ */
  syncClassWithPIQ: ClassInfo;
  /** Syncs a customer's data from their Mindbody client in the site. Admin only. Errors: customer.not_found, site_customer.not_found, customer.mindbody_client_not_found. */
  syncCustomerWithMindbody: Scalars['Boolean']['output'];
  /** Super admin only. Pulls the site's services from Mindbody: creates the new ones as packages, refreshes name and price, and marks as deleted the packages Mindbody no longer lists. Admin-edited fields are kept. Answers the site's list afterwards, as adminProducts. */
  syncProducts: Array<AdminProduct>;
  /** Updates an admin user */
  updateAdminUser: AdminUserResultUnion;
  /** Allows to update the current AdminUser */
  updateCurrentAdminUser: AdminUser;
  /** Allows to update the favorite site for a AdminUser */
  updateCurrentAdminUserFavoriteSite: AdminUser;
  updateCurrentAdminUserPassword?: Maybe<Scalars['Boolean']['output']>;
  /** Updates the current user */
  updateCurrentUser?: Maybe<User>;
  /** Updates a user's password in all the sites */
  updateCurrentUserPassword?: Maybe<Scalars['Boolean']['output']>;
  /** Admin only, ROLE_SUPER_ADMIN. Issues the code of a customer gift card after it was sold in Mindbody: stores the code and the PDF, adds the giftCardCodeGranted status and emails the PDF to the customer who bought it. Send it as a GraphQL multipart request, with pdfGiftCard mapped to the file part. */
  updateCustomerGiftCard: UpdateCustomerGiftCardResultUnion;
  /** Updates a gift card */
  updateGiftCard: GiftCard;
  /** Allows to update an Item from Shopping Cart */
  updateItemInShoppingCart: ShoppingCart;
  /** Updates an existing blacklisted mobile number entry. ROLE_STAFF only. */
  updateMobileNumberBlacklistEntry: MobileNumberBlackListEntry;
  /** Updates a payment link */
  updatePaymentLink: PaymentLink;
  /** Super admin only. Replaces every editable field of a package at once, like the Twig edit form: an omitted or blank string clears that field. A package with muviEnabled needs muviNumberOfDays of at least 1; without it muviNumberOfDays is cleared. A deleted package answers ProductNotFound. */
  updateProduct: UpdateProductResultUnion;
  /** Super admin only. Moves each listed package into its category and gives it its 1-based position there, in the order given. Every id must be a package of the site that Mindbody still lists; otherwise ProductNotFound is answered and nothing changes. Answers the site's whole list afterwards. */
  updateProductsOrder: UpdateProductsOrderResultUnion;
  /** Updates the Mindbody ID for a site customer. Admin only. Errors: site_customer.not_found, site_customer.invalid_mindbody_id. */
  updateSiteCustomerMindbodyId: Scalars['Boolean']['output'];
  /** Updates system settings. ROLE_SUPER_ADMIN only. */
  updateSystemSettings: SystemSettings;
  updateUserPassword?: Maybe<Scalars['Boolean']['output']>;
  /** Redeems the token from a password reset email. No authentication - the token is the only credential the caller has. Does not consume it: resetPassword does that, once the new password has actually been set. */
  validateResetPasswordToken: ValidateResetPasswordTokenResultUnion;
  /** Manually verifies a customer's phone number. Admin only. Errors: customer.not_found, customer.phone_verification_not_found. */
  verifyCustomerPhoneNumber: Scalars['Boolean']['output'];
};


export type MutationAcceptLateCancelledSpotInClassArgs = {
  input: AcceptLateCancelledSpotInClassInput;
  site?: InputMaybe<SiteEnum>;
};


export type MutationAddAdminUserArgs = {
  input: AdminUserDataInput;
};


export type MutationAddDeviceTokenToCurrentUserArgs = {
  input?: InputMaybe<DeviceTokenInput>;
  site?: InputMaybe<SiteEnum>;
};


export type MutationAddDiscountCodeToShoppingCartArgs = {
  discountCode: Scalars['String']['input'];
};


export type MutationAddGiftCardCodeToShoppingCartArgs = {
  giftcard: Scalars['ID']['input'];
};


export type MutationAddItemToShoppingCartArgs = {
  input?: InputMaybe<ItemToShoppingCartInput>;
};


export type MutationBookClassArgs = {
  input: BookClassInput;
  site: SiteEnum;
};


export type MutationBookUserIntoClassArgs = {
  input: BookUserIntoClassInput;
};


export type MutationBulkActivateVodArgs = {
  input: BulkActivateVodInput;
};


export type MutationBulkDeactivateVodArgs = {
  mindbodyIds: Array<Scalars['Int']['input']>;
};


export type MutationCancelCurrentUserEnrollmentArgs = {
  input: CancelEnrollmentInput;
  site: SiteEnum;
};


export type MutationCheckinUserInClassArgs = {
  input: CheckinUserInClass;
  site: SiteEnum;
};


export type MutationCheckoutUserInClassArgs = {
  input: CheckoutUserInClass;
  site: SiteEnum;
};


export type MutationCreateCurrentUserInSiteArgs = {
  fromSite: SiteEnum;
  toSite: SiteEnum;
};


export type MutationCreateCustomTransactionRequestArgs = {
  input: CreateCustomTransactionRequestInput;
};


export type MutationCreateCustomerVodPeriodArgs = {
  customerId: Scalars['ID']['input'];
  input: CreateCustomerVodPeriodInput;
};


export type MutationCreateMobileNumberBlacklistEntryArgs = {
  input: CreateMobileNumberBlacklistInput;
};


export type MutationCreatePaymentLinkArgs = {
  input: CreatePaymentLinkInput;
};


export type MutationCreateRoomLayoutArgs = {
  input: RoomLayoutInput;
  site: SiteEnum;
};


export type MutationDeleteCurrentUserAccountArgs = {
  site: SiteEnum;
  userPassword: Scalars['String']['input'];
};


export type MutationDeleteCustomerVodPeriodArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteDeviceTokenToCurrentUserArgs = {
  input?: InputMaybe<DeviceTokenInput>;
  site?: InputMaybe<SiteEnum>;
};


export type MutationDeleteMobileNumberBlacklistEntryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePaymentLinkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRoomLayoutArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDisableSpotArgs = {
  input?: InputMaybe<DisableEnableSpotInput>;
};


export type MutationDiscardFailedMessageArgs = {
  input: FailedMessageActionInput;
};


export type MutationEditClassArgs = {
  input: EditClassInput;
};


export type MutationEditCurrentUserEnrollmentArgs = {
  input: EditEnrollmentInput;
  site: SiteEnum;
};


export type MutationEditEnrollmentArgs = {
  input: EditEnrollmentInput;
  site: SiteEnum;
};


export type MutationEditRoomLayoutArgs = {
  input: EditRoomLayoutInput;
  site: SiteEnum;
};


export type MutationEditUserArgs = {
  input: EditUserInput;
};


export type MutationEnableSpotArgs = {
  input?: InputMaybe<DisableEnableSpotInput>;
};


export type MutationExportCustomerVodArgs = {
  params?: InputMaybe<AdminCustomersParams>;
};


export type MutationExportTransactionRecordsArgs = {
  filter?: InputMaybe<TransactionRecordFilterInput>;
};


export type MutationLegacyApplePayMerchantSessionArgs = {
  site: SiteEnum;
  validationUrl: Scalars['String']['input'];
};


export type MutationLegacyApplyDiscountCodeArgs = {
  code: Scalars['String']['input'];
  merchantReference: Scalars['ID']['input'];
  site: SiteEnum;
};


export type MutationLegacyApplyGiftCardCodeArgs = {
  code: Scalars['String']['input'];
  merchantReference: Scalars['ID']['input'];
  site: SiteEnum;
};


export type MutationLegacyCompleteFreeCheckoutArgs = {
  merchantReference: Scalars['ID']['input'];
  site: SiteEnum;
};


export type MutationLegacyCreateGiftCardOrderArgs = {
  giftCardId: Scalars['ID']['input'];
  site: SiteEnum;
};


export type MutationLegacyDeleteSavedCardArgs = {
  creditCardId: Scalars['ID']['input'];
  site: SiteEnum;
};


export type MutationLegacyPayWithApplePayArgs = {
  input: LegacyPayWithApplePayInput;
  site: SiteEnum;
};


export type MutationLegacyPayWithSavedCardArgs = {
  input: LegacyPayWithSavedCardInput;
  site: SiteEnum;
};


export type MutationLegacyPayWithTabbyArgs = {
  input: LegacyPayWithTabbyInput;
  site: SiteEnum;
};


export type MutationLegacyPayfortFormArgs = {
  input: LegacyPayfortFormInput;
  site: SiteEnum;
};


export type MutationLegacyPaymentLinkApplePayMerchantSessionArgs = {
  paymentLinkId: Scalars['ID']['input'];
  validationUrl: Scalars['String']['input'];
};


export type MutationLegacyPaymentLinkPayWithApplePayArgs = {
  input: LegacyPaymentLinkPayWithApplePayInput;
};


export type MutationLegacyPaymentLinkPayWithTabbyArgs = {
  input: LegacyPaymentLinkPayWithTabbyInput;
};


export type MutationLegacyPaymentLinkPayfortFormArgs = {
  input: LegacyPaymentLinkPayfortFormInput;
};


export type MutationLegacyRemoveDiscountCodeArgs = {
  merchantReference: Scalars['ID']['input'];
  site: SiteEnum;
};


export type MutationLegacyRemoveGiftCardCodeArgs = {
  merchantReference: Scalars['ID']['input'];
  site: SiteEnum;
};


export type MutationLegacyStartCheckoutArgs = {
  input: LegacyStartCheckoutInput;
  site: SiteEnum;
};


export type MutationLegacyStartPaymentLinkCheckoutArgs = {
  paymentLinkId: Scalars['ID']['input'];
};


export type MutationPartnerIssueAccessTokenArgs = {
  input: PartnerIssueAccessTokenInput;
};


export type MutationPartnerRegisterUserArgs = {
  input: PartnerRegisterUserInput;
  site: SiteEnum;
};


export type MutationRefundTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRegisterIdentifiableUserArgs = {
  input: RegisterUserInput;
  site: SiteEnum;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
  site: SiteEnum;
};


export type MutationRejectLateCancelledSpotInClassArgs = {
  input: RejectLateCancelledSpotInClassInput;
  site?: InputMaybe<SiteEnum>;
};


export type MutationRemoveAdminUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCurrentUserFromWaitlistArgs = {
  input: RemoveCurrentUserFromWaitlistInput;
  site: SiteEnum;
};


export type MutationRemoveCustomerPhoneVerificationArgs = {
  customerId: Scalars['ID']['input'];
};


export type MutationRemoveItemFromShoppingCartArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserFromClassArgs = {
  input: CancelEnrollmentInput;
};


export type MutationRemoveUserFromWaitlistArgs = {
  input: RemoveUserFromWaitlistInput;
};


export type MutationRequestPasswordLinkArgs = {
  input?: InputMaybe<RequestPasswordLinkInput>;
};


export type MutationRequestSmsValidationArgs = {
  input: RequestSmsValidationInput;
};


export type MutationResetAdminUserPasswordArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationResetPasswordForCurrentUserArgs = {
  input?: InputMaybe<ResetPasswordForCurrentUserInput>;
};


export type MutationRetryFailedMessageArgs = {
  input: FailedMessageActionInput;
};


export type MutationRetryTransactionFeedbackArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSendClassStatsToEmailArgs = {
  input: SendClassStatsToEmailInput;
};


export type MutationSendClassStatsToUsersArgs = {
  classId: Scalars['ID']['input'];
};


export type MutationSetRoomLayoutForClassSchedulesArgs = {
  input: SetRoomLayoutForClassSchedulesInput;
};


export type MutationSwapSpotArgs = {
  input: EditEnrollmentInput;
  site: SiteEnum;
};


export type MutationSyncAllClassSchedulesArgs = {
  site: SiteEnum;
};


export type MutationSyncAllClassesArgs = {
  site: SiteEnum;
};


export type MutationSyncAllMindbodyStaffArgs = {
  site: SiteEnum;
};


export type MutationSyncClassArgs = {
  classId: Scalars['ID']['input'];
  site: SiteEnum;
};


export type MutationSyncClassWithPiqArgs = {
  classId: Scalars['ID']['input'];
  site: SiteEnum;
};


export type MutationSyncCustomerWithMindbodyArgs = {
  customerId: Scalars['ID']['input'];
  site: SiteEnum;
};


export type MutationSyncProductsArgs = {
  site: SiteEnum;
};


export type MutationUpdateAdminUserArgs = {
  input: UpdateAdminUserInput;
};


export type MutationUpdateCurrentAdminUserArgs = {
  input: UpdateCurrentAdminUserInput;
};


export type MutationUpdateCurrentAdminUserFavoriteSiteArgs = {
  input?: InputMaybe<UpdateCurrentAdminUserFavoriteSiteInput>;
};


export type MutationUpdateCurrentAdminUserPasswordArgs = {
  input: UpdateCurrentUserPasswordInput;
};


export type MutationUpdateCurrentUserArgs = {
  input: UserInput;
};


export type MutationUpdateCurrentUserPasswordArgs = {
  input: UpdateCurrentUserPasswordInput;
  site: SiteEnum;
};


export type MutationUpdateCustomerGiftCardArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCustomerGiftCardInput;
};


export type MutationUpdateGiftCardArgs = {
  input: UpdateGiftCardInput;
};


export type MutationUpdateItemInShoppingCartArgs = {
  input?: InputMaybe<ItemToShoppingCartInput>;
};


export type MutationUpdateMobileNumberBlacklistEntryArgs = {
  id: Scalars['ID']['input'];
  input: UpdateMobileNumberBlacklistInput;
};


export type MutationUpdatePaymentLinkArgs = {
  input: UpdatePaymentLinkInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
};


export type MutationUpdateProductsOrderArgs = {
  input: Array<ProductCategoryOrderInput>;
  site: SiteEnum;
};


export type MutationUpdateSiteCustomerMindbodyIdArgs = {
  newMindbodyId: Scalars['String']['input'];
  siteCustomerId: Scalars['ID']['input'];
};


export type MutationUpdateSystemSettingsArgs = {
  input: UpdateSystemSettingsInput;
};


export type MutationUpdateUserPasswordArgs = {
  input: UpdateUserPasswordInput;
};


export type MutationValidateResetPasswordTokenArgs = {
  input: ValidateResetPasswordTokenInput;
};


export type MutationVerifyCustomerPhoneNumberArgs = {
  customerId: Scalars['ID']['input'];
};

export type NotValidResetPasswordTokenError = Error & {
  __typename: 'NotValidResetPasswordTokenError';
  code: Scalars['String']['output'];
};

export type OtherUserHasThisExternalIdError = Error & {
  __typename: 'OtherUserHasThisExternalIdError';
  code: Scalars['String']['output'];
  siteUser: IdentifiableSiteUser;
};

export type PaginatedAdminCustomers = {
  __typename: 'PaginatedAdminCustomers';
  items: Array<IdentifiableUser>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PaginatedAdminMindbodyClients = {
  __typename: 'PaginatedAdminMindbodyClients';
  items: Array<AdminMindbodyClient>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PaginatedClassStats = PaginatedResult & {
  __typename: 'PaginatedClassStats';
  classStats: Array<ClassStat>;
  total: Scalars['Int']['output'];
};

export type PaginatedEnrollments = PaginatedResult & {
  __typename: 'PaginatedEnrollments';
  enrollments: Array<Enrollment>;
  total: Scalars['Int']['output'];
};

export type PaginatedFailedMessages = PaginatedResult & {
  __typename: 'PaginatedFailedMessages';
  failedMessages: Array<FailedMessage>;
  total: Scalars['Int']['output'];
};

export type PaginatedIncompleteTransactionFeedbacks = {
  __typename: 'PaginatedIncompleteTransactionFeedbacks';
  items: Array<IncompleteTransactionFeedback>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PaginatedPurchases = PaginatedResult & {
  __typename: 'PaginatedPurchases';
  purchases: Array<Purchase>;
  total: Scalars['Int']['output'];
};

export type PaginatedResult = {
  total: Scalars['Int']['output'];
};

export type PaginatedTransactionRecords = {
  __typename: 'PaginatedTransactionRecords';
  items: Array<TransactionRecord>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** A token for one of the calling partner's users. Use it server-side only, and mint a new one once it expires. */
export type PartnerAccessToken = {
  __typename: 'PartnerAccessToken';
  accessToken: Scalars['String']['output'];
  /** Seconds until the token expires, counted from when it was minted. */
  expiresIn: Scalars['Int']['output'];
};

export type PartnerIssueAccessTokenInput = {
  /** The crankUserId partnerRegisterUser answered. */
  crankUserId: Scalars['ID']['input'];
};

export type PartnerIssueAccessTokenResultUnion = PartnerAccessToken | PartnerUserNotLinkedError;

/** A package the calling partner may sell. */
export type PartnerProduct = {
  __typename: 'PartnerProduct';
  /** The number of classes the package grants. */
  classCount: Scalars['Int']['output'];
  /** ISO 4217 code of the currency the partner charges in. */
  currency: Scalars['String']['output'];
  /** The package id. This is what a purchase event names. */
  id: Scalars['Int']['output'];
  /** The partner's price, as a decimal string with two decimals - "550.00". Not our storefront price. */
  price: Scalars['String']['output'];
  subtitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  /** How long the package is valid, in days from purchase. */
  validityDays: Scalars['Int']['output'];
};

/** The calling partner's catalogue for one site. */
export type PartnerProductList = {
  __typename: 'PartnerProductList';
  products: Array<PartnerProduct>;
};

export type PartnerProductsResultUnion = PartnerProductList;

/** RegisterUserInput without the password: a partner's users never sign in to CRANK directly. The email is a placeholder unique per user, not a real inbox. */
export type PartnerRegisterUserInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  birthdate: Scalars['Date']['input'];
  city?: InputMaybe<Scalars['String']['input']>;
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  emergencyContactName: Scalars['String']['input'];
  emergencyContactPhone: Scalars['String']['input'];
  emergencyContactRelationship?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  gender: GenderEnum;
  lastName: Scalars['String']['input'];
  leaderboardUsername: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  zipCode: Scalars['String']['input'];
};

export type PartnerRegisterUserResultUnion = PartnerUserRegistered | UserAlreadyRegisteredError;

/** The crankUserId does not name a user the calling key registered. The same answer whether it names another partner's user, a CRANK member, or nobody. */
export type PartnerUserNotLinkedError = Error & {
  __typename: 'PartnerUserNotLinkedError';
  code: Scalars['String']['output'];
};

export type PartnerUserRegistered = {
  __typename: 'PartnerUserRegistered';
  /** The CRANK customer id. Site-independent and stable: the same person always answers the same id, on every site they are registered on. */
  crankUserId: Scalars['ID']['output'];
};

export type PasswordsDontMatchError = Error & {
  __typename: 'PasswordsDontMatchError';
  code: Scalars['String']['output'];
};

export type PayfortFailedMessageDetails = {
  __typename: 'PayfortFailedMessageDetails';
  amount?: Maybe<Scalars['String']['output']>;
  merchantReference?: Maybe<Scalars['String']['output']>;
  responseMessage?: Maybe<Scalars['String']['output']>;
};

export type PaymentLink = {
  __typename: 'PaymentLink';
  amount: Scalars['Int']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  notificationEmailAddress: Scalars['String']['output'];
  site: Site;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

/** Error returned when a client does not have enough credit or allowance to book a class */
export type PaymentRequiredError = Error & {
  __typename: 'PaymentRequiredError';
  code: Scalars['String']['output'];
};

export type PositionAlreadyTakenError = Error & {
  __typename: 'PositionAlreadyTakenError';
  code: Scalars['String']['output'];
};

export enum PositionIconEnum {
  BenchSpot = 'benchSpot',
  BikeSpot = 'bikeSpot',
  Empty = 'empty',
  Fan = 'fan',
  Instructor = 'instructor',
  Speaker = 'speaker',
  /** @deprecated Use benchSpot or bikeSpot instead. */
  Spot = 'spot',
  Tv = 'tv'
}

export type ProductAlertBeforePurchasing = {
  __typename: 'ProductAlertBeforePurchasing';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ProductCategoryOrderInput = {
  category: ProductDisplayCategory;
  /** Package ids in display order. */
  productIds: Array<Scalars['ID']['input']>;
};

export enum ProductDisplayCategory {
  Membership = 'membership',
  Regular = 'regular',
  Special = 'special',
  Trial = 'trial',
  Vod = 'vod'
}

export type ProductNotFound = Error & {
  __typename: 'ProductNotFound';
  code: Scalars['String']['output'];
};

export type ProductNotFoundError = Error & {
  __typename: 'ProductNotFoundError';
  code: Scalars['String']['output'];
};

export enum ProductType {
  ClassPackage = 'classPackage'
}

export type ProductsInput = {
  type?: InputMaybe<ProductType>;
};

export type Purchase = {
  __typename: 'Purchase';
  activationDateTime: Scalars['DateTime']['output'];
  allowanceObtained: Scalars['Int']['output'];
  allowanceRemaining: Scalars['Int']['output'];
  /** Whether a package can be used or not */
  current: Scalars['Boolean']['output'];
  expirationDateTime: Scalars['DateTime']['output'];
  packageName: Scalars['String']['output'];
  paymentDateTime: Scalars['DateTime']['output'];
};

export type Query = {
  __typename: 'Query';
  /** Super admin only. Every package of the site Mindbody still lists, hidden ones included, with every field an admin edits. Ordered by category, then by displayOrder. Not the storefront list: use products for that. */
  adminProducts: Array<AdminProduct>;
  /** Returns a single admin user */
  adminUser?: Maybe<AdminUser>;
  /** Lists all the admin users */
  adminUsers: Array<AdminUser>;
  /** Returns a list of all the available class types for a given site */
  availableClassTypes: Array<Scalars['String']['output']>;
  /** Returns a list of all the available instructors */
  availableInstructors: Array<Instructor>;
  /** Returns a list of all the available sites */
  availableSites?: Maybe<Array<Site>>;
  /**
   * Returns a list of upcoming fitness classes for a specific site within an optional date range.
   *
   * Use this query to retrieve the class schedule, including details like instructor name, start time,
   * duration, capacity, and booking availability. Results are ordered chronologically by class start time.
   */
  calendarClasses: Array<Class>;
  /** Admin only. What the charge-client form offers a customer: products on sale (not deleted, not a membership or a trial, priced above zero) in a site the customer exists in, by site name then price. Empty for an unknown customer. */
  chargeableProducts: Array<ChargeableProduct>;
  /** Get a single class information */
  classInfo?: Maybe<ClassInfo>;
  /** Returns a list of all the class schedules for a given site */
  classSchedules: Array<ClassSchedule>;
  /** Returns the list of all available countries */
  countries?: Maybe<Array<Maybe<Country>>>;
  /** Returns all countries with phone codes for the blacklist form. ROLE_STAFF only. */
  countriesWithPhoneCodes: Array<CountryWithPhoneCode>;
  /** Returns a specific country by a given country code */
  country?: Maybe<Country>;
  /** Returns the current AdminUser */
  currentAdminUser: AdminUser;
  /** Returns information of the current CRANK challenge */
  currentCRANKChallenge: ChallengeInterface;
  /** Returns the current user by the given Authentication header */
  currentUser?: Maybe<User>;
  /**
   * List of classes where the user is already enrolled
   * @deprecated Use currentUserEnrollmentsPaginated instead
   */
  currentUserEnrollments: Array<Enrollment>;
  currentUserEnrollmentsPaginated: PaginatedEnrollments;
  /** List of purchases made by the current */
  currentUserPurchases?: Maybe<Array<Maybe<Purchase>>>;
  currentUserPurchasesPaginated: PaginatedPurchases;
  /** Get current user's ranking on a specific class */
  currentUserRankingInClass: UserInClassRanking;
  /** Get current user's workout stats for a specific enrollment */
  currentUserSingleWorkoutStat?: Maybe<ClassStat>;
  /**
   * Get current user's workout stats
   * @deprecated Use currentUserWorkoutStatsPaginated instead
   */
  currentUserWorkoutStats: Array<Maybe<ClassStat>>;
  currentUserWorkoutStatsPaginated: PaginatedClassStats;
  /** Admin only, ROLE_SUPER_ADMIN (the Twig nav's Pending Gift Cards). Paid gift card orders still waiting for an admin to issue their code and PDF, newest first. */
  customerGiftCards: Array<CustomerGiftCard>;
  /** Returns every VOD period of a customer, deleted ones included, newest start first. Admin only. Errors: customer.not_found. */
  customerVodPeriods: Array<AdminCustomerVodPeriod>;
  /** Returns a paginated list of customers, newest first, with the filters of the admin customer list. Admin only. */
  customers: PaginatedAdminCustomers;
  /** Returns a single failed Messenger message by its id, or null when the queue holds none. Super admin only. */
  failedMessage?: Maybe<FailedMessage>;
  /** Returns a paginated list of the failed Messenger messages in the given failure queue, oldest first. Super admin only. */
  failedMessages: PaginatedFailedMessages;
  /** Returns the list of all the available gift cards */
  giftCards: Array<GiftCard>;
  /** Lists TemporalTransactions whose feedback was received but did not complete, most recently updated first. Admin only. */
  incompleteTransactionFeedbacks: PaginatedIncompleteTransactionFeedbacks;
  /** Verifies whether an sms validation code is valid */
  isSMSValidationCodeValid?: Maybe<IsSmsValidationCodeValidUnion>;
  /**
   * TEMPORARY. The gift cards a customer may actually buy: listed by Mindbody and not withdrawn by an admin. This is the storefront catalogue.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges; replaced by products(site, input: {type: giftCard}).
   */
  legacyAvailableGiftCards: Array<LegacyGiftCard>;
  /**
   * TEMPORARY. Fully recalculated checkout summary for a temporal transaction (reprices via Mindbody with the stored discount and gift card codes, without persisting).
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges; replaced by the shoppingCart query.
   */
  legacyCheckoutSummary: LegacyCheckoutResultUnion;
  /**
   * TEMPORARY. Every gift card Mindbody still lists for a site, including ones an admin has taken off sale. Use legacyAvailableGiftCards to sell.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges; replaced by products(site, input: {type: giftCard}).
   */
  legacyGiftCards: Array<LegacyGiftCard>;
  /**
   * TEMPORARY. A payment link's public details, for the anonymous checkout page. No authentication: a payment link is a URL sent to someone with no account. Read-only.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges.
   */
  legacyPaymentLink: LegacyPaymentLinkResultUnion;
  /**
   * TEMPORARY. Payment state of a payment-link checkout, for polling after the gateway redirect. No authentication — the merchantReference is the only credential. Read-only.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges; replaced by paymentTransactionStatus.
   */
  legacyPaymentLinkPaymentStatus: LegacyPaymentStatusResultUnion;
  /**
   * TEMPORARY. Current payment state of a temporal transaction, for polling after the gateway redirect. Read-only.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges; replaced by paymentTransactionStatus.
   */
  legacyPaymentStatus: LegacyPaymentStatusResultUnion;
  /**
   * TEMPORARY. Class packages on sale for a site, ordered for display.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges; replaced by products(site, input).
   */
  legacyProducts: Array<LegacyProduct>;
  /**
   * TEMPORARY. The authenticated customer's active saved cards on this site — the site a card was tokenized on, since one customer is shared by every site they belong to.
   * @deprecated TEMPORARY stop-gap. Delete when KAN-231-shopping-cart-integration merges.
   */
  legacySavedCards: Array<LegacySavedCard>;
  /** Returns a single Mindbody client, or null when the id does not exist. ROLE_SUPER_ADMIN only. */
  mindbodyClient?: Maybe<AdminMindbodyClient>;
  /** Returns a paginated list of Mindbody clients. startDate and endDate are accepted and ignored. ROLE_SUPER_ADMIN only. */
  mindbodyClients: PaginatedAdminMindbodyClients;
  /** Returns a list of all MindbodyStaff records of a site. Admin only. */
  mindbodyStaffs: Array<MindbodyStaffInfo>;
  /** Returns all blacklisted mobile numbers. ROLE_STAFF only. */
  mobileNumberBlacklist: Array<MobileNumberBlackListEntry>;
  /** Partner only (X-API-Key with canIssueUserTokens, granted this site). The packages the calling partner may sell on this site, at the partner's price and in the partner's currency, ordered for display. Scoped to the key: two partners see two different lists. A site the key was not granted is refused; a key with no packages on it gets an empty list. */
  partnerProducts: PartnerProductsResultUnion;
  /** Returns a single payment link by ID */
  paymentLink?: Maybe<PaymentLink>;
  /** Returns a list of payment links */
  paymentLinks: Array<PaymentLink>;
  /** Returns a list of available products for a specific site */
  products: Array<SellableProductInterface>;
  /** Returns a specific room layout */
  roomLayout?: Maybe<RoomLayout>;
  /** Returns a list of available RoomLayouts for a site */
  roomLayouts: Array<RoomLayout>;
  /** Returns the matched users given the query provided */
  searchSiteUser?: Maybe<Array<Maybe<IdentifiableSiteUser>>>;
  /** Searches users matching the query against email, first name, or last name. Requires at least 3 characters. */
  searchUsers: Array<IdentifiableUser>;
  /** Returns a single workout stat */
  singleWorkoutStat?: Maybe<ClassStat>;
  /** Settings of a site */
  siteSettings: SiteSetting;
  /** Returns a user in a specific site */
  siteUser?: Maybe<IdentifiableSiteUser>;
  /** Exact match on email within a site. Indexed, unlike searchSiteUser — prefer this when the address is known. */
  siteUserByEmail?: Maybe<IdentifiableSiteUser>;
  /** Returns the system settings, saving the defaults first if they were never saved. ROLE_SUPER_ADMIN only. */
  systemSettings: SystemSettings;
  /** Returns a single transaction record by ID, or null when there is none. Staff only (ROLE_STAFF). */
  transactionRecord?: Maybe<TransactionRecord>;
  /** Returns a paginated list of transaction records, newest first. Staff only (ROLE_STAFF). */
  transactionRecords: PaginatedTransactionRecords;
  /** Returns a user */
  user?: Maybe<IdentifiableUser>;
  /** Returns the ranking of a user in a specific class */
  userRankingInClass?: Maybe<UserInClassRanking>;
  /** Returns a list of workhout stats */
  userWorkoutStats: Array<Maybe<ClassStat>>;
  userWorkoutStatsPaginated: PaginatedClassStats;
};


export type QueryAdminProductsArgs = {
  site: SiteEnum;
};


export type QueryAdminUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAvailableClassTypesArgs = {
  site?: InputMaybe<SiteEnum>;
};


export type QueryCalendarClassesArgs = {
  params?: InputMaybe<CalendarClassesParams>;
  site: SiteEnum;
};


export type QueryChargeableProductsArgs = {
  customerId: Scalars['ID']['input'];
};


export type QueryClassInfoArgs = {
  id: Scalars['ID']['input'];
  site: SiteEnum;
};


export type QueryClassSchedulesArgs = {
  site: SiteEnum;
};


export type QueryCountryArgs = {
  countryCode: Scalars['String']['input'];
};


export type QueryCurrentUserEnrollmentsArgs = {
  params?: InputMaybe<CurrentUserEnrollmentsParams>;
  site?: InputMaybe<SiteEnum>;
};


export type QueryCurrentUserEnrollmentsPaginatedArgs = {
  pagination?: InputMaybe<PaginationInput>;
  params?: InputMaybe<CurrentUserEnrollmentsParams>;
  site?: InputMaybe<SiteEnum>;
};


export type QueryCurrentUserPurchasesArgs = {
  site?: InputMaybe<SiteEnum>;
};


export type QueryCurrentUserPurchasesPaginatedArgs = {
  pagination?: InputMaybe<PaginationInput>;
  site?: InputMaybe<SiteEnum>;
};


export type QueryCurrentUserRankingInClassArgs = {
  params?: InputMaybe<UserInRankingParams>;
  site: SiteEnum;
};


export type QueryCurrentUserSingleWorkoutStatArgs = {
  enrollmentId: Scalars['ID']['input'];
};


export type QueryCurrentUserWorkoutStatsArgs = {
  site: SiteEnum;
};


export type QueryCurrentUserWorkoutStatsPaginatedArgs = {
  pagination?: InputMaybe<PaginationInput>;
  site: SiteEnum;
};


export type QueryCustomerVodPeriodsArgs = {
  customerId: Scalars['ID']['input'];
};


export type QueryCustomersArgs = {
  pagination?: InputMaybe<PaginationInput>;
  params?: InputMaybe<AdminCustomersParams>;
};


export type QueryFailedMessageArgs = {
  id: Scalars['ID']['input'];
  queue: FailedMessageQueueEnum;
};


export type QueryFailedMessagesArgs = {
  pagination?: InputMaybe<PaginationInput>;
  queue: FailedMessageQueueEnum;
};


export type QueryIncompleteTransactionFeedbacksArgs = {
  filter?: InputMaybe<IncompleteTransactionFeedbackFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryIsSmsValidationCodeValidArgs = {
  smsCode: Scalars['String']['input'];
};


export type QueryLegacyAvailableGiftCardsArgs = {
  site: SiteEnum;
};


export type QueryLegacyCheckoutSummaryArgs = {
  merchantReference: Scalars['ID']['input'];
  site: SiteEnum;
};


export type QueryLegacyGiftCardsArgs = {
  site: SiteEnum;
};


export type QueryLegacyPaymentLinkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLegacyPaymentLinkPaymentStatusArgs = {
  merchantReference: Scalars['ID']['input'];
};


export type QueryLegacyPaymentStatusArgs = {
  merchantReference: Scalars['ID']['input'];
  site: SiteEnum;
};


export type QueryLegacyProductsArgs = {
  site: SiteEnum;
};


export type QueryLegacySavedCardsArgs = {
  site: SiteEnum;
};


export type QueryMindbodyClientArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMindbodyClientsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  params?: InputMaybe<AdminMindbodyClientsParams>;
};


export type QueryMindbodyStaffsArgs = {
  site: SiteEnum;
};


export type QueryPartnerProductsArgs = {
  site: SiteEnum;
};


export type QueryPaymentLinkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPaymentLinksArgs = {
  site?: InputMaybe<SiteEnum>;
};


export type QueryProductsArgs = {
  input?: InputMaybe<ProductsInput>;
  site: SiteEnum;
};


export type QueryRoomLayoutArgs = {
  id: Scalars['ID']['input'];
  site: SiteEnum;
};


export type QueryRoomLayoutsArgs = {
  params?: InputMaybe<RoomLayoutsInput>;
  site: SiteEnum;
};


export type QuerySearchSiteUserArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
  site?: InputMaybe<SiteEnum>;
};


export type QuerySearchUsersArgs = {
  query: Scalars['String']['input'];
};


export type QuerySingleWorkoutStatArgs = {
  enrollmentId: Scalars['ID']['input'];
};


export type QuerySiteSettingsArgs = {
  site?: InputMaybe<SiteEnum>;
};


export type QuerySiteUserArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySiteUserByEmailArgs = {
  email: Scalars['String']['input'];
  site: SiteEnum;
};


export type QueryTransactionRecordArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTransactionRecordsArgs = {
  filter?: InputMaybe<TransactionRecordFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserRankingInClassArgs = {
  classId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryUserWorkoutStatsArgs = {
  site: SiteEnum;
  userId: Scalars['ID']['input'];
};


export type QueryUserWorkoutStatsPaginatedArgs = {
  pagination?: InputMaybe<PaginationInput>;
  site: SiteEnum;
  userId: Scalars['ID']['input'];
};

export type RegisterUserInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  birthdate: Scalars['Date']['input'];
  city?: InputMaybe<Scalars['String']['input']>;
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  emergencyContactName: Scalars['String']['input'];
  emergencyContactPhone: Scalars['String']['input'];
  emergencyContactRelationship?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  gender: GenderEnum;
  lastName: Scalars['String']['input'];
  leaderboardUsername: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  zipCode: Scalars['String']['input'];
};

export type RejectLateBookingResultUnion = PositionAlreadyTakenError | RejectLateCancelledSpotInClassSuccess;

export type RejectLateCancelledSpotInClassInput = {
  waitlistEntryId: Scalars['ID']['input'];
};

export type RejectLateCancelledSpotInClassSuccess = {
  __typename: 'RejectLateCancelledSpotInClassSuccess';
  success: Scalars['Boolean']['output'];
};

export type RemoveCurrentUserFromWaitlistInput = {
  waitlistEntryId: Scalars['ID']['input'];
};

export type RemoveCurrentUserFromWaitlistUnion = RemoveFromWaitlistResult | WaitlistEntryNotFoundError;

export type RemoveFromWaitlistResult = {
  __typename: 'RemoveFromWaitlistResult';
  success: Scalars['Boolean']['output'];
};

export type RemoveUserFromWaitlistInput = {
  waitlistEntryId: Scalars['ID']['input'];
};

export type RemoveUserFromWaitlistUnion = RemoveFromWaitlistResult | WaitlistEntryNotFoundError;

export type RequestPasswordLinkInput = {
  email: Scalars['String']['input'];
};

export type RequestSmsValidationInput = {
  countryCode: Scalars['String']['input'];
  mobilePhone: Scalars['String']['input'];
};

export type RequestSmsValidationNeededError = Error & {
  __typename: 'RequestSMSValidationNeededError';
  code: Scalars['String']['output'];
};

export type ResetPasswordForCurrentUserInput = {
  password: Scalars['String']['input'];
  repeatedPassword: Scalars['String']['input'];
};

export type ResetPasswordForCurrentUserUnion = PasswordsDontMatchError | ResetPasswordSuccess;

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  repeatedPassword: Scalars['String']['input'];
  /** The token from the reset email - the same one passed to validateResetPasswordToken. */
  token: Scalars['String']['input'];
};

export type ResetPasswordLinkResultUnion = ResetPasswordLinkSentSuccessfully | TooManyResetPasswordLinkRequestsError;

export type ResetPasswordLinkSentSuccessfully = {
  __typename: 'ResetPasswordLinkSentSuccessfully';
  status: Scalars['Boolean']['output'];
};

export type ResetPasswordResultUnion = NotValidResetPasswordTokenError | PasswordsDontMatchError | ResetPasswordSuccess;

export type ResetPasswordSuccess = {
  __typename: 'ResetPasswordSuccess';
  status: Scalars['Boolean']['output'];
};

/** The access token for the customer the reset token belongs to. No refresh token: gesdinet is in cookie mode, so refresh tokens are only ever issued as a Set-Cookie by the REST login endpoints. */
export type ResetPasswordTokenValid = {
  __typename: 'ResetPasswordTokenValid';
  accessToken: Scalars['String']['output'];
};

export type RoomLayout = {
  __typename: 'RoomLayout';
  capacity: Scalars['Int']['output'];
  columns: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  matrix?: Maybe<Array<ClassPositionInterface>>;
  name: Scalars['String']['output'];
  rows: Scalars['Int']['output'];
};

export type RoomLayoutInUseError = Error & {
  __typename: 'RoomLayoutInUseError';
  code: Scalars['String']['output'];
};

export type RoomLayoutInput = {
  columns: Scalars['Int']['input'];
  matrix: Array<IconPositionInput>;
  name: Scalars['String']['input'];
  rows: Scalars['Int']['input'];
};

export type RoomLayoutsInput = {
  /** Amount of usable spots in the class */
  usersCapacity?: InputMaybe<Scalars['Int']['input']>;
};

export type SmsCodeValidatedSuccessfully = {
  __typename: 'SMSCodeValidatedSuccessfully';
  success: Scalars['Boolean']['output'];
};

export type SmsValidationCodeError = Error & {
  __typename: 'SMSValidationCodeError';
  code: Scalars['String']['output'];
};

export type SmsValidationUnion = MobilePhoneAlreadyVerifiedError | MobilePhoneNotValidError | SuccessfulRequestSmsValidation;

export type SellableProductInterface = {
  alertBeforePurchasing?: Maybe<ProductAlertBeforePurchasing>;
  buttonText?: Maybe<Scalars['String']['output']>;
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isVisible: Scalars['Boolean']['output'];
  price: Scalars['Float']['output'];
  subtitle: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type SendClassStatsToEmailInput = {
  email: Scalars['String']['input'];
  enrollmentId: Scalars['ID']['input'];
};

export type Service = {
  __typename: 'Service';
  activationDate?: Maybe<Scalars['DateTime']['output']>;
  expirationDate?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  paymentDate?: Maybe<Scalars['DateTime']['output']>;
  remainingCredits: Scalars['Int']['output'];
  totalCredits?: Maybe<Scalars['Int']['output']>;
};

export enum ServiceFilterEnum {
  /** Only services with remainingCredits > 0 (default). */
  Active = 'active',
  /** Every service the customer has ever owned in this site, including exhausted ones. */
  All = 'all'
}

export type SetRoomLayoutForClassSchedulesInput = {
  classSchedulesIds: Array<Scalars['ID']['input']>;
  roomLayoutId?: InputMaybe<Scalars['ID']['input']>;
};

export type ShoppingCart = {
  __typename: 'ShoppingCart';
  currency: Scalars['String']['output'];
  discountCode?: Maybe<Scalars['String']['output']>;
  giftCardCode?: Maybe<Scalars['String']['output']>;
  items: Array<ShoppingCartItem>;
  subTotal: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type ShoppingCartItem = {
  __typename: 'ShoppingCartItem';
  id: Scalars['ID']['output'];
  product: SellableProductInterface;
  quantity: Scalars['Int']['output'];
  subtotal: Scalars['Float']['output'];
};

export type SimpleSiteUser = {
  __typename: 'SimpleSiteUser';
  externalUserId: Scalars['ID']['output'];
  site: SiteEnum;
};

export type Site = {
  __typename: 'Site';
  code: SiteEnum;
  name: Scalars['String']['output'];
};

/**
 * Available CRANK fitness studio locations.
 *
 * Each site has its own class schedule, instructors, and facility configuration.
 */
export enum SiteEnum {
  /** CRANK Abu Dhabi location */
  AbuDhabi = 'abu_dhabi',
  /** CRANK Dubai location */
  Dubai = 'dubai',
  /** CRANK Qatar location */
  Qatar = 'qatar',
  /** CRANK Town Square location */
  TownSquare = 'town_square'
}

export type SiteSetting = {
  __typename: 'SiteSetting';
  isSynchronizingClasses: Scalars['Boolean']['output'];
  siteDateTimeNow?: Maybe<Scalars['DateTime']['output']>;
  siteTimezone?: Maybe<Scalars['String']['output']>;
};

export type SiteUserInput = {
  externalUserId: Scalars['ID']['input'];
  site: SiteEnum;
};

/** Error returned when trying to book a class with a spot that is already booked */
export type SpotAlreadyReservedError = Error & {
  __typename: 'SpotAlreadyReservedError';
  code: Scalars['String']['output'];
};

export type SpotInfo = {
  __typename: 'SpotInfo';
  /** @deprecated Array of booked spots should be returned by other query to reduce complexity of creating SpotInfo instances. */
  isBooked: Scalars['Boolean']['output'];
  spotNumber: Scalars['Int']['output'];
};

export type SpotIsDisabledError = Error & {
  __typename: 'SpotIsDisabledError';
  code: Scalars['String']['output'];
};

export type SpotNotFoundError = Error & {
  __typename: 'SpotNotFoundError';
  code: Scalars['String']['output'];
};

export type State = {
  __typename: 'State';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type SuccessfulRequestSmsValidation = {
  __typename: 'SuccessfulRequestSMSValidation';
  success: Scalars['Boolean']['output'];
};

export type SwapSpotResultUnion = SwapSpotSuccess | TryToSwitchToSameSpotError;

export type SwapSpotSuccess = {
  __typename: 'SwapSpotSuccess';
  affectedEnrollment?: Maybe<EnrollmentInfoInterface>;
  selectedEnrollment: EnrollmentInfoInterface;
};

export type SystemSettings = {
  __typename: 'SystemSettings';
  id: Scalars['ID']['output'];
  sendSuccessfulPurchaseEmail: Scalars['Boolean']['output'];
  textBottomIndexPage?: Maybe<Scalars['String']['output']>;
};

export type TooManyResetPasswordLinkRequestsError = Error & {
  __typename: 'TooManyResetPasswordLinkRequestsError';
  availableAgainAt?: Maybe<Scalars['DateTime']['output']>;
  code: Scalars['String']['output'];
};

export type TransactionItem = {
  __typename: 'TransactionItem';
  amount?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

/** A payment recorded by the Payfort checkout, as the admin sees it. */
export type TransactionRecord = {
  __typename: 'TransactionRecord';
  amount?: Maybe<Scalars['String']['output']>;
  /** Mindbody's payment code for the purchase. */
  authorizationCode?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  creditCardChargeId?: Maybe<Scalars['String']['output']>;
  creditCardHolderName?: Maybe<Scalars['String']['output']>;
  creditCardLastFourDigits?: Maybe<Scalars['String']['output']>;
  customerEmail?: Maybe<Scalars['String']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  installments?: Maybe<Scalars['Int']['output']>;
  /** Whether refundTransaction would accept it now: not refunded yet and, when there is an amount, within the refund window. */
  isRefundable: Scalars['Boolean']['output'];
  items: Array<TransactionItem>;
  /** Mindbody's payment record id. */
  merchantPurchaseId?: Maybe<Scalars['Int']['output']>;
  /** The raw response Mindbody returned to the checkout. */
  merchantResponse?: Maybe<Scalars['String']['output']>;
  /** The payment went through but the Mindbody checkout failed. */
  mindbodyCheckoutFail: Scalars['Boolean']['output'];
  /** The authorization code in Payfort's response. */
  payfortAuthorizationCode?: Maybe<Scalars['String']['output']>;
  /** The raw response Payfort returned to the payment. */
  paymentGatewayResponse?: Maybe<Scalars['String']['output']>;
  /** creditCard, digitalWallet, applePay, AMEX or tabby, read from Payfort's response; null when there is no response. */
  paymentMethod?: Maybe<Scalars['String']['output']>;
  refundDate?: Maybe<Scalars['DateTime']['output']>;
  /** The raw response Payfort returned to the refund. */
  refundResponse?: Maybe<Scalars['String']['output']>;
  serviceExpirationDate?: Maybe<Scalars['DateTime']['output']>;
  siteCustomer?: Maybe<IdentifiableSiteUser>;
  siteName?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  subTotal?: Maybe<Scalars['String']['output']>;
  taxAmount?: Maybe<Scalars['String']['output']>;
  userCountry?: Maybe<Scalars['String']['output']>;
};

export type TransactionRecordFilterInput = {
  /** Until the end of this day. */
  endDate?: InputMaybe<Scalars['Date']['input']>;
  /** creditCard, digitalWallet, applePay, amex or tabby (or CREDIT_CARD, DIGITAL_WALLET, APPLE_PAY, AMEX, TABBY). */
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  /** Matches the customer's full name, phone number or email. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** A site code, e.g. dubai. */
  site?: InputMaybe<Scalars['String']['input']>;
  /** From this day. Without endDate, until now. */
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type TryToSwitchToSameSpotError = Error & {
  __typename: 'TryToSwitchToSameSpotError';
  code: Scalars['String']['output'];
};

export type UnknownError = Error & {
  __typename: 'UnknownError';
  code: Scalars['String']['output'];
};

export type UpdateAdminUserInput = {
  adminUserId: Scalars['ID']['input'];
  userDataInput: AdminUserDataInput;
};

export type UpdateCurrentAdminUserFavoriteSiteInput = {
  favoriteSite?: InputMaybe<SiteEnum>;
};

export type UpdateCurrentAdminUserInput = {
  showCancelledClasses: Scalars['Boolean']['input'];
};

export type UpdateCurrentUserPasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type UpdateCustomerGiftCardInput = {
  /** The code Mindbody issued when the admin sold the card. */
  giftCardCode: Scalars['String']['input'];
  /** The gift card PDF the customer receives. A PDF of at most 2048 KB. */
  pdfGiftCard: Scalars['File']['input'];
};

export type UpdateCustomerGiftCardResultUnion = CustomerGiftCard | CustomerGiftCardNotFoundError | GiftCardCodeRequiredError | InvalidGiftCardPdfError;

export type UpdateGiftCardInput = {
  /** Whether CRANK offers this card for sale. Omit to leave it as it is. */
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  grandTotal?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateMobileNumberBlacklistInput = {
  countryId: Scalars['ID']['input'];
  mobilePhoneNumber: Scalars['String']['input'];
};

export type UpdatePaymentLinkInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  /** After a successful purchase an email will be sent to this email address with details about the payment (meant to be used by admins) */
  notificationEmailAddress: Scalars['String']['input'];
  site?: InputMaybe<SiteEnum>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  customTitle?: InputMaybe<Scalars['String']['input']>;
  doesItRequireSmsVerification: Scalars['Boolean']['input'];
  errorMessageWhenTryingToPurchase?: InputMaybe<Scalars['String']['input']>;
  isClassPassPackage: Scalars['Boolean']['input'];
  isMembership: Scalars['Boolean']['input'];
  isTrialPackage: Scalars['Boolean']['input'];
  isVisible: Scalars['Boolean']['input'];
  muviEnabled: Scalars['Boolean']['input'];
  muviNumberOfDays?: InputMaybe<Scalars['Int']['input']>;
  popupDescriptionAfterClickOnBuy?: InputMaybe<Scalars['String']['input']>;
  popupTitleAfterClickOnBuy?: InputMaybe<Scalars['String']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  textPayButton?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductResultUnion = AdminProduct | InvalidProductVodDaysError | ProductNotFound;

export type UpdateProductsOrderResultUnion = AdminProductList | ProductNotFound;

export type UpdateSystemSettingsInput = {
  sendSuccessfulPurchaseEmail: Scalars['Boolean']['input'];
  textBottomIndexPage?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserPasswordInput = {
  newPassword: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type User = {
  __typename: 'User';
  address1: Scalars['String']['output'];
  address2?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['Date']['output']>;
  city: Scalars['String']['output'];
  country?: Maybe<Country>;
  doesExistInSite: Scalars['Boolean']['output'];
  email: Scalars['String']['output'];
  emergencyContactName: Scalars['String']['output'];
  emergencyContactPhone: Scalars['String']['output'];
  emergencyContactRelationship?: Maybe<Scalars['String']['output']>;
  enrollmentInClass?: Maybe<EnrollmentInfoInterface>;
  /** @deprecated Use siteUsers instead */
  existsInSites: Array<SiteEnum>;
  firstName: Scalars['String']['output'];
  gender?: Maybe<GenderEnum>;
  hideMetrics?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the customer confirmed their phone number by SMS, or an admin verified it for them. */
  isMobilePhoneVerified: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  leaderboardUsername?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  /** Sum of remaining credits across every Mindbody service the customer owns, in any site. Sourced from mindbody_service rows kept up to date by webhooks. */
  remainingCredits: Scalars['Int']['output'];
  /** Sum of remaining credits across the customer's Mindbody services in the given site. */
  remainingCreditsBySite: Scalars['Int']['output'];
  shoppingCart?: Maybe<ShoppingCart>;
  /** @deprecated Use siteUsersNew instead — IdentifiableSiteUser exposes externalUserId and services per site. */
  siteUsers: Array<SimpleSiteUser>;
  siteUsersNew: Array<IdentifiableSiteUser>;
  state?: Maybe<State>;
  weight?: Maybe<Scalars['Float']['output']>;
  zipCode: Scalars['String']['output'];
};


export type UserDoesExistInSiteArgs = {
  site: SiteEnum;
};


export type UserEnrollmentInClassArgs = {
  classId: Scalars['ID']['input'];
};


export type UserRemainingCreditsBySiteArgs = {
  site: SiteEnum;
};

export type UserAlreadyExistsError = Error & {
  __typename: 'UserAlreadyExistsError';
  code: Scalars['String']['output'];
};

/** The email is already in use by a customer the calling partner did not create, either here or in Mindbody. Nothing was created or linked. */
export type UserAlreadyRegisteredError = Error & {
  __typename: 'UserAlreadyRegisteredError';
  code: Scalars['String']['output'];
};

export type UserInClassRanking = {
  __typename: 'UserInClassRanking';
  genderRanking?: Maybe<GenderRanking>;
  totalRanking?: Maybe<UserRanking>;
};

export type UserInRankingParams = {
  classId?: InputMaybe<Scalars['ID']['input']>;
};

export type UserInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['Date']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  emergencyContactName?: InputMaybe<Scalars['String']['input']>;
  emergencyContactPhone?: InputMaybe<Scalars['String']['input']>;
  emergencyContactRelationship?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderEnum>;
  hideMetrics?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  leaderboardUsername?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UserPasswordDoesNotMatchError = Error & {
  __typename: 'UserPasswordDoesNotMatchError';
  code: Scalars['String']['output'];
};

export type UserPositionInRanking = {
  __typename: 'UserPositionInRanking';
  positionInRanking: Scalars['Int']['output'];
  user: User;
};

export type UserRanking = {
  __typename: 'UserRanking';
  positionInRanking?: Maybe<Scalars['Int']['output']>;
  totalMembersInRanking?: Maybe<Scalars['Int']['output']>;
};

export type UsernameAlreadyUsedError = Error & {
  __typename: 'UsernameAlreadyUsedError';
  code: Scalars['String']['output'];
};

export type ValidateResetPasswordTokenInput = {
  token: Scalars['String']['input'];
};

export type ValidateResetPasswordTokenResultUnion = ExpiredResetPasswordTokenError | NotValidResetPasswordTokenError | ResetPasswordTokenValid;

export type WaitlistEntry = EnrollmentInfoInterface & {
  __typename: 'WaitlistEntry';
  canBeTurnedIntoEnrollment: Scalars['Boolean']['output'];
  enrollmentDateTime: Scalars['DateTime']['output'];
  enrollmentDateTimeWithNoTimeZone: Scalars['DateTimeWithoutTimeZone']['output'];
  enrollmentStatus: EnrollmentStatusEnum;
  id: Scalars['ID']['output'];
  identifiableSiteUser?: Maybe<IdentifiableSiteUser>;
};

export type WaitlistEntryNotFoundError = Error & {
  __typename: 'WaitlistEntryNotFoundError';
  code: Scalars['String']['output'];
};

export type WaitlistFullError = Error & {
  __typename: 'WaitlistFullError';
  code: Scalars['String']['output'];
};

export type ExportCustomerVodMutationVariables = Exact<{
  params?: InputMaybe<AdminCustomersParams>;
}>;


export type ExportCustomerVodMutation = { __typename: 'Mutation', exportCustomerVod: { __typename: 'AdminExport', fileName: string, url: string, expiresAt: any } };

export type ExportTransactionRecordsMutationVariables = Exact<{
  filter?: InputMaybe<TransactionRecordFilterInput>;
}>;


export type ExportTransactionRecordsMutation = { __typename: 'Mutation', exportTransactionRecords: { __typename: 'AdminExport', fileName: string, url: string, expiresAt: any } };

export type AdminProductsQueryVariables = Exact<{
  site: SiteEnum;
}>;


export type AdminProductsQuery = { __typename: 'Query', adminProducts: Array<{ __typename: 'AdminProduct', id: string, mindbodyId: string, name: string, price: number, category: ProductDisplayCategory, displayOrder: number, isVisible: boolean, customTitle?: string | null, subtitle?: string | null, textPayButton?: string | null, errorMessageWhenTryingToPurchase?: string | null, popupTitleAfterClickOnBuy?: string | null, popupDescriptionAfterClickOnBuy?: string | null, isMembership: boolean, isTrialPackage: boolean, isClassPassPackage: boolean, doesItRequireSmsVerification: boolean, muviEnabled: boolean, muviNumberOfDays?: number | null }> };

export type SyncProductsMutationVariables = Exact<{
  site: SiteEnum;
}>;


export type SyncProductsMutation = { __typename: 'Mutation', syncProducts: Array<{ __typename: 'AdminProduct', id: string, mindbodyId: string, name: string, price: number, category: ProductDisplayCategory, displayOrder: number, isVisible: boolean, customTitle?: string | null, subtitle?: string | null, textPayButton?: string | null, errorMessageWhenTryingToPurchase?: string | null, popupTitleAfterClickOnBuy?: string | null, popupDescriptionAfterClickOnBuy?: string | null, isMembership: boolean, isTrialPackage: boolean, isClassPassPackage: boolean, doesItRequireSmsVerification: boolean, muviEnabled: boolean, muviNumberOfDays?: number | null }> };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename: 'Mutation', updateProduct:
    | { __typename: 'AdminProduct', id: string, mindbodyId: string, name: string, price: number, category: ProductDisplayCategory, displayOrder: number, isVisible: boolean, customTitle?: string | null, subtitle?: string | null, textPayButton?: string | null, errorMessageWhenTryingToPurchase?: string | null, popupTitleAfterClickOnBuy?: string | null, popupDescriptionAfterClickOnBuy?: string | null, isMembership: boolean, isTrialPackage: boolean, isClassPassPackage: boolean, doesItRequireSmsVerification: boolean, muviEnabled: boolean, muviNumberOfDays?: number | null }
    | { __typename: 'InvalidProductVodDaysError', code: string }
    | { __typename: 'ProductNotFound', code: string }
   };

export type UpdateProductsOrderMutationVariables = Exact<{
  site: SiteEnum;
  input: Array<ProductCategoryOrderInput> | ProductCategoryOrderInput;
}>;


export type UpdateProductsOrderMutation = { __typename: 'Mutation', updateProductsOrder:
    | { __typename: 'AdminProductList', products: Array<{ __typename: 'AdminProduct', id: string, mindbodyId: string, name: string, price: number, category: ProductDisplayCategory, displayOrder: number, isVisible: boolean, customTitle?: string | null, subtitle?: string | null, textPayButton?: string | null, errorMessageWhenTryingToPurchase?: string | null, popupTitleAfterClickOnBuy?: string | null, popupDescriptionAfterClickOnBuy?: string | null, isMembership: boolean, isTrialPackage: boolean, isClassPassPackage: boolean, doesItRequireSmsVerification: boolean, muviEnabled: boolean, muviNumberOfDays?: number | null }> }
    | { __typename: 'ProductNotFound', code: string }
   };

export type BulkActivateVodMutationVariables = Exact<{
  input: BulkActivateVodInput;
}>;


export type BulkActivateVodMutation = { __typename: 'Mutation', bulkActivateVod: { __typename: 'BulkVodResult', processedCount: number } };

export type BulkDeactivateVodMutationVariables = Exact<{
  mindbodyIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type BulkDeactivateVodMutation = { __typename: 'Mutation', bulkDeactivateVod: { __typename: 'BulkVodResult', processedCount: number } };

export type CustomerGiftCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomerGiftCardsQuery = { __typename: 'Query', customerGiftCards: Array<{ __typename: 'CustomerGiftCard', id: string, status: CustomerGiftCardStatusEnum, giftCardCode?: string | null, senderName?: string | null, recipientName?: string | null, recipientEmail?: string | null, message?: string | null, createdAt: any, statusHistory: Array<{ __typename: 'CustomerGiftCardStatusChange', status: CustomerGiftCardStatusEnum, createdAt: any }>, giftCard: { __typename: 'GiftCard', id: string, description: string, site: { __typename: 'Site', name: string, code: SiteEnum } }, customer: { __typename: 'IdentifiableUser', id?: string | null, user?: { __typename: 'User', firstName: string, lastName: string, email: string } | null } }> };

export type UpdateCustomerGiftCardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateCustomerGiftCardInput;
}>;


export type UpdateCustomerGiftCardMutation = { __typename: 'Mutation', updateCustomerGiftCard:
    | { __typename: 'CustomerGiftCard', id: string, status: CustomerGiftCardStatusEnum, giftCardCode?: string | null }
    | { __typename: 'CustomerGiftCardNotFoundError', code: string }
    | { __typename: 'GiftCardCodeRequiredError', code: string }
    | { __typename: 'InvalidGiftCardPdfError', code: string, message: string }
   };

export type AdminCustomersQueryVariables = Exact<{
  params?: InputMaybe<AdminCustomersParams>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type AdminCustomersQuery = { __typename: 'Query', customers: { __typename: 'PaginatedAdminCustomers', totalCount: number, page: number, limit: number, items: Array<{ __typename: 'IdentifiableUser', id?: string | null, user?: { __typename: 'User', firstName: string, lastName: string, email: string, phone: string, isMobilePhoneVerified: boolean, siteUsers: Array<{ __typename: 'SimpleSiteUser', site: SiteEnum, externalUserId: string }> } | null }> } };

export type ChargeableProductsQueryVariables = Exact<{
  customerId: Scalars['ID']['input'];
}>;


export type ChargeableProductsQuery = { __typename: 'Query', chargeableProducts: Array<{ __typename: 'ChargeableProduct', id: string, name: string, price: number, site: { __typename: 'Site', name: string, code: SiteEnum } }> };

export type CreateCustomTransactionRequestMutationVariables = Exact<{
  input: CreateCustomTransactionRequestInput;
}>;


export type CreateCustomTransactionRequestMutation = { __typename: 'Mutation', createCustomTransactionRequest:
    | { __typename: 'CustomTransactionRequestSent', recipientEmail: string, paymentUrl: string }
    | { __typename: 'CustomerNotFoundError', code: string }
    | { __typename: 'ProductNotFoundError', code: string }
   };

export type UpdateSiteCustomerMindbodyIdMutationVariables = Exact<{
  siteCustomerId: Scalars['ID']['input'];
  newMindbodyId: Scalars['String']['input'];
}>;


export type UpdateSiteCustomerMindbodyIdMutation = { __typename: 'Mutation', updateSiteCustomerMindbodyId: boolean };

export type VerifyCustomerPhoneNumberMutationVariables = Exact<{
  customerId: Scalars['ID']['input'];
}>;


export type VerifyCustomerPhoneNumberMutation = { __typename: 'Mutation', verifyCustomerPhoneNumber: boolean };

export type RemoveCustomerPhoneVerificationMutationVariables = Exact<{
  customerId: Scalars['ID']['input'];
}>;


export type RemoveCustomerPhoneVerificationMutation = { __typename: 'Mutation', removeCustomerPhoneVerification: boolean };

export type SyncCustomerWithMindbodyMutationVariables = Exact<{
  customerId: Scalars['ID']['input'];
  site: SiteEnum;
}>;


export type SyncCustomerWithMindbodyMutation = { __typename: 'Mutation', syncCustomerWithMindbody: boolean };

export type CustomerAdminInfoQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CustomerAdminInfoQuery = { __typename: 'Query', user?: { __typename: 'IdentifiableUser', id?: string | null, user?: { __typename: 'User', firstName: string, lastName: string, email: string, phone: string, isMobilePhoneVerified: boolean, siteUsersNew: Array<{ __typename: 'IdentifiableSiteUser', id?: string | null, externalUserId: string, siteUserInfo?: { __typename: 'SimpleSiteUser', site: SiteEnum } | null }> } | null } | null };

export type CustomerIncompletePurchasesQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CustomerIncompletePurchasesQuery = { __typename: 'Query', incompleteTransactionFeedbacks: { __typename: 'PaginatedIncompleteTransactionFeedbacks', items: Array<{ __typename: 'IncompleteTransactionFeedback', id: string, merchantReference?: number | null, status: string, feedbackTryNumber: number, feedbackStatusUpdatedAt?: any | null, created: any, siteCustomer?: { __typename: 'IdentifiableSiteUser', id?: string | null, siteUserInfo?: { __typename: 'SimpleSiteUser', site: SiteEnum } | null, identifiableUser?: { __typename: 'IdentifiableUser', id?: string | null } | null } | null }> } };

export type CustomerRetryTransactionFeedbackMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CustomerRetryTransactionFeedbackMutation = { __typename: 'Mutation', retryTransactionFeedback: boolean };

export type CustomerVodPeriodsQueryVariables = Exact<{
  customerId: Scalars['ID']['input'];
}>;


export type CustomerVodPeriodsQuery = { __typename: 'Query', customerVodPeriods: Array<{ __typename: 'AdminCustomerVodPeriod', id: string, start: any, end: any, addedBy: string, addedByAdmin?: string | null, isDeleted: boolean, deletedAt?: any | null, createdAt?: any | null }> };

export type CreateCustomerVodPeriodMutationVariables = Exact<{
  customerId: Scalars['ID']['input'];
  input: CreateCustomerVodPeriodInput;
}>;


export type CreateCustomerVodPeriodMutation = { __typename: 'Mutation', createCustomerVodPeriod: { __typename: 'AdminCustomerVodPeriod', id: string } };

export type DeleteCustomerVodPeriodMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCustomerVodPeriodMutation = { __typename: 'Mutation', deleteCustomerVodPeriod: boolean };

export type DiscardFailedMessageMutationVariables = Exact<{
  input: FailedMessageActionInput;
}>;


export type DiscardFailedMessageMutation = { __typename: 'Mutation', discardFailedMessage:
    | { __typename: 'FailedMessageActionSuccess', success: boolean }
    | { __typename: 'FailedMessageNotFoundError', code: string }
   };

export type FailedMessageQueryVariables = Exact<{
  queue: FailedMessageQueueEnum;
  id: Scalars['ID']['input'];
}>;


export type FailedMessageQuery = { __typename: 'Query', failedMessage?: { __typename: 'FailedMessage', id: string, queue: FailedMessageQueueEnum, messageClass: string, summary?: string | null, exceptionClass?: string | null, errorMessage?: string | null, failedAt?: any | null, retryCount: number, originalTransport?: string | null, payfortDetails?: { __typename: 'PayfortFailedMessageDetails', merchantReference?: string | null, amount?: string | null, responseMessage?: string | null } | null } | null };

export type FailedMessagesQueryVariables = Exact<{
  queue: FailedMessageQueueEnum;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type FailedMessagesQuery = { __typename: 'Query', failedMessages: { __typename: 'PaginatedFailedMessages', total: number, failedMessages: Array<{ __typename: 'FailedMessage', id: string, queue: FailedMessageQueueEnum, messageClass: string, summary?: string | null, exceptionClass?: string | null, failedAt?: any | null, retryCount: number, originalTransport?: string | null, payfortDetails?: { __typename: 'PayfortFailedMessageDetails', merchantReference?: string | null, amount?: string | null, responseMessage?: string | null } | null }> } };

export type RetryFailedMessageMutationVariables = Exact<{
  input: FailedMessageActionInput;
}>;


export type RetryFailedMessageMutation = { __typename: 'Mutation', retryFailedMessage:
    | { __typename: 'FailedMessageActionSuccess', success: boolean }
    | { __typename: 'FailedMessageNotFoundError', code: string }
   };

export type IncompleteFeedbacksQueryVariables = Exact<{
  filter?: InputMaybe<IncompleteTransactionFeedbackFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type IncompleteFeedbacksQuery = { __typename: 'Query', incompleteTransactionFeedbacks: { __typename: 'PaginatedIncompleteTransactionFeedbacks', totalCount: number, page: number, limit: number, items: Array<{ __typename: 'IncompleteTransactionFeedback', id: string, merchantReference?: number | null, status: string, feedbackTryNumber: number, feedbackStatusUpdatedAt?: any | null, created: any, siteCustomer?: { __typename: 'IdentifiableSiteUser', id?: string | null, siteUserInfo?: { __typename: 'SimpleSiteUser', site: SiteEnum, externalUserId: string } | null, identifiableUser?: { __typename: 'IdentifiableUser', id?: string | null, user?: { __typename: 'User', firstName: string, lastName: string, email: string } | null } | null } | null }> } };

export type RetryTransactionFeedbackMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RetryTransactionFeedbackMutation = { __typename: 'Mutation', retryTransactionFeedback: boolean };

export type AdminMindbodyClientsQueryVariables = Exact<{
  params?: InputMaybe<AdminMindbodyClientsParams>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type AdminMindbodyClientsQuery = { __typename: 'Query', mindbodyClients: { __typename: 'PaginatedAdminMindbodyClients', totalCount: number, page: number, limit: number, items: Array<{ __typename: 'AdminMindbodyClient', id: string, clientId?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, mobilePhone?: string | null }> } };

export type AdminMindbodyClientQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AdminMindbodyClientQuery = { __typename: 'Query', mindbodyClient?: { __typename: 'AdminMindbodyClient', id: string, clientId?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, mobilePhone?: string | null } | null };

export type MindbodyStaffsQueryVariables = Exact<{
  site: SiteEnum;
}>;


export type MindbodyStaffsQuery = { __typename: 'Query', mindbodyStaffs: Array<{ __typename: 'MindbodyStaffInfo', id: string, firstName: string, lastName: string, email?: string | null }> };

export type SyncAllMindbodyStaffMutationVariables = Exact<{
  site: SiteEnum;
}>;


export type SyncAllMindbodyStaffMutation = { __typename: 'Mutation', syncAllMindbodyStaff: boolean };

export type MobileNumberBlacklistQueryVariables = Exact<{ [key: string]: never; }>;


export type MobileNumberBlacklistQuery = { __typename: 'Query', mobileNumberBlacklist: Array<{ __typename: 'MobileNumberBlackListEntry', id: string, mobilePhoneNumber: string, fullPhoneNumber: string, countryId: string, countryName: string, countryPhoneCode: string }> };

export type CountriesWithPhoneCodesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesWithPhoneCodesQuery = { __typename: 'Query', countriesWithPhoneCodes: Array<{ __typename: 'CountryWithPhoneCode', id: string, name: string, phoneCode: string, formattedPhoneCode: string }> };

export type CreateMobileNumberBlacklistEntryMutationVariables = Exact<{
  input: CreateMobileNumberBlacklistInput;
}>;


export type CreateMobileNumberBlacklistEntryMutation = { __typename: 'Mutation', createMobileNumberBlacklistEntry: { __typename: 'MobileNumberBlackListEntry', id: string, mobilePhoneNumber: string, fullPhoneNumber: string, countryId: string, countryName: string, countryPhoneCode: string } };

export type UpdateMobileNumberBlacklistEntryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateMobileNumberBlacklistInput;
}>;


export type UpdateMobileNumberBlacklistEntryMutation = { __typename: 'Mutation', updateMobileNumberBlacklistEntry: { __typename: 'MobileNumberBlackListEntry', id: string, mobilePhoneNumber: string, fullPhoneNumber: string, countryId: string, countryName: string, countryPhoneCode: string } };

export type DeleteMobileNumberBlacklistEntryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteMobileNumberBlacklistEntryMutation = { __typename: 'Mutation', deleteMobileNumberBlacklistEntry: boolean };

export type CreatePaymentLinkMutationVariables = Exact<{
  input: CreatePaymentLinkInput;
}>;


export type CreatePaymentLinkMutation = { __typename: 'Mutation', createPaymentLink: { __typename: 'PaymentLink', id: string, title: string, amount: number, currency: string, url: string, notificationEmailAddress: string, site: { __typename: 'Site', name: string, code: SiteEnum } } };

export type DeletePaymentLinkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePaymentLinkMutation = { __typename: 'Mutation', deletePaymentLink: boolean };

export type PaymentLinkQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PaymentLinkQuery = { __typename: 'Query', paymentLink?: { __typename: 'PaymentLink', id: string, title: string, amount: number, currency: string, url: string, notificationEmailAddress: string, site: { __typename: 'Site', name: string, code: SiteEnum } } | null };

export type PaymentLinksQueryVariables = Exact<{
  site?: InputMaybe<SiteEnum>;
}>;


export type PaymentLinksQuery = { __typename: 'Query', paymentLinks: Array<{ __typename: 'PaymentLink', id: string, title: string, amount: number, currency: string, url: string, notificationEmailAddress: string, site: { __typename: 'Site', name: string, code: SiteEnum } }> };

export type UpdatePaymentLinkMutationVariables = Exact<{
  input: UpdatePaymentLinkInput;
}>;


export type UpdatePaymentLinkMutation = { __typename: 'Mutation', updatePaymentLink: { __typename: 'PaymentLink', id: string, title: string, amount: number, currency: string, url: string, notificationEmailAddress: string, site: { __typename: 'Site', name: string, code: SiteEnum } } };

export type AdminAvailableSitesQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminAvailableSitesQuery = { __typename: 'Query', availableSites?: Array<{ __typename: 'Site', name: string, code: SiteEnum }> | null };

export type SystemSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SystemSettingsQuery = { __typename: 'Query', systemSettings: { __typename: 'SystemSettings', id: string, sendSuccessfulPurchaseEmail: boolean, textBottomIndexPage?: string | null } };

export type UpdateSystemSettingsMutationVariables = Exact<{
  input: UpdateSystemSettingsInput;
}>;


export type UpdateSystemSettingsMutation = { __typename: 'Mutation', updateSystemSettings: { __typename: 'SystemSettings', id: string, sendSuccessfulPurchaseEmail: boolean, textBottomIndexPage?: string | null } };

export type ClearSystemCacheMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearSystemCacheMutation = { __typename: 'Mutation', clearSystemCache: boolean };

export type TransactionRecordsQueryVariables = Exact<{
  filter?: InputMaybe<TransactionRecordFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type TransactionRecordsQuery = { __typename: 'Query', transactionRecords: { __typename: 'PaginatedTransactionRecords', totalCount: number, page: number, limit: number, items: Array<(
      { __typename: 'TransactionRecord', paymentMethod?: string | null }
      & { ' $fragmentRefs'?: { 'TransactionRecordListFieldsFragment': TransactionRecordListFieldsFragment } }
    )> } };

export type TransactionRecordQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TransactionRecordQuery = { __typename: 'Query', transactionRecord?: (
    { __typename: 'TransactionRecord', paymentMethod?: string | null, payfortAuthorizationCode?: string | null, serviceExpirationDate?: any | null, userCountry?: string | null, mindbodyCheckoutFail: boolean, merchantResponse?: string | null, paymentGatewayResponse?: string | null, refundResponse?: string | null }
    & { ' $fragmentRefs'?: { 'TransactionRecordDetailFieldsFragment': TransactionRecordDetailFieldsFragment } }
  ) | null };

export type TransactionRecordListFieldsFragment = { __typename: 'TransactionRecord', id: string, amount?: string | null, status?: string | null, created?: any | null, customerName?: string | null, customerEmail?: string | null, siteName?: string | null, isRefundable: boolean, creditCardLastFourDigits?: string | null, authorizationCode?: string | null, items: Array<{ __typename: 'TransactionItem', id?: string | null, name?: string | null, quantity?: number | null, amount?: string | null }> } & { ' $fragmentName'?: 'TransactionRecordListFieldsFragment' };

export type TransactionRecordDetailFieldsFragment = { __typename: 'TransactionRecord', id: string, creditCardChargeId?: string | null, creditCardHolderName?: string | null, creditCardLastFourDigits?: string | null, amount?: string | null, taxAmount?: string | null, subTotal?: string | null, status?: string | null, created?: any | null, refundDate?: any | null, authorizationCode?: string | null, installments?: number | null, merchantPurchaseId?: number | null, customerName?: string | null, customerEmail?: string | null, siteName?: string | null, isRefundable: boolean, siteCustomer?: { __typename: 'IdentifiableSiteUser', identifiableUser?: { __typename: 'IdentifiableUser', id?: string | null } | null } | null, items: Array<{ __typename: 'TransactionItem', id?: string | null, name?: string | null, quantity?: number | null, amount?: string | null }> } & { ' $fragmentName'?: 'TransactionRecordDetailFieldsFragment' };

export type RefundTransactionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RefundTransactionMutation = { __typename: 'Mutation', refundTransaction: boolean };

export type SiteSettingsQueryVariables = Exact<{
  site: SiteEnum;
}>;


export type SiteSettingsQuery = { __typename: 'Query', siteSettings: { __typename: 'SiteSetting', siteDateTimeNow?: any | null } };

export type ClassInfoAdminQueryVariables = Exact<{
  site: SiteEnum;
  id: Scalars['ID']['input'];
}>;


export type ClassInfoAdminQuery = { __typename: 'Query', classInfo?: { __typename: 'ClassInfo', onHoldSpots: number, orphanedClassStatsSpots: Array<number>, class: { __typename: 'Class', id: string, name: string, description: string, instructorName: string, start: any, startWithNoTimeZone: any, duration: number, waitListAvailable: boolean, showAsDisabled: boolean, maxCapacity: number, isSubstitute: boolean, hasClassStats: boolean, isSynchronizing: boolean }, roomLayout?: { __typename: 'RoomLayout', id: string, name: string, matrix?: Array<
        | { __typename: 'BookableSpot', enabled?: boolean | null, spotNumber: number, x: number, y: number, icon: PositionIconEnum }
        | { __typename: 'IconPosition', x: number, y: number, icon: PositionIconEnum }
      > | null } | null, enrollments: Array<
      | { __typename: 'EnrollmentInfo', isCheckedIn: boolean, spotNumber?: number | null, isBookedForFree: boolean, hasStats?: boolean | null, isFirstTimeInThisTypeOfClass: boolean, isFirstTimeWithThisInstructor: boolean, isTodayUserBirthday: boolean, isUserLeaderboardEnabled: boolean, bookedViaClassPass: boolean, serviceName?: string | null, id: string, enrollmentStatus: EnrollmentStatusEnum, enrollmentDateTime: any, identifiableSiteUser?: { __typename: 'IdentifiableSiteUser', id?: string | null, identifiableUser?: { __typename: 'IdentifiableUser', id?: string | null, user?: { __typename: 'User', firstName: string, lastName: string, email: string, leaderboardUsername?: string | null, gender?: GenderEnum | null } | null } | null } | null }
      | { __typename: 'WaitlistEntry', id: string, enrollmentStatus: EnrollmentStatusEnum, enrollmentDateTime: any, identifiableSiteUser?: { __typename: 'IdentifiableSiteUser', id?: string | null, identifiableUser?: { __typename: 'IdentifiableUser', id?: string | null, user?: { __typename: 'User', firstName: string, lastName: string, email: string, leaderboardUsername?: string | null, gender?: GenderEnum | null } | null } | null } | null }
    > } | null };

export type DisableSpotMutationVariables = Exact<{
  input?: InputMaybe<DisableEnableSpotInput>;
}>;


export type DisableSpotMutation = { __typename: 'Mutation', disableSpot?:
    | { __typename: 'DisableEnableSpotResult', result?: boolean | null }
    | { __typename: 'SpotNotFoundError', code: string }
   | null };

export type EnableSpotMutationVariables = Exact<{
  input?: InputMaybe<DisableEnableSpotInput>;
}>;


export type EnableSpotMutation = { __typename: 'Mutation', enableSpot?:
    | { __typename: 'DisableEnableSpotResult', result?: boolean | null }
    | { __typename: 'SpotNotFoundError', code: string }
   | null };

export type SearchSiteUserQueryVariables = Exact<{
  site: SiteEnum;
  query?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchSiteUserQuery = { __typename: 'Query', searchSiteUser?: Array<{ __typename: 'IdentifiableSiteUser', id?: string | null, identifiableUser?: { __typename: 'IdentifiableUser', id?: string | null, user?: { __typename: 'User', firstName: string, lastName: string, email: string } | null } | null } | null> | null };

export type BookUserIntoClassMutationVariables = Exact<{
  input: BookUserIntoClassInput;
}>;


export type BookUserIntoClassMutation = { __typename: 'Mutation', bookUserIntoClass:
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
   };

export type RemoveUserFromClassMutationVariables = Exact<{
  input: CancelEnrollmentInput;
}>;


export type RemoveUserFromClassMutation = { __typename: 'Mutation', removeUserFromClass:
    | { __typename: 'CancelUserEnrollmentSuccess' }
    | { __typename: 'LateCancellationRequiredError' }
    | { __typename: 'UnknownError' }
   };

export type EditClassMutationVariables = Exact<{
  input: EditClassInput;
}>;


export type EditClassMutation = { __typename: 'Mutation', editClass: { __typename: 'EditClassSuccessResult', updated: boolean } };

export type RoomLayoutsQueryVariables = Exact<{
  site: SiteEnum;
  params?: InputMaybe<RoomLayoutsInput>;
}>;


export type RoomLayoutsQuery = { __typename: 'Query', roomLayouts: Array<{ __typename: 'RoomLayout', id: string, name: string, capacity: number }> };

export type RoomLayoutQueryVariables = Exact<{
  site: SiteEnum;
  id: Scalars['ID']['input'];
}>;


export type RoomLayoutQuery = { __typename: 'Query', roomLayout?: { __typename: 'RoomLayout', id: string, name: string, columns: number, rows: number, matrix?: Array<
      | { __typename: 'BookableSpot', spotNumber: number, x: number, y: number, icon: PositionIconEnum }
      | { __typename: 'IconPosition', x: number, y: number, icon: PositionIconEnum }
    > | null } | null };

export type CreateRoomLayoutMutationVariables = Exact<{
  site: SiteEnum;
  input: RoomLayoutInput;
}>;


export type CreateRoomLayoutMutation = { __typename: 'Mutation', createRoomLayout: { __typename: 'RoomLayout', id: string } };

export type EditRoomLayoutMutationVariables = Exact<{
  site: SiteEnum;
  input: EditRoomLayoutInput;
}>;


export type EditRoomLayoutMutation = { __typename: 'Mutation', editRoomLayout: { __typename: 'RoomLayout', id: string } };

export type ClassWaitlistEntriesQueryVariables = Exact<{
  site: SiteEnum;
  id: Scalars['ID']['input'];
}>;


export type ClassWaitlistEntriesQuery = { __typename: 'Query', classInfo?: { __typename: 'ClassInfo', enrollments: Array<
      | { __typename: 'EnrollmentInfo', id: string, enrollmentStatus: EnrollmentStatusEnum, enrollmentDateTime: any, identifiableSiteUser?: { __typename: 'IdentifiableSiteUser', id?: string | null, identifiableUser?: { __typename: 'IdentifiableUser', id?: string | null, user?: { __typename: 'User', firstName: string, lastName: string, email: string } | null } | null } | null }
      | { __typename: 'WaitlistEntry', id: string, enrollmentStatus: EnrollmentStatusEnum, enrollmentDateTime: any, identifiableSiteUser?: { __typename: 'IdentifiableSiteUser', id?: string | null, identifiableUser?: { __typename: 'IdentifiableUser', id?: string | null, user?: { __typename: 'User', firstName: string, lastName: string, email: string } | null } | null } | null }
    > } | null };

export type RemoveUserFromWaitlistMutationVariables = Exact<{
  input: RemoveUserFromWaitlistInput;
}>;


export type RemoveUserFromWaitlistMutation = { __typename: 'Mutation', removeUserFromWaitlist:
    | { __typename: 'RemoveFromWaitlistResult', success: boolean }
    | { __typename: 'WaitlistEntryNotFoundError', code: string }
   };

export type CheckinUserInClassMutationVariables = Exact<{
  site: SiteEnum;
  input: CheckinUserInClass;
}>;


export type CheckinUserInClassMutation = { __typename: 'Mutation', checkinUserInClass?:
    | { __typename: 'CheckinSuccess', success: boolean }
    | { __typename: 'EnrollmentNotFoundError', code: string }
   | null };

export type CheckoutUserInClassMutationVariables = Exact<{
  site: SiteEnum;
  input: CheckoutUserInClass;
}>;


export type CheckoutUserInClassMutation = { __typename: 'Mutation', checkoutUserInClass?:
    | { __typename: 'CheckoutSuccess', success: boolean }
    | { __typename: 'EnrollmentNotFoundError', code: string }
   | null };

export type EditEnrollmentMutationVariables = Exact<{
  site: SiteEnum;
  input: EditEnrollmentInput;
}>;


export type EditEnrollmentMutation = { __typename: 'Mutation', editEnrollment?:
    | { __typename: 'ClientIsOutsideSchedulingWindowError', code: string }
    | { __typename: 'Enrollment' }
    | { __typename: 'SpotAlreadyReservedError', code: string }
    | { __typename: 'TryToSwitchToSameSpotError', code: string }
   | null };

export type SwapSpotMutationVariables = Exact<{
  site: SiteEnum;
  input: EditEnrollmentInput;
}>;


export type SwapSpotMutation = { __typename: 'Mutation', swapSpot?:
    | { __typename: 'SwapSpotSuccess' }
    | { __typename: 'TryToSwitchToSameSpotError', code: string }
   | null };

export type GetCalendarClassesForListQueryVariables = Exact<{
  site: SiteEnum;
  params?: InputMaybe<CalendarClassesParams>;
}>;


export type GetCalendarClassesForListQuery = { __typename: 'Query', calendarClasses: Array<{ __typename: 'Class', id: string, name: string, startWithNoTimeZone: any, maxCapacity: number, totalBooked: number, totalUnderMaintenanceSpots: number, showAsDisabled: boolean, instructorName: string }> };

export type ClassWaitlistIsEnabledQueryVariables = Exact<{
  site: SiteEnum;
  id: Scalars['ID']['input'];
}>;


export type ClassWaitlistIsEnabledQuery = { __typename: 'Query', classInfo?: { __typename: 'ClassInfo', class: { __typename: 'Class', waitListAvailable: boolean } } | null };

export type SyncClassMutationVariables = Exact<{
  site: SiteEnum;
  classId: Scalars['ID']['input'];
}>;


export type SyncClassMutation = { __typename: 'Mutation', syncClass: { __typename: 'ClassInfo', class: { __typename: 'Class', isSynchronizing: boolean } } };

export type SyncAllClassesMutationVariables = Exact<{
  site: SiteEnum;
}>;


export type SyncAllClassesMutation = { __typename: 'Mutation', syncAllClasses: boolean };

export type CountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesQuery = { __typename: 'Query', countries?: Array<{ __typename: 'Country', name: string, code: string } | null> | null };

export type CountryQueryVariables = Exact<{
  countryCode: Scalars['String']['input'];
}>;


export type CountryQuery = { __typename: 'Query', country?: { __typename: 'Country', name: string, code: string, states?: Array<{ __typename: 'State', name: string, code: string } | null> | null } | null };

export type RegisterUserMutationVariables = Exact<{
  site: SiteEnum;
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename: 'Mutation', registerIdentifiableUser?: { __typename: 'IdentifiableSiteUser', identifiableUser?: { __typename: 'IdentifiableUser', id?: string | null } | null } | null };

export type EditUserMutationVariables = Exact<{
  input: EditUserInput;
}>;


export type EditUserMutation = { __typename: 'Mutation', editUser?:
    | { __typename: 'IdentifiableUser', id?: string | null, user?: { __typename: 'User', email: string } | null }
    | { __typename: 'OtherUserHasThisExternalIdError' }
   | null };

export type RequestPasswordLinkMutationVariables = Exact<{
  input?: InputMaybe<RequestPasswordLinkInput>;
}>;


export type RequestPasswordLinkMutation = { __typename: 'Mutation', requestPasswordLink?:
    | { __typename: 'ResetPasswordLinkSentSuccessfully', status: boolean }
    | { __typename: 'TooManyResetPasswordLinkRequestsError', availableAgainAt?: any | null }
   | null };

export type GetUserSitesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserSitesQuery = { __typename: 'Query', user?: { __typename: 'IdentifiableUser', id?: string | null, user?: { __typename: 'User', siteUsers: Array<{ __typename: 'SimpleSiteUser', externalUserId: string, site: SiteEnum }> } | null } | null };

export type EditUserSitesMutationVariables = Exact<{
  input: EditUserInput;
}>;


export type EditUserSitesMutation = { __typename: 'Mutation', editUser?:
    | { __typename: 'IdentifiableUser', id?: string | null, user?: { __typename: 'User', email: string } | null }
    | { __typename: 'OtherUserHasThisExternalIdError', siteUser: { __typename: 'IdentifiableSiteUser', siteUserInfo?: { __typename: 'SimpleSiteUser', externalUserId: string, site: SiteEnum } | null, identifiableUser?: { __typename: 'IdentifiableUser', user?: { __typename: 'User', email: string } | null } | null } }
   | null };

export type ClassSchedulesQueryVariables = Exact<{
  site: SiteEnum;
}>;


export type ClassSchedulesQuery = { __typename: 'Query', classSchedules: Array<{ __typename: 'ClassSchedule', id: string, instructorName: string, dayOfWeek: string, startWithNoTimeZone: any, endWithNoTimeZone: any, type: string, capacity: number, roomLayout?: { __typename: 'RoomLayout', id: string, name: string } | null }> };

export type AvailableClassTypesQueryVariables = Exact<{
  site: SiteEnum;
}>;


export type AvailableClassTypesQuery = { __typename: 'Query', availableClassTypes: Array<string> };

export type SetRoomLayoutForClassSchedulesMutationVariables = Exact<{
  input: SetRoomLayoutForClassSchedulesInput;
}>;


export type SetRoomLayoutForClassSchedulesMutation = { __typename: 'Mutation', setRoomLayoutForClassSchedules: Array<{ __typename: 'ClassSchedule', id: string, instructorName: string, dayOfWeek: string, start: any, end: any, type: string, capacity: number, roomLayout?: { __typename: 'RoomLayout', id: string, name: string, capacity: number } | null }> };

export type UserWorkoutStatsQueryVariables = Exact<{
  site: SiteEnum;
  userId: Scalars['ID']['input'];
}>;


export type UserWorkoutStatsQuery = { __typename: 'Query', userWorkoutStats: Array<{ __typename: 'ClassStat', totalEnergy?: number | null, enrollment: { __typename: 'Enrollment', enrollmentInfo:
        | { __typename: 'EnrollmentInfo', spotNumber?: number | null, id: string }
        | { __typename: 'WaitlistEntry', id: string }
      , class: { __typename: 'Class', id: string, name: string, start: any, duration: number } } } | null> };

export type SingleWorkoutStatQueryVariables = Exact<{
  enrollmentId: Scalars['ID']['input'];
}>;


export type SingleWorkoutStatQuery = { __typename: 'Query', singleWorkoutStat?: { __typename: 'ClassStat', averagePower?: number | null, highPower?: number | null, averageRpm?: number | null, highRpm?: number | null, totalEnergy?: number | null, calories?: number | null, distance?: number | null, enrollment: { __typename: 'Enrollment', enrollmentInfo:
        | { __typename: 'EnrollmentInfo', spotNumber?: number | null, id: string }
        | { __typename: 'WaitlistEntry', id: string }
      , class: { __typename: 'Class', id: string, name: string, start: any, duration: number, instructorName: string } }, adjustedChartPoints: Array<{ __typename: 'ChartPoint', time?: number | null, rpm?: number | null, power?: number | null }> } | null };

export type UserRankingInClassQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  classId: Scalars['ID']['input'];
}>;


export type UserRankingInClassQuery = { __typename: 'Query', userRankingInClass?: { __typename: 'UserInClassRanking', totalRanking?: { __typename: 'UserRanking', positionInRanking?: number | null, totalMembersInRanking?: number | null } | null, genderRanking?: { __typename: 'GenderRanking', gender?: GenderEnum | null, ranking?: { __typename: 'UserRanking', positionInRanking?: number | null, totalMembersInRanking?: number | null } | null } | null } | null };

export type SendClassStatsToUsersMutationVariables = Exact<{
  classId: Scalars['ID']['input'];
}>;


export type SendClassStatsToUsersMutation = { __typename: 'Mutation', sendClassStatsToUsers?: boolean | null };

export type SendClassStatsToEmailMutationVariables = Exact<{
  input: SendClassStatsToEmailInput;
}>;


export type SendClassStatsToEmailMutation = { __typename: 'Mutation', sendClassStatsToEmail?: boolean | null };

export type UserWorkoutStatsPaginatedQueryVariables = Exact<{
  site: SiteEnum;
  userId: Scalars['ID']['input'];
  pagination?: InputMaybe<PaginationInput>;
}>;


export type UserWorkoutStatsPaginatedQuery = { __typename: 'Query', userWorkoutStatsPaginated: { __typename: 'PaginatedClassStats', total: number, classStats: Array<{ __typename: 'ClassStat', totalEnergy?: number | null, enrollment: { __typename: 'Enrollment', enrollmentInfo:
          | { __typename: 'EnrollmentInfo', spotNumber?: number | null, id: string }
          | { __typename: 'WaitlistEntry', id: string }
        , class: { __typename: 'Class', id: string, name: string, start: any, duration: number, startWithNoTimeZone: any, instructorName: string } } }> } };

export type SyncClassWithPiqMutationVariables = Exact<{
  site: SiteEnum;
  classId: Scalars['ID']['input'];
}>;


export type SyncClassWithPiqMutation = { __typename: 'Mutation', syncClassWithPIQ: { __typename: 'ClassInfo', class: { __typename: 'Class', isSynchronizing: boolean } } };

export type CheckIfClassIsSynchronizedQueryVariables = Exact<{
  site: SiteEnum;
  id: Scalars['ID']['input'];
}>;


export type CheckIfClassIsSynchronizedQuery = { __typename: 'Query', classInfo?: { __typename: 'ClassInfo', class: { __typename: 'Class', isSynchronizing: boolean } } | null };

export type CheckIfAllClassAreSynchronizedQueryVariables = Exact<{
  site: SiteEnum;
}>;


export type CheckIfAllClassAreSynchronizedQuery = { __typename: 'Query', siteSettings: { __typename: 'SiteSetting', isSynchronizingClasses: boolean } };

export type UpdateUserPasswordMutationVariables = Exact<{
  input: UpdateUserPasswordInput;
}>;


export type UpdateUserPasswordMutation = { __typename: 'Mutation', updateUserPassword?: boolean | null };

export type GiftCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GiftCardsQuery = { __typename: 'Query', giftCards: Array<{ __typename: 'GiftCard', id: string, description: string, salePrice: number, grandTotal: number, terms?: string | null, purchaseUrl: string, site: { __typename: 'Site', name: string, code: SiteEnum } }> };

export type UpdateGiftCardMutationVariables = Exact<{
  input: UpdateGiftCardInput;
}>;


export type UpdateGiftCardMutation = { __typename: 'Mutation', updateGiftCard: { __typename: 'GiftCard', id: string, description: string, salePrice: number, grandTotal: number, terms?: string | null, purchaseUrl: string, site: { __typename: 'Site', name: string, code: SiteEnum } } };

export type SyncAllGiftCardsMutationVariables = Exact<{ [key: string]: never; }>;


export type SyncAllGiftCardsMutation = { __typename: 'Mutation', syncAllGiftCards: boolean };

export type AvailableSitesQueryVariables = Exact<{ [key: string]: never; }>;


export type AvailableSitesQuery = { __typename: 'Query', availableSites?: Array<{ __typename: 'Site', name: string, code: SiteEnum }> | null };

export type AdminUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AdminUserQuery = { __typename: 'Query', adminUser?: { __typename: 'AdminUser', id: string, username: string, email: string, roles?: Array<string> | null, linkedInstructors?: Array<{ __typename: 'Instructor', id: string, name: string, site: { __typename: 'Site', code: SiteEnum, name: string } }> | null, linkedSites?: Array<{ __typename: 'Site', name: string, code: SiteEnum }> | null } | null };

export type AdminUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminUsersQuery = { __typename: 'Query', adminUsers: Array<{ __typename: 'AdminUser', id: string, username: string, email: string, roles?: Array<string> | null, linkedInstructors?: Array<{ __typename: 'Instructor', id: string, name: string, site: { __typename: 'Site', name: string, code: SiteEnum } }> | null, linkedSites?: Array<{ __typename: 'Site', name: string, code: SiteEnum }> | null, favoriteSite: { __typename: 'Site', name: string, code: SiteEnum } }> };

export type AvailableInstructorsQueryVariables = Exact<{ [key: string]: never; }>;


export type AvailableInstructorsQuery = { __typename: 'Query', availableInstructors: Array<{ __typename: 'Instructor', id: string, name: string, site: { __typename: 'Site', name: string, code: SiteEnum } }> };

export type ResetAdminUserPasswordMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ResetAdminUserPasswordMutation = { __typename: 'Mutation', resetAdminUserPassword: boolean };

export type UpdateAdminUserMutationVariables = Exact<{
  input: UpdateAdminUserInput;
}>;


export type UpdateAdminUserMutation = { __typename: 'Mutation', updateAdminUser:
    | { __typename: 'AdminUser', id: string, username: string, email: string, roles?: Array<string> | null, linkedInstructors?: Array<{ __typename: 'Instructor', id: string, name: string, site: { __typename: 'Site', name: string, code: SiteEnum } }> | null, linkedSites?: Array<{ __typename: 'Site', name: string, code: SiteEnum }> | null }
    | { __typename: 'EmailAlreadyUsedError', code: string }
    | { __typename: 'UsernameAlreadyUsedError', code: string }
   };

export type AddAdminUserMutationVariables = Exact<{
  input: AdminUserDataInput;
}>;


export type AddAdminUserMutation = { __typename: 'Mutation', addAdminUser:
    | { __typename: 'AdminUser', id: string, username: string, email: string, roles?: Array<string> | null, linkedInstructors?: Array<{ __typename: 'Instructor', id: string, name: string, site: { __typename: 'Site', name: string, code: SiteEnum } }> | null, linkedSites?: Array<{ __typename: 'Site', name: string, code: SiteEnum }> | null }
    | { __typename: 'EmailAlreadyUsedError', code: string }
    | { __typename: 'UsernameAlreadyUsedError', code: string }
   };

export type RemoveAdminUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveAdminUserMutation = { __typename: 'Mutation', removeAdminUser: boolean };

export type CurrentAdminUserSitesQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentAdminUserSitesQuery = { __typename: 'Query', currentAdminUser: { __typename: 'AdminUser', linkedSites?: Array<{ __typename: 'Site', name: string, code: SiteEnum }> | null, favoriteSite: { __typename: 'Site', name: string, code: SiteEnum } } };

export type UpdateCurrentAdminUserPasswordMutationVariables = Exact<{
  input: UpdateCurrentUserPasswordInput;
}>;


export type UpdateCurrentAdminUserPasswordMutation = { __typename: 'Mutation', updateCurrentAdminUserPassword?: boolean | null };

export type UpdateCurrentAdminUserFavoriteSiteMutationVariables = Exact<{
  input?: InputMaybe<UpdateCurrentAdminUserFavoriteSiteInput>;
}>;


export type UpdateCurrentAdminUserFavoriteSiteMutation = { __typename: 'Mutation', updateCurrentAdminUserFavoriteSite: { __typename: 'AdminUser', linkedSites?: Array<{ __typename: 'Site', name: string, code: SiteEnum }> | null, favoriteSite: { __typename: 'Site', name: string, code: SiteEnum } } };

export type UpdateCurrentAdminUserMutationVariables = Exact<{
  input: UpdateCurrentAdminUserInput;
}>;


export type UpdateCurrentAdminUserMutation = { __typename: 'Mutation', updateCurrentAdminUser: { __typename: 'AdminUser', id: string, username: string, email: string, roles?: Array<string> | null, showCancelledClasses: boolean, linkedInstructors?: Array<{ __typename: 'Instructor', id: string, name: string, site: { __typename: 'Site', code: SiteEnum, name: string } }> | null, linkedSites?: Array<{ __typename: 'Site', name: string, code: SiteEnum }> | null, favoriteSite: { __typename: 'Site', name: string, code: SiteEnum } } };

export type GetShowCancelledClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShowCancelledClassesQuery = { __typename: 'Query', currentAdminUser: { __typename: 'AdminUser', showCancelledClasses: boolean } };

export type CustomerProfileFieldsFragment = { __typename: 'User', firstName: string, lastName: string, email: string, leaderboardUsername?: string | null, weight?: number | null, gender?: GenderEnum | null, birthdate?: any | null, city: string, address1: string, address2?: string | null, zipCode: string, phone: string, emergencyContactName: string, emergencyContactPhone: string, emergencyContactRelationship?: string | null, hideMetrics?: boolean | null, existsInSites: Array<SiteEnum>, country?: { __typename: 'Country', code: string, name: string } | null, state?: { __typename: 'State', code: string, name: string } | null, siteUsers: Array<{ __typename: 'SimpleSiteUser', externalUserId: string, site: SiteEnum }> } & { ' $fragmentName'?: 'CustomerProfileFieldsFragment' };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename: 'Query', user?: { __typename: 'IdentifiableUser', id?: string | null, user?: (
      { __typename: 'User' }
      & { ' $fragmentRefs'?: { 'CustomerProfileFieldsFragment': CustomerProfileFieldsFragment } }
    ) | null } | null };

export type SyncAllClassSchedulesMutationVariables = Exact<{
  site: SiteEnum;
}>;


export type SyncAllClassSchedulesMutation = { __typename: 'Mutation', syncAllClassSchedules: boolean };

export const TransactionRecordListFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionRecordListFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"customerEmail"}},{"kind":"Field","name":{"kind":"Name","value":"siteName"}},{"kind":"Field","name":{"kind":"Name","value":"isRefundable"}},{"kind":"Field","name":{"kind":"Name","value":"creditCardLastFourDigits"}},{"kind":"Field","name":{"kind":"Name","value":"authorizationCode"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]} as unknown as DocumentNode<TransactionRecordListFieldsFragment, unknown>;
export const TransactionRecordDetailFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionRecordDetailFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"creditCardChargeId"}},{"kind":"Field","name":{"kind":"Name","value":"creditCardHolderName"}},{"kind":"Field","name":{"kind":"Name","value":"creditCardLastFourDigits"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"taxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"subTotal"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"refundDate"}},{"kind":"Field","name":{"kind":"Name","value":"authorizationCode"}},{"kind":"Field","name":{"kind":"Name","value":"installments"}},{"kind":"Field","name":{"kind":"Name","value":"merchantPurchaseId"}},{"kind":"Field","name":{"kind":"Name","value":"siteCustomer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identifiableUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"customerEmail"}},{"kind":"Field","name":{"kind":"Name","value":"siteName"}},{"kind":"Field","name":{"kind":"Name","value":"isRefundable"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]} as unknown as DocumentNode<TransactionRecordDetailFieldsFragment, unknown>;
export const CustomerProfileFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomerProfileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"leaderboardUsername"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthdate"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"emergencyContactName"}},{"kind":"Field","name":{"kind":"Name","value":"emergencyContactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"emergencyContactRelationship"}},{"kind":"Field","name":{"kind":"Name","value":"hideMetrics"}},{"kind":"Field","name":{"kind":"Name","value":"existsInSites"}},{"kind":"Field","name":{"kind":"Name","value":"siteUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalUserId"}},{"kind":"Field","name":{"kind":"Name","value":"site"}}]}}]}}]} as unknown as DocumentNode<CustomerProfileFieldsFragment, unknown>;
export const ExportCustomerVodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExportCustomerVod"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminCustomersParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportCustomerVod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]} as unknown as DocumentNode<ExportCustomerVodMutation, ExportCustomerVodMutationVariables>;
export const ExportTransactionRecordsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExportTransactionRecords"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionRecordFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exportTransactionRecords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]} as unknown as DocumentNode<ExportTransactionRecordsMutation, ExportTransactionRecordsMutationVariables>;
export const AdminProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mindbodyId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"customTitle"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"textPayButton"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessageWhenTryingToPurchase"}},{"kind":"Field","name":{"kind":"Name","value":"popupTitleAfterClickOnBuy"}},{"kind":"Field","name":{"kind":"Name","value":"popupDescriptionAfterClickOnBuy"}},{"kind":"Field","name":{"kind":"Name","value":"isMembership"}},{"kind":"Field","name":{"kind":"Name","value":"isTrialPackage"}},{"kind":"Field","name":{"kind":"Name","value":"isClassPassPackage"}},{"kind":"Field","name":{"kind":"Name","value":"doesItRequireSmsVerification"}},{"kind":"Field","name":{"kind":"Name","value":"muviEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"muviNumberOfDays"}}]}}]}}]} as unknown as DocumentNode<AdminProductsQuery, AdminProductsQueryVariables>;
export const SyncProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SyncProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mindbodyId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"customTitle"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"textPayButton"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessageWhenTryingToPurchase"}},{"kind":"Field","name":{"kind":"Name","value":"popupTitleAfterClickOnBuy"}},{"kind":"Field","name":{"kind":"Name","value":"popupDescriptionAfterClickOnBuy"}},{"kind":"Field","name":{"kind":"Name","value":"isMembership"}},{"kind":"Field","name":{"kind":"Name","value":"isTrialPackage"}},{"kind":"Field","name":{"kind":"Name","value":"isClassPassPackage"}},{"kind":"Field","name":{"kind":"Name","value":"doesItRequireSmsVerification"}},{"kind":"Field","name":{"kind":"Name","value":"muviEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"muviNumberOfDays"}}]}}]}}]} as unknown as DocumentNode<SyncProductsMutation, SyncProductsMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdminProduct"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mindbodyId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"customTitle"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"textPayButton"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessageWhenTryingToPurchase"}},{"kind":"Field","name":{"kind":"Name","value":"popupTitleAfterClickOnBuy"}},{"kind":"Field","name":{"kind":"Name","value":"popupDescriptionAfterClickOnBuy"}},{"kind":"Field","name":{"kind":"Name","value":"isMembership"}},{"kind":"Field","name":{"kind":"Name","value":"isTrialPackage"}},{"kind":"Field","name":{"kind":"Name","value":"isClassPassPackage"}},{"kind":"Field","name":{"kind":"Name","value":"doesItRequireSmsVerification"}},{"kind":"Field","name":{"kind":"Name","value":"muviEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"muviNumberOfDays"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductNotFound"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidProductVodDaysError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const UpdateProductsOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProductsOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategoryOrderInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProductsOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdminProductList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mindbodyId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"displayOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"customTitle"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"textPayButton"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessageWhenTryingToPurchase"}},{"kind":"Field","name":{"kind":"Name","value":"popupTitleAfterClickOnBuy"}},{"kind":"Field","name":{"kind":"Name","value":"popupDescriptionAfterClickOnBuy"}},{"kind":"Field","name":{"kind":"Name","value":"isMembership"}},{"kind":"Field","name":{"kind":"Name","value":"isTrialPackage"}},{"kind":"Field","name":{"kind":"Name","value":"isClassPassPackage"}},{"kind":"Field","name":{"kind":"Name","value":"doesItRequireSmsVerification"}},{"kind":"Field","name":{"kind":"Name","value":"muviEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"muviNumberOfDays"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductNotFound"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProductsOrderMutation, UpdateProductsOrderMutationVariables>;
export const BulkActivateVodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkActivateVod"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BulkActivateVodInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkActivateVod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"processedCount"}}]}}]}}]} as unknown as DocumentNode<BulkActivateVodMutation, BulkActivateVodMutationVariables>;
export const BulkDeactivateVodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkDeactivateVod"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mindbodyIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkDeactivateVod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mindbodyIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mindbodyIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"processedCount"}}]}}]}}]} as unknown as DocumentNode<BulkDeactivateVodMutation, BulkDeactivateVodMutationVariables>;
export const CustomerGiftCardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerGiftCards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerGiftCards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"statusHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"giftCard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"giftCardCode"}},{"kind":"Field","name":{"kind":"Name","value":"senderName"}},{"kind":"Field","name":{"kind":"Name","value":"recipientName"}},{"kind":"Field","name":{"kind":"Name","value":"recipientEmail"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CustomerGiftCardsQuery, CustomerGiftCardsQueryVariables>;
export const UpdateCustomerGiftCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCustomerGiftCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCustomerGiftCardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCustomerGiftCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerGiftCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"giftCardCode"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerGiftCardNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GiftCardCodeRequiredError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidGiftCardPdfError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCustomerGiftCardMutation, UpdateCustomerGiftCardMutationVariables>;
export const AdminCustomersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminCustomers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminCustomersParams"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isMobilePhoneVerified"}},{"kind":"Field","name":{"kind":"Name","value":"siteUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"}},{"kind":"Field","name":{"kind":"Name","value":"externalUserId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]} as unknown as DocumentNode<AdminCustomersQuery, AdminCustomersQueryVariables>;
export const ChargeableProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChargeableProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chargeableProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<ChargeableProductsQuery, ChargeableProductsQueryVariables>;
export const CreateCustomTransactionRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCustomTransactionRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCustomTransactionRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCustomTransactionRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomTransactionRequestSent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipientEmail"}},{"kind":"Field","name":{"kind":"Name","value":"paymentUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCustomTransactionRequestMutation, CreateCustomTransactionRequestMutationVariables>;
export const UpdateSiteCustomerMindbodyIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSiteCustomerMindbodyId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"siteCustomerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newMindbodyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSiteCustomerMindbodyId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"siteCustomerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"siteCustomerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newMindbodyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newMindbodyId"}}}]}]}}]} as unknown as DocumentNode<UpdateSiteCustomerMindbodyIdMutation, UpdateSiteCustomerMindbodyIdMutationVariables>;
export const VerifyCustomerPhoneNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyCustomerPhoneNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyCustomerPhoneNumber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}]}]}}]} as unknown as DocumentNode<VerifyCustomerPhoneNumberMutation, VerifyCustomerPhoneNumberMutationVariables>;
export const RemoveCustomerPhoneVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCustomerPhoneVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCustomerPhoneVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}]}]}}]} as unknown as DocumentNode<RemoveCustomerPhoneVerificationMutation, RemoveCustomerPhoneVerificationMutationVariables>;
export const SyncCustomerWithMindbodyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SyncCustomerWithMindbody"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncCustomerWithMindbody"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}}]}]}}]} as unknown as DocumentNode<SyncCustomerWithMindbodyMutation, SyncCustomerWithMindbodyMutationVariables>;
export const CustomerAdminInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerAdminInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isMobilePhoneVerified"}},{"kind":"Field","name":{"kind":"Name","value":"siteUsersNew"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"externalUserId"}},{"kind":"Field","name":{"kind":"Name","value":"siteUserInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CustomerAdminInfoQuery, CustomerAdminInfoQueryVariables>;
export const CustomerIncompletePurchasesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerIncompletePurchases"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"incompleteTransactionFeedbacks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"50"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"merchantReference"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"feedbackTryNumber"}},{"kind":"Field","name":{"kind":"Name","value":"feedbackStatusUpdatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"siteCustomer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"siteUserInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"}}]}},{"kind":"Field","name":{"kind":"Name","value":"identifiableUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CustomerIncompletePurchasesQuery, CustomerIncompletePurchasesQueryVariables>;
export const CustomerRetryTransactionFeedbackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CustomerRetryTransactionFeedback"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"retryTransactionFeedback"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<CustomerRetryTransactionFeedbackMutation, CustomerRetryTransactionFeedbackMutationVariables>;
export const CustomerVodPeriodsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerVodPeriods"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerVodPeriods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"addedBy"}},{"kind":"Field","name":{"kind":"Name","value":"addedByAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CustomerVodPeriodsQuery, CustomerVodPeriodsQueryVariables>;
export const CreateCustomerVodPeriodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCustomerVodPeriod"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCustomerVodPeriodInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCustomerVodPeriod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCustomerVodPeriodMutation, CreateCustomerVodPeriodMutationVariables>;
export const DeleteCustomerVodPeriodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCustomerVodPeriod"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCustomerVodPeriod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCustomerVodPeriodMutation, DeleteCustomerVodPeriodMutationVariables>;
export const DiscardFailedMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DiscardFailedMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FailedMessageActionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discardFailedMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FailedMessageActionSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FailedMessageNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<DiscardFailedMessageMutation, DiscardFailedMessageMutationVariables>;
export const FailedMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FailedMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queue"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FailedMessageQueueEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"failedMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queue"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"queue"}},{"kind":"Field","name":{"kind":"Name","value":"messageClass"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"exceptionClass"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"failedAt"}},{"kind":"Field","name":{"kind":"Name","value":"retryCount"}},{"kind":"Field","name":{"kind":"Name","value":"originalTransport"}},{"kind":"Field","name":{"kind":"Name","value":"payfortDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"merchantReference"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"responseMessage"}}]}}]}}]}}]} as unknown as DocumentNode<FailedMessageQuery, FailedMessageQueryVariables>;
export const FailedMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FailedMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queue"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FailedMessageQueueEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"failedMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queue"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"failedMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"queue"}},{"kind":"Field","name":{"kind":"Name","value":"messageClass"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"exceptionClass"}},{"kind":"Field","name":{"kind":"Name","value":"failedAt"}},{"kind":"Field","name":{"kind":"Name","value":"retryCount"}},{"kind":"Field","name":{"kind":"Name","value":"originalTransport"}},{"kind":"Field","name":{"kind":"Name","value":"payfortDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"merchantReference"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"responseMessage"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FailedMessagesQuery, FailedMessagesQueryVariables>;
export const RetryFailedMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RetryFailedMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FailedMessageActionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"retryFailedMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FailedMessageActionSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FailedMessageNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<RetryFailedMessageMutation, RetryFailedMessageMutationVariables>;
export const IncompleteFeedbacksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IncompleteFeedbacks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"IncompleteTransactionFeedbackFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"incompleteTransactionFeedbacks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"merchantReference"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"feedbackTryNumber"}},{"kind":"Field","name":{"kind":"Name","value":"feedbackStatusUpdatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"siteCustomer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"siteUserInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"}},{"kind":"Field","name":{"kind":"Name","value":"externalUserId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"identifiableUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<IncompleteFeedbacksQuery, IncompleteFeedbacksQueryVariables>;
export const RetryTransactionFeedbackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RetryTransactionFeedback"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"retryTransactionFeedback"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RetryTransactionFeedbackMutation, RetryTransactionFeedbackMutationVariables>;
export const AdminMindbodyClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminMindbodyClients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminMindbodyClientsParams"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mindbodyClients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"mobilePhone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]} as unknown as DocumentNode<AdminMindbodyClientsQuery, AdminMindbodyClientsQueryVariables>;
export const AdminMindbodyClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminMindbodyClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mindbodyClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"mobilePhone"}}]}}]}}]} as unknown as DocumentNode<AdminMindbodyClientQuery, AdminMindbodyClientQueryVariables>;
export const MindbodyStaffsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MindbodyStaffs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mindbodyStaffs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<MindbodyStaffsQuery, MindbodyStaffsQueryVariables>;
export const SyncAllMindbodyStaffDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SyncAllMindbodyStaff"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncAllMindbodyStaff"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}}]}]}}]} as unknown as DocumentNode<SyncAllMindbodyStaffMutation, SyncAllMindbodyStaffMutationVariables>;
export const MobileNumberBlacklistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MobileNumberBlacklist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mobileNumberBlacklist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mobilePhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"fullPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"countryName"}},{"kind":"Field","name":{"kind":"Name","value":"countryPhoneCode"}}]}}]}}]} as unknown as DocumentNode<MobileNumberBlacklistQuery, MobileNumberBlacklistQueryVariables>;
export const CountriesWithPhoneCodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountriesWithPhoneCodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countriesWithPhoneCodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneCode"}},{"kind":"Field","name":{"kind":"Name","value":"formattedPhoneCode"}}]}}]}}]} as unknown as DocumentNode<CountriesWithPhoneCodesQuery, CountriesWithPhoneCodesQueryVariables>;
export const CreateMobileNumberBlacklistEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMobileNumberBlacklistEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMobileNumberBlacklistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMobileNumberBlacklistEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mobilePhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"fullPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"countryName"}},{"kind":"Field","name":{"kind":"Name","value":"countryPhoneCode"}}]}}]}}]} as unknown as DocumentNode<CreateMobileNumberBlacklistEntryMutation, CreateMobileNumberBlacklistEntryMutationVariables>;
export const UpdateMobileNumberBlacklistEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMobileNumberBlacklistEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMobileNumberBlacklistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMobileNumberBlacklistEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mobilePhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"fullPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"countryName"}},{"kind":"Field","name":{"kind":"Name","value":"countryPhoneCode"}}]}}]}}]} as unknown as DocumentNode<UpdateMobileNumberBlacklistEntryMutation, UpdateMobileNumberBlacklistEntryMutationVariables>;
export const DeleteMobileNumberBlacklistEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMobileNumberBlacklistEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMobileNumberBlacklistEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteMobileNumberBlacklistEntryMutation, DeleteMobileNumberBlacklistEntryMutationVariables>;
export const CreatePaymentLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePaymentLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePaymentLinkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPaymentLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"notificationEmailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePaymentLinkMutation, CreatePaymentLinkMutationVariables>;
export const DeletePaymentLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePaymentLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePaymentLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeletePaymentLinkMutation, DeletePaymentLinkMutationVariables>;
export const PaymentLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaymentLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"notificationEmailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<PaymentLinkQuery, PaymentLinkQueryVariables>;
export const PaymentLinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaymentLinks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentLinks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"notificationEmailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<PaymentLinksQuery, PaymentLinksQueryVariables>;
export const UpdatePaymentLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePaymentLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePaymentLinkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePaymentLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"notificationEmailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePaymentLinkMutation, UpdatePaymentLinkMutationVariables>;
export const AdminAvailableSitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAvailableSites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availableSites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<AdminAvailableSitesQuery, AdminAvailableSitesQueryVariables>;
export const SystemSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SystemSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"systemSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sendSuccessfulPurchaseEmail"}},{"kind":"Field","name":{"kind":"Name","value":"textBottomIndexPage"}}]}}]}}]} as unknown as DocumentNode<SystemSettingsQuery, SystemSettingsQueryVariables>;
export const UpdateSystemSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSystemSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSystemSettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSystemSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sendSuccessfulPurchaseEmail"}},{"kind":"Field","name":{"kind":"Name","value":"textBottomIndexPage"}}]}}]}}]} as unknown as DocumentNode<UpdateSystemSettingsMutation, UpdateSystemSettingsMutationVariables>;
export const ClearSystemCacheDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClearSystemCache"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearSystemCache"}}]}}]} as unknown as DocumentNode<ClearSystemCacheMutation, ClearSystemCacheMutationVariables>;
export const TransactionRecordsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TransactionRecords"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionRecordFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionRecords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionRecordListFields"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionRecordListFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"customerEmail"}},{"kind":"Field","name":{"kind":"Name","value":"siteName"}},{"kind":"Field","name":{"kind":"Name","value":"isRefundable"}},{"kind":"Field","name":{"kind":"Name","value":"creditCardLastFourDigits"}},{"kind":"Field","name":{"kind":"Name","value":"authorizationCode"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]} as unknown as DocumentNode<TransactionRecordsQuery, TransactionRecordsQueryVariables>;
export const TransactionRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TransactionRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TransactionRecordDetailFields"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"payfortAuthorizationCode"}},{"kind":"Field","name":{"kind":"Name","value":"serviceExpirationDate"}},{"kind":"Field","name":{"kind":"Name","value":"userCountry"}},{"kind":"Field","name":{"kind":"Name","value":"mindbodyCheckoutFail"}},{"kind":"Field","name":{"kind":"Name","value":"merchantResponse"}},{"kind":"Field","name":{"kind":"Name","value":"paymentGatewayResponse"}},{"kind":"Field","name":{"kind":"Name","value":"refundResponse"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TransactionRecordDetailFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"creditCardChargeId"}},{"kind":"Field","name":{"kind":"Name","value":"creditCardHolderName"}},{"kind":"Field","name":{"kind":"Name","value":"creditCardLastFourDigits"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"taxAmount"}},{"kind":"Field","name":{"kind":"Name","value":"subTotal"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"refundDate"}},{"kind":"Field","name":{"kind":"Name","value":"authorizationCode"}},{"kind":"Field","name":{"kind":"Name","value":"installments"}},{"kind":"Field","name":{"kind":"Name","value":"merchantPurchaseId"}},{"kind":"Field","name":{"kind":"Name","value":"siteCustomer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identifiableUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"customerEmail"}},{"kind":"Field","name":{"kind":"Name","value":"siteName"}},{"kind":"Field","name":{"kind":"Name","value":"isRefundable"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]} as unknown as DocumentNode<TransactionRecordQuery, TransactionRecordQueryVariables>;
export const RefundTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefundTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refundTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RefundTransactionMutation, RefundTransactionMutationVariables>;
export const SiteSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"siteSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteDateTimeNow"}}]}}]}}]} as unknown as DocumentNode<SiteSettingsQuery, SiteSettingsQueryVariables>;
export const ClassInfoAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"classInfoAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"instructorName"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"startWithNoTimeZone"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"waitListAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"showAsDisabled"}},{"kind":"Field","name":{"kind":"Name","value":"maxCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"isSubstitute"}},{"kind":"Field","name":{"kind":"Name","value":"hasClassStats"}},{"kind":"Field","name":{"kind":"Name","value":"isSynchronizing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roomLayout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"matrix"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookableSpot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"spotNumber"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"enrollments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"active"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enrollmentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"enrollmentDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"identifiableSiteUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifiableUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"leaderboardUsername"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EnrollmentInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isCheckedIn"}},{"kind":"Field","name":{"kind":"Name","value":"spotNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isBookedForFree"}},{"kind":"Field","name":{"kind":"Name","value":"hasStats"}},{"kind":"Field","name":{"kind":"Name","value":"isFirstTimeInThisTypeOfClass"}},{"kind":"Field","name":{"kind":"Name","value":"isFirstTimeWithThisInstructor"}},{"kind":"Field","name":{"kind":"Name","value":"isTodayUserBirthday"}},{"kind":"Field","name":{"kind":"Name","value":"isUserLeaderboardEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"bookedViaClassPass"}},{"kind":"Field","name":{"kind":"Name","value":"serviceName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"onHoldSpots"}},{"kind":"Field","name":{"kind":"Name","value":"orphanedClassStatsSpots"}}]}}]}}]} as unknown as DocumentNode<ClassInfoAdminQuery, ClassInfoAdminQueryVariables>;
export const DisableSpotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"disableSpot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DisableEnableSpotInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disableSpot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DisableEnableSpotResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SpotNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<DisableSpotMutation, DisableSpotMutationVariables>;
export const EnableSpotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"enableSpot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DisableEnableSpotInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enableSpot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DisableEnableSpotResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SpotNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<EnableSpotMutation, EnableSpotMutationVariables>;
export const SearchSiteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchSiteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchSiteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifiableUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchSiteUserQuery, SearchSiteUserQueryVariables>;
export const BookUserIntoClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"bookUserIntoClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookUserIntoClassInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookUserIntoClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<BookUserIntoClassMutation, BookUserIntoClassMutationVariables>;
export const RemoveUserFromClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeUserFromClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CancelEnrollmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUserFromClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<RemoveUserFromClassMutation, RemoveUserFromClassMutationVariables>;
export const EditClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditClassInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EditClassSuccessResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}}]}}]}}]}}]} as unknown as DocumentNode<EditClassMutation, EditClassMutationVariables>;
export const RoomLayoutsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"roomLayouts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RoomLayoutsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomLayouts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}}]}}]}}]} as unknown as DocumentNode<RoomLayoutsQuery, RoomLayoutsQueryVariables>;
export const RoomLayoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"roomLayout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomLayout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"columns"}},{"kind":"Field","name":{"kind":"Name","value":"rows"}},{"kind":"Field","name":{"kind":"Name","value":"matrix"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookableSpot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spotNumber"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RoomLayoutQuery, RoomLayoutQueryVariables>;
export const CreateRoomLayoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRoomLayout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoomLayoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoomLayout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateRoomLayoutMutation, CreateRoomLayoutMutationVariables>;
export const EditRoomLayoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editRoomLayout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditRoomLayoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editRoomLayout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<EditRoomLayoutMutation, EditRoomLayoutMutationVariables>;
export const ClassWaitlistEntriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"classWaitlistEntries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrollments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"waitlisted"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enrollmentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"enrollmentDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"identifiableSiteUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifiableUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ClassWaitlistEntriesQuery, ClassWaitlistEntriesQueryVariables>;
export const RemoveUserFromWaitlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeUserFromWaitlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveUserFromWaitlistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUserFromWaitlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveFromWaitlistResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WaitlistEntryNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveUserFromWaitlistMutation, RemoveUserFromWaitlistMutationVariables>;
export const CheckinUserInClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"checkinUserInClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CheckinUserInClass"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkinUserInClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CheckinSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EnrollmentNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CheckinUserInClassMutation, CheckinUserInClassMutationVariables>;
export const CheckoutUserInClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"checkoutUserInClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CheckoutUserInClass"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkoutUserInClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CheckoutSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EnrollmentNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CheckoutUserInClassMutation, CheckoutUserInClassMutationVariables>;
export const EditEnrollmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editEnrollment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditEnrollmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editEnrollment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Enrollment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SpotAlreadyReservedError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TryToSwitchToSameSpotError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClientIsOutsideSchedulingWindowError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<EditEnrollmentMutation, EditEnrollmentMutationVariables>;
export const SwapSpotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"swapSpot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditEnrollmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"swapSpot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SwapSpotSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TryToSwitchToSameSpotError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<SwapSpotMutation, SwapSpotMutationVariables>;
export const GetCalendarClassesForListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCalendarClassesForList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CalendarClassesParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calendarClasses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startWithNoTimeZone"}},{"kind":"Field","name":{"kind":"Name","value":"maxCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"totalBooked"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnderMaintenanceSpots"}},{"kind":"Field","name":{"kind":"Name","value":"showAsDisabled"}},{"kind":"Field","name":{"kind":"Name","value":"instructorName"}}]}}]}}]} as unknown as DocumentNode<GetCalendarClassesForListQuery, GetCalendarClassesForListQueryVariables>;
export const ClassWaitlistIsEnabledDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"classWaitlistIsEnabled"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"waitListAvailable"}}]}}]}}]}}]} as unknown as DocumentNode<ClassWaitlistIsEnabledQuery, ClassWaitlistIsEnabledQueryVariables>;
export const SyncClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"syncClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"classId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"classId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"classId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSynchronizing"}}]}}]}}]}}]} as unknown as DocumentNode<SyncClassMutation, SyncClassMutationVariables>;
export const SyncAllClassesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"syncAllClasses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncAllClasses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}}]}]}}]} as unknown as DocumentNode<SyncAllClassesMutation, SyncAllClassesMutationVariables>;
export const CountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Countries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<CountriesQuery, CountriesQueryVariables>;
export const CountryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"country"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"countryCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"countryCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"states"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CountryQuery, CountryQueryVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"registerUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerIdentifiableUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identifiableUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const EditUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdentifiableUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EditUserMutation, EditUserMutationVariables>;
export const RequestPasswordLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"requestPasswordLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestPasswordLinkInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestPasswordLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TooManyResetPasswordLinkRequestsError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availableAgainAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordLinkSentSuccessfully"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<RequestPasswordLinkMutation, RequestPasswordLinkMutationVariables>;
export const GetUserSitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserSites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalUserId"}},{"kind":"Field","name":{"kind":"Name","value":"site"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserSitesQuery, GetUserSitesQueryVariables>;
export const EditUserSitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editUserSites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IdentifiableUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OtherUserHasThisExternalIdError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteUserInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalUserId"}},{"kind":"Field","name":{"kind":"Name","value":"site"}}]}},{"kind":"Field","name":{"kind":"Name","value":"identifiableUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<EditUserSitesMutation, EditUserSitesMutationVariables>;
export const ClassSchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"classSchedules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classSchedules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"instructorName"}},{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"startWithNoTimeZone"}},{"kind":"Field","name":{"kind":"Name","value":"endWithNoTimeZone"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"roomLayout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ClassSchedulesQuery, ClassSchedulesQueryVariables>;
export const AvailableClassTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"availableClassTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availableClassTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}}]}]}}]} as unknown as DocumentNode<AvailableClassTypesQuery, AvailableClassTypesQueryVariables>;
export const SetRoomLayoutForClassSchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setRoomLayoutForClassSchedules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetRoomLayoutForClassSchedulesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setRoomLayoutForClassSchedules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"instructorName"}},{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"roomLayout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}}]}}]}}]} as unknown as DocumentNode<SetRoomLayoutForClassSchedulesMutation, SetRoomLayoutForClassSchedulesMutationVariables>;
export const UserWorkoutStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userWorkoutStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userWorkoutStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrollment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrollmentInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EnrollmentInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spotNumber"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalEnergy"}}]}}]}}]} as unknown as DocumentNode<UserWorkoutStatsQuery, UserWorkoutStatsQueryVariables>;
export const SingleWorkoutStatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"singleWorkoutStat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enrollmentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"singleWorkoutStat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"enrollmentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enrollmentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrollment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrollmentInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EnrollmentInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spotNumber"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"instructorName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"averagePower"}},{"kind":"Field","name":{"kind":"Name","value":"highPower"}},{"kind":"Field","name":{"kind":"Name","value":"averageRpm"}},{"kind":"Field","name":{"kind":"Name","value":"highRpm"}},{"kind":"Field","name":{"kind":"Name","value":"totalEnergy"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"adjustedChartPoints"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amountOfPoints"},"value":{"kind":"IntValue","value":"62"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"rpm"}},{"kind":"Field","name":{"kind":"Name","value":"power"}}]}}]}}]}}]} as unknown as DocumentNode<SingleWorkoutStatQuery, SingleWorkoutStatQueryVariables>;
export const UserRankingInClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userRankingInClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"classId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userRankingInClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"classId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"classId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalRanking"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positionInRanking"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembersInRanking"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genderRanking"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"ranking"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positionInRanking"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembersInRanking"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserRankingInClassQuery, UserRankingInClassQueryVariables>;
export const SendClassStatsToUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendClassStatsToUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"classId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendClassStatsToUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"classId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"classId"}}}]}]}}]} as unknown as DocumentNode<SendClassStatsToUsersMutation, SendClassStatsToUsersMutationVariables>;
export const SendClassStatsToEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendClassStatsToEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendClassStatsToEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendClassStatsToEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SendClassStatsToEmailMutation, SendClassStatsToEmailMutationVariables>;
export const UserWorkoutStatsPaginatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userWorkoutStatsPaginated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userWorkoutStatsPaginated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrollment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrollmentInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EnrollmentInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spotNumber"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"startWithNoTimeZone"}},{"kind":"Field","name":{"kind":"Name","value":"instructorName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalEnergy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<UserWorkoutStatsPaginatedQuery, UserWorkoutStatsPaginatedQueryVariables>;
export const SyncClassWithPiqDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"syncClassWithPIQ"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"classId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncClassWithPIQ"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"classId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"classId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSynchronizing"}}]}}]}}]}}]} as unknown as DocumentNode<SyncClassWithPiqMutation, SyncClassWithPiqMutationVariables>;
export const CheckIfClassIsSynchronizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"checkIfClassIsSynchronized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSynchronizing"}}]}}]}}]}}]} as unknown as DocumentNode<CheckIfClassIsSynchronizedQuery, CheckIfClassIsSynchronizedQueryVariables>;
export const CheckIfAllClassAreSynchronizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"checkIfAllClassAreSynchronized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSynchronizingClasses"}}]}}]}}]} as unknown as DocumentNode<CheckIfAllClassAreSynchronizedQuery, CheckIfAllClassAreSynchronizedQueryVariables>;
export const UpdateUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const GiftCardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GiftCards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"giftCards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"grandTotal"}},{"kind":"Field","name":{"kind":"Name","value":"terms"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GiftCardsQuery, GiftCardsQueryVariables>;
export const UpdateGiftCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGiftCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGiftCardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGiftCard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"salePrice"}},{"kind":"Field","name":{"kind":"Name","value":"grandTotal"}},{"kind":"Field","name":{"kind":"Name","value":"terms"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGiftCardMutation, UpdateGiftCardMutationVariables>;
export const SyncAllGiftCardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SyncAllGiftCards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncAllGiftCards"}}]}}]} as unknown as DocumentNode<SyncAllGiftCardsMutation, SyncAllGiftCardsMutationVariables>;
export const AvailableSitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"availableSites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availableSites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode<AvailableSitesQuery, AvailableSitesQueryVariables>;
export const AdminUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"adminUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"linkedInstructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"linkedSites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<AdminUserQuery, AdminUserQueryVariables>;
export const AdminUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"adminUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"linkedInstructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"linkedSites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"favoriteSite"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<AdminUsersQuery, AdminUsersQueryVariables>;
export const AvailableInstructorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"availableInstructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availableInstructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<AvailableInstructorsQuery, AvailableInstructorsQueryVariables>;
export const ResetAdminUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resetAdminUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetAdminUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<ResetAdminUserPasswordMutation, ResetAdminUserPasswordMutationVariables>;
export const UpdateAdminUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAdminUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAdminUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAdminUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdminUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"linkedInstructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"linkedSites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EmailAlreadyUsedError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UsernameAlreadyUsedError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAdminUserMutation, UpdateAdminUserMutationVariables>;
export const AddAdminUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addAdminUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminUserDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAdminUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdminUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"linkedInstructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"linkedSites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EmailAlreadyUsedError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UsernameAlreadyUsedError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<AddAdminUserMutation, AddAdminUserMutationVariables>;
export const RemoveAdminUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeAdminUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAdminUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveAdminUserMutation, RemoveAdminUserMutationVariables>;
export const CurrentAdminUserSitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"currentAdminUserSites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentAdminUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkedSites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"favoriteSite"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CurrentAdminUserSitesQuery, CurrentAdminUserSitesQueryVariables>;
export const UpdateCurrentAdminUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCurrentAdminUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCurrentUserPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCurrentAdminUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateCurrentAdminUserPasswordMutation, UpdateCurrentAdminUserPasswordMutationVariables>;
export const UpdateCurrentAdminUserFavoriteSiteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCurrentAdminUserFavoriteSite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCurrentAdminUserFavoriteSiteInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCurrentAdminUserFavoriteSite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkedSites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"favoriteSite"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCurrentAdminUserFavoriteSiteMutation, UpdateCurrentAdminUserFavoriteSiteMutationVariables>;
export const UpdateCurrentAdminUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCurrentAdminUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCurrentAdminUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCurrentAdminUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"linkedInstructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"linkedSites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"favoriteSite"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"showCancelledClasses"}}]}}]}}]} as unknown as DocumentNode<UpdateCurrentAdminUserMutation, UpdateCurrentAdminUserMutationVariables>;
export const GetShowCancelledClassesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShowCancelledClasses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentAdminUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showCancelledClasses"}}]}}]}}]} as unknown as DocumentNode<GetShowCancelledClassesQuery, GetShowCancelledClassesQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomerProfileFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomerProfileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"leaderboardUsername"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthdate"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"emergencyContactName"}},{"kind":"Field","name":{"kind":"Name","value":"emergencyContactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"emergencyContactRelationship"}},{"kind":"Field","name":{"kind":"Name","value":"hideMetrics"}},{"kind":"Field","name":{"kind":"Name","value":"existsInSites"}},{"kind":"Field","name":{"kind":"Name","value":"siteUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalUserId"}},{"kind":"Field","name":{"kind":"Name","value":"site"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const SyncAllClassSchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"syncAllClassSchedules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SiteEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncAllClassSchedules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}}]}]}}]} as unknown as DocumentNode<SyncAllClassSchedulesMutation, SyncAllClassSchedulesMutationVariables>;