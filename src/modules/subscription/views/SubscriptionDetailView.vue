<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useSubscription } from '../composables/useSubscription'

const gqlUrl = import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL
const apolloClient = newAuthenticatedApolloClient(gqlUrl)
const sub = useSubscription(apolloClient)
const route = useRoute()
const router = useRouter()

onMounted(() => {
  sub.fetchDetail(route.params.id as string)
})

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString()
}

function formatAmount(amountCents: number): string {
  return (amountCents / 100).toFixed(2)
}

const customer = computed(() => {
  const transactions = sub.detail.value?.transactions
  if (!transactions?.length) return null
  return { name: transactions[0].customerName, email: transactions[0].customerEmail }
})

const confirmCancel = ref(false)
const cancelError = ref<string | null>(null)

async function handleCancel() {
  cancelError.value = null
  const result = await sub.cancel(route.params.id as string)
  if (result.success) {
    confirmCancel.value = false
    await sub.fetchDetail(route.params.id as string)
  } else {
    cancelError.value = result.errorCode ?? 'Unknown error'
  }
}

const sortedTransactions = computed(() => {
  if (!sub.detail.value?.transactions) return []
  return [...sub.detail.value.transactions].sort((a, b) => {
    if (!a.created || !b.created) return 0
    return new Date(b.created).getTime() - new Date(a.created).getTime()
  })
})
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Subscription Detail</h4>
      <button class="btn btn-outline-secondary btn-sm" @click="router.back()">Back</button>
    </div>

    <div v-if="sub.isLoading.value" class="text-center py-4">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-if="sub.hasError.value" class="alert alert-danger">{{ sub.errorMessage.value }}</div>

    <div v-if="sub.detail.value && !sub.isLoading.value">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th width="200">Customer</th>
            <td>
              <div v-if="customer">
                <div>{{ customer.name || '—' }}</div>
                <small class="text-muted">{{ customer.email }}</small>
              </div>
              <span v-else>—</span>
            </td>
          </tr>
          <tr>
            <th>Plan</th>
            <td>{{ sub.detail.value.billingInterval }} — {{ formatAmount(sub.detail.value.amountCents) }}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>
              <span
                class="badge"
                :class="sub.detail.value.status === 'active' ? 'text-bg-success' : 'text-bg-warning'"
              >
                {{ sub.detail.value.status }}
              </span>
            </td>
          </tr>
          <tr>
            <th>Card</th>
            <td>{{ sub.detail.value.creditCardLastFourDigits ? `****${sub.detail.value.creditCardLastFourDigits}` : '—' }}</td>
          </tr>
          <tr>
            <th>Started</th>
            <td>{{ formatDate(sub.detail.value.createdAt) }}</td>
          </tr>
          <tr v-if="sub.detail.value.cancelledAt">
            <th>Cancelled</th>
            <td>{{ formatDate(sub.detail.value.cancelledAt) }}</td>
          </tr>
          <tr v-if="sub.detail.value.nextBillingAt">
            <th>Next Billing</th>
            <td>{{ formatDate(sub.detail.value.nextBillingAt) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Cancel -->
      <div v-if="sub.detail.value.status === 'active'" class="mt-3">
        <div v-if="!confirmCancel">
          <button class="btn btn-danger btn-sm" @click="confirmCancel = true">Cancel Subscription</button>
        </div>
        <div v-else class="alert alert-warning">
          <p>Are you sure you want to cancel this subscription?</p>
          <div v-if="cancelError" class="text-danger mb-2">Error: {{ cancelError }}</div>
          <button
            class="btn btn-danger btn-sm me-2"
            @click="handleCancel"
            :disabled="sub.isCancelling.value"
          >
            <span v-if="sub.isCancelling.value">Processing...</span>
            <span v-else>Confirm Cancel</span>
          </button>
          <button class="btn btn-secondary btn-sm" @click="confirmCancel = false; cancelError = null">
            Back
          </button>
        </div>
      </div>

      <h5 class="mt-4">Renewal History</h5>
      <div v-if="!sortedTransactions.length" class="text-muted">No renewal records yet.</div>
      <table v-else class="table table-sm table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="txn in sortedTransactions" :key="txn.id">
            <td>{{ formatDate(txn.created) }}</td>
            <td>{{ txn.amount ?? '—' }}</td>
            <td>
              <span
                class="badge"
                :class="txn.status === 'Success' ? 'text-bg-success' : 'text-bg-warning'"
              >
                {{ txn.status ?? '—' }}
              </span>
            </td>
            <td>
              <router-link
                :to="{ name: 'admin_transaction_detail', params: { id: txn.id } }"
                class="btn btn-sm btn-outline-secondary"
              >
                View
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
