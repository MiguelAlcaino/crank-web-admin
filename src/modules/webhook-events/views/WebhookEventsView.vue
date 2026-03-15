<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { useWebhookEvents } from '../composables/useWebhookEvents'
import WebhookEventList from '../components/WebhookEventList.vue'
import WebhookEventDetail from '../components/WebhookEventDetail.vue'
import type { WebhookEvent } from '../interfaces'
import type { ApiService } from '@/services/apiService'

const apiService = inject<ApiService>('gqlApiService')!

const {
  events,
  selectedEvent,
  isLoading,
  hasMore,
  nextCursor,
  isRetrying,
  getWebhookEvents,
  retryWebhookEvent,
  selectEvent
} = useWebhookEvents(apiService)

const activeFilter = ref<string>('')

onMounted(() => {
  getWebhookEvents()
})

function onRefresh() {
  getWebhookEvents(activeFilter.value || undefined)
}

function onSelect(event: WebhookEvent) {
  selectEvent(event)
}

function onFilter(status: string) {
  activeFilter.value = status
  getWebhookEvents(status || undefined)
}

function onLoadMore() {
  getWebhookEvents(activeFilter.value || undefined, nextCursor.value || undefined)
}

async function onRetry(eventId: string) {
  await retryWebhookEvent(eventId)
}

function onNavigateToEvent(eventId: string) {
  // Clear filter to make sure the event is visible
  if (activeFilter.value) {
    activeFilter.value = ''
    getWebhookEvents()
  }
  const found = events.value.find((e) => e.id === eventId)
  if (found) {
    selectEvent(found as WebhookEvent)
  }
}
</script>

<template>
  <h1>Webhook Events</h1>
  <div class="row mt-3">
    <div class="col-5">
      <WebhookEventList
        :events="events"
        :selected-event="selectedEvent"
        :is-loading="isLoading"
        :has-more="hasMore"
        :active-filter="activeFilter"
        @select="onSelect"
        @filter="onFilter"
        @load-more="onLoadMore"
        @refresh="onRefresh"
      />
    </div>
    <div class="col-7">
      <WebhookEventDetail
        :event="selectedEvent"
        :is-retrying="isRetrying"
        @retry="onRetry"
        @navigate-to-event="onNavigateToEvent"
      />
    </div>
  </div>
</template>
