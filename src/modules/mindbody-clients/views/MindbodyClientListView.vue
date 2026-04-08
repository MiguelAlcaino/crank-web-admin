<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useMindbodyClients } from '../composables/useMindbodyClients'

const gqlUrl = import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL
const apolloClient = newAuthenticatedApolloClient(gqlUrl)
const clients = useMindbodyClients(apolloClient)

const search = ref('')
const currentPage = ref(1)
const limit = 50

const totalPages = computed(() => {
  if (!clients.listResult.value) return 1
  return Math.ceil(clients.listResult.value.totalCount / limit)
})

async function loadClients() {
  await clients.fetchList(
    search.value ? { search: search.value } : undefined,
    { page: currentPage.value, limit }
  )
}

async function handleSearch() {
  currentPage.value = 1
  await loadClients()
}

async function goToPage(page: number) {
  currentPage.value = page
  await loadClients()
}

onMounted(loadClients)
</script>

<template>
  <div>
    <h4>Report - MB Clients</h4>

    <form @submit.prevent="handleSearch" class="mb-3">
      <div class="input-group">
        <input type="text" v-model="search" class="form-control" placeholder="Search by name, email, or phone..." />
        <button type="submit" class="btn btn-primary">Search</button>
      </div>
    </form>

    <div v-if="clients.isLoading.value" class="text-center py-4">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-if="clients.hasError.value" class="alert alert-danger">Failed to load clients.</div>

    <div v-if="clients.listResult.value && !clients.isLoading.value">
      <p class="text-muted small">
        {{ clients.listResult.value.totalCount }} clients found
        (page {{ clients.listResult.value.page }} of {{ totalPages }})
      </p>

      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="clients.listResult.value.items.length === 0">
            <td colspan="6" class="text-center text-muted py-3">No clients found</td>
          </tr>
          <tr v-for="c in clients.listResult.value.items" :key="c.id">
            <td>{{ c.id }}</td>
            <td>{{ c.clientId || '-' }}</td>
            <td>{{ c.firstName || '-' }}</td>
            <td>{{ c.lastName || '-' }}</td>
            <td>{{ c.email || '-' }}</td>
            <td>{{ c.mobilePhone || '-' }}</td>
          </tr>
        </tbody>
      </table>

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
