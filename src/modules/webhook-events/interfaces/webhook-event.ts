export interface WebhookEvent {
  id: string
  eventType: string
  subscriptionId: string
  status: 'pending' | 'delivered' | 'failed' | 'resolved'
  attempts: number
  lastAttemptAt: string | null
  nextRetryAt: string | null
  createdAt: string
  parentEventId: string | null
  triggeredBy: string | null
  resolvedByEventId: string | null
  lastError: string | null
  payload: string | null
}
