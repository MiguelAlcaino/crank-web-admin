import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'

import { authService } from '@/services/authService'
import RoomLayoutListView from '@/modules/room-layout/views/RoomLayoutListView.vue'
import HomeView from '@/views/HomeView.vue'
import { giftCardRoute } from '@/modules/gift-card/router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/user/create',
      name: 'user_create',
      component: () => import('../modules/customer/views/CustomerCreateView.vue')
    },
    {
      path: '/user/edit/:id',
      name: 'user_edit',
      component: () => import('../modules/customer/views/CustomerEditView.vue')
    },
    {
      path: '/admin/calendar-class',
      name: 'admin_calendar_class',
      component: () => import('../views/AdminClassView.vue')
    },
    {
      path: '/admin/room-layout/list',
      name: 'admin_room_layout_list',
      component: RoomLayoutListView
    },
    {
      path: '/admin/room-layout/create',
      name: 'admin_room_layout_create',
      component: () => import('../modules/room-layout/views/RoomLayoutView.vue')
    },
    {
      path: '/admin/room-layout/edit/:id',
      name: 'admin_room_layout_edit',
      component: () => import('../modules/room-layout/views/RoomLayoutView.vue')
    },
    {
      path: '/class-schedules',
      name: 'class_schedules',
      component: () => import('../modules/class-schedule/views/ClassSchedulesView.vue')
    },
    {
      path: '/customer-profile/:id',
      name: 'customer_profile',
      component: () => import('../modules/customer/views/CustomerProfileView.vue')
    },
    {
      ...giftCardRoute,
      path: '/gift-cards'
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login', '/calendar']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !authService.isLoggedId()) {
    next({ name: 'login', query: { redirect: to.path } })
  } else {
    next()
  }
})

export default router
