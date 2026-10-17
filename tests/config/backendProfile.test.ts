import { describe, expect, it, vi } from 'vitest'

import {
  AdminFeature,
  DEFAULT_BACKEND_PROFILE,
  FEATURE_PROFILES,
  isFeatureAvailableIn,
  resolveBackendProfile
} from '../../src/config/backendProfile'

describe('resolveBackendProfile', () => {
  it('defaults to kan231 when unset or empty', () => {
    expect(DEFAULT_BACKEND_PROFILE).toBe('kan231')
    expect(resolveBackendProfile(undefined)).toBe('kan231')
    expect(resolveBackendProfile(null)).toBe('kan231')
    expect(resolveBackendProfile('')).toBe('kan231')
  })

  it('falls back to the default on an unknown value', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(resolveBackendProfile('production')).toBe('kan231')
    expect(consoleError).toHaveBeenCalledOnce()

    consoleError.mockRestore()
  })

  it('accepts the known profiles', () => {
    expect(resolveBackendProfile('main')).toBe('main')
    expect(resolveBackendProfile('kan231')).toBe('kan231')
  })
})

describe('FEATURE_PROFILES', () => {
  it('keeps every feature but the main-only ones available on kan231', () => {
    const notOnKan231 = Object.values(AdminFeature).filter(
      (feature) => !isFeatureAvailableIn(feature, 'kan231')
    )

    expect(notOnKan231.sort()).toEqual(
      [
        AdminFeature.SyncAllClassSchedules,
        AdminFeature.TransactionPaymentDetails,
        AdminFeature.AdminProducts,
        AdminFeature.PendingGiftCardsPage,
        AdminFeature.CustomerVodPeriods,
        AdminFeature.CustomerActions,
        AdminFeature.CustomerIncompletePurchases,
        AdminFeature.ChargeClient,
        AdminFeature.TransactionsExport,
        AdminFeature.CustomerVodExport
      ].sort()
    )
  })

  it('exposes only the modules main supports today', () => {
    const onMain = Object.values(AdminFeature).filter((feature) =>
      isFeatureAvailableIn(feature, 'main')
    )

    expect(onMain.sort()).toEqual(
      [
        AdminFeature.AdminUsers,
        AdminFeature.Blacklist,
        AdminFeature.BulkVod,
        AdminFeature.ClassScheduleConfig,
        AdminFeature.ClassesCalendar,
        AdminFeature.Customer,
        AdminFeature.CustomerGiftCards,
        AdminFeature.CustomersList,
        AdminFeature.GiftCards,
        AdminFeature.IncompleteFeedbacks,
        AdminFeature.MindbodyClients,
        AdminFeature.MindbodyStaff,
        AdminFeature.MySettings,
        AdminFeature.PaymentLinks,
        AdminFeature.RoomLayouts,
        AdminFeature.SyncAllClassSchedules,
        AdminFeature.SystemSettings,
        AdminFeature.TransactionPaymentDetails,
        AdminFeature.Transactions,
        AdminFeature.AdminProducts,
        AdminFeature.PendingGiftCardsPage,
        AdminFeature.CustomerVodPeriods,
        AdminFeature.CustomerActions,
        AdminFeature.CustomerIncompletePurchases,
        AdminFeature.ChargeClient,
        AdminFeature.TransactionsExport,
        AdminFeature.CustomerVodExport
      ].sort()
    )
  })

  it('gives each profile exactly one way to sync all class schedules', () => {
    for (const profile of ['main', 'kan231'] as const) {
      const ways = [
        AdminFeature.SyncAllClassSchedules,
        AdminFeature.SyncAllClassSchedulesLink
      ].filter((feature) => isFeatureAvailableIn(feature, profile))

      expect(ways).toHaveLength(1)
    }
  })

  it('gives each profile exactly one set of transaction record documents', () => {
    expect(isFeatureAvailableIn(AdminFeature.TransactionShoppingCart, 'kan231')).toBe(true)
    expect(isFeatureAvailableIn(AdminFeature.TransactionShoppingCart, 'main')).toBe(false)
  })

  it('declares profiles for every feature', () => {
    expect(Object.keys(FEATURE_PROFILES).sort()).toEqual(Object.values(AdminFeature).sort())
  })
})
