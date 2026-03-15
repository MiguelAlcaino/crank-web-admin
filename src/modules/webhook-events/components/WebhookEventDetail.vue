<script setup lang="ts">
import type { WebhookEvent } from '../interfaces'
import type { DeepReadonly } from 'vue'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'

defineProps<{
  event: DeepReadonly<WebhookEvent> | null
  isRetrying: boolean
}>()

const emit = defineEmits<{
  (e: 'retry', eventId: string): void
  (e: 'navigateToEvent', eventId: string): void
}>()

function formatTimestamp(dateStr: string | null) {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  return date.toLocaleString()
}

function formatPayload(payload: string | null): string {
  if (!payload) return ''
  try {
    return JSON.stringify(JSON.parse(payload), null, 2)
  } catch {
    return payload
  }
}
</script>

<template>
  <div v-if="!event" class="text-center text-muted py-5">
    <i class="bi bi-arrow-left-circle" style="font-size: 2rem"></i>
    <p class="mt-2">Select an event to view details</p>
  </div>

  <div v-else>
    <!-- Manual retry banner -->
    <div v-if="event.parentEventId" class="alert alert-secondary d-flex align-items-center mb-3">
      <i class="bi bi-arrow-repeat me-2"></i>
      <span>
        Manual retry triggered by <strong>{{ event.triggeredBy }}</strong> — parent event
        <a href="#" @click.prevent="emit('navigateToEvent', event!.parentEventId!)">
          <code>{{ event.parentEventId }}</code>
        </a>
      </span>
    </div>

    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Delivery attempt</h5>
        <span
          class="badge"
          :class="{
            'bg-success': event.status === 'delivered',
            'bg-danger': event.status === 'failed',
            'bg-warning': event.status === 'pending',
            'bg-info': event.status === 'resolved'
          }"
        >
          {{ event.status }}
        </span>
      </div>
      <div class="card-body">
        <table class="table table-borderless mb-0">
          <tbody>
            <tr>
              <td class="fw-bold" style="width: 180px">Event ID</td>
              <td>
                <code>{{ event.id }}</code>
              </td>
            </tr>
            <tr>
              <td class="fw-bold">Type</td>
              <td>{{ event.eventType }}</td>
            </tr>
            <tr>
              <td class="fw-bold">Status</td>
              <td>{{ event.status }}</td>
            </tr>
            <tr>
              <td class="fw-bold">Attempts</td>
              <td>{{ event.attempts }}</td>
            </tr>
            <tr>
              <td class="fw-bold">Subscription ID</td>
              <td>
                <code>{{ event.subscriptionId }}</code>
              </td>
            </tr>
            <tr>
              <td class="fw-bold">Created at</td>
              <td>{{ formatTimestamp(event.createdAt) }}</td>
            </tr>
            <tr>
              <td class="fw-bold">Last attempt at</td>
              <td>{{ formatTimestamp(event.lastAttemptAt) }}</td>
            </tr>
            <tr>
              <td class="fw-bold">Next retry at</td>
              <td>{{ formatTimestamp(event.nextRetryAt) }}</td>
            </tr>
            <tr v-if="event.destinationUrl">
              <td class="fw-bold">Destination URL</td>
              <td><code>{{ event.destinationUrl }}</code></td>
            </tr>
            <tr v-if="event.lastError">
              <td class="fw-bold">Last error</td>
              <td class="text-danger">{{ event.lastError }}</td>
            </tr>
            <tr v-if="event.resolvedByEventId">
              <td class="fw-bold">Resolved by</td>
              <td>
                <a href="#" @click.prevent="emit('navigateToEvent', event!.resolvedByEventId!)">
                  <code>{{ event.resolvedByEventId }}</code>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="event.payload" class="card-body border-top">
        <h6 class="fw-bold mb-2">Payload</h6>
        <pre class="bg-light rounded p-3 mb-0" style="max-height: 400px; overflow: auto"><code>{{ formatPayload(event.payload) }}</code></pre>
      </div>
      <div v-if="event.status === 'failed'" class="card-footer">
        <DefaultButtonComponent
          text="Retry"
          type="button"
          variant="danger"
          :is-loading="isRetrying"
          @on-click="emit('retry', event!.id)"
        />
      </div>
    </div>
  </div>
</template>
