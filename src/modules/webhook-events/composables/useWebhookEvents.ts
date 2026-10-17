import { readonly, ref } from 'vue'
import type { WebhookEvent } from '../interfaces'
import type { ApiService } from '@/services/apiService'
import { useAuthenticationStore } from '@/stores/authToken'
import jwt_decode from 'jwt-decode'

const events = ref<WebhookEvent[]>([])
const selectedEvent = ref<WebhookEvent | null>(null)

export const useWebhookEvents = (apiService: ApiService) => {
  const isLoading = ref<boolean>(false)
  const hasLoadError = ref<boolean>(false)
  const isRetrying = ref<boolean>(false)
  const hasMore = ref<boolean>(false)
  const nextCursor = ref<string | null>(null)

  async function getWebhookEvents(status?: string, cursor?: string) {
    hasLoadError.value = false
    isLoading.value = true

    if (!cursor) {
      events.value = []
    }

    try {
      const result = await apiService.getWebhookEvents(status, cursor)

      if (cursor) {
        events.value = [...events.value, ...result.events]
      } else {
        events.value = result.events
      }
      hasMore.value = result.hasMore
      nextCursor.value = result.nextCursor
    } catch (error) {
      hasLoadError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function getWebhookEvent(id: string) {
    hasLoadError.value = false
    isLoading.value = true

    try {
      selectedEvent.value = await apiService.getWebhookEvent(id)
    } catch (error) {
      hasLoadError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function retryWebhookEvent(id: string) {
    isRetrying.value = true

    try {
      const token = useAuthenticationStore().token
      const email = token ? jwt_decode<{ username: string }>(token).username : ''
      const childEvent = await apiService.retryWebhookEvent(id, email)
      if (childEvent) {
        events.value = [childEvent, ...events.value]
        await getWebhookEvents()
      }
      return true
    } catch (error) {
      return false
    } finally {
      isRetrying.value = false
    }
  }

  function selectEvent(event: WebhookEvent | null) {
    selectedEvent.value = event
  }

  return {
    // Properties
    events: readonly(events),
    selectedEvent: readonly(selectedEvent),
    isLoading: readonly(isLoading),
    hasLoadError: readonly(hasLoadError),
    isRetrying: readonly(isRetrying),
    hasMore: readonly(hasMore),
    nextCursor: readonly(nextCursor),

    // Methods
    getWebhookEvents,
    getWebhookEvent,
    retryWebhookEvent,
    selectEvent
  }
}
