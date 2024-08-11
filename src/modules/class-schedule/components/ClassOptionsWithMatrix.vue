<script setup lang="ts">
interface BookableSpotClickedEvent {
  spotNumber: number | null
  isBooked: boolean
}

interface ClassPosition {
  x: number
  y: number
  icon: PositionIconEnum
  spotNumber?: number | null
  enabled?: boolean | null
}

interface SelectedSpot {
  spotNumber?: number | null
  isBooked?: boolean | null
  enabled?: boolean | null
  enrollmentId?: string | null
  isCheckedIn?: boolean
  identifiableUser?: IdentifiableUser | null
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
}

interface IdentifiableSiteUser {
  id: string
  identifiableUser: IdentifiableUser
}

import SpotMatrix from '@/modules/class-schedule/components/SpotMatrix.vue'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import CheckInCheckOutUserInClass from '@/modules/class-schedule/components/CheckInCheckOutUserInClass.vue'
import ViewUserProfileButton from '@/modules/class-schedule/components/ViewUserProfileButton.vue'
import EnrollSelectedMemberComponent from '@/modules/class-schedule/components/EnrollSelectedMemberComponent.vue'
import SpotMatrixLegend from '@/modules/class-schedule/components/SpotMatrixLegend.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'

import { PositionIconEnum } from '@/modules/shared/interfaces'
import { inject, ref, watch } from 'vue'
import { EnrollmentStatusEnum, SpotActionEnum } from '../interfaces'
import { appStore } from '@/stores/appStorage'
import {
  ERROR_CLIENT_IS_OUTSIDE_SCHEDULING_WINDOW,
  ERROR_LATE_CANCELLATION_REQUIRED,
  ERROR_SPOT_ALREADY_RESERVED,
  ERROR_SPOT_NOT_FOUND,
  ERROR_TRYING_TO_MOVE_SAME_SPOT,
  ERROR_UNKNOWN
} from '@/utils/errorMessages'
import { ApiService } from '@/services/apiService'
import { useCalendarList } from '../composables/useCalendarList'

const { updateTotalBooked, updateTotalUnderMaintenanceSpots } = useCalendarList()

const props = defineProps<{
  classId: string
  editCustomerProfileUrl?: string | null
  matrix: ClassPosition[]
  enrollments: Enrollment[]
  userCanModifyClass: boolean
  userCanCheckInCheckOut: boolean
  showClassAsDisabled: boolean
  orphanedClassStatsSpots: number[]
  userIdsToHide: string[]
}>()

const emits = defineEmits<{
  (e: 'afterEnrollingCustomer'): void
  (e: 'afterUnrollingCustomer'): void
  (e: 'getClassInfo', checkWaitList: boolean): void
}>()

const apiService = inject<ApiService>('gqlApiService')!

const selectedSpot = ref<SelectedSpot>({
  spotNumber: null,
  isBooked: null,
  enabled: null,
  enrollmentId: null,
  identifiableUser: null
})

const confirmModalLateCancelReservationData = ref<{
  isLoading: boolean
  isVisible: boolean
}>({
  isLoading: false,
  isVisible: false
})

const errorModalData = ref<{
  title: string
  message: string
  isLoading: boolean
  isVisible: boolean
}>({
  title: '',
  message: '',
  isLoading: false,
  isVisible: false
})

const successModalData = ref<{
  title: string
  message: string
  isLoading: boolean
  isVisible: boolean
}>({
  title: '',
  message: '',
  isLoading: false,
  isVisible: false
})

const confirmModalCancelReservationData = ref<{
  isLoading: boolean
  isVisible: boolean
}>({
  isLoading: false,
  isVisible: false
})

watch(
  () => props.matrix,
  () => {
    selectedSpot.value = {}
    spotAction.value = SpotActionEnum.none
  }
)

const putUnderMaintenanceIsVisible = false

const spotAction = ref<SpotActionEnum>(SpotActionEnum.none)
const changingMemberSpot = ref<boolean>(false)
const isEnablingDisablingSpot = ref<boolean>(false)

