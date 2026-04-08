<script setup lang="ts">
import { ref } from 'vue'
import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useBulkVod } from '../composables/useBulkVod'
import { useToast } from '@/modules/shared/composables/useToast'

const gqlUrl = import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL
const apolloClient = newAuthenticatedApolloClient(gqlUrl)
const bulk = useBulkVod(apolloClient)
const toast = useToast()

const mindbodyIdsText = ref('')
const vodDays = ref(30)
const operation = ref<'add' | 'remove'>('add')

function parseMindbodyIds(): number[] {
  return mindbodyIdsText.value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => parseInt(s, 10))
    .filter((n) => !isNaN(n))
}

async function handleSubmit() {
  const ids = parseMindbodyIds()
  if (ids.length === 0) {
    toast.error('Please enter at least one valid Mindbody ID')
    return
  }

  let success: boolean
  if (operation.value === 'add') {
    if (vodDays.value < 1) {
      toast.error('VOD days must be at least 1')
      return
    }
    success = await bulk.activateVod(ids, vodDays.value)
  } else {
    success = await bulk.deactivateVod(ids)
  }

  if (success) {
    toast.success(`All ${ids.length} customers have been processed successfully`)
    mindbodyIdsText.value = ''
  }
}
</script>

<template>
  <div>
    <h4>Bulk VOD Activator</h4>

    <div v-if="bulk.hasError.value" class="alert alert-danger">
      {{ bulk.errorMessage.value }}
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label>Operation</label>
        <div>
          <div class="form-check form-check-inline">
            <input
              type="radio"
              id="op-add"
              value="add"
              v-model="operation"
              class="form-check-input"
              :disabled="bulk.isProcessing.value"
            />
            <label for="op-add" class="form-check-label">Add VOD Periods</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              type="radio"
              id="op-remove"
              value="remove"
              v-model="operation"
              class="form-check-input"
              :disabled="bulk.isProcessing.value"
            />
            <label for="op-remove" class="form-check-label">Remove VOD Periods</label>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <label for="mindbodyIds">Mindbody IDs (comma-separated)</label>
        <textarea
          id="mindbodyIds"
          v-model="mindbodyIdsText"
          class="form-control"
          rows="4"
          placeholder="e.g. 100001234, 100005678, 100009012"
          required
          :disabled="bulk.isProcessing.value"
        ></textarea>
      </div>

      <div v-if="operation === 'add'" class="mb-3">
        <label for="vodDays">VOD Days</label>
        <input
          id="vodDays"
          type="number"
          v-model.number="vodDays"
          class="form-control"
          min="1"
          required
          :disabled="bulk.isProcessing.value"
          style="max-width: 200px"
        />
      </div>

      <button type="submit" class="btn btn-dark" :disabled="bulk.isProcessing.value">
        <span v-if="bulk.isProcessing.value">
          <span class="spinner-border spinner-border-sm" role="status"></span>
          Processing...
        </span>
        <span v-else>{{ operation === 'add' ? 'Activate VOD' : 'Deactivate VOD' }}</span>
      </button>
    </form>
  </div>
</template>
