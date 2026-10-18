/**
 * Backend profiles and admin features. Kept free of `import.meta` so build tooling
 * (codegen.main.ts) can import it; the current profile lives in ./backendProfile.ts.
 *
 * Backend profile: which crank-payments GraphQL API this build talks to.
 *
 * - `kan231`: the KAN-231 branch (Sylius shopping cart, subscription service). Default, so
 *   existing builds and the library build keep their behaviour.
 * - `main`: production crank-payments (`main`), which does not have every admin operation yet.
 *   Its admin operations are ported to crank-payments `develop` first, so its codegen
 *   (codegen.main.ts) validates against `develop`'s schema.
 *
 * Set at build time with `VITE_BACKEND_PROFILE`. Every admin module or optional feature is listed
 * in `FEATURE_PROFILES` with the profiles whose backend supports it; the router and the sidebar
 * hide whatever the current profile does not support. Enabling a feature on `main` once its
 * backend operations land is a one-line change in `FEATURE_PROFILES` (`KAN231_ONLY` -> `ALL`).
 *
 * Features built on operations only main has are `MAIN_ONLY`. Their GraphQL documents live in
 * `*.main.graphql` files: codegen.main.ts validates them against main's schema and generates their
 * typed documents into src/gql-main/, and the KAN-231 codegen (codegen.ts) skips them.
 */

export const BACKEND_PROFILES = ['main', 'kan231'] as const

export type BackendProfile = (typeof BACKEND_PROFILES)[number]

export const DEFAULT_BACKEND_PROFILE: BackendProfile = 'kan231'

export function isBackendProfile(value: unknown): value is BackendProfile {
  return typeof value === 'string' && (BACKEND_PROFILES as readonly string[]).includes(value)
}

export enum AdminFeature {
  // Admin modules (one sidebar entry / route group each)
  ClassesCalendar = 'classesCalendar',
  ClassScheduleConfig = 'classScheduleConfig',
  RoomLayouts = 'roomLayouts',
  GiftCards = 'giftCards',
  PaymentLinks = 'paymentLinks',
  AdminUsers = 'adminUsers',
  MySettings = 'mySettings',
  Customer = 'customer',
  CustomersList = 'customersList',
  Transactions = 'transactions',
  IncompleteFeedbacks = 'incompleteFeedbacks',
  Subscriptions = 'subscriptions',
  ClassPackages = 'classPackages',
  CustomerGiftCards = 'customerGiftCards',
  SessionTypes = 'sessionTypes',
  InstructorProfiles = 'instructorProfiles',
  MindbodyStaff = 'mindbodyStaff',
  MindbodyClients = 'mindbodyClients',
  WebhookEvents = 'webhookEvents',
  SystemSettings = 'systemSettings',
  Blacklist = 'blacklist',
  PushNotifications = 'pushNotifications',
  BulkVod = 'bulkVod',
  /** Packages on crank-payments main's local Product entity (`adminProducts`). */
  AdminProducts = 'adminProducts',
  /** Messenger messages in the failure queues, with retry and discard (`failedMessages`). */
  FailedMessages = 'failedMessages',

  // Features inside a module
  /** Subscriptions section of the customer profile (`User.subscriptions`). */
  CustomerProfileSubscriptions = 'customerProfileSubscriptions',
  /** "Sync All" button of the class schedule config page (`syncAllClassSchedules` mutation). */
  SyncAllClassSchedules = 'syncAllClassSchedules',
  /**
   * "Sync All" link of the class schedule config page, to the URL the host page injects as
   * `url-sync-all` (library build); the KAN-231 backend has no `syncAllClassSchedules` mutation.
   */
  SyncAllClassSchedulesLink = 'syncAllClassSchedulesLink',
  /** Sylius shopping cart of a transaction record (`TransactionRecord.shoppingCart`). */
  TransactionShoppingCart = 'transactionShoppingCart',
  /**
   * Payment details of a transaction record the Twig admin shows (payment method, Payfort
   * authorization code, raw gateway responses...), which only `main` exposes.
   */
  TransactionPaymentDetails = 'transactionPaymentDetails',
  /**
   * The real Pending Gift Cards page (`customerGiftCards`, `updateCustomerGiftCard`). Without it the
   * Pending Gift Cards route shows a placeholder.
   */
  PendingGiftCardsPage = 'pendingGiftCardsPage',
  /** VOD periods section of the customer profile (`customerVodPeriods`). */
  CustomerVodPeriods = 'customerVodPeriods',
  /** Mindbody id edit, phone verification and Mindbody sync in the customer profile. */
  CustomerActions = 'customerActions',
  /** Incomplete purchases of the customer profile, with the feedback resend. */
  CustomerIncompletePurchases = 'customerIncompletePurchases',
  /** "Charge client" email of the customer profile (`createCustomTransactionRequest`). */
  ChargeClient = 'chargeClient',
  /** Excel export button of the transactions list (`exportTransactionRecords`). */
  TransactionsExport = 'transactionsExport',
  /** VOD Excel export button of the customers list (`exportCustomerVod`). */
  CustomerVodExport = 'customerVodExport',
  /**
   * "Record from Mindbody sale" action of the incomplete feedbacks list, for a transaction left for
   * review (`IncompleteTransactionFeedback.awaitingReview`, `recordTransactionFromMindbodySale`).
   */
  RecordFromMindbodySale = 'recordFromMindbodySale'
}

