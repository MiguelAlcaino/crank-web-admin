import type { RouteRecordRaw } from 'vue-router'

const ROUTE_NAME = 'session-types'

export const sessionTypesRoute: RouteRecordRaw = {
  path: `/${ROUTE_NAME}`,
  component: () => import('@/modules/session-type/layouts/SessionTypeLayout.vue'),
  children: [
    {
      path: '',
      name: 'session-types',
      component: () => import('@/modules/session-type/views/SessionTypesView.vue')
    }
  ]
}