async function spotClicked(event: BookableSpotClickedEvent) {
  if (spotAction.value === SpotActionEnum.changeMemberSpot) {
    await changeSelectedMemberSpot(event.spotNumber!)
  }
  if (spotAction.value === SpotActionEnum.swapSpot) {
    await swapSpot(event.spotNumber!)
  } else {
    spotAction.value = SpotActionEnum.none

    for (let index = 0; index < props.matrix.length; index++) {
      const classPosition = props.matrix[index]

      if (classPosition.icon === PositionIconEnum.Spot) {
        if (classPosition.spotNumber === event.spotNumber) {
          let isBooked = false
          let isCheckedIn: boolean | undefined
          let enrollmentId: string | null | undefined
          let identifiableUser: IdentifiableUser | null | undefined

          if (props.enrollments) {
            for (let index = 0; index < props.enrollments.length; index++) {
              const enrollment = props.enrollments[index]
              isCheckedIn = enrollment.isCheckedIn
              if (
                classPosition.spotNumber === enrollment.spotNumber &&
                enrollment.identifiableSiteUser?.identifiableUser
              ) {
                isBooked = true
                identifiableUser = enrollment.identifiableSiteUser?.identifiableUser
                enrollmentId = enrollment.id
                break
              }
            }
          }

          selectedSpot.value = {
            spotNumber: classPosition.spotNumber,
            isBooked: isBooked,
            enabled: classPosition.enabled,
            enrollmentId: enrollmentId,
            isCheckedIn: isCheckedIn,
            identifiableUser: identifiableUser
          }
          break
        }
      }
    }
  }
}

async function changeSelectedMemberSpot(newSpotNumber: number) {
  changingMemberSpot.value = true

  try {
    const response = await apiService.editEnrollment(appStore().site, {
      enrollmentId: selectedSpot.value.enrollmentId!,
      newSpotNumber: newSpotNumber
    })

    if (response.__typename !== 'Enrollment') {
      if (response.__typename === 'SpotAlreadyReservedError') {
        errorModalData.value.message = ERROR_SPOT_ALREADY_RESERVED
      } else if (response.__typename === 'ClientIsOutsideSchedulingWindowError') {
        errorModalData.value.message = ERROR_CLIENT_IS_OUTSIDE_SCHEDULING_WINDOW
      } else if (response.__typename === 'TryToSwitchToSameSpotError') {
        errorModalData.value.message = ERROR_TRYING_TO_MOVE_SAME_SPOT
      } else {
        errorModalData.value.message = ERROR_UNKNOWN
      }
      errorModalData.value.isVisible = true
    }
  } catch (error) {
    errorModalData.value.message = ERROR_UNKNOWN
    errorModalData.value.isVisible = true
  } finally {
    selectedSpot.value = {}
    spotAction.value = SpotActionEnum.none
    await getClassInfo()
    changingMemberSpot.value = false
  }
}

async function swapSpot(newSpotNumber: number) {
  changingMemberSpot.value = true

  try {
    const response = await apiService.swapSpot(appStore().site, {
      enrollmentId: selectedSpot.value.enrollmentId!,
      newSpotNumber: newSpotNumber
    })

    if (response.__typename !== 'SwapSpotSuccess') {
      if (response.__typename === 'TryToSwitchToSameSpotError') {
        errorModalData.value.message = ERROR_TRYING_TO_MOVE_SAME_SPOT
      }

      errorModalData.value.isVisible = true
    }
  } catch (error) {
    errorModalData.value.message = ERROR_UNKNOWN
    errorModalData.value.isVisible = true
  } finally {
    selectedSpot.value = {}
    spotAction.value = SpotActionEnum.none
    await getClassInfo()
    changingMemberSpot.value = false
  }
}

async function clickPutUnderMaintenance() {
  if (props.classId === null) return

  isEnablingDisablingSpot.value = true

  const response = await apiService.disableSpot(props.classId, selectedSpot.value.spotNumber!)

  isEnablingDisablingSpot.value = false

  if (response === 'Success') {
    await getClassInfo(true)
    updateTotalUnderMaintenanceSpots(props.classId, 'increase')
  } else if (response === 'SpotNotFoundError') {
    errorModalData.value.message = ERROR_SPOT_NOT_FOUND
    errorModalData.value.isVisible = true
  } else {
    errorModalData.value.message = ERROR_UNKNOWN
    errorModalData.value.isVisible = true
  }
}

async function clickRecoverFromMaintenance() {
  if (props.classId === null) return

  isEnablingDisablingSpot.value = true

  const response = await apiService.enableSpot(props.classId, selectedSpot.value.spotNumber!)

  isEnablingDisablingSpot.value = false

  if (response === 'Success') {
    await getClassInfo(true)
    updateTotalUnderMaintenanceSpots(props.classId, 'decrease')
  } else if (response === 'SpotNotFoundError') {
    errorModalData.value.message = ERROR_SPOT_NOT_FOUND
    errorModalData.value.isVisible = true
  } else {
    errorModalData.value.message = ERROR_UNKNOWN
    errorModalData.value.isVisible = true
  }
}

function clickCancelMembersReservation() {
  confirmModalCancelReservationData.value.isLoading = false
  confirmModalCancelReservationData.value.isVisible = true
}

