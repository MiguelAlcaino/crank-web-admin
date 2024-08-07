<script lang="ts">
interface BookableSpotClickedEvent {
  spotNumber: number | null
  isBooked: boolean
}

interface ClassInfo {
  class: Class
  enrollments: EnrollmentInfo[]
  roomLayout?: RoomLayout
  onHoldSpots: number
  orphanedClassStatsSpots: number[]
}

interface RoomLayout {
  id: string
  name: string
  matrix?: Array<ClassPosition>
}

interface ClassPosition {
  x: number
  y: number
  icon: PositionIconEnum
  spotNumber?: number
  enabled?: boolean
}

interface Class {
  id: string
  name: string
  description: string
  instructorName: string
  startWithNoTimeZone: Date
  duration: number
  waitListAvailable: boolean
  showAsDisabled: boolean
  maxCapacity: number
  isSubstitute: boolean
  hasClassStats: boolean
  isSynchronizing: boolean
}

interface EnrollmentInfo {
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

interface SelectedSpot {
  spotNumber?: number | null
  isBooked?: boolean | null
  enabled?: boolean | null
  enrollmentId?: string | null
  isCheckedIn?: boolean
  identifiableUser?: IdentifiableUser | null
}
</script>

<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue'

import dayjs from 'dayjs'

import type { ApiService } from '@/services/apiService'

import { appStore } from '@/stores/appStorage'

import SpotMatrix from '@/modules/class-schedule/components/SpotMatrix.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import AdminBookedUsersList from '@/modules/class-schedule/components/AdminBookedUsersList.vue'
import EnrollSelectedMemberComponent from '@/modules/class-schedule/components/EnrollSelectedMemberComponent.vue'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ChangeLayoutClass from '@/modules/class-schedule/components/ChangeLayoutClass.vue'
import ViewWaitlistEntries from '@/modules/class-schedule/components/ViewWaitlistEntries.vue'
import CheckInCheckOutUserInClass from '@/modules/class-schedule/components/CheckInCheckOutUserInClass.vue'
import SetOnHoldSpots from '@/modules/class-schedule/components/SetOnHoldSpots.vue'
import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'
import UserProfile from '@/modules/class-schedule/components/UserProfile.vue'
import SyncClassButton from '@/modules/class-schedule/components/SyncClassButton.vue'
import SyncClassWithPiqButton from '@/modules/class-schedule/components/SyncClassWithPiqButton.vue'
import SendClassStatsToUsers from '@/modules/class-schedule/components/SendClassStatsToUsers.vue'

import {
  ERROR_CLIENT_IS_OUTSIDE_SCHEDULING_WINDOW,
  ERROR_LATE_CANCELLATION_REQUIRED,
  ERROR_SPOT_ALREADY_RESERVED,
  ERROR_SPOT_NOT_FOUND,
  ERROR_TRYING_TO_MOVE_SAME_SPOT,
  ERROR_UNKNOWN
} from '@/utils/errorMessages'
import { authService } from '@/services/authService'
import { Role } from '@/utils/userRoles'
import { EnrollmentStatusEnum, SpotActionEnum } from '../interfaces'
import { PositionIconEnum } from '@/modules/shared/interfaces'

const props = defineProps<{
  classId: string | null
  editCustomerProfileUrl?: string | null
}>()

const emits = defineEmits<{
  (e: 'availableSpotsChanged'): void
}>()

watch(
  () => props.classId,
  (classId) => {
    getClassInfo()
  }
)

const setOnHoldSpotsIsVisible = false
const putUnderMaintenanceIsVisible = false

const apiService = inject<ApiService>('gqlApiService')!
const isLoading = ref<boolean>(false)
const classInfo = ref<ClassInfo | null>(null)
const enrollments = ref<EnrollmentInfo[]>([])

const isEnablingDisablingSpot = ref<boolean>(false)
const changingMemberSpot = ref<boolean>(false)

const totalSignedIn = ref<number>(0)

const spotAction = ref<SpotActionEnum>(SpotActionEnum.none)

const userCanModifyLayoutClass = ref<boolean>(false)
const userCanModifyClass = ref<boolean>(false)
const userCanSyncClasses = ref<boolean>(false)
const userCanSyncClassesWithPiq = ref<boolean>(false)
const waitListAvailable = ref<boolean>(false)
const userCanCheckInCheckOut = ref<boolean>(false)
const checkingWaitlist = ref<boolean>(false)
const userIdsToHide = ref<string[]>([])

const isSynchronizing = ref(false)

const syncWithMbButtonIsDisabled = ref(false)
const syncWithPiqButtonIsDisabled = ref(false)

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

const confirmModalCancelReservationData = ref<{
  isLoading: boolean
  isVisible: boolean
}>({
  isLoading: false,
  isVisible: false
})

const confirmModalLateCancelReservationData = ref<{
  isLoading: boolean
  isVisible: boolean
}>({
  isLoading: false,
  isVisible: false
})

const selectedSpot = ref<SelectedSpot>({
  spotNumber: null,
  isBooked: null,
  enabled: null,
  enrollmentId: null,
  identifiableUser: null
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

onMounted(() => {
  setPermissionsByRole()
  getClassInfo()
})

function setPermissionsByRole() {
  userCanModifyClass.value = authService.userHasRole(Role.ROLE_STAFF)
  userCanSyncClasses.value = authService.userHasRole(Role.ROLE_STAFF)
  userCanSyncClassesWithPiq.value = authService.userHasRole(Role.ROLE_SUPER_ADMIN)
  userCanCheckInCheckOut.value = authService.userHasRole(Role.ROLE_INSTRUCTOR)
  userCanModifyLayoutClass.value = authService.userHasRole(Role.ROLE_SUPER_ADMIN)
}

async function getClassInfo(checkWaitList?: boolean | null) {
  if (props.classId === null) return

  selectedSpot.value = {}
  spotAction.value = SpotActionEnum.none

  isLoading.value = true
  classInfo.value = (await apiService.getClassInfoAdmin(
    appStore().site,
    props.classId
  )) as ClassInfo

  isSynchronizing.value = classInfo.value?.class.isSynchronizing
  if (isSynchronizing.value) {
    initIntervalCheckSynchronizationClass()
  }
  waitListAvailable.value = classInfo.value?.class.waitListAvailable ?? false

  enrollments.value =
    classInfo.value?.enrollments.filter(
      (x) =>
        x.enrollmentStatus !== EnrollmentStatusEnum.Cancelled &&
        x.enrollmentStatus !== EnrollmentStatusEnum.LateCancelled
    ) ?? []

  userIdsToHide.value = enrollments.value.map((x) => x.identifiableSiteUser?.id ?? '')

  isLoading.value = false

  if (
    (checkWaitList === true &&
      enrollments.value.length === classInfo.value.class.maxCapacity &&
      waitListAvailable.value === false) ||
    (enrollments.value.length < classInfo.value.class.maxCapacity &&
      waitListAvailable.value === true)
  ) {
    checkWaitlistIsEnable()
  }

  totalSignedIn.value = enrollments.value?.filter((x) => x.isCheckedIn === true).length ?? 0
}

async function spotClicked(event: BookableSpotClickedEvent) {
  if (spotAction.value === SpotActionEnum.changeMemberSpot) {
    await changeSelectedMemberSpot(event.spotNumber!)
  }
  if (spotAction.value === SpotActionEnum.swapSpot) {
    await swapSpot(event.spotNumber!)
  } else {
    spotAction.value = SpotActionEnum.none

    for (let index = 0; index < classInfo.value!.roomLayout!.matrix!.length; index++) {
      const classPosition = classInfo.value!.roomLayout!.matrix![index]

      if (classPosition.icon === PositionIconEnum.Spot) {
        if (classPosition.spotNumber === event.spotNumber) {
          let isBooked = false
          let isCheckedIn: boolean | undefined
          let enrollmentId: string | null | undefined
          let identifiableUser: IdentifiableUser | null | undefined

          if (enrollments.value != null) {
            for (let index = 0; index < enrollments.value.length; index++) {
              const enrollment = enrollments.value[index]
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

async function clickPutUnderMaintenance() {
  if (props.classId === null) return

  isEnablingDisablingSpot.value = true

  const response = await apiService.disableSpot(props.classId, selectedSpot.value.spotNumber!)

  isEnablingDisablingSpot.value = false

  if (response === 'Success') {
    await getClassInfo(true)
    emits('availableSpotsChanged')
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
    emits('availableSpotsChanged')
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
    emits('availableSpotsChanged')
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
    emits('availableSpotsChanged')
  } else if (response === 'LateCancellationRequiredError') {
    confirmModalLateCancelReservationData.value.isLoading = false
    confirmModalLateCancelReservationData.value.isVisible = true
  } else {
    errorModalData.value.message = ERROR_UNKNOWN
    errorModalData.value.isVisible = true
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

async function afterEnrollingUser() {
  emits('availableSpotsChanged')
  await getClassInfo(true)
}

async function checkWaitlistIsEnable() {
  if (checkingWaitlist.value) return
  checkingWaitlist.value = true
  try {
    await new Promise((f) => setTimeout(f, 5000))

    waitListAvailable.value = await apiService.classWaitlistIsEnabled(
      appStore().site,
      props.classId!
    )
  } catch (error) {
    errorModalData.value.message = 'ERROR CHECKING WAITLIST STATUS'
    errorModalData.value.isVisible = true
  } finally {
    checkingWaitlist.value = false
  }
}

function afterSyncClass(isSynchronizingClass: boolean) {
  isSynchronizing.value = isSynchronizingClass
  if (isSynchronizingClass == false) {
    getClassInfo()
  } else {
    initIntervalCheckSynchronizationClass()
  }
}

const intervalId = ref<number | null>(null)

function initIntervalCheckSynchronizationClass() {
  intervalId.value = window.setInterval(async () => {
    try {
      const isSynchronizingClass = await apiService.checkIfClassIsSynchronized(
        appStore().site,
        props.classId!
      )
      isSynchronizing.value = isSynchronizingClass

      if (!isSynchronizingClass) {
        clearInterval(intervalId.value!)
        intervalId.value = null
        getClassInfo()
      }
    } catch (error) {
      console.error(error)
    }
  }, 1000)
}

function disableSyncButtons(disabled: boolean) {
  syncWithMbButtonIsDisabled.value = disabled
  syncWithPiqButtonIsDisabled.value = disabled
}
</script>

<template>
  <div class="ClassDetails">
    <div v-if="classId === null">
      <h2 style="margin: 0 auto; text-align: center">Please select a class</h2>
    </div>
    <div v-else-if="isLoading">
      <div class="row">
        <div class="col-12 text-center">
          <CrankCircularProgressIndicator text="Loading..."></CrankCircularProgressIndicator>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-12 text-right">
          <div v-if="isSynchronizing">
            <h6>
              synchronizing...&nbsp;<span
                class="spinner-border spinner-border-sm crankSpiner"
              ></span>
            </h6>
          </div>
          <div v-else>
            <SyncClassWithPiqButton
              v-if="classInfo?.class.id && userCanSyncClassesWithPiq"
              :class-id="classInfo?.class.id"
              @after-sync-class-with-piq="afterSyncClass"
              :disabled="syncWithPiqButtonIsDisabled"
              @disableSyncButtons="disableSyncButtons"
            >
            </SyncClassWithPiqButton>
            &nbsp;
            <SyncClassButton
              v-if="classInfo?.class.id && userCanSyncClasses"
              :class-id="classInfo?.class.id"
              @after-sync-class="afterSyncClass"
              :disabled="syncWithMbButtonIsDisabled"
              @disableSyncButtons="disableSyncButtons"
            ></SyncClassButton>
          </div>
        </div>
      </div>
      <br />

      <!-- Class Description -->
      <div class="row">
        <div class="col-md-12">
          <h4 v-if="classInfo?.class?.showAsDisabled === true">CLASS CANCELLED</h4>
          <h4>
            {{ classInfo?.class?.name }} -
            {{
              classInfo?.class?.instructorName +
              (classInfo?.class?.isSubstitute ? ' (Substitute)' : '')
            }}
            ({{ dayjs(classInfo?.class.startWithNoTimeZone).format('DD/MM/YYYY') }})
          </h4>
          <h5>
            Time : {{ dayjs(classInfo?.class.startWithNoTimeZone).format('hh:mm A') }} | Duration :
            {{ classInfo?.class?.duration }} mins
          </h5>
        </div>
      </div>
      <br />

      <!-- Change Layout Class and View Waitlist Entries Options -->
      <div class="row" v-if="userCanModifyClass">
        <div class="col-md-12">
          <ChangeLayoutClass
            v-if="classInfo && userCanModifyLayoutClass"
            :class-id="classId"
            :room-layout-id="classInfo?.roomLayout?.id"
            :max-capacity="classInfo?.class?.maxCapacity"
            @after-changing-room-layout="getClassInfo()"
            :disabled="classInfo?.class?.showAsDisabled === true"
          >
          </ChangeLayoutClass>
          &nbsp;
          <ViewWaitlistEntries
            :class-id="classId"
            :disabled="classInfo?.class?.showAsDisabled === true"
          >
          </ViewWaitlistEntries>
          &nbsp;
          <SetOnHoldSpots
            v-if="setOnHoldSpotsIsVisible && classInfo"
            :class-id="classId"
            @after-set-on-hold-spots="getClassInfo(true)"
            :on-hold-spots="classInfo?.onHoldSpots"
            :disabled="classInfo?.class?.showAsDisabled === true"
          ></SetOnHoldSpots>
        </div>
      </div>

      <!-- Enroll in Waitlist -->
      <div class="row" v-if="checkingWaitlist">
        <div class="col-12 text-center">
          <CrankCircularProgressIndicator
            text="Cheking waitlist status..."
          ></CrankCircularProgressIndicator>
        </div>
      </div>
      <div class="row" v-else-if="classInfo !== null && waitListAvailable === true">
        <div class="col-md-12">
          <hr />
          <EnrollSelectedMemberComponent
            :class-id="classId"
            v-if="
              classInfo !== null &&
              waitListAvailable === true &&
              classInfo?.class?.showAsDisabled === false
            "
            @after-enrolling="getClassInfo(true)"
            :spot-number="null"
            enrollButtonText="ADD TO WAITLIST"
            :is-waitlist-booking="true"
            :user-ids-to-hide="userIdsToHide"
          >
          </EnrollSelectedMemberComponent>
        </div>
      </div>

      <hr />
      <br />
      <!-- Matrix -->
      <SpotMatrix
        v-if="
          classInfo !== null &&
          classInfo.roomLayout !== null &&
          classInfo.roomLayout?.matrix !== null
        "
        :matrix="classInfo.roomLayout!.matrix!"
        :show-user-in-spots="true"
        :selectedSpotNumber="selectedSpot?.spotNumber"
        @click-spot="spotClicked"
        :enrollments="enrollments"
        :spot-action="spotAction"
        :spot-selection-is-disabled="!userCanModifyClass && !userCanCheckInCheckOut"
        :orphaned-class-stats-spots="classInfo.orphanedClassStatsSpots ?? []"
        :edit-customer-profile-url="editCustomerProfileUrl"
        :user-can-check-in-check-out="
          userCanCheckInCheckOut && classInfo?.class?.showAsDisabled === false
        "
        @after-check-in-out="getClassInfo()"
      >
      </SpotMatrix>

      <!-- Enroll without matrix option -->
      <EnrollSelectedMemberComponent
        :class-id="classId"
        v-if="
          classInfo !== null &&
          classInfo.roomLayout === null &&
          classInfo.enrollments !== null &&
          waitListAvailable === false &&
          userCanModifyClass &&
          classInfo?.class?.showAsDisabled === false
        "
        @after-enrolling="afterEnrollingUser()"
        :spot-number="null"
        enrollButtonText="BOOK"
        :is-waitlist-booking="false"
        :user-ids-to-hide="userIdsToHide"
      >
      </EnrollSelectedMemberComponent>

      <!-- List enrollments -->
      <AdminBookedUsersList
        v-if="classInfo !== null && classInfo.roomLayout === null && classInfo.enrollments !== null"
        :enrollments="enrollments"
        :isLoading="false"
        @after-cancel-member-reservation="afterEnrollingUser()"
        :show-edit-options="userCanModifyClass && classInfo?.class?.showAsDisabled === false"
        :user-can-check-in-check-out="
          userCanCheckInCheckOut && classInfo?.class?.showAsDisabled === false
        "
        :edit-customer-profile-url="editCustomerProfileUrl"
      >
      </AdminBookedUsersList>

      <!-- Select empty spot options -->
      <div
        v-if="
          userCanModifyClass && selectedSpot?.isBooked === false && selectedSpot.enabled === true
        "
      >
        <h2>Choose an action :</h2>
        <DefaultButtonComponent
          text="ASSIGN CLIENT"
          type="button"
          @on-click="spotAction = SpotActionEnum.asignUserToSpot"
          class="mr-1"
          :disabled="classInfo?.class?.showAsDisabled === true"
        ></DefaultButtonComponent>
        <DefaultButtonComponent
          text="Put under maintenance"
          type="button"
          @on-click="clickPutUnderMaintenance"
          class="mr-1"
          :is-loading="isEnablingDisablingSpot"
          :disabled="classInfo?.class?.showAsDisabled === true"
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
          :disabled="classInfo?.class?.showAsDisabled === true"
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
        :disabled="classInfo?.class?.showAsDisabled === true"
      >
      </DefaultButtonComponent>
      <!-- CHANGE SPOT button -->
      <DefaultButtonComponent
        text="CHANGE SPOT"
        :is-loading="changingMemberSpot"
        type="button"
        :disabled="
          spotAction === SpotActionEnum.changeMemberSpot ||
          classInfo?.class?.showAsDisabled === true
        "
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
        :disabled="
          spotAction === SpotActionEnum.swapSpot || classInfo?.class?.showAsDisabled === true
        "
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
        @after-check-in-check-out="getClassInfo()"
        :disabled="classInfo?.class?.showAsDisabled === true"
      >
      </CheckInCheckOutUserInClass>

      <UserProfile
        v-if="
          selectedSpot.identifiableUser?.id &&
          spotAction !== SpotActionEnum.changeMemberSpot &&
          spotAction !== SpotActionEnum.swapSpot
        "
        :user-id="selectedSpot.identifiableUser?.id"
        :enrollment-id="selectedSpot.enrollmentId"
        :class-id="classId"
        :edit-customer-profile-url="editCustomerProfileUrl"
      ></UserProfile>

      <div v-if="userCanModifyClass && spotAction === SpotActionEnum.asignUserToSpot">
        <hr />
        <EnrollSelectedMemberComponent
          v-if="
            classInfo !== null &&
            selectedSpot.spotNumber !== null &&
            selectedSpot.spotNumber !== undefined
          "
          :class-id="classId"
          :spot-number="selectedSpot.spotNumber!"
          enrollButtonText="Assign"
          @after-enrolling="afterEnrollingUser()"
          :is-waitlist-booking="false"
          :user-ids-to-hide="userIdsToHide"
        >
        </EnrollSelectedMemberComponent>
      </div>

      <br />
      <br />
      <div class="row matrixSpotsLegend" v-if="classInfo?.roomLayout?.matrix">
        <div class="col-4" style="text-align: center">
          <hr style="border: none; height: 2px; background-color: #ffd903; max-width: 20px" />
          <small>Not Paid</small>
        </div>
        <div class="col-4" style="text-align: center">
          <hr style="border: none; height: 2px; background-color: #8a00e7; max-width: 20px" />
          <small>Spot With Stats</small>
        </div>
        <div class="col-4" style="text-align: center">
          <hr style="border: none; height: 2px; background-color: #ff7e62; max-width: 20px" />
          <small>Spot Without Stats</small>
        </div>
      </div>

      <br />
      <div class="row">
        <div class="col-12">
          <SendClassStatsToUsers
            v-if="classInfo?.class?.id && classInfo?.class?.hasClassStats"
            :class-id="classInfo?.class?.id"
          ></SendClassStatsToUsers>
        </div>
      </div>
    </div>
  </div>

  <!----------------------------- Modals ----------------------------->
  <!-- ERROR modal -->
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

<style scoped>
.ClassDetails {
  padding-top: 30px;
  background-color: #f8f8f8;
  min-height: 300px;
  box-shadow: 0 0 2px 0 #888;
  padding: 30px;
}

.matrixSpotsLegend {
  padding-top: 50px;
  background-color: #f8f8f8;
  min-height: 20px;
  box-shadow: 0 0 2px 0 #888;
  padding: 30px;
  font-family: 'Avenir', sans-serif;
}

.crankSpiner {
  color: #ff6f60;
}
</style>
