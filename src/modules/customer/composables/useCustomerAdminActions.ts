import { ref } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import {
  CustomerAdminInfoDocument,
  RemoveCustomerPhoneVerificationDocument,
  SyncCustomerWithMindbodyDocument,
  UpdateSiteCustomerMindbodyIdDocument,
  VerifyCustomerPhoneNumberDocument,
  type CustomerAdminInfoQuery,
  type SiteEnum
} from '@/gql-main/graphql'
import { messageForGraphqlError } from '@/utils/errors/graphqlErrorCode'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { CUSTOMER_ACTION_ERRORS } from './customerAdminErrors'

export type CustomerAdminInfo = NonNullable<NonNullable<CustomerAdminInfoQuery['user']>['user']>

export type CustomerSiteAccount = CustomerAdminInfo['siteUsersNew'][number]

/**
 * The customer profile's admin actions on crank-payments main: the Mindbody id of each site
 * account, the manual phone verification and the sync from Mindbody. Each action answers null on
 * success, or the message to show.
 */
export const useCustomerAdminActions = (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  customerId: string
) => {
  const info = ref<CustomerAdminInfo | null>(null)
  const isLoading = ref(false)
  const hasLoadError = ref(false)
  /** Which action is running, to disable its button: e.g. `sync:dubai`, `phone`, `mbid:12`. */
  const runningAction = ref<string | null>(null)

  async function fetchInfo() {
    isLoading.value = true
    hasLoadError.value = false
    try {
      const { data } = await apolloClient.query({
        query: CustomerAdminInfoDocument,
        variables: { id: customerId },
        fetchPolicy: 'network-only'
      })
      info.value = data.user?.user ?? null
      hasLoadError.value = info.value === null
    } catch (e) {
      hasLoadError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function run(action: string, operation: () => Promise<unknown>): Promise<string | null> {
    runningAction.value = action
    try {
      await operation()
      await fetchInfo()
      return null
    } catch (e) {
      return messageForGraphqlError(e, CUSTOMER_ACTION_ERRORS, ERROR_UNKNOWN)
    } finally {
      runningAction.value = null
    }
  }

  function updateMindbodyId(siteCustomerId: string, newMindbodyId: string) {
    return run(`mbid:${siteCustomerId}`, () =>
      apolloClient.mutate({
        mutation: UpdateSiteCustomerMindbodyIdDocument,
        variables: { siteCustomerId, newMindbodyId: newMindbodyId.trim() }
      })
    )
  }

  function verifyPhone() {
    return run('phone', () =>
      apolloClient.mutate({
        mutation: VerifyCustomerPhoneNumberDocument,
        variables: { customerId }
      })
    )
  }

  function removePhoneVerification() {
    return run('phone', () =>
      apolloClient.mutate({
        mutation: RemoveCustomerPhoneVerificationDocument,
        variables: { customerId }
      })
    )
  }

  function syncWithMindbody(site: SiteEnum) {
    return run(`sync:${site}`, () =>
      apolloClient.mutate({
        mutation: SyncCustomerWithMindbodyDocument,
        variables: { customerId, site }
      })
    )
  }

  return {
    info,
    isLoading,
    hasLoadError,
    runningAction,
    fetchInfo,
    updateMindbodyId,
    verifyPhone,
    removePhoneVerification,
    syncWithMindbody
  }
}
