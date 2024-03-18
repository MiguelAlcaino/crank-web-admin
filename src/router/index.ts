import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'

import { authService } from '@/services/authService'
import RoomLayoutListView from '@/views/admin/RoomLayoutListView.vue'
import HomeView from '@/views/HomeView.vue'

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
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/user/edit/:id',
      name: 'user_edit',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/admin/calendar-class',
      name: 'admin_calendar_class',
      component: () => import('../views/admin/AdminClassView.vue')
    },
    {
      path: '/admin/room-layout/list',
      name: 'admin_room_layout_list',
      component: RoomLayoutListView
    },
    {
      path: '/admin/room-layout/create',
      name: 'admin_room_layout_create',
      component: () => import('../views/admin/RoomLayoutView.vue')
    },
    {
      path: '/admin/room-layout/edit/:id',
      name: 'admin_room_layout_edit',
      component: () => import('../views/admin/RoomLayoutView.vue')
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
