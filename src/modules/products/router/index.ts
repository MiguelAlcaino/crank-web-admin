import type { RouteRecordRaw } from 'vue-router'

const ROUTE_NAME = 'class-packages'

export const classPackagesRoute: RouteRecordRaw = {
  path: `/${ROUTE_NAME}`,
  redirect: `/${ROUTE_NAME}/list`,
  component: () => import('@/modules/products/layouts/ClassPackagesLayout.vue'),
  children: [
    {
      path: `/${ROUTE_NAME}/list`,
      name: 'class-packages-list',
      component: () => import('@/modules/products/views/ClassPackageListView.vue')
    }
  ]
}
