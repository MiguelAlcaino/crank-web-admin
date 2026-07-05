import type { RouteRecordRaw } from 'vue-router'

const ROUTE_NAME = 'failed-messages'

export const failedMessagesRoute: RouteRecordRaw = {
  path: `/${ROUTE_NAME}`,
  name: ROUTE_NAME,
  component: () => import('@/modules/failed-messages/views/FailedMessagesView.vue')
}
