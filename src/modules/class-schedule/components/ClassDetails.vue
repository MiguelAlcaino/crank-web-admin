<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue'

import dayjs from 'dayjs'

import type { ApiService } from '@/services/apiService'

import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import EnrollSelectedMemberComponent from '@/modules/class-schedule/components/EnrollSelectedMemberComponent.vue'
import ChangeLayoutClass from '@/modules/class-schedule/components/ChangeLayoutClass.vue'
import ViewWaitlistEntries from '@/modules/class-schedule/components/ViewWaitlistEntries.vue'
import SetOnHoldSpots from '@/modules/class-schedule/components/SetOnHoldSpots.vue'
import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'
import SyncClassButton from '@/modules/class-schedule/components/SyncClassButton.vue'
import SyncClassWithPiqButton from '@/modules/class-schedule/components/SyncClassWithPiqButton.vue'
import SendClassStatsToUsers from '@/modules/class-schedule/components/SendClassStatsToUsers.vue'

import ClassOptionsWithoutMatrix from '@/modules/class-schedule/components/ClassOptionsWithoutMatrix.vue'
import ClassOptionsWithMatrix from '@/modules/class-schedule/components/ClassOptionsWithMatrix.vue'
import { EnrollmentStatusEnum } from '../interfaces'
import { useCalendarList } from '../composables/useCalendarList'
import { useClassDetail } from '../composables/useClassDetail'

import type { ClassInfo } from '../interfaces/class-detail'
import type { SiteEnum } from '@/modules/shared/interfaces'

const { updateTotalBooked, selectedSite } = useCalendarList()
const {
  userCanCheckInCheckOut,
  userCanModifyClass,
  userCanModifyLayoutClass,
  userCanSyncClasses,
  userCanSyncClassesWithPiq,
  isLoading,
  classInfo,
  enrollments
} = useClassDetail()

const props = defineProps<{
  classId: string | null
  editCustomerProfileUrl?: string | null
}>()

watch(
  () => props.classId,
  () => {
    getClassInfo()
  }
)

const setOnHoldSpotsIsVisible = false

const apiService = inject<ApiService>('gqlApiService')!

const totalSignedIn = ref<number>(0)
const waitListAvailable = ref<boolean>(false)
const checkingWaitlist = ref<boolean>(false)
const userIdsToHide = ref<string[]>([])

const isSynchronizing = ref(false)

const syncWithMbButtonIsDisabled = ref(false)
const syncWithPiqButtonIsDisabled = ref(false)

const errorModalData = ref<{
  title: string
  message: string
  isVisible: boolean
}>({
  title: '',
  message: '',
  isVisible: false
})

const successModalData = ref<{
  title: string
  message: string
  isVisible: boolean
}>({
  title: '',
  message: '',
  isVisible: false
})

onMounted(() => {
  getClassInfo()
})

async function getClassInfo(checkWaitList?: boolean | null) {
  if (props.classId === null) return

  isLoading.value = true
  classInfo.value = (await apiService.getClassInfoAdmin(
    selectedSite.value as SiteEnum,
    props.classId
  )) as unknown as ClassInfo

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

async function afterEnrollingUser() {
  updateTotalBooked(props.classId!, 'increase')
  await getClassInfo(true)
}

async function afterCancelEnrollingUser() {
  updateTotalBooked(props.classId!, 'decrease')
  await getClassInfo(true)
}

async function checkWaitlistIsEnable() {
  if (checkingWaitlist.value) return
  checkingWaitlist.value = true
  try {
    await new Promise((f) => setTimeout(f, 5000))

    waitListAvailable.value = await apiService.classWaitlistIsEnabled(
      selectedSite.value as SiteEnum,
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
        selectedSite.value as SiteEnum,
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

      <!-- Class Without Matix -->
      <ClassOptionsWithoutMatrix
        v-if="classInfo != null && classInfo.roomLayout == null && classInfo.enrollments != null"
        :class-id="classId"
        :user-ids-to-hide="userIdsToHide"
        :show-class-as-disabled="classInfo.class?.showAsDisabled ?? false"
        :user-can-modify-class="userCanModifyClass"
        :edit-customer-profile-url="editCustomerProfileUrl"
        :user-can-check-in-check-out="userCanCheckInCheckOut"
        :wait-list-available="waitListAvailable"
        :enrollments="enrollments"
        @after-enrolling-customer="afterEnrollingUser()"
        @after-unrolling-customer="afterCancelEnrollingUser()"
      ></ClassOptionsWithoutMatrix>

      <!-- With Matrix -->
      <ClassOptionsWithMatrix
        v-if="classInfo?.roomLayout?.matrix"
        :edit-customer-profile-url="editCustomerProfileUrl"
        :matrix="classInfo.roomLayout!.matrix"
        :enrollments="enrollments"
        :show-class-as-disabled="classInfo.class?.showAsDisabled ?? false"
        :user-can-check-in-check-out="userCanCheckInCheckOut"
        :orphaned-class-stats-spots="classInfo.orphanedClassStatsSpots ?? []"
        :user-can-modify-class="userCanModifyClass"
        :user-ids-to-hide="userIdsToHide"
        :class-id="classId"
        @after-enrolling-customer="afterEnrollingUser()"
        @after-unrolling-customer="afterCancelEnrollingUser()"
        @get-class-info="getClassInfo"
      ></ClassOptionsWithMatrix>

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

  <!-- SUCCESS modal -->
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

.crankSpiner {
  color: #ff6f60;
}
</style>
