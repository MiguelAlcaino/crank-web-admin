<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useIncompleteTransactionFeedbacks } from '../composables/useIncompleteTransactionFeedbacks'
import { useToast } from '@/modules/shared/composables/useToast'
import PaginationComponent from '@/modules/shared/components/PaginationComponent.vue'

const gqlUrl = import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL
const apolloClient = newAuthenticatedApolloClient(gqlUrl)
const feedbacks = useIncompleteTransactionFeedbacks(apolloClient)
const toast = useToast()

const email = ref('')
const createdAfter = ref('')
const currentPage = ref(1)
const limit = 25

const retryCountdowns = reactive<Record<string, number>>({})

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleString()
}

async function loadList() {
  const filter: Record<string, string> = {}
  if (email.value) filter.email = email.value
  if (createdAfter.value) filter.createdAfter = new Date(createdAfter.value).toISOString()

  await feedbacks.fetchList(
    Object.keys(filter).length > 0 ? filter : undefined,
    { page: currentPage.value, limit }
  )
}

async function handleFilter() {
  currentPage.value = 1
  await loadList()
}

async function clearFilter() {
  email.value = ''
  createdAfter.value = ''
  currentPage.value = 1
  await loadList()
}

async function goToPage(page: number) {
  currentPage.value = page
  await loadList()
}

async function handleRetry(id: string) {
  const result = await feedbacks.retry(id)

  if (result === 'success') {
    toast.success('Retry dispatched — the row will disappear once processing completes')
  } else if (result === 'not_found') {
    toast.warning('Record not found — it may have been completed already')
  } else if (result === 'already_done') {
    toast.info('Already processed successfully')
  } else {
    toast.error('Retry failed — please try again later')
  }

  // 5s cooldown for this row, then refetch
  retryCountdowns[id] = 5
  const interval = setInterval(async () => {
    retryCountdowns[id]--
    if (retryCountdowns[id] <= 0) {
      clearInterval(interval)
      delete retryCountdowns[id]
      await loadList()
    }
  }, 1000)
}

onMounted(loadList)
</script>

<template>
  <div>
    <h4>Incomplete Transaction Feedbacks</h4>

    <!-- Filters -->
    <div class="row mb-3">
      <div class="col-md-4">
        <input
          type="text"
          v-model="email"
          class="form-control form-control-sm"
          placeholder="Customer email"
          @keyup.enter="handleFilter"
        />
      </div>
      <div class="col-md-3">
        <input
          type="date"
          v-model="createdAfter"
          class="form-control form-control-sm"
        />
      </div>
      <div class="col-md-2">
        <button class="btn btn-primary btn-sm me-2" @click="handleFilter">Filter</button>
        <button class="btn btn-outline-secondary btn-sm" @click="clearFilter">Clear</button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="feedbacks.isLoading.value" class="text-center py-4">
      <div class="spinner-border" role="status"></div>
    </div>

    <!-- Error -->
    <div v-if="feedbacks.hasError.value" class="alert alert-danger">
      {{ feedbacks.errorMessage.value }}
    </div>

    <!-- Results -->
    <div v-if="feedbacks.listResult.value && !feedbacks.isLoading.value">
      <p class="text-muted small mb-2">
        {{ feedbacks.listResult.value.totalCount }} record(s) found
      </p>
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>Merchant Ref</th>
            <th>Customer</th>
            <th>Site</th>
            <th>Status</th>
            <th>Try #</th>
            <th>Last Updated</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="feedbacks.listResult.value.items.length === 0">
            <td colspan="8" class="text-center text-muted py-3">No incomplete feedbacks found</td>
          </tr>
          <tr v-for="item in feedbacks.listResult.value.items" :key="item.id">
            <td>{{ item.merchantReference ?? '-' }}</td>
            <td>
              <template v-if="item.siteCustomer?.identifiableUser">
                <router-link
                  v-if="item.siteCustomer.identifiableUser.id"
                  :to="{ name: 'admin_customer_profile', params: { id: item.siteCustomer.identifiableUser.id } }"
                >
                  {{ item.siteCustomer.identifiableUser.user?.firstName }}
                  {{ item.siteCustomer.identifiableUser.user?.lastName }}
                </router-link>
                <br />
                <small class="text-muted">{{ item.siteCustomer.identifiableUser.user?.email }}</small>
              </template>
              <span v-else class="text-muted">—</span>
            </td>
            <td>{{ item.siteCustomer?.siteUserInfo?.site ?? '-' }}</td>
            <td>
              <span class="badge text-bg-warning">{{ item.status }}</span>
            </td>
            <td>{{ item.feedbackTryNumber }}</td>
            <td>{{ formatDate(item.feedbackStatusUpdatedAt) }}</td>
            <td>{{ formatDate(item.created) }}</td>
            <td>
              <button
                class="btn btn-outline-primary btn-sm"
                :disabled="feedbacks.retryingId.value === item.id || item.id in retryCountdowns"
                @click="handleRetry(item.id)"
              >
                <span v-if="feedbacks.retryingId.value === item.id">Retrying…</span>
                <span v-else-if="item.id in retryCountdowns">Wait {{ retryCountdowns[item.id] }}s</span>
                <span v-else>Retry</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <PaginationComponent
        v-if="feedbacks.listResult.value.totalCount > limit"
        :page="currentPage"
        :limit="limit"
        :total="feedbacks.listResult.value.totalCount"
        @pageChanged="goToPage"
      />
    </div>
  </div>
</template>
