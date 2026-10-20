import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { ApolloError, type ApolloClient, type NormalizedCacheObject } from '@apollo/client/core'
import { GraphQLError } from 'graphql'

import {
  chargeClientOutcome,
  defaultChargeEmailBody,
  priceWithVat,
  useChargeClient
} from '../../../src/modules/customer/composables/useChargeClient'
import {
  isVodPeriodActive,
  localInputToDateTime,
  useCustomerVodPeriods,
  vodPeriodAddedBy,
  vodPeriodFormError,
  type CustomerVodPeriod
} from '../../../src/modules/customer/composables/useCustomerVodPeriods'
import {
  purchasesOfCustomer,
  useCustomerIncompletePurchases,
  type IncompletePurchase
} from '../../../src/modules/customer/composables/useCustomerIncompletePurchases'
import { useCustomerAdminActions } from '../../../src/modules/customer/composables/useCustomerAdminActions'
import { ERROR_UNKNOWN } from '../../../src/utils/errorMessages'
import { useAuthenticationStore } from '../../../src/stores/authToken'
import { adminToken } from '../../support/adminToken'
import { useMemoryLocalStorage } from '../../support/memoryLocalStorage'

vi.mock('@/router', () => ({ default: {} }))

function apolloClient(client: { query?: unknown; mutate?: unknown }) {
  return client as unknown as ApolloClient<NormalizedCacheObject>
}

function graphqlError(code: string) {
  return new ApolloError({ graphQLErrors: [new GraphQLError(code)] })
}

function period(overrides: Partial<CustomerVodPeriod> = {}): CustomerVodPeriod {
  return {
    __typename: 'AdminCustomerVodPeriod',
    id: '1',
    start: '2026-10-01T00:00:00+00:00',
    end: '2026-11-01T00:00:00+00:00',
    addedBy: 'admin',
    addedByAdmin: 'jane@crank.test',
    isDeleted: false,
    deletedAt: null,
    createdAt: '2026-10-01T00:00:00+00:00',
    ...overrides
  }
}

describe('VOD periods', () => {
  const now = new Date('2026-10-17T12:00:00Z')

  it('is active only when not deleted and now is inside it', () => {
    expect(isVodPeriodActive(period({ isDeleted: true }), now)).toBe(false)
    expect(isVodPeriodActive(period({ end: '2026-10-10T00:00:00+00:00' }), now)).toBe(false)
    expect(isVodPeriodActive(period({ start: '2026-10-20T00:00:00+00:00' }), now)).toBe(false)
    expect(isVodPeriodActive(period(), now)).toBe(true)
  })

  it('names the admin who granted a period', () => {
    expect(vodPeriodAddedBy(period({ addedBy: 'purchase', addedByAdmin: null }))).toBe('purchase')
    expect(vodPeriodAddedBy(period())).toBe('admin jane@crank.test')
  })

  it('turns a datetime-local value into an ATOM date', () => {
    expect(localInputToDateTime('')).toBeNull()
    expect(localInputToDateTime('nonsense')).toBeNull()
    expect(localInputToDateTime('2026-10-17T09:30')).toMatch(/^2026-10-17T09:30:00[+-]\d{2}:\d{2}$/)
  })

  it('needs both ends and an end after the start', () => {
    expect(vodPeriodFormError(null, '2026-10-17T09:30:00+00:00')).not.toBeNull()
    expect(
      vodPeriodFormError('2026-10-17T09:30:00+00:00', '2026-10-17T09:30:00+00:00')
    ).not.toBeNull()
    expect(vodPeriodFormError('2026-10-17T09:30:00+00:00', '2026-10-18T09:30:00+00:00')).toBeNull()
  })

  it('does not call the backend for an invalid period', async () => {
    const mutate = vi.fn()
    const periods = useCustomerVodPeriods(apolloClient({ mutate }), '42')

    expect(await periods.createPeriod('2026-10-18T09:30', '2026-10-17T09:30')).toMatch(/end after/)
    expect(mutate).not.toHaveBeenCalled()
  })

  it('maps the backend refusal to its message', async () => {
    const mutate = vi.fn().mockRejectedValue(graphqlError('customer_vod_period.invalid'))
    const periods = useCustomerVodPeriods(apolloClient({ mutate }), '42')

    expect(await periods.createPeriod('2026-10-17T09:30', '2026-10-18T09:30')).toMatch(
      /end after it starts/
    )
  })

  it('creates the period and reloads the list', async () => {
    const mutate = vi.fn().mockResolvedValue({ data: { createCustomerVodPeriod: { id: '9' } } })
    const query = vi.fn().mockResolvedValue({ data: { customerVodPeriods: [period({ id: '9' })] } })
    const periods = useCustomerVodPeriods(apolloClient({ mutate, query }), '42')

    expect(await periods.createPeriod('2026-10-17T09:30', '2026-10-18T09:30')).toBeNull()
    expect(mutate.mock.calls[0][0].variables.customerId).toBe('42')
    expect(periods.periods.value.map((p) => p.id)).toEqual(['9'])
  })

  it('maps a delete refusal and deletes otherwise', async () => {
    const refused = useCustomerVodPeriods(
      apolloClient({
        mutate: vi.fn().mockRejectedValue(graphqlError('customer_vod_period.not_found'))
      }),
      '42'
    )
    expect(await refused.deletePeriod('1')).toMatch(/no longer exists/)

    const mutate = vi.fn().mockResolvedValue({ data: { deleteCustomerVodPeriod: true } })
    const query = vi.fn().mockResolvedValue({ data: { customerVodPeriods: [] } })
    const deleting = useCustomerVodPeriods(apolloClient({ mutate, query }), '42')
    expect(await deleting.deletePeriod('1')).toBeNull()
    expect(mutate.mock.calls[0][0].variables).toEqual({ id: '1' })
  })
})