const ALL: readonly BackendProfile[] = BACKEND_PROFILES
const KAN231_ONLY: readonly BackendProfile[] = ['kan231']
/** Built for crank-payments main's own operations, which KAN-231 does not have. */
const MAIN_ONLY: readonly BackendProfile[] = ['main']

/**
 * Profiles whose backend supports each feature. Issue numbers refer to
 * MiguelAlcaino/crank-payments, where the missing operations are being added to `main`.
 */
export const FEATURE_PROFILES: Record<AdminFeature, readonly BackendProfile[]> = {
  [AdminFeature.ClassesCalendar]: ALL,
  [AdminFeature.ClassScheduleConfig]: ALL,
  [AdminFeature.RoomLayouts]: ALL,
  [AdminFeature.GiftCards]: ALL,
  [AdminFeature.PaymentLinks]: ALL,
  [AdminFeature.AdminUsers]: ALL,
  [AdminFeature.MySettings]: ALL,
  [AdminFeature.Customer]: ALL,
  [AdminFeature.CustomersList]: ALL,
  [AdminFeature.Transactions]: ALL,
  [AdminFeature.IncompleteFeedbacks]: ALL,
  [AdminFeature.Subscriptions]: KAN231_ONLY, // TODO: main, crank-payments#968
  // Sylius page; main gets its own page for the local Product entity, crank-payments#970
  [AdminFeature.ClassPackages]: KAN231_ONLY,
  // The menu entry. kan231 shows a placeholder; main gets PendingGiftCardsPage, crank-payments#971
  [AdminFeature.CustomerGiftCards]: ALL,
  [AdminFeature.SessionTypes]: KAN231_ONLY,
  [AdminFeature.InstructorProfiles]: KAN231_ONLY,
  [AdminFeature.MindbodyStaff]: ALL,
  [AdminFeature.MindbodyClients]: ALL,
  [AdminFeature.WebhookEvents]: KAN231_ONLY,
  [AdminFeature.SystemSettings]: ALL,
  [AdminFeature.Blacklist]: ALL,
  [AdminFeature.PushNotifications]: KAN231_ONLY,
  [AdminFeature.BulkVod]: ALL,
  [AdminFeature.CustomerProfileSubscriptions]: KAN231_ONLY, // TODO: main, crank-payments#968
  [AdminFeature.SyncAllClassSchedules]: MAIN_ONLY,
  [AdminFeature.SyncAllClassSchedulesLink]: KAN231_ONLY,
  [AdminFeature.TransactionShoppingCart]: KAN231_ONLY,
  [AdminFeature.TransactionPaymentDetails]: MAIN_ONLY,
  [AdminFeature.AdminProducts]: MAIN_ONLY, // crank-payments#970
  [AdminFeature.FailedMessages]: MAIN_ONLY, // crank-payments#910
  [AdminFeature.PendingGiftCardsPage]: MAIN_ONLY, // crank-payments#971
  [AdminFeature.CustomerVodPeriods]: MAIN_ONLY, // crank-payments#967
  [AdminFeature.CustomerActions]: MAIN_ONLY, // crank-payments#967
  [AdminFeature.CustomerIncompletePurchases]: MAIN_ONLY, // crank-payments#967
  [AdminFeature.ChargeClient]: MAIN_ONLY, // crank-payments#971
  [AdminFeature.TransactionsExport]: MAIN_ONLY, // crank-payments#966
  [AdminFeature.CustomerVodExport]: MAIN_ONLY, // crank-payments#967
  [AdminFeature.RecordFromMindbodySale]: MAIN_ONLY // crank-payments#998
}

export function isFeatureAvailableIn(feature: AdminFeature, profile: BackendProfile): boolean {
  return FEATURE_PROFILES[feature].includes(profile)
}
