import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type * as BackendProfileModule from '@/config/backendProfile'

import router from '@/router'
import { hasRequiredRoles } from '@/router/roleGuard'
import { useAuthenticationStore } from '@/stores/authToken'
import { Role } from '@/utils/userRoles'

import { adminToken } from '../support/adminToken'
import { useMemoryLocalStorage } from '../support/memoryLocalStorage'

// Every feature available, so a redirect can only come from the role check.
vi.mock('@/config/backendProfile', async (importOriginal) => ({
  ...(await importOriginal<typeof BackendProfileModule>()),
  isFeatureAvailable: () => true
}))

describe('hasRequiredRoles', () => {
  it('allows a route without requiresRole to anyone', () => {
    expect(hasRequiredRoles([{ meta: {} }, { meta: { role: Role.ROLE_SUPER_ADMIN } }], [])).toBe(
      true
    )
  })

  it('refuses a route whose required role the admin lacks', () => {
    expect(
      hasRequiredRoles(
        [{ meta: { requiresAuth: true } }, { meta: { requiresRole: Role.ROLE_DEVELOPER } }],
        [Role.ROLE_SUPER_ADMIN, Role.ROLE_USER]
      )
    ).toBe(false)
  })

  it('allows a route whose required role the admin holds', () => {
    expect(
      hasRequiredRoles(
        [{ meta: { requiresAuth: true } }, { meta: { requiresRole: Role.ROLE_DEVELOPER } }],
        [Role.ROLE_SUPER_ADMIN, Role.ROLE_DEVELOPER]
      )
    ).toBe(true)
  })
})

describe('developer-only routes', () => {
  beforeEach(async () => {
    useMemoryLocalStorage()
    setActivePinia(createPinia())
    await router.push('/login')
  })

  it.each(['admin_incomplete_feedbacks', 'admin_failed_messages'])(
    '%s requires ROLE_DEVELOPER',
    (name) => {
      expect(router.getRoutes().find((route) => route.name === name)?.meta.requiresRole).toBe(
        Role.ROLE_DEVELOPER
      )
    }
  )

  it('sends a signed-out visitor to the admin login first', async () => {
    await router.push('/admin/failed-messages')

    expect(router.currentRoute.value.name).toBe('admin_login')
    expect(router.currentRoute.value.query.redirect).toBe('/admin/failed-messages')
  })

  it.each(['/admin/incomplete-feedbacks', '/admin/failed-messages'])(
    'redirects a super admin without ROLE_DEVELOPER from %s to the dashboard',
    async (path) => {
      useAuthenticationStore().setSession(adminToken(['ROLE_SUPER_ADMIN', 'ROLE_USER']))

      await router.push(path)

      expect(router.currentRoute.value.name).toBe('admin_dashboard')
    }
  )

  it.each([
    ['/admin/incomplete-feedbacks', 'admin_incomplete_feedbacks'],
    ['/admin/failed-messages', 'admin_failed_messages']
  ])('lets an admin with ROLE_DEVELOPER open %s', async (path, name) => {
    useAuthenticationStore().setSession(adminToken(['ROLE_DEVELOPER', 'ROLE_USER']))

    await router.push(path)

    expect(router.currentRoute.value.name).toBe(name)
  })
})