describe('charge client', () => {
  it('adds 5% VAT and rounds to whole AED', () => {
    expect(priceWithVat(100)).toBe(105)
    expect(priceWithVat(952.38)).toBe(1000)
  })

  it('proposes the legacy email, with a placeholder until a package is chosen', () => {
    expect(defaultChargeEmailBody('Ann', 'Lee', null)).toBe(
      'Hi Ann Lee.\n\nPlease click on this [#link] to pay for [#productName].\n\nYour CRANK team'
    )
    expect(defaultChargeEmailBody('Ann', 'Lee', '10 classes')).toContain('pay for 10 classes.')
  })

  it('maps each result member', () => {
    expect(chargeClientOutcome({ __typename: 'CustomerNotFoundError', code: 'x' })).toEqual({
      sent: false,
      message: 'This customer no longer exists.'
    })
    expect(chargeClientOutcome({ __typename: 'ProductNotFoundError', code: 'x' }).sent).toBe(false)
    expect(
      chargeClientOutcome({
        __typename: 'CustomTransactionRequestSent',
        recipientEmail: 'ann@crank.test',
        paymentUrl: 'https://pay'
      })
    ).toEqual({ sent: true, recipientEmail: 'ann@crank.test' })
  })

  it('answers the generic message when sending fails', async () => {
    const charge = useChargeClient(
      apolloClient({ mutate: vi.fn().mockRejectedValue(new Error('boom')) }),
      '42'
    )

    expect(await charge.sendEmail('7', 'body')).toEqual({ sent: false, message: ERROR_UNKNOWN })
  })

  it('sends the customer, the package and the body', async () => {
    const mutate = vi.fn().mockResolvedValue({
      data: {
        createCustomTransactionRequest: {
          __typename: 'CustomTransactionRequestSent',
          recipientEmail: 'ann@crank.test',
          paymentUrl: 'https://pay'
        }
      }
    })
    const charge = useChargeClient(apolloClient({ mutate }), '42')

    expect(await charge.sendEmail('7', 'body')).toEqual({
      sent: true,
      recipientEmail: 'ann@crank.test'
    })
    expect(mutate.mock.calls[0][0].variables).toEqual({
      input: { customerId: '42', productId: '7', emailBody: 'body' }
    })
  })
})

