<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useMindbodyStaff } from '../composables/useMindbodyStaff'
import { useAvailableSites } from '@/modules/shared/composables/useAvailableSites'
import { useToast } from '@/modules/shared/composables/useToast'
import { appStore } from '@/stores/appStorage'

const gqlUrl = import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL
const apolloClient = newAuthenticatedApolloClient(gqlUrl)
const staff = useMindbodyStaff(apolloClient)
const { sites, fetchSites } = useAvailableSites(apolloClient)
const toast = useToast()

const currentSite = ref<string>(appStore().site || '')

async function loadStaff() {
  if (!currentSite.value) return
  await staff.fetchStaff(currentSite.value)
}

async function handleSync() {
  if (!currentSite.value) return
  const success = await staff.syncStaff(currentSite.value)
  if (success) {
    toast.success('Staff synchronized successfully from Mindbody')
    await loadStaff()
  } else {
    toast.error('Failed to sync staff')
  }
}

watch(currentSite, loadStaff)

onMounted(async () => {
  await fetchSites()
  if (!currentSite.value && sites.value.length > 0) {
    currentSite.value = sites.value[0].code
  }
  await loadStaff()
})
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Mindbody Staff</h4>
      <div>
        <select v-model="currentSite" class="form-control form-control-sm d-inline-block me-2" style="width: auto">
          <option v-for="site in sites" :key="site.code" :value="site.code">
            {{ site.name }}
          </option>
        </select>
        <button class="btn btn-dark btn-sm" @click="handleSync" :disabled="staff.isSyncing.value">
          <span v-if="staff.isSyncing.value">
            <span class="spinner-border spinner-border-sm" role="status"></span> Syncing...
          </span>
          <span v-else>Sync from Mindbody</span>
        </button>
      </div>
    </div>

    <div v-if="staff.isLoading.value" class="text-center py-4">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-if="staff.hasError.value" class="alert alert-danger">Failed to load staff.</div>

    <table v-if="!staff.isLoading.value" class="table table-striped table-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="staff.staffList.value.length === 0">
          <td colspan="4" class="text-center text-muted py-3">No staff found</td>
        </tr>
        <tr v-for="s in staff.staffList.value" :key="s.id">
          <td>{{ s.id }}</td>
          <td>{{ s.firstName }}</td>
          <td>{{ s.lastName }}</td>
          <td>{{ s.email || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
