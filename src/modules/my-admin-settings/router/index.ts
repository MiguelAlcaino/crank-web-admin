import type { RouteRecordRaw } from 'vue-router'

const ROUTE_NAME = 'my-admin-settings'

export const myAdminSettingsRoute: RouteRecordRaw = {
  path: `/${ROUTE_NAME}`,
  redirect: `/${ROUTE_NAME}`,
  component: () => import('@/modules/my-admin-settings/layouts/MyAdminSettingsLayout.vue'),
  children: [
    {
      path: `/${ROUTE_NAME}`,
      name: 'my-admin-settings',
      component: () => import('@/modules/my-admin-settings/views/MyAdminSettingsView.vue')
    }
  ]
}
