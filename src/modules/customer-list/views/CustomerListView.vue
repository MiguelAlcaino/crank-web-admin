<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useAdminCustomers } from '../composables/useAdminCustomers'
import PaginationComponent from '@/modules/shared/components/PaginationComponent.vue'

const gqlUrl = import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL
const apolloClient = newAuthenticatedApolloClient(gqlUrl)
const crud = useAdminCustomers(apolloClient)
const router = useRouter()

const search = ref('')
const showFilters = ref(false)
const registrationStartDate = ref('')
const registrationEndDate = ref('')
const vodStartDate = ref('')
const vodEndDate = ref('')
const currentPage = ref(1)
const limit = 50

const totalPages = computed(() => {
  if (!crud.result.value) return 1
  return Math.ceil(crud.result.value.totalCount / limit)
})

async function loadCustomers() {
  await crud.fetchCustomers({
    search: search.value || undefined,
    registrationStartDate: registrationStartDate.value || undefined,
    registrationEndDate: registrationEndDate.value || undefined,
    vodStartDate: vodStartDate.value || undefined,
    vodEndDate: vodEndDate.value || undefined,
    page: currentPage.value,
    limit
  })
}

async function handleSearch() {
  currentPage.value = 1
  await loadCustomers()
}

async function clearFilters() {
  search.value = ''
  registrationStartDate.value = ''
  registrationEndDate.value = ''
  vodStartDate.value = ''
  vodEndDate.value = ''
  currentPage.value = 1
  await loadCustomers()
}

async function goToPage(page: number) {
  currentPage.value = page
  await loadCustomers()
}

function viewCustomer(id: string) {
  router.push({ name: 'admin_customer_profile', params: { id } })
}

function editCustomer(id: string) {
  router.push({ name: 'admin_customer_edit', params: { id } })
}

onMounted(loadCustomers)
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Clients</h4>
      <RouterLink :to="{ name: 'admin_customer_create' }" class="btn btn-dark btn-sm">
        + New Customer
      </RouterLink>
    </div>

    <!-- Search -->
    <form @submit.prevent="handleSearch" class="mb-3">
      <div class="input-group">
        <input
          type="text"
          v-model="search"
          class="form-control"
          placeholder="Search by name, email, or phone..."
        />
        <button type="submit" class="btn btn-primary">Search</button>
          <button type="button" class="btn btn-outline-secondary" @click="showFilters = !showFilters">
            {{ showFilters ? 'Hide Filters' : 'Filters' }}
          </button>
      </div>
    </form>

    <!-- Advanced Filters -->
    <div v-if="showFilters" class="card mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <label class="small">Registration From</label>
            <input type="date" v-model="registrationStartDate" class="form-control form-control-sm" />
          </div>
          <div class="col-md-3">
            <label class="small">Registration To</label>
            <input type="date" v-model="registrationEndDate" class="form-control form-control-sm" />
          </div>
          <div class="col-md-3">
            <label class="small">VOD From</label>
            <input type="date" v-model="vodStartDate" class="form-control form-control-sm" />
          </div>
          <div class="col-md-3">
            <label class="small">VOD To</label>
            <input type="date" v-model="vodEndDate" class="form-control form-control-sm" />
          </div>
        </div>
        <div class="mt-2">
          <button class="btn btn-primary btn-sm me-2" @click="handleSearch">Apply</button>
          <button class="btn btn-outline-secondary btn-sm" @click="clearFilters">Clear</button>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="crud.isLoading.value" class="text-center py-4">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <!-- Error -->
    <div v-if="crud.hasError.value" class="alert alert-danger">
      Failed to load customers.
    </div>

    <!-- Results -->
    <div v-if="crud.result.value && !crud.isLoading.value">
      <p class="text-muted small">
        {{ crud.result.value.totalCount }} customers found
        (page {{ crud.result.value.page }} of {{ totalPages }})
      </p>

      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Phone Verified</th>
            <th>Sites</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in crud.result.value.items" :key="customer.id">
            <td>{{ customer.id }}</td>
            <td>{{ customer.user.firstName }} {{ customer.user.lastName }}</td>
            <td>{{ customer.user.email }}</td>
            <td>{{ customer.user.phone || '-' }}</td>
            <td>
              <span v-if="customer.user.isMobilePhoneVerified" class="badge text-bg-success">Yes</span>
              <span v-else class="badge text-bg-secondary">No</span>
            </td>
            <td>
              <span
                v-for="su in customer.user.siteUsers"
                :key="su.site"
                class="badge text-bg-info me-1"
                :title="'MB ID: ' + (su.externalUserId || 'N/A')"
              >
                {{ su.site }}
              </span>
            </td>
            <td>
              <button class="btn btn-outline-secondary btn-sm me-1" @click="viewCustomer(customer.id)">
                View
              </button>
              <button class="btn btn-outline-secondary btn-sm" @click="editCustomer(customer.id)">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <PaginationComponent
        v-if="crud.result.value"
        :page="currentPage"
        :limit="limit"
        :total="crud.result.value.totalCount"
        @pageChanged="goToPage"
      />
    </div>
  </div>
</template>
