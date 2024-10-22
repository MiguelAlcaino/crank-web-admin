import type { RouteRecordRaw } from 'vue-router'

const ROUTE_NAME = 'admin-user'

export const adminUsersRoute: RouteRecordRaw = {
  path: `/${ROUTE_NAME}`,
  redirect: `/${ROUTE_NAME}/list`,
  component: () => import('@/modules/admin-user/layouts/UserLayout.vue'),
  children: [
    {
      path: `/${ROUTE_NAME}/list`,
      name: 'admin-user-list',
      component: () => import('@/modules/admin-user/views/AdminUserListView.vue')
    }
  ]
}
