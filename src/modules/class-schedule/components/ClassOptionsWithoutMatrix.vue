<script lang="ts">
import type { EnrollmentStatusEnum } from '../interfaces'

interface IdentifiableSiteUser {
  id: string
  identifiableUser: IdentifiableUser
}

interface IdentifiableUser {
  id?: string
  user?: User
}

interface User {
  email: string
  firstName: string
  lastName: string
  leaderboardUsername?: string
}

interface Enrollment {
  id: string
  enrollmentStatus: EnrollmentStatusEnum
  identifiableSiteUser?: IdentifiableSiteUser | null
  enrollmentDateTime: Date
  isCheckedIn?: boolean
  spotNumber?: number | null
  isBookedForFree?: boolean | null
  hasStats?: boolean | null
  isFirstTimeInAClass: boolean
}
</script>

<script setup lang="ts">
import EnrollSelectedMemberComponent from '@/modules/class-schedule/components/EnrollSelectedMemberComponent.vue'
import AdminBookedUsersList from '@/modules/class-schedule/components/AdminBookedUsersList.vue'

defineProps<{
  classId: string
  userIdsToHide: string[]
  showClassAsDisabled: boolean
  userCanModifyClass: boolean
  userCanCheckInCheckOut: boolean
  editCustomerProfileUrl?: string | null
  enrollments: Enrollment[]
  waitListAvailable: boolean
}>()

const emits = defineEmits<{
  (e: 'afterEnrollingCustomer'): void
  (e: 'afterUnrollingCustomer'): void
}>()
</script>

<template>
  <div>
    <!-- Enroll without matrix option -->
    <EnrollSelectedMemberComponent
      :class-id="classId"
      v-if="waitListAvailable === false && userCanModifyClass && showClassAsDisabled === false"
      @after-enrolling="() => emits('afterEnrollingCustomer')"
      :spot-number="null"
      enrollButtonText="BOOK"
      :is-waitlist-booking="false"
      :user-ids-to-hide="userIdsToHide"
    >
    </EnrollSelectedMemberComponent>

    <!-- List enrollments -->
    <AdminBookedUsersList
      :enrollments="enrollments"
      :isLoading="false"
      @after-cancel-member-reservation="() => emits('afterUnrollingCustomer')"
      :show-edit-options="userCanModifyClass && showClassAsDisabled === false"
      :user-can-check-in-check-out="userCanCheckInCheckOut && showClassAsDisabled === false"
      :edit-customer-profile-url="editCustomerProfileUrl"
    >
    </AdminBookedUsersList>
  </div>
</template>

<style scoped></style>
