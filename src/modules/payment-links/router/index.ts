import type { RouteRecordRaw } from 'vue-router'

const ROUTE_NAME = 'payment-links'

export const paymentLinksRoute: RouteRecordRaw = {
  path: `/${ROUTE_NAME}`,
  redirect: `/${ROUTE_NAME}`,
  component: () => import('@/modules/payment-links/layouts/PaymentLinksLayout.vue'),
  children: [
    {
      path: `/${ROUTE_NAME}`,
      name: 'payment-links',
      component: () => import('@/modules/payment-links/views/PaymentLinkListView.vue')
    }
  ]
}
