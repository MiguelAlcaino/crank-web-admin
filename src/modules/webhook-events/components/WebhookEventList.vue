<script setup lang="ts">
import type { WebhookEvent } from '../interfaces'
import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'
import type { DeepReadonly } from 'vue'

defineProps<{
  events: DeepReadonly<WebhookEvent[]>
  selectedEvent: DeepReadonly<WebhookEvent> | null
  isLoading: boolean
  hasMore: boolean
  activeFilter: string
}>()

const emit = defineEmits<{
  (e: 'select', event: WebhookEvent): void
  (e: 'filter', status: string): void
  (e: 'loadMore'): void
}>()

function formatTimestamp(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleString()
}
</script>

<template>
  <div>
    <!-- Status filter buttons -->
    <div class="btn-group mb-3 w-100" role="group">
      <button
        type="button"
        class="btn btn-sm"
        :class="activeFilter === '' ? 'btn-primary' : 'btn-outline-primary'"
        @click="emit('filter', '')"
      >
        All
      </button>
      <button
        type="button"
        class="btn btn-sm"
        :class="activeFilter === 'delivered' ? 'btn-primary' : 'btn-outline-primary'"
        @click="emit('filter', 'delivered')"
      >
        Delivered
      </button>
      <button
        type="button"
        class="btn btn-sm"
        :class="activeFilter === 'failed' ? 'btn-primary' : 'btn-outline-primary'"
        @click="emit('filter', 'failed')"
      >
        Failed
      </button>
    </div>

    <!-- Loading -->
    <div v-if="isLoading && events.length === 0" class="text-center py-4">
      <CrankCircularProgressIndicator />
    </div>

    <!-- Event list -->
    <div class="list-group" style="max-height: 75vh; overflow-y: auto">
      <button
        v-for="event in events"
        :key="event.id"
        type="button"
        class="list-group-item list-group-item-action"
        :class="{ active: selectedEvent?.id === event.id }"
        @click="emit('select', event)"
      >
        <div class="d-flex align-items-center">
          <span v-if="event.status === 'delivered'" class="badge bg-success me-2">
            <i class="bi bi-check-circle"></i> 200 OK
          </span>
          <span v-else-if="event.status === 'failed'" class="badge bg-danger me-2">
            <i class="bi bi-x-circle"></i> Failed
          </span>
          <span v-else-if="event.status === 'resolved'" class="badge bg-info me-2">
            <i class="bi bi-arrow-repeat"></i> Resolved
          </span>
          <span v-else class="badge bg-warning me-2"> <i class="bi bi-clock"></i> Pending </span>
          <div class="ms-2 text-truncate">
            <div class="fw-bold text-truncate">
              {{ event.eventType }}
              <span v-if="event.parentEventId" class="badge bg-secondary ms-1">
                <i class="bi bi-arrow-repeat"></i> manual retry
              </span>
            </div>
            <small class="text-muted">{{ formatTimestamp(event.createdAt) }}</small>
          </div>
        </div>
      </button>

      <div v-if="!isLoading && events.length === 0" class="text-center py-4 text-muted">
        No events found
      </div>
    </div>

    <!-- Load more -->
    <div v-if="hasMore" class="text-center mt-3">
      <button
        class="btn btn-outline-secondary btn-sm"
        :disabled="isLoading"
        @click="emit('loadMore')"
      >
        <span v-if="isLoading" class="spinner-border spinner-border-sm me-1"></span>
        Load more
      </button>
    </div>
  </div>
</template>
