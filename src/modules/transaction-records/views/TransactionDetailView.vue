<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useTransactionRecords } from '../composables/useTransactionRecords'
import { useToast } from '@/modules/shared/composables/useToast'

const gqlUrl = import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL
const apolloClient = newAuthenticatedApolloClient(gqlUrl)
const txn = useTransactionRecords(apolloClient)
const toast = useToast()
const route = useRoute()
const router = useRouter()

const confirmRefund = ref(false)

onMounted(() => {
  txn.fetchDetail(route.params.id as string)
})

async function handleRefund() {
  const success = await txn.refund(route.params.id as string)
  if (success) {
    toast.success('The payment has been refunded')
    confirmRefund.value = false
    await txn.fetchDetail(route.params.id as string)
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleString()
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Transaction Detail</h4>
      <button class="btn btn-outline-secondary btn-sm" @click="router.push({ name: 'admin_transactions' })">
        Back to list
      </button>
    </div>

    <div v-if="txn.isLoading.value" class="text-center py-4">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-if="txn.hasError.value" class="alert alert-danger">{{ txn.errorMessage.value }}</div>

    <div v-if="txn.detail.value && !txn.isLoading.value">
      <table class="table table-bordered">
        <tbody>
          <tr><th width="200">ID</th><td>{{ txn.detail.value.id }}</td></tr>
          <tr><th>Customer</th><td>{{ txn.detail.value.customerName || '-' }}</td></tr>
          <tr><th>Email</th><td>{{ txn.detail.value.customerEmail || '-' }}</td></tr>
          <tr><th>Site</th><td>{{ txn.detail.value.siteName || '-' }}</td></tr>
          <tr><th>Status</th><td>
            <span class="badge" :class="txn.detail.value.status === 'refunded' ? 'text-bg-warning' : 'text-bg-success'">
              {{ txn.detail.value.status }}
            </span>
          </td></tr>
          <tr><th>Amount</th><td>{{ txn.detail.value.amount }}</td></tr>
          <tr><th>Tax</th><td>{{ txn.detail.value.taxAmount }}</td></tr>
          <tr><th>Sub Total</th><td>{{ txn.detail.value.subTotal }}</td></tr>
          <tr><th>Card Holder</th><td>{{ txn.detail.value.creditCardHolderName || '-' }}</td></tr>
          <tr><th>Last 4 Digits</th><td>{{ txn.detail.value.creditCardLastFourDigits || '-' }}</td></tr>
          <tr><th>Authorization Code</th><td>{{ txn.detail.value.authorizationCode || '-' }}</td></tr>
          <tr><th>Installments</th><td>{{ txn.detail.value.installments }}</td></tr>
          <tr><th>Created</th><td>{{ formatDate(txn.detail.value.created) }}</td></tr>
          <tr v-if="txn.detail.value.refundDate"><th>Refund Date</th><td>{{ formatDate(txn.detail.value.refundDate) }}</td></tr>
        </tbody>
      </table>

      <!-- Items -->
      <h5>Items</h5>
      <table class="table table-sm table-striped">
        <thead>
          <tr><th>Name</th><th>Quantity</th><th>Price</th></tr>
        </thead>
        <tbody>
          <tr v-for="item in txn.detail.value.items" :key="item.id ?? ''">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.amount }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Refund -->
      <div v-if="txn.detail.value.isRefundable" class="mt-3">
        <div v-if="!confirmRefund">
          <button class="btn btn-danger btn-sm" @click="confirmRefund = true">Refund</button>
        </div>
        <div v-else class="alert alert-warning">
          <p>Are you sure you want to refund this transaction?</p>
          <button
            class="btn btn-danger btn-sm me-2"
            @click="handleRefund"
            :disabled="txn.isRefunding.value"
          >
            <span v-if="txn.isRefunding.value">Processing...</span>
            <span v-else>Confirm Refund</span>
          </button>
          <button class="btn btn-secondary btn-sm" @click="confirmRefund = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
