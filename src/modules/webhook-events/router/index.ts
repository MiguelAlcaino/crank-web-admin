import type { RouteRecordRaw } from 'vue-router'

const ROUTE_NAME = 'webhook-events'

export const webhookEventsRoute: RouteRecordRaw = {
  path: `/${ROUTE_NAME}`,
  component: () => import('@/modules/webhook-events/layouts/WebhookEventsLayout.vue'),
  children: [
    {
      path: `/${ROUTE_NAME}`,
      name: 'webhook-events',
      component: () => import('@/modules/webhook-events/views/WebhookEventsView.vue')
    }
  ]
}
