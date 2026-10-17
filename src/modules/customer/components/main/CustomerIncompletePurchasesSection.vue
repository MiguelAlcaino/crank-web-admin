<script setup lang="ts">
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import { useToast } from '@/modules/shared/composables/useToast'
import { useCustomerIncompletePurchases } from '../../composables/useCustomerIncompletePurchases'

interface Props {
  apolloClient: ApolloClient<NormalizedCacheObject>
  customerId: string
  email: string
}

const props = defineProps<Props>()

const toast = useToast()
const { purchases, isLoading, hasLoadError, retryingId, fetchPurchases, retry } =
  useCustomerIncompletePurchases(props.apolloClient, props.customerId, props.email)

const errorMessage = ref<string | null>(null)

function formatDate(value: string | null | undefined): string {
  return value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '-'
}

async function resend(id: string) {
  if (!confirm('Send the payment feedback of this purchase to the message bus again?')) return
  errorMessage.value = await retry(id)
  if (errorMessage.value === null) {
    toast.success('Payment feedback sent to the message bus.')
  }
}

onMounted(fetchPurchases)
</script>

<template>
  <div>
    <h6>Incomplete purchases</h6>
    <p class="small text-muted">
      Purchases whose payment feedback arrived but did not complete. Resending it retries the
      purchase in Mindbody.
    </p>

    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

    <div v-if="isLoading && purchases.length === 0" class="text-muted small">Loading...</div>
    <div v-else-if="hasLoadError" class="alert alert-danger">
      Failed to load the incomplete purchases.
    </div>
    <div v-else-if="purchases.length === 0" class="text-muted">No incomplete purchases.</div>
    <div v-else class="table-responsive">
      <table class="table table-sm align-middle">
        <thead>
          <tr>
            <th>Id</th>
            <th>Merchant reference</th>
            <th>Site</th>
            <th>Created</th>
            <th>Status</th>
            <th>Tries</th>
            <th>Last update</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="purchase in purchases" :key="purchase.id">
            <td>{{ purchase.id }}</td>
            <td>{{ purchase.merchantReference ?? '-' }}</td>
            <td>{{ purchase.siteCustomer?.siteUserInfo?.site ?? '-' }}</td>
            <td>{{ formatDate(purchase.created) }}</td>
            <td>{{ purchase.status }}</td>
            <td>{{ purchase.feedbackTryNumber }}</td>
            <td>{{ formatDate(purchase.feedbackStatusUpdatedAt) }}</td>
            <td class="text-end">
              <button
                type="button"
                class="btn btn-sm btn-info"
                :disabled="retryingId === purchase.id"
                @click="resend(purchase.id)"
              >
                Send to message bus
                <span
                  v-if="retryingId === purchase.id"
                  class="spinner-border spinner-border-sm"
                ></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
