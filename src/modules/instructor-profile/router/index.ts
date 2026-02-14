import type { RouteRecordRaw } from 'vue-router'

const ROUTE_NAME = 'instructor-profiles'

export const instructorProfilesRoute: RouteRecordRaw = {
  path: `/${ROUTE_NAME}`,
  component: () => import('@/modules/instructor-profile/layouts/InstructorProfileLayout.vue'),
  children: [
    {
      path: '',
      name: 'instructor-profiles',
      component: () => import('@/modules/instructor-profile/views/InstructorProfilesView.vue')
    }
  ]
}
