import type { RouteRecordRaw } from 'vue-router'

const ROUTE_NAME = 'gift-cards'

export const giftCardRoute: RouteRecordRaw = {
  path: `/${ROUTE_NAME}`,
  redirect: `/${ROUTE_NAME}/list`,
  component: () => import('@/modules/gift-card/layouts/GiftCardLayout.vue'),
  children: [
    {
      path: `/${ROUTE_NAME}/list`,
      name: 'gift-cards-list',
      component: () => import('@/modules/gift-card/views/GiftCardListView.vue')
    }
  ]
}
