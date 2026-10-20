import { mount, RouterLinkStub } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { reactive } from 'vue'
import type * as VueRouter from 'vue-router'
import type * as BackendProfileModule from '@/config/backendProfile'

import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAuthenticationStore } from '@/stores/authToken'

import { adminToken } from '../support/adminToken'
import { useMemoryLocalStorage } from '../support/memoryLocalStorage'

vi.mock('@/router', () => ({ default: {} }))
vi.mock('vue-router', async (importOriginal) => ({
  ...(await importOriginal<typeof VueRouter>()),
  useRoute: () => reactive({ name: 'admin_dashboard', params: {} })
}))
vi.mock('@/services/graphqlClient', () => ({ newAuthenticatedApolloClient: () => ({}) }))
vi.mock('@/modules/shared/composables/useAvailableSites', async () => {
  const { ref } = await import('vue')
  return { useAvailableSites: () => ({ sites: ref([]), fetchSites: async () => undefined }) }
})
// Every feature available, so only the role decides what the sidebar shows.
vi.mock('@/config/backendProfile', async (importOriginal) => ({
  ...(await importOriginal<typeof BackendProfileModule>()),
  isFeatureAvailable: () => true
}))

function mountLayoutFor(roles: string[]) {
  // A saved theme spares the theme store jsdom's missing window.matchMedia
  localStorage.setItem('theme', 'light')
  useAuthenticationStore().setSession(adminToken(roles))

  return mount(AdminLayout, {
    global: { stubs: { RouterLink: RouterLinkStub, RouterView: true, AdminToast: true } }
  })
}

function linkedRouteNames(layout: ReturnType<typeof mountLayoutFor>): unknown[] {
  return layout
    .findAllComponents(RouterLinkStub)
    .map((link) => (link.props('to') as { name?: string }).name)
}

describe('AdminLayout sidebar', () => {
  beforeEach(() => {
    useMemoryLocalStorage()
    setActivePinia(createPinia())
  })

  it('hides the developer pages from a super admin without ROLE_DEVELOPER', () => {
    const names = linkedRouteNames(mountLayoutFor(['ROLE_SUPER_ADMIN', 'ROLE_USER']))

    expect(names).toContain('admin_transactions')
    expect(names).not.toContain('admin_incomplete_feedbacks')
    expect(names).not.toContain('admin_failed_messages')
  })

  it('shows the developer pages to an admin with ROLE_DEVELOPER', () => {
    const names = linkedRouteNames(mountLayoutFor(['ROLE_SUPER_ADMIN', 'ROLE_DEVELOPER']))

    expect(names).toContain('admin_incomplete_feedbacks')
    expect(names).toContain('admin_failed_messages')
  })
})
