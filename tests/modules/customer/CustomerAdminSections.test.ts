import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type * as BackendProfileModule from '@/config/backendProfile'

import CustomerAdminSections from '@/modules/customer/components/main/CustomerAdminSections.vue'
import CustomerIncompletePurchasesSection from '@/modules/customer/components/main/CustomerIncompletePurchasesSection.vue'
import { useAuthenticationStore } from '@/stores/authToken'

import { adminToken } from '../../support/adminToken'
import { useMemoryLocalStorage } from '../../support/memoryLocalStorage'

const query = vi.fn()

vi.mock('@/router', () => ({ default: {} }))
vi.mock('@/services/graphqlClient', () => ({
  newAuthenticatedApolloClient: () => ({ query })
}))
// Every feature available, so only the role decides whether the section shows.
vi.mock('@/config/backendProfile', async (importOriginal) => ({
  ...(await importOriginal<typeof BackendProfileModule>()),
  isFeatureAvailable: () => true
}))

async function mountSectionsFor(roles: string[]) {
  useAuthenticationStore().setSession(adminToken(roles))

  const sections = mount(CustomerAdminSections, {
    props: { customerId: '42', firstName: 'Ann', lastName: 'Lee', email: 'ann@crank.test' },
    global: {
      stubs: {
        CustomerActionsSection: true,
        CustomerChargeClientSection: true,
        CustomerVodPeriodsSection: true
      }
    }
  })
  await flushPromises()

  return sections
}

describe('CustomerAdminSections incomplete purchases', () => {
  beforeEach(() => {
    useMemoryLocalStorage()
    setActivePinia(createPinia())
    query.mockReset()
    query.mockResolvedValue({ data: { incompleteTransactionFeedbacks: { items: [] } } })
  })

  it('is hidden and never queried for a super admin without ROLE_DEVELOPER', async () => {
    const sections = await mountSectionsFor(['ROLE_SUPER_ADMIN', 'ROLE_USER'])

    expect(sections.findComponent(CustomerIncompletePurchasesSection).exists()).toBe(false)
    expect(sections.text()).not.toContain('Incomplete purchases')
    expect(query).not.toHaveBeenCalled()
  })

  it('is shown and loaded for an admin with ROLE_DEVELOPER', async () => {
    const sections = await mountSectionsFor(['ROLE_SUPER_ADMIN', 'ROLE_DEVELOPER'])

    expect(sections.findComponent(CustomerIncompletePurchasesSection).exists()).toBe(true)
    expect(sections.text()).toContain('Incomplete purchases')
    expect(query).toHaveBeenCalledOnce()
    expect(query.mock.calls[0][0].variables).toEqual({ email: 'ann@crank.test' })
  })
})
