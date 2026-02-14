import { createRouter, createWebHistory } from 'vue-router'

import { authService } from '@/services/authService'
import RoomLayoutListView from '@/modules/room-layout/views/RoomLayoutListView.vue'
import HomeView from '@/views/HomeView.vue'
import UnauthorizedView from '@/modules/auth/views/UnauthorizedView.vue'
import { giftCardRoute } from '@/modules/gift-card/router'
import { adminUsersRoute } from '@/modules/admin-user/router'
import { Role } from '@/utils/userRoles'
import { myAdminSettingsRoute } from '@/modules/my-admin-settings/router'
import { paymentLinksRoute } from '@/modules/payment-links/router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: false },
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false },
      component: import('@/modules/auth/views/LoginView.vue')
    },
    {
      path: '/user/create',
      name: 'user_create',
      meta: { requiresAuth: true },
      component: () => import('@/modules/customer/views/CustomerCreateView.vue')
    },
    {
      path: '/user/edit/:id',
      name: 'user_edit',
      meta: { requiresAuth: true },
      component: () => import('@/modules/customer/views/CustomerEditView.vue')
    },
    {
      path: '/admin/calendar-class',
      name: 'admin_calendar_class',
      meta: { requiresAuth: true },
      component: () => import('@/modules/class-schedule/views/ClassScheduleView.vue')
    },
    {
      path: '/admin/room-layout/list',
      name: 'admin_room_layout_list',
      meta: { requiresAuth: true },
      component: RoomLayoutListView
    },
    {
      path: '/admin/room-layout/create',
      name: 'admin_room_layout_create',
      meta: { requiresAuth: true },
      component: () => import('@/modules/room-layout/views/RoomLayoutView.vue')
    },
    {
      path: '/admin/room-layout/edit/:id',
      name: 'admin_room_layout_edit',
      meta: { requiresAuth: true },
      component: () => import('@/modules/room-layout/views/RoomLayoutView.vue')
    },
    {
      path: '/class-schedules',
      name: 'class_schedules',
      meta: { requiresAuth: true },
      component: () => import('@/modules/class-schedule-config/views/ClassScheduleConfigView.vue')
    },
    {
      path: '/customer-profile/:id',
      name: 'customer_profile',
      meta: { requiresAuth: true },
      component: () => import('@/modules/customer/views/CustomerProfileView.vue')
    },
    {
      ...giftCardRoute,
      meta: { requiresAuth: true },
      path: '/gift-cards'
    },
    {
      ...adminUsersRoute,
      path: '/admin-users',
      meta: { requiresAuth: true, role: Role.ROLE_SUPER_ADMIN }
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedView
    },
    {
      ...myAdminSettingsRoute,
      path: '/my-admin-settings',
      meta: { requiresAuth: true }
    },
    { ...paymentLinksRoute, path: '/payment-links', meta: { requiresAuth: true } }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authRequired = to.matched.some((record) => record.meta.requiresAuth) as boolean
  const user = authService.getUser()

  if (authRequired && !user) {
    next({ name: 'login', query: { redirect: to.path } })
  } else if (authRequired && user) {
    const requiredRole = (to.meta.role || null) as Role | null

    if (requiredRole) {
      let hasRole = false

      for (let index = 0; index < user.roles.length; index++) {
        if (requiredRole === user.roles[index]) {
          hasRole = true
          break
        }
      }

      if (!hasRole) {
        next({ name: 'unauthorized' })
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
