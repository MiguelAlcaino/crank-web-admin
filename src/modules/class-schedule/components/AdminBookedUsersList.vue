<script lang="ts">
interface EnrollmentInfo {
  id: string
  enrollmentStatus: EnrollmentStatusEnum
  identifiableSiteUser?: IdentifiableSiteUser | null
  isCheckedIn?: boolean
  isBookedForFree?: boolean | null
  isFirstTimeInThisTypeOfClass: boolean
  isFirstTimeWithThisInstructor: boolean
  isTodayUserBirthday: boolean
  isUserLeaderboardEnabled: boolean
}

interface IdentifiableSiteUser {
  id: string
  identifiableUser: IdentifiableUser
}

interface IdentifiableUser {
  id?: string
  user?: User
}

interface User {
  firstName: string
  lastName: string
}

interface Props {
  enrollments: EnrollmentInfo[]
  isLoading: boolean
  showEditOptions?: boolean
  userCanCheckInCheckOut: boolean
  editCustomerProfileUrl?: string | null
}
</script>

<script setup lang="ts">
import { inject, ref } from 'vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import CheckInCheckOutUserInClass from '@/modules/class-schedule/components/CheckInCheckOutUserInClass.vue'
import ViewUserProfileButton from '@/modules/class-schedule/components/ViewUserProfileButton.vue'
import BadgeStateIndicator from '@/modules/class-schedule/components/BadgeStateIndicator.vue'
import type { EnrollmentStatusEnum } from '../interfaces'

withDefaults(defineProps<Props>(), {
  showEditOptions: false
})

const emits = defineEmits<{
  (e: 'afterCancelMemberReservation'): void
}>()

const apiService = inject<ApiService>('gqlApiService')!

const selectedEnrollmentId = ref<string | null>(null)
const removingUserFromClass = ref<boolean>(false)
const modalCancelReservationIsVisible = ref<boolean>(false)
const modalLateCancelIsVisible = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)

function onClickCancelMemberReservation(enrollmentId: string) {
  removingUserFromClass.value = false
  selectedEnrollmentId.value = enrollmentId
  modalCancelReservationIsVisible.value = true
}

function onClickConfirmCancelMemberReservation() {
  removeUserFromClass(selectedEnrollmentId.value!, false)
}

function onClickConfirmLateCancelMemberReservation() {
  removeUserFromClass(selectedEnrollmentId.value!, true)
}

async function removeUserFromClass(enrollmentId: string, lateCancel: boolean) {
  removingUserFromClass.value = true
  const response = await apiService.removeUserFromClass(enrollmentId, lateCancel)
  removingUserFromClass.value = false

  modalCancelReservationIsVisible.value = false
  modalLateCancelIsVisible.value = false

  if (response === 'CancelUserEnrollmentSuccess') {
    emits('afterCancelMemberReservation')
  } else if (response === 'LateCancellationRequiredError') {
    modalCancelReservationIsVisible.value = false
    modalLateCancelIsVisible.value = true
  } else {
    errorModalIsVisible.value = true
  }
}
</script>

<template>
  <!-- Enrollments -->
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>FIRST NAME</th>
          <th>LAST NAME</th>
          <th v-if="userCanCheckInCheckOut">SIGN IN</th>
          <th v-if="showEditOptions">CANCEL RESERVATION</th>
          <th>VIEW PROFILE</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in enrollments" v-bind:key="item.id" v-bind:index="index">
          <td>{{ item.identifiableSiteUser?.identifiableUser?.user?.firstName }}</td>
          <td>{{ item.identifiableSiteUser?.identifiableUser?.user?.lastName }}</td>
          <td v-if="userCanCheckInCheckOut">
            <CheckInCheckOutUserInClass
              v-if="item.id != null && item.isCheckedIn != null"
              :enrollment-id="item.id"
              :is-checked-in="item.isCheckedIn"
              :disabled="false"
            ></CheckInCheckOutUserInClass>
          </td>
          <td v-if="showEditOptions">
            <button
              class="btn btn-primary"
              type="button"
              @click="onClickCancelMemberReservation(item.id)"
            >
              CANCEL BOOKING
            </button>
          </td>
          <td>
            <ViewUserProfileButton
              v-if="item.identifiableSiteUser?.identifiableUser?.id"
              :user-id="item.identifiableSiteUser?.identifiableUser?.id"
              :edit-customer-profile-url="editCustomerProfileUrl"
            ></ViewUserProfileButton>
          </td>
          <td>
            <BadgeStateIndicator
              type="isBookedForFree"
              v-if="item.isBookedForFree === true"
            ></BadgeStateIndicator>
            <BadgeStateIndicator
              type="isFirstTimeInThisTypeOfClass"
              v-if="item.isFirstTimeInThisTypeOfClass"
            ></BadgeStateIndicator>
            <BadgeStateIndicator
              type="isFirstTimeWithThisInstructor"
              v-if="item.isFirstTimeWithThisInstructor"
            ></BadgeStateIndicator>
            <BadgeStateIndicator
              type="isTodayUserBirthday"
              v-if="item.isTodayUserBirthday"
            ></BadgeStateIndicator>
            <BadgeStateIndicator
              type="isUserLeaderboardEnabled"
              v-if="item.isUserLeaderboardEnabled"
            ></BadgeStateIndicator>
          </td>
        </tr>
        <tr v-if="!isLoading && enrollments.length === 0">
          <td colspan="4" class="tableMessageNoRecords">
            There are no users enrolled in this class
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal Cancel Reservation? -->
  <ModalComponent
    v-if="modalCancelReservationIsVisible"
    title="CANCEL BOOKING"
    message="Are you sure you want to proceed?"
    cancel-text="No"
    ok-text="Yes"
    :ok-loading="removingUserFromClass"
    @on-cancel="modalCancelReservationIsVisible = false"
    @on-ok="onClickConfirmCancelMemberReservation()"
  >
  </ModalComponent>

  <!-- Modal Late Cancel -->
  <ModalComponent
    v-if="modalLateCancelIsVisible"
    title="Warning"
    message="You are outside the early cancellation window. you can only make a late cancellaiton."
    cancel-button-text="No"
    confirm-button-text="Confirm"
    @on-cancel="modalLateCancelIsVisible = false"
    :ok-loading="removingUserFromClass"
    @on-ok="onClickConfirmLateCancelMemberReservation()"
  >
  </ModalComponent>

  <!-- Error Modal -->
  <ModalComponent
    v-if="errorModalIsVisible"
    title="Error"
    :message="ERROR_UNKNOWN"
    :cancel-text="null"
    @on-ok="errorModalIsVisible = false"
  >
  </ModalComponent>
</template>

<style scoped>
.tableMessageNoRecords {
  text-align: center;
}
</style>