describe('incomplete purchases', () => {
  // The operations require ROLE_DEVELOPER; each test signs in with or without it.
  function signInWith(roles: string[]) {
    useAuthenticationStore().setSession(adminToken(roles))
  }

  beforeEach(() => {
    useMemoryLocalStorage()
    setActivePinia(createPinia())
  })

  function purchase(id: string, customerId: string | null): IncompletePurchase {
    return {
      __typename: 'IncompleteTransactionFeedback',
      id,
      merchantReference: 1,
      status: 'feedback_received',
      feedbackTryNumber: 1,
      feedbackStatusUpdatedAt: null,
      created: '2026-10-01T00:00:00+00:00',
      siteCustomer:
        customerId === null
          ? null
          : {
              __typename: 'IdentifiableSiteUser',
              id: 's1',
              siteUserInfo: null,
              identifiableUser: { __typename: 'IdentifiableUser', id: customerId }
            }
    }
  }

  it('keeps only the purchases of the customer', () => {
    expect(
      purchasesOfCustomer(
        [purchase('1', '42'), purchase('2', '43'), purchase('3', null)],
        '42'
      ).map((p) => p.id)
    ).toEqual(['1'])
  })

  it('does not query for a super admin without ROLE_DEVELOPER', async () => {
    signInWith(['ROLE_SUPER_ADMIN', 'ROLE_USER'])
    const query = vi.fn()
    const purchases = useCustomerIncompletePurchases(
      apolloClient({ query }),
      '42',
      'ann@crank.test'
    )

    await purchases.fetchPurchases()

    expect(purchases.canView).toBe(false)
    expect(query).not.toHaveBeenCalled()
  })

  it('maps a refused retry to its message', async () => {
    signInWith(['ROLE_DEVELOPER'])
    const purchases = useCustomerIncompletePurchases(
      apolloClient({
        mutate: vi.fn().mockRejectedValue(graphqlError('temporal_transaction.already_completed'))
      }),
      '42',
      'ann@crank.test'
    )

    expect(await purchases.retry('1')).toBe('This purchase was already completed.')
  })

  it('retries and reloads the list', async () => {
    signInWith(['ROLE_DEVELOPER'])
    const mutate = vi.fn().mockResolvedValue({ data: { retryTransactionFeedback: true } })
    const query = vi.fn().mockResolvedValue({
      data: {
        incompleteTransactionFeedbacks: { items: [purchase('1', '42'), purchase('2', '43')] }
      }
    })
    const purchases = useCustomerIncompletePurchases(
      apolloClient({ mutate, query }),
      '42',
      'ann@crank.test'
    )

    expect(purchases.canView).toBe(true)
    expect(await purchases.retry('1')).toBeNull()
    expect(query.mock.calls[0][0].variables).toEqual({ email: 'ann@crank.test' })
    expect(purchases.purchases.value.map((p) => p.id)).toEqual(['1'])
  })
})

describe('customer admin actions', () => {
  it('maps a refused action to its message', async () => {
    const actions = useCustomerAdminActions(
      apolloClient({
        mutate: vi.fn().mockRejectedValue(graphqlError('customer.phone_verification_not_found'))
      }),
      '42'
    )

    expect(await actions.verifyPhone()).toMatch(/never asked for a phone verification/)
    expect(actions.runningAction.value).toBeNull()
  })

  it('updates the Mindbody id with a trimmed value and reloads the customer', async () => {
    const mutate = vi.fn().mockResolvedValue({ data: { updateSiteCustomerMindbodyId: true } })
    const query = vi.fn().mockResolvedValue({
      data: {
        user: {
          id: '42',
          user: {
            firstName: 'Ann',
            lastName: 'Lee',
            email: 'ann@crank.test',
            phone: '',
            isMobilePhoneVerified: false,
            siteUsersNew: []
          }
        }
      }
    })
    const actions = useCustomerAdminActions(apolloClient({ mutate, query }), '42')

    expect(await actions.updateMindbodyId('12', ' 100 ')).toBeNull()
    expect(mutate.mock.calls[0][0].variables).toEqual({
      siteCustomerId: '12',
      newMindbodyId: '100'
    })
    expect(actions.info.value?.firstName).toBe('Ann')
  })
})
