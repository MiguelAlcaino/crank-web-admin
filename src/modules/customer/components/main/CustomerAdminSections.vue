<script setup lang="ts">
import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { AdminFeature, isFeatureAvailable } from '@/config/backendProfile'
import CustomerActionsSection from './CustomerActionsSection.vue'
import CustomerChargeClientSection from './CustomerChargeClientSection.vue'
import CustomerIncompletePurchasesSection from './CustomerIncompletePurchasesSection.vue'
import CustomerVodPeriodsSection from './CustomerVodPeriodsSection.vue'

/*
 * Sections of the customer profile built on crank-payments main's own admin operations (the
 * legacy Twig customer page): client actions, charge client, VOD periods and incomplete purchases.
 * Each is a main-only feature in src/config/features.ts and hidden on other backend profiles.
 */
interface Props {
  customerId: string
  firstName: string
  lastName: string
  email: string
}

defineProps<Props>()

const emits = defineEmits<{
  /** The customer's data changed; the profile should reload it. */
  (e: 'customerChanged'): void
}>()

const apolloClient = newAuthenticatedApolloClient(import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL)

const showActions = isFeatureAvailable(AdminFeature.CustomerActions)
const showChargeClient = isFeatureAvailable(AdminFeature.ChargeClient)
const showVodPeriods = isFeatureAvailable(AdminFeature.CustomerVodPeriods)
const showIncompletePurchases = isFeatureAvailable(AdminFeature.CustomerIncompletePurchases)
</script>

<template>
  <template v-if="showActions">
    <hr />
    <CustomerActionsSection
      :apollo-client="apolloClient"
      :customer-id="customerId"
      @changed="emits('customerChanged')"
    />
  </template>

  <template v-if="showChargeClient">
    <hr />
    <CustomerChargeClientSection
      :apollo-client="apolloClient"
      :customer-id="customerId"
      :first-name="firstName"
      :last-name="lastName"
    />
  </template>

  <template v-if="showVodPeriods">
    <hr />
    <CustomerVodPeriodsSection :apollo-client="apolloClient" :customer-id="customerId" />
  </template>

  <template v-if="showIncompletePurchases && email">
    <hr />
    <CustomerIncompletePurchasesSection
      :apollo-client="apolloClient"
      :customer-id="customerId"
      :email="email"
    />
  </template>
</template>
