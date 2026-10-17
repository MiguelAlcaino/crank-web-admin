import { createRouter, createWebHistory } from 'vue-router'

import { authService } from '@/services/authService'
import HomeView from '@/views/HomeView.vue'
import UnauthorizedView from '@/modules/auth/views/UnauthorizedView.vue'
import { Role } from '@/utils/userRoles'
import { AdminFeature, isFeatureAvailable } from '@/config/backendProfile'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    role?: Role
    title?: string
    /** Routes whose feature is not available on the current backend profile are not reachable. */
    feature?: AdminFeature
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // --- Public routes (no layout) ---
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
      component: () => import('@/modules/auth/views/LoginView.vue')
    },
    {
      path: '/admin/login',
      name: 'admin_login',
      meta: { requiresAuth: false },
      component: () => import('@/modules/auth/views/AdminLoginView.vue')
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedView
    },

    // --- Admin routes (with AdminLayout sidebar) ---
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'admin_dashboard',
          component: () => import('@/views/AdminDashboardView.vue')
        },

        // --- Already migrated pages ---
        {
          path: 'gift-cards',
          name: 'admin_gift_cards',
          meta: { feature: AdminFeature.GiftCards, role: Role.ROLE_SUPER_ADMIN },
          component: () => import('@/modules/gift-card/views/GiftCardListView.vue')
        },
        {
          path: 'payment-links',
          name: 'admin_payment_links',
          meta: { feature: AdminFeature.PaymentLinks, role: Role.ROLE_SUPER_ADMIN },
          component: () => import('@/modules/payment-links/views/PaymentLinkListView.vue')
        },
        {
          path: 'users',
          name: 'admin_users',
          meta: { feature: AdminFeature.AdminUsers, role: Role.ROLE_SUPER_ADMIN },
          component: () => import('@/modules/admin-user/views/AdminUserListView.vue')
        },
        {
          path: 'my-settings',
          name: 'admin_my_settings',
          meta: { feature: AdminFeature.MySettings },
          component: () => import('@/modules/my-admin-settings/views/MyAdminSettingsView.vue')
        },
        {
          path: 'webhook-events',
          name: 'admin_webhook_events',
          meta: { feature: AdminFeature.WebhookEvents, role: Role.ROLE_SUPER_ADMIN },
          component: () => import('@/modules/webhook-events/views/WebhookEventsView.vue')
        },
        {
          path: 'instructor-profiles',
          name: 'admin_instructor_profiles',
          meta: { feature: AdminFeature.InstructorProfiles },
          component: () => import('@/modules/instructor-profile/views/InstructorProfilesView.vue')
        },
        {
          path: 'session-types',
          name: 'admin_session_types',
          meta: { feature: AdminFeature.SessionTypes, role: Role.ROLE_SUPER_ADMIN },
          component: () => import('@/modules/session-type/views/SessionTypesView.vue')
        },
        {
          path: 'class-packages/:site',
          name: 'admin_class_packages',
          meta: { feature: AdminFeature.ClassPackages, role: Role.ROLE_SUPER_ADMIN },
          component: () => import('@/modules/products/views/ClassPackageListView.vue')
        },
        {
          path: 'class-schedule-config/:site',
          name: 'admin_class_schedule_config',
          meta: { feature: AdminFeature.ClassScheduleConfig, role: Role.ROLE_SUPER_ADMIN },
          component: () =>
            import('@/modules/class-schedule-config/views/ClassScheduleConfigView.vue')
        },
        {
          path: 'classes-calendar',
          name: 'admin_classes_calendar',
          meta: { feature: AdminFeature.ClassesCalendar },
          component: () => import('@/modules/class-schedule/views/ClassScheduleView.vue')
        },
        {
          path: 'room-layout/:site',
          name: 'admin_room_layout_list',
          meta: { feature: AdminFeature.RoomLayouts, role: Role.ROLE_SUPER_ADMIN },
          component: () => import('@/modules/room-layout/views/RoomLayoutListView.vue')
        },
        {
          path: 'room-layout/create',
          name: 'admin_room_layout_create',
          meta: { feature: AdminFeature.RoomLayouts, role: Role.ROLE_SUPER_ADMIN },
          component: () => import('@/modules/room-layout/views/RoomLayoutView.vue')
        },
        {
          path: 'room-layout/edit/:id',
          name: 'admin_room_layout_edit',
          meta: { feature: AdminFeature.RoomLayouts, role: Role.ROLE_SUPER_ADMIN },
          component: () => import('@/modules/room-layout/views/RoomLayoutView.vue')
        },
        {
          path: 'customer/create',
          name: 'admin_customer_create',
          meta: { feature: AdminFeature.Customer },
          component: () => import('@/modules/customer/views/CustomerCreateView.vue')
        },
        {
          path: 'customer/edit/:id',
          name: 'admin_customer_edit',
          meta: { feature: AdminFeature.Customer },
          component: () => import('@/modules/customer/views/CustomerEditView.vue')
        },
        {
          path: 'customer/:id',
          name: 'admin_customer_profile',
          meta: { feature: AdminFeature.Customer },
          component: () => import('@/modules/customer/views/CustomerProfileView.vue')
        },

        // --- Placeholder routes for pages to be migrated ---
        {
          path: 'transactions',
          name: 'admin_transactions',
          meta: { feature: AdminFeature.Transactions, role: Role.ROLE_SUPER_ADMIN },
          component: () =>
            import('@/modules/transaction-records/views/TransactionListView.vue')
        },
        {
          path: 'transactions/:id',
          name: 'admin_transaction_detail',
          meta: { feature: AdminFeature.Transactions, role: Role.ROLE_SUPER_ADMIN },
          component: () =>
            import('@/modules/transaction-records/views/TransactionDetailView.vue')
        },
        {
          path: 'incomplete-feedbacks',
          name: 'admin_incomplete_feedbacks',
          meta: { feature: AdminFeature.IncompleteFeedbacks, role: Role.ROLE_SUPER_ADMIN },
          component: () =>
            import(
              '@/modules/incomplete-transaction-feedbacks/views/IncompleteTransactionFeedbackListView.vue'
            )
        },
        {
          path: 'subscriptions/:id',
          name: 'admin_subscription_detail',
          meta: { feature: AdminFeature.Subscriptions },
          component: () =>
            import('@/modules/subscription/views/SubscriptionDetailView.vue')
        },
        {
          path: 'customers',
          name: 'admin_customers',
          meta: { feature: AdminFeature.CustomersList },
          component: () => import('@/modules/customer-list/views/CustomerListView.vue')
        },
        {
          path: 'bulk-vod-activator',
          name: 'admin_bulk_vod_activator',
          meta: { feature: AdminFeature.BulkVod },
          component: () =>
            import('@/modules/bulk-vod-activator/views/BulkVodActivatorView.vue')
        },
        {
          path: 'customer-gift-cards',
          name: 'admin_customer_gift_cards',
          meta: {
            feature: AdminFeature.CustomerGiftCards,
            role: Role.ROLE_SUPER_ADMIN,
            title: 'Pending Gift Cards'
          },
          component: () => import('@/views/PlaceholderView.vue')
        },
        {
          path: 'mindbody-clients',
          name: 'admin_mindbody_clients',
          meta: { feature: AdminFeature.MindbodyClients, role: Role.ROLE_SUPER_ADMIN },
          component: () =>
            import('@/modules/mindbody-clients/views/MindbodyClientListView.vue')
        },
        {
          path: 'mindbody-staff',
          name: 'admin_mindbody_staff',
          meta: { feature: AdminFeature.MindbodyStaff, role: Role.ROLE_SUPER_ADMIN },
          component: () =>
            import('@/modules/mindbody-staff/views/MindbodyStaffView.vue')
        },
        {
          path: 'settings',
          name: 'admin_settings',
          meta: { feature: AdminFeature.SystemSettings, role: Role.ROLE_SUPER_ADMIN },
          component: () =>
            import('@/modules/system-settings/views/SystemSettingsView.vue')
        },
        {
          path: 'blacklisted-phones',
          name: 'admin_blacklisted_phones',
          meta: { feature: AdminFeature.Blacklist },
          component: () =>
            import('@/modules/mobile-number-blacklist/views/BlacklistView.vue')
        },
        {
          path: 'send-notification',
          name: 'admin_send_notification',
          meta: { feature: AdminFeature.PushNotifications, role: Role.ROLE_SUPER_ADMIN },
          component: () =>
            import('@/modules/push-notifications/views/SendPushNotificationView.vue')
        }
      ]
    },

    // --- Legacy standalone routes (for backward compatibility with start-app-functions) ---
    {
      path: '/user/create',
      name: 'user_create',
      meta: { feature: AdminFeature.Customer, requiresAuth: true },
      component: () => import('@/modules/customer/views/CustomerCreateView.vue')
    },
    {
      path: '/user/edit/:id',
      name: 'user_edit',
      meta: { feature: AdminFeature.Customer, requiresAuth: true },
      component: () => import('@/modules/customer/views/CustomerEditView.vue')
    },
    {
      path: '/admin/calendar-class',
      name: 'admin_calendar_class',
      meta: { feature: AdminFeature.ClassesCalendar, requiresAuth: true },
      component: () => import('@/modules/class-schedule/views/ClassScheduleView.vue')
    },
    {
      path: '/admin/room-layout/list',
      name: 'legacy_admin_room_layout_list',
      meta: { feature: AdminFeature.RoomLayouts, requiresAuth: true },
      component: () => import('@/modules/room-layout/views/RoomLayoutListView.vue')
    },
    {
      path: '/admin/room-layout/create',
      name: 'legacy_admin_room_layout_create',
      meta: { feature: AdminFeature.RoomLayouts, requiresAuth: true },
      component: () => import('@/modules/room-layout/views/RoomLayoutView.vue')
    },
    {
      path: '/admin/room-layout/edit/:id',
      name: 'legacy_admin_room_layout_edit',
      meta: { feature: AdminFeature.RoomLayouts, requiresAuth: true },
      component: () => import('@/modules/room-layout/views/RoomLayoutView.vue')
    },
    {
      path: '/class-schedules',
      name: 'class_schedules',
      meta: { feature: AdminFeature.ClassScheduleConfig, requiresAuth: true },
      component: () =>
        import('@/modules/class-schedule-config/views/ClassScheduleConfigView.vue')
    },
    {
      path: '/customer-profile/:id',
      name: 'customer_profile',
      meta: { feature: AdminFeature.Customer, requiresAuth: true },
      component: () => import('@/modules/customer/views/CustomerProfileView.vue')
    },
    {
      path: '/gift-cards',
      name: 'gift_cards',
      meta: { feature: AdminFeature.GiftCards, requiresAuth: true },
      component: () => import('@/modules/gift-card/views/GiftCardListView.vue')
    },
    {
      path: '/admin-users',
      name: 'admin_users_legacy',
      meta: { feature: AdminFeature.AdminUsers, requiresAuth: true, role: Role.ROLE_SUPER_ADMIN },
      component: () => import('@/modules/admin-user/views/AdminUserListView.vue')
    },
    {
      path: '/my-admin-settings',
      name: 'my_admin_settings',
      meta: { feature: AdminFeature.MySettings, requiresAuth: true },
      component: () => import('@/modules/my-admin-settings/views/MyAdminSettingsView.vue')
    },
    {
      path: '/payment-links',
      name: 'payment_links',
      meta: { feature: AdminFeature.PaymentLinks, requiresAuth: true },
      component: () => import('@/modules/payment-links/views/PaymentLinkListView.vue')
    },
    {
      path: '/instructor-profiles',
      name: 'instructor_profiles',
      meta: { feature: AdminFeature.InstructorProfiles, requiresAuth: true },
      component: () => import('@/modules/instructor-profile/views/InstructorProfilesView.vue')
    },
    {
      path: '/session-types',
      name: 'session_types',
      meta: { feature: AdminFeature.SessionTypes, requiresAuth: true },
      component: () => import('@/modules/session-type/views/SessionTypesView.vue')
    },
    {
      path: '/webhook-events',
      name: 'webhook_events',
      meta: {
        feature: AdminFeature.WebhookEvents,
        requiresAuth: true,
        role: Role.ROLE_SUPER_ADMIN
      },
      component: () => import('@/modules/webhook-events/views/WebhookEventsView.vue')
    },
    {
      path: '/class-packages',
      name: 'class_packages',
      meta: { feature: AdminFeature.ClassPackages, requiresAuth: true },
      component: () => import('@/modules/products/views/ClassPackageListView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const unavailable = to.matched.some(
    (record) => record.meta.feature !== undefined && !isFeatureAvailable(record.meta.feature)
  )
  if (unavailable) {
    next(to.path.startsWith('/admin') ? { name: 'admin_dashboard' } : { name: 'home' })
    return
  }

  const authRequired = to.matched.some((record) => record.meta.requiresAuth) as boolean
  const user = authService.getUser()

  if (authRequired && !user) {
    // Redirect to admin login for admin routes, legacy login for others
    const loginRoute = to.path.startsWith('/admin') ? 'admin_login' : 'login'
    next({ name: loginRoute, query: { redirect: to.fullPath } })
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
