<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useTransactionRecords } from '../composables/useTransactionRecords'
import { useAvailableSites } from '@/modules/shared/composables/useAvailableSites'

const gqlUrl = import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL
const apolloClient = newAuthenticatedApolloClient(gqlUrl)
const txn = useTransactionRecords(apolloClient)
const { sites: availableSites, fetchSites } = useAvailableSites(apolloClient)
const router = useRouter()

const search = ref('')
const paymentMethod = ref('')
const site = ref('')
const startDate = ref('')
const endDate = ref('')
const currentPage = ref(1)
const limit = 50

const totalPages = computed(() => {
  if (!txn.listResult.value) return 1
  return Math.ceil(txn.listResult.value.totalCount / limit)
})

async function loadTransactions() {
  const filter: Record<string, string> = {}
  if (search.value) filter.search = search.value
  if (paymentMethod.value) filter.paymentMethod = paymentMethod.value
  if (site.value) filter.site = site.value
  if (startDate.value) filter.startDate = startDate.value
  if (endDate.value) filter.endDate = endDate.value

  await txn.fetchList(
    Object.keys(filter).length > 0 ? filter : undefined,
    { page: currentPage.value, limit }
  )
}

async function handleFilter() {
  currentPage.value = 1
  await loadTransactions()
}

async function clearFilter() {
  search.value = ''
  paymentMethod.value = ''
  site.value = ''
  startDate.value = ''
  endDate.value = ''
  currentPage.value = 1
  await loadTransactions()
}

async function goToPage(page: number) {
  currentPage.value = page
  await loadTransactions()
}

function viewTransaction(id: string) {
  router.push({ name: 'admin_transaction_detail', params: { id } })
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString()
}

onMounted(async () => {
  await fetchSites()
  await loadTransactions()
})
</script>

<template>
  <div>
    <h4>List of transactions</h4>

    <!-- Filters -->
    <div class="row mb-3">
      <div class="col-md-3">
        <input type="text" v-model="search" class="form-control form-control-sm" placeholder="Client's name" />
      </div>
      <div class="col-md-2">
        <select v-model="paymentMethod" class="form-control form-control-sm">
          <option value="">Payment method</option>
          <option value="CREDIT_CARD">Credit Card</option>
          <option value="DIGITAL_WALLET">Digital Wallet</option>
          <option value="APPLE_PAY">Apple Pay</option>
          <option value="AMEX">AMEX</option>
        </select>
      </div>
      <div class="col-md-2">
        <select v-model="site" class="form-control form-control-sm">
          <option value="">All Sites</option>
          <option v-for="s in availableSites" :key="s.code" :value="s.code">
            {{ s.name }}
          </option>
        </select>
      </div>
      <div class="col-md-2">
        <input type="date" v-model="startDate" class="form-control form-control-sm" />
      </div>
      <div class="col-md-2">
        <input type="date" v-model="endDate" class="form-control form-control-sm" />
      </div>
      <div class="col-md-1">
        <button class="btn btn-primary btn-sm btn-block" @click="handleFilter">Filter</button>
      </div>
    </div>
    <div class="mb-3">
      <button class="btn btn-outline-secondary btn-sm" @click="clearFilter">Clear filter</button>
    </div>

    <!-- Loading -->
    <div v-if="txn.isLoading.value" class="text-center py-4">
      <div class="spinner-border" role="status"></div>
    </div>

    <!-- Error -->
    <div v-if="txn.hasError.value" class="alert alert-danger">{{ txn.errorMessage.value }}</div>

    <!-- Results -->
    <div v-if="txn.listResult.value && !txn.isLoading.value">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Date</th>
            <th>Payment Status</th>
            <th>Items</th>
            <th>Amount</th>
            <th>Auth code</th>
            <th>Site</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="txn.listResult.value.items.length === 0">
            <td colspan="9" class="text-center text-muted py-3">No transactions found</td>
          </tr>
          <tr v-for="t in txn.listResult.value.items" :key="t.id">
            <td>{{ t.customerName || '-' }}</td>
            <td>{{ t.customerEmail || '-' }}</td>
            <td>{{ formatDate(t.created) }}</td>
            <td>
              <span class="badge" :class="t.status === 'refunded' ? 'badge-warning' : 'badge-success'">
                {{ t.status }}
              </span>
            </td>
            <td>
              <span v-for="item in t.items" :key="item.id" class="d-block small">
                {{ item.name }} (x{{ item.quantity }})
              </span>
            </td>
            <td>{{ t.amount || '0' }}</td>
            <td>{{ t.authorizationCode || '-' }}</td>
            <td>{{ t.siteName || '-' }}</td>
            <td>
              <button class="btn btn-outline-secondary btn-sm" @click="viewTransaction(t.id)">
                Show
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <nav v-if="totalPages > 1">
        <ul class="pagination pagination-sm">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Previous</a>
          </li>
          <li
            v-for="p in Math.min(totalPages, 10)"
            :key="p"
            class="page-item"
            :class="{ active: p === currentPage }"
          >
            <a class="page-link" href="#" @click.prevent="goToPage(p)">{{ p }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