async function removeUserFromClass() {
  confirmModalCancelReservationData.value.isLoading = true

  const response = await apiService.removeUserFromClass(selectedSpot.value.enrollmentId!, false)

  confirmModalCancelReservationData.value.isLoading = false

  confirmModalCancelReservationData.value.isVisible = false

  if (response === 'CancelUserEnrollmentSuccess') {
    await getClassInfo(true)
    updateTotalBooked(props.classId!, 'decrease')
  } else if (response === 'LateCancellationRequiredError') {
    confirmModalLateCancelReservationData.value.isLoading = false
    confirmModalLateCancelReservationData.value.isVisible = true
  } else {
    errorModalData.value.message = ERROR_UNKNOWN
    errorModalData.value.isVisible = true
  }
}

async function confirmLateCancelation() {
  confirmModalLateCancelReservationData.value.isLoading = true

  const response = await apiService.removeUserFromClass(selectedSpot.value.enrollmentId!, true)

  confirmModalLateCancelReservationData.value.isLoading = false

  confirmModalLateCancelReservationData.value.isVisible = false

  if (response === 'CancelUserEnrollmentSuccess') {
    await getClassInfo(true)
    updateTotalBooked(props.classId!, 'decrease')
  } else if (response === 'LateCancellationRequiredError') {
    confirmModalLateCancelReservationData.value.isLoading = false
    confirmModalLateCancelReservationData.value.isVisible = true
  } else {
    errorModalData.value.message = ERROR_UNKNOWN
    errorModalData.value.isVisible = true
  }
}

function getClassInfo(checkWaitList?: boolean | null) {
  emits('getClassInfo', checkWaitList ?? false)
}

function afterCheckInCheckOut(isCheckIn: boolean) {
  selectedSpot.value.isCheckedIn = isCheckIn
}

