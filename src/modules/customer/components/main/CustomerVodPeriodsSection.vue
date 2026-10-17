<script setup lang="ts">
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import { useToast } from '@/modules/shared/composables/useToast'
import {
  isVodPeriodActive,
  useCustomerVodPeriods,
  vodPeriodAddedBy
} from '../../composables/useCustomerVodPeriods'

interface Props {
  apolloClient: ApolloClient<NormalizedCacheObject>
  customerId: string
}

const props = defineProps<Props>()

const toast = useToast()
const {
  periods,
  isLoading,
  hasLoadError,
  isSaving,
  deletingId,
  fetchPeriods,
  createPeriod,
  deletePeriod
} = useCustomerVodPeriods(props.apolloClient, props.customerId)

const showForm = ref(false)
const start = ref('')
const end = ref('')
const errorMessage = ref<string | null>(null)

function formatDate(value: string | null | undefined): string {
  return value ? dayjs(value).format('DD/MM/YYYY HH:mm') : ''
}

function openForm() {
  start.value = dayjs().format('YYYY-MM-DDTHH:mm')
  end.value = dayjs().add(30, 'day').format('YYYY-MM-DDTHH:mm')
  errorMessage.value = null
  showForm.value = true
}

async function submit() {
  errorMessage.value = await createPeriod(start.value, end.value)
  if (errorMessage.value === null) {
    showForm.value = false
    toast.success('VOD period added.')
  }
}

async function remove(id: string) {
  if (!confirm('Delete this VOD period?')) return
  errorMessage.value = await deletePeriod(id)
  if (errorMessage.value === null) {
    toast.success('VOD period deleted.')
  }
}

onMounted(fetchPeriods)
</script>

<template>
  <div>
    <div class="d-flex align-items-center gap-2 mb-2">
      <h6 class="mb-0">VOD periods</h6>
      <button v-if="!showForm" type="button" class="btn btn-sm btn-success" @click="openForm">
        + Add
      </button>
    </div>

    <form v-if="showForm" class="row g-2 align-items-end mb-3" @submit.prevent="submit">
      <div class="col-md-4">
        <label for="vod-period-start" class="form-label small">From</label>
        <input
          id="vod-period-start"
          v-model="start"
          type="datetime-local"
          class="form-control form-control-sm"
        />
      </div>
      <div class="col-md-4">
        <label for="vod-period-end" class="form-label small">To</label>
        <input
          id="vod-period-end"
          v-model="end"
          type="datetime-local"
          class="form-control form-control-sm"
        />
      </div>
      <div class="col-md-4">
        <button type="submit" class="btn btn-sm btn-success me-2" :disabled="isSaving">
          Save
          <span v-if="isSaving" class="spinner-border spinner-border-sm"></span>
        </button>
        <button type="button" class="btn btn-sm btn-outline-secondary" @click="showForm = false">
          Cancel
        </button>
      </div>
    </form>

    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

    <div v-if="isLoading && periods.length === 0" class="text-muted small">Loading...</div>
    <div v-else-if="hasLoadError" class="alert alert-danger">Failed to load the VOD periods.</div>
    <div v-else-if="periods.length === 0" class="text-muted">No VOD periods.</div>
    <div v-else class="table-responsive">
      <table class="table table-sm align-middle">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Deleted</th>
            <th>Added by</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="period in periods"
            :key="period.id"
            :class="isVodPeriodActive(period) ? 'table-success' : 'table-danger'"
          >
            <td>{{ formatDate(period.start) }}</td>
            <td>{{ formatDate(period.end) }}</td>
            <td>{{ formatDate(period.deletedAt) }}</td>
            <td>{{ vodPeriodAddedBy(period) }}</td>
            <td class="text-end">
              <button
                v-if="!period.isDeleted"
                type="button"
                class="btn btn-sm btn-danger"
                :disabled="deletingId === period.id"
                @click="remove(period.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
