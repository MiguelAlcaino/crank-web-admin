<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import type { SiteEnum } from '@/gql-main/graphql'
import { useToast } from '@/modules/shared/composables/useToast'
import { useAvailableSites } from '@/modules/shared/composables/useAvailableSites'
import { useCustomerAdminActions } from '../../composables/useCustomerAdminActions'

interface Props {
  apolloClient: ApolloClient<NormalizedCacheObject>
  customerId: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
  /** The customer's data changed (Mindbody id, phone verification, sync from Mindbody). */
  (e: 'changed'): void
}>()

const toast = useToast()
const { sites, fetchSites } = useAvailableSites(props.apolloClient)
const {
  info,
  isLoading,
  hasLoadError,
  runningAction,
  fetchInfo,
  updateMindbodyId,
  verifyPhone,
  removePhoneVerification,
  syncWithMindbody
} = useCustomerAdminActions(props.apolloClient, props.customerId)

/** Site accounts whose Mindbody id edit form is open, with the value being typed. */
const editingMindbodyIds = reactive<Record<string, string>>({})
const errorMessage = ref<string | null>(null)

function siteName(site: string | undefined): string {
  return sites.value.find((candidate) => candidate.code === site)?.name ?? site ?? '-'
}

// Site account ids are nullable in the schema; the template only offers the edit when one is set.
function toggleMindbodyIdEdit(siteCustomerId: string | null | undefined, current: string) {
  if (!siteCustomerId) return
  if (siteCustomerId in editingMindbodyIds) {
    delete editingMindbodyIds[siteCustomerId]
  } else {
    editingMindbodyIds[siteCustomerId] = current
  }
}

async function report(result: Promise<string | null>, success: string): Promise<boolean> {
  errorMessage.value = await result
  if (errorMessage.value === null) {
    toast.success(success)
    emits('changed')
    return true
  }
  return false
}

async function saveMindbodyId(siteCustomerId: string | null | undefined) {
  if (!siteCustomerId) return
  const saved = await report(
    updateMindbodyId(siteCustomerId, editingMindbodyIds[siteCustomerId] ?? ''),
    'Mindbody id updated.'
  )
  if (saved) {
    delete editingMindbodyIds[siteCustomerId]
  }
}

async function sync(site: string | undefined) {
  if (!site) return
  await report(
    syncWithMindbody(site as SiteEnum),
    `Customer updated from Mindbody ${siteName(site)}.`
  )
}

async function togglePhoneVerification() {
  if (info.value?.isMobilePhoneVerified) {
    if (!confirm('Remove the phone verification of this customer?')) return
    await report(removePhoneVerification(), 'Phone verification removed.')
  } else {
    await report(verifyPhone(), 'Phone number verified.')
  }
}

onMounted(() => {
  fetchSites()
  fetchInfo()
})
</script>

<template>
  <div>
    <h6>Client actions</h6>

    <div v-if="isLoading && !info" class="text-muted small">Loading...</div>
    <div v-else-if="hasLoadError" class="alert alert-danger">
      Failed to load the customer's accounts.
    </div>

    <template v-else-if="info">
      <p>
        Mobile: <b>{{ info.phone || '-' }}</b>
        <span v-if="info.isMobilePhoneVerified" class="badge text-bg-success ms-2">Verified</span>
        <span v-else class="badge text-bg-secondary ms-2">Not verified</span>
        <button
          type="button"
          class="btn btn-sm ms-2"
          :class="info.isMobilePhoneVerified ? 'btn-outline-danger' : 'btn-outline-success'"
          :disabled="runningAction === 'phone'"
          @click="togglePhoneVerification"
        >
          {{ info.isMobilePhoneVerified ? 'Remove verification' : 'Verify phone' }}
        </button>
      </p>

      <table class="table table-sm align-middle">
        <thead>
          <tr>
            <th>Site</th>
            <th>Mindbody ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="info.siteUsersNew.length === 0">
            <td colspan="3" class="text-muted">The customer has no site account.</td>
          </tr>
          <tr v-for="account in info.siteUsersNew" :key="account.id ?? account.externalUserId">
            <td>{{ siteName(account.siteUserInfo?.site) }}</td>
            <td>
              <form
                v-if="account.id && account.id in editingMindbodyIds"
                class="d-flex gap-2"
                @submit.prevent="saveMindbodyId(account.id)"
              >
                <input
                  v-model="editingMindbodyIds[account.id]"
                  class="form-control form-control-sm"
                  placeholder="New MB ID"
                  style="max-width: 12rem"
                />
                <button
                  type="submit"
                  class="btn btn-sm btn-success"
                  :disabled="runningAction === `mbid:${account.id}`"
                >
                  Update MB ID now
                </button>
              </form>
              <span v-else>{{ account.externalUserId }}</span>
            </td>
            <td class="text-end">
              <button
                v-if="account.id"
                type="button"
                class="btn btn-sm btn-outline-secondary me-2"
                @click="toggleMindbodyIdEdit(account.id, account.externalUserId)"
              >
                {{ account.id in editingMindbodyIds ? 'Cancel' : 'Edit MB ID' }}
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                :disabled="runningAction === `sync:${account.siteUserInfo?.site}`"
                @click="sync(account.siteUserInfo?.site)"
              >
                Update from MB
                <span
                  v-if="runningAction === `sync:${account.siteUserInfo?.site}`"
                  class="spinner-border spinner-border-sm"
                ></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    </template>
  </div>
</template>