function toggleSpotsModeView() {
  selectedSpot.value = {}
}
</script>
<template>
  <div>
    <SpotMatrix
      :matrix="matrix!"
      :selectedSpotNumber="selectedSpot?.spotNumber"
      :enrollments="enrollments"
      :spot-action="spotAction"
      :spot-selection-is-disabled="!userCanModifyClass && !userCanCheckInCheckOut"
      :orphaned-class-stats-spots="orphanedClassStatsSpots"
      :edit-customer-profile-url="editCustomerProfileUrl"
      :user-can-check-in-check-out="userCanCheckInCheckOut && showClassAsDisabled === false"
      @click-spot="spotClicked"
      @after-toggle-spots-mode="toggleSpotsModeView"
    >
    </SpotMatrix>

    <!-- Matrix components -->
    <!-- Select empty spot options -->
    <div
      v-if="userCanModifyClass && selectedSpot?.isBooked === false && selectedSpot.enabled === true"
    >
      <h2>Choose an action :</h2>
      <DefaultButtonComponent
        text="ASSIGN CLIENT"
        type="button"
        @on-click="spotAction = SpotActionEnum.asignUserToSpot"
        class="mr-1"
        :disabled="showClassAsDisabled === true"
      ></DefaultButtonComponent>
      <DefaultButtonComponent
        text="Put under maintenance"
        type="button"
        @on-click="clickPutUnderMaintenance"
        class="mr-1"
        :is-loading="isEnablingDisablingSpot"
        :disabled="showClassAsDisabled === true"
        v-if="putUnderMaintenanceIsVisible"
      ></DefaultButtonComponent>
    </div>
    <!-- Select under manteince spot options -->
    <div v-if="userCanModifyClass && selectedSpot.enabled === false">
      <h2>Spot is under maintenance</h2>
      <DefaultButtonComponent
        text="Recover from maintenance"
        type="button"
        @on-click="clickRecoverFromMaintenance"
        class="mr-1"
        :is-loading="isEnablingDisablingSpot"
        :disabled="showClassAsDisabled === true"
      >
      </DefaultButtonComponent>
    </div>

    <!-- Select booked spot options -->
    <h2 v-if="userCanModifyClass && selectedSpot?.isBooked === true">
      Spot is reserved for -
      {{
        (selectedSpot.identifiableUser?.user?.firstName ?? '') +
        ' ' +
        (selectedSpot.identifiableUser?.user?.lastName ?? '')
      }}
    </h2>
    <!-- CANCEL BOOKING Button -->
    <DefaultButtonComponent
      v-if="
        userCanModifyClass &&
        selectedSpot?.isBooked === true &&
        spotAction !== SpotActionEnum.changeMemberSpot &&
        spotAction !== SpotActionEnum.swapSpot
      "
      text="CANCEL BOOKING"
      type="button"
      @on-click="clickCancelMembersReservation"
      class="mr-1"
      :disabled="showClassAsDisabled === true"
    >
    </DefaultButtonComponent>
    <!-- CHANGE SPOT button -->
    <DefaultButtonComponent
      text="CHANGE SPOT"
      :is-loading="changingMemberSpot"
      type="button"
      :disabled="spotAction === SpotActionEnum.changeMemberSpot || showClassAsDisabled === true"
      @on-click="spotAction = SpotActionEnum.changeMemberSpot"
      v-if="
        userCanModifyClass &&
        selectedSpot?.isBooked === true &&
        spotAction !== SpotActionEnum.swapSpot
      "
      class="mr-1"
    >
    </DefaultButtonComponent>

    <!-- Swap Spot Button -->
    <DefaultButtonComponent
      type="button"
      text="Swap Spot"
      :is-loading="changingMemberSpot"
      :disabled="spotAction === SpotActionEnum.swapSpot || showClassAsDisabled === true"
      v-if="
        userCanModifyClass &&
        selectedSpot?.isBooked === true &&
        spotAction !== SpotActionEnum.changeMemberSpot
      "
      @on-click="spotAction = SpotActionEnum.swapSpot"
      class="mr-1"
    >
    </DefaultButtonComponent>

    <!-- Cancel button  -->
    <DefaultButtonComponent
      v-if="
        userCanModifyClass &&
        selectedSpot?.isBooked === true &&
        (spotAction === SpotActionEnum.changeMemberSpot || spotAction === SpotActionEnum.swapSpot)
      "
      :disabled="changingMemberSpot"
      text="Cancel"
      type="button"
      @on-click="spotAction = SpotActionEnum.none"
    >
    </DefaultButtonComponent>

    <!-- Check In - Out button -->
    <CheckInCheckOutUserInClass
      v-if="
        userCanCheckInCheckOut &&
        selectedSpot.enrollmentId != null &&
        selectedSpot.isCheckedIn != null &&
        spotAction !== SpotActionEnum.changeMemberSpot &&
        spotAction !== SpotActionEnum.swapSpot
      "
      :enrollment-id="selectedSpot.enrollmentId"
      :is-checked-in="selectedSpot.isCheckedIn"
      :disabled="showClassAsDisabled === true"
      @after-check-in-check-out="afterCheckInCheckOut"
    >
    </CheckInCheckOutUserInClass>

    <ViewUserProfileButton
      v-if="
        selectedSpot.identifiableUser?.id &&
        spotAction !== SpotActionEnum.changeMemberSpot &&
        spotAction !== SpotActionEnum.swapSpot
      "
      :user-id="selectedSpot.identifiableUser?.id"
      :enrollment-id="selectedSpot.enrollmentId"
      :class-id="classId"
      :edit-customer-profile-url="editCustomerProfileUrl"
    ></ViewUserProfileButton>

    <div v-if="userCanModifyClass && spotAction === SpotActionEnum.asignUserToSpot">
      <hr />
      <EnrollSelectedMemberComponent
        v-if="selectedSpot.spotNumber"
        :class-id="classId"
        :spot-number="selectedSpot.spotNumber!"
        enrollButtonText="Assign"
        @after-enrolling="() => emits('afterEnrollingCustomer')"
        :is-waitlist-booking="false"
        :user-ids-to-hide="userIdsToHide"
      >
      </EnrollSelectedMemberComponent>
    </div>

    <br />
    <br />
    <SpotMatrixLegend></SpotMatrixLegend>
  </div>

  <ModalComponent
    title="ERROR"
    :message="errorModalData.message"
    :closable="false"
    v-if="errorModalData.isVisible"
    @on-ok="errorModalData.isVisible = false"
    :cancel-text="null"
  >
  </ModalComponent>

  <ModalComponent
    v-if="confirmModalCancelReservationData.isVisible"
    title="CANCEL BOOKING"
    message="Are you sure you want to proceed?"
    :ok-loading="confirmModalCancelReservationData.isLoading"
    @on-cancel="confirmModalCancelReservationData.isVisible = false"
    @on-ok="removeUserFromClass()"
    :closable="false"
  >
  </ModalComponent>

  <ModalComponent
    v-if="confirmModalLateCancelReservationData.isVisible"
    title="Warning"
    :message="ERROR_LATE_CANCELLATION_REQUIRED"
    :cancel-disabled="confirmModalLateCancelReservationData.isLoading"
    :ok-loading="confirmModalLateCancelReservationData.isLoading"
    @on-cancel="confirmModalLateCancelReservationData.isVisible = false"
    ok-text="CONFIRM"
    @on-ok="confirmLateCancelation()"
    :closable="false"
  >
  </ModalComponent>

  <ModalComponent
    :title="successModalData.title"
    :message="successModalData.message"
    :closable="false"
    @on-ok="successModalData.isVisible = false"
    v-if="successModalData.isVisible"
  >
  </ModalComponent>
</template>
<style scoped></style>
