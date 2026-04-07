<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { inject } from 'vue'
import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useBlacklistCrud } from '../composables/useBlacklistCrud'
import type { BlacklistEntry } from '../composables/useBlacklistCrud'
import BlacklistEntryForm from '../components/BlacklistEntryForm.vue'
import { useToast } from '@/modules/shared/composables/useToast'

const gqlUrl = import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL
const apolloClient = newAuthenticatedApolloClient(gqlUrl)
const crud = useBlacklistCrud(apolloClient)
const toast = useToast()

const showForm = ref(false)
const editingEntry = ref<BlacklistEntry | null>(null)
const confirmDeleteId = ref<string | null>(null)

onMounted(async () => {
  await Promise.all([crud.fetchEntries(), crud.fetchCountries()])
})

function openCreateForm() {
  editingEntry.value = null
  showForm.value = true
}

function openEditForm(entry: BlacklistEntry) {
  editingEntry.value = entry
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editingEntry.value = null
}

async function handleSubmit(countryId: string, mobilePhoneNumber: string) {
  let success: boolean
  if (editingEntry.value) {
    success = await crud.updateEntry(editingEntry.value.id, countryId, mobilePhoneNumber)
    if (success) toast.success('Entry updated successfully')
  } else {
    success = await crud.createEntry(countryId, mobilePhoneNumber)
    if (success) toast.success('Entry created successfully')
  }
  if (success) closeForm()
}

async function handleDelete(id: string) {
  const success = await crud.deleteEntry(id)
  if (success) {
    toast.success('Entry deleted successfully')
    confirmDeleteId.value = null
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Blacklisted Phone Numbers</h4>
      <button
        v-if="!showForm"
        class="btn btn-dark btn-sm"
        @click="openCreateForm"
      >
        + Add Number
      </button>
    </div>

    <!-- Create/Edit Form -->
    <div v-if="showForm" class="card mb-3">
      <div class="card-body">
        <h6 class="card-title">{{ editingEntry ? 'Edit Entry' : 'Add New Entry' }}</h6>
        <BlacklistEntryForm
          :countries="crud.countries.value"
          :entry="editingEntry"
          :is-saving="crud.isSaving.value"
          @submit="handleSubmit"
          @cancel="closeForm"
        />
      </div>
    </div>

    <!-- Error -->
    <div v-if="crud.hasError.value" class="alert alert-danger">
      {{ crud.errorMessage.value }}
    </div>

    <!-- Loading -->
    <div v-if="crud.isLoading.value" class="text-center py-4">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <!-- Table -->
    <table v-else class="table table-striped table-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Country</th>
          <th>Phone Number</th>
          <th>Full Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="crud.entries.value.length === 0">
          <td colspan="5" class="text-center text-muted py-3">No entries found</td>
        </tr>
        <tr v-for="entry in crud.entries.value" :key="entry.id">
          <td>{{ entry.id }}</td>
          <td>{{ entry.countryName }} ({{ entry.countryPhoneCode }})</td>
          <td>{{ entry.mobilePhoneNumber }}</td>
          <td>{{ entry.fullPhoneNumber }}</td>
          <td>
            <button
              class="btn btn-outline-secondary btn-sm mr-1"
              @click="openEditForm(entry)"
              :disabled="crud.isSaving.value"
            >
              Edit
            </button>
            <button
              v-if="confirmDeleteId !== entry.id"
              class="btn btn-outline-danger btn-sm"
              @click="confirmDeleteId = entry.id"
              :disabled="crud.isSaving.value"
            >
              Delete
            </button>
            <span v-else>
              <button
                class="btn btn-danger btn-sm mr-1"
                @click="handleDelete(entry.id)"
                :disabled="crud.isSaving.value"
              >
                Confirm
              </button>
              <button
                class="btn btn-secondary btn-sm"
                @click="confirmDeleteId = null"
              >
                Cancel
              </button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
