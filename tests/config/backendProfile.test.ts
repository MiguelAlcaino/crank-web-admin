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
  // Built on operations only crank-payments main has.
  const mainOnly = [
    AdminFeature.AdminProducts,
    AdminFeature.PendingGiftCardsPage,
    AdminFeature.CustomerVodPeriods,
    AdminFeature.CustomerActions,
    AdminFeature.CustomerIncompletePurchases,
    AdminFeature.ChargeClient,
    AdminFeature.TransactionsExport,
    AdminFeature.CustomerVodExport
  ]

  it('keeps every feature but the main-only ones available on kan231', () => {
    for (const feature of Object.values(AdminFeature)) {
      expect(isFeatureAvailableIn(feature, 'kan231')).toBe(!mainOnly.includes(feature))
    }
  })

  it('exposes only the modules main supports today', () => {
    const onMain = Object.values(AdminFeature).filter((feature) =>
      isFeatureAvailableIn(feature, 'main')
    )

    expect(onMain.sort()).toEqual(
      [
        AdminFeature.AdminUsers,
        AdminFeature.ClassScheduleConfig,
        AdminFeature.ClassesCalendar,
        AdminFeature.Customer,
        AdminFeature.CustomerGiftCards,
        AdminFeature.GiftCards,
        AdminFeature.MySettings,
        AdminFeature.PaymentLinks,
        AdminFeature.RoomLayouts,
        ...mainOnly
      ].sort()
    )
  })

  it('declares profiles for every feature', () => {
    expect(Object.keys(FEATURE_PROFILES).sort()).toEqual(Object.values(AdminFeature).sort())
  })
})
