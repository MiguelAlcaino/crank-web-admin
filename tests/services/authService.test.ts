import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { authService } from '@/services/authService'
import { useAuthenticationStore } from '@/stores/authToken'
import { Role } from '@/utils/userRoles'

import { adminToken } from '../support/adminToken'
import { useMemoryLocalStorage } from '../support/memoryLocalStorage'

vi.mock('@/router', () => ({ default: {} }))

describe('authService.userHasRole', () => {
  beforeEach(() => {
    useMemoryLocalStorage()
    setActivePinia(createPinia())
  })

  it('is false when nobody is signed in', () => {
    expect(authService.userHasRole(Role.ROLE_DEVELOPER)).toBe(false)
  })

  it('does not treat ROLE_SUPER_ADMIN as ROLE_DEVELOPER', () => {
    useAuthenticationStore().setSession(adminToken(['ROLE_SUPER_ADMIN', 'ROLE_USER']))

    expect(authService.userHasRole(Role.ROLE_SUPER_ADMIN)).toBe(true)
    expect(authService.userHasRole(Role.ROLE_DEVELOPER)).toBe(false)
  })

  it('is true when the token carries the role', () => {
    useAuthenticationStore().setSession(adminToken(['ROLE_SUPER_ADMIN', 'ROLE_DEVELOPER']))

    expect(authService.userHasRole(Role.ROLE_DEVELOPER)).toBe(true)
  })
})
