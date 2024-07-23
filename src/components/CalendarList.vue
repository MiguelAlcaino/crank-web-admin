<script lang="ts">
interface Class {
  id: string
  name: string
  startWithNoTimeZone: Date
  maxCapacity: number
  totalBooked: number
  totalUnderMaintenanceSpots: number
  showAsDisabled: boolean
}

interface WeekDays {
  date: Date
  classes: Class[]
}
</script>

<script setup lang="ts">
import type { ApiService } from '@/services/apiService'
import { appStore } from '@/stores/appStorage'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import dayjs from 'dayjs'
import { inject, onMounted, ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'
import SyncAllClassesButton from '@/components/SyncAllClassesButton.vue'
import SiteSelector from '@/components/SiteSelector.vue'
import { Role } from '@/utils/userRoles'
import { authService } from '@/services/authService'

dayjs.Ls.en.weekStart = 1

const apiService = inject<ApiService>('gqlApiService')!

const isLoading = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)
const startDate = ref<Date>(dayjs(Date()).startOf('week').toDate())
const endDate = ref<Date>(dayjs(Date()).endOf('week').toDate())
const weekDays = ref<WeekDays[]>([])
const userCanSyncClasses = ref<boolean>(false)

const dateRange = ref<[Date, Date]>([startDate.value, endDate.value])
const weekSelectorIsVisible = ref<boolean>(false)

const selectedClassId = ref<string | null>(null)

const isSynchronizingClasses = ref(false)

const emits = defineEmits<{
  (e: 'selectClass', classId: string | null): void
}>()

onMounted(() => {
  checkIfAllClassAreSynchronized()
  getCalendarClasses()

  userCanSyncClasses.value = authService.userHasRole(Role.ROLE_SUPER_ADMIN)
})

defineExpose({
  getCalendarClasses
})

async function checkIfAllClassAreSynchronized() {
  isSynchronizingClasses.value = await apiService.checkIfAllClassAreSynchronized(appStore().site)

  if (isSynchronizingClasses.value) {
    initIntervalCheckSynchronizationClasses()
  }
}

async function getCalendarClasses(resetSelectedClass: boolean = true): Promise<void> {
  if (resetSelectedClass) selectClass(null)

  dateRange.value = [startDate.value, endDate.value]

  weekDays.value = []

  isLoading.value = true

  try {
    const calendarClasses = (await apiService.getCalendarClassesForList(
      appStore().site,
      startDate.value,
      endDate.value
    )) as Class[]

    let day: dayjs.Dayjs | null = null
    let weekDaysIndex = -1

    for (let index = 0; index < calendarClasses.length; index++) {
      const calendarClass = calendarClasses[index]

      if (day === null || !day.isSame(dayjs(calendarClass.startWithNoTimeZone), 'day')) {
        weekDaysIndex++
        day = dayjs(calendarClass.startWithNoTimeZone)

        weekDays.value.push({ date: calendarClass.startWithNoTimeZone, classes: [] })
      }

      weekDays.value[weekDaysIndex].classes.push({
        id: calendarClass.id,
        name: calendarClass.name,
        startWithNoTimeZone: calendarClass.startWithNoTimeZone,
        maxCapacity: calendarClass.maxCapacity,
        totalBooked: calendarClass.totalBooked,
        totalUnderMaintenanceSpots: calendarClass.totalUnderMaintenanceSpots,
        showAsDisabled: calendarClass.showAsDisabled
      })
    }
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}

function goToPrevWeek(): void {
  const date = dayjs(startDate.value)

  startDate.value = date.subtract(1, 'weeks').startOf('week').toDate()
  endDate.value = date.subtract(1, 'weeks').endOf('week').toDate()

  getCalendarClasses()
}

function goToNextWeek(): void {
  const date = dayjs(startDate.value)

  startDate.value = date.add(1, 'weeks').startOf('week').toDate()
  endDate.value = date.add(1, 'weeks').endOf('week').toDate()

  getCalendarClasses()
}

function selectClass(classId: string | null): void {
  selectedClassId.value = classId
  emits('selectClass', classId)
}

function onAfterChangingSite(): void {
  getCalendarClasses()
}

function afterSyncClasses(isSynchronizing: boolean) {
  isSynchronizingClasses.value = isSynchronizing
  if (isSynchronizing == false) {
    getCalendarClasses()
  } else {
    initIntervalCheckSynchronizationClasses()
  }
}

const intervalId = ref<number | null>(null)

function initIntervalCheckSynchronizationClasses() {
  intervalId.value = window.setInterval(async () => {
    try {
      const isSynchronizing = await apiService.checkIfAllClassAreSynchronized(appStore().site) // Reemplaza esto con tu llamada a la API
      isSynchronizingClasses.value = isSynchronizing

      if (!isSynchronizing) {
        clearInterval(intervalId.value!)
        intervalId.value = null
        getCalendarClasses()
      }
    } catch (error) {
      console.error(error)
    }
  }, 1000)
}

const handleDate = (modelData: [Date, Date]) => {
  startDate.value = modelData[0]
  endDate.value = modelData[1]

  getCalendarClasses()
}

const format = (modelData: [Date, Date]) => {
  return `${dayjs(modelData[0]).format('DD/MM/YYYY')} to ${dayjs(modelData[1]).format(
    'DD/MM/YYYY'
  )}`
}
</script>

<template>
  <div class="row ml-1">
    <div class="col-lg-7 col-md-10 col-sm-12 ml-auto mr-3">
      <SiteSelector @after-changing-site="onAfterChangingSite"></SiteSelector>
    </div>
  </div>
  <hr />
  <div class="ReservationClassList">
    <div id="DateRangeSection">
      <div style="display: flex; justify-content: space-between; width: 100%">
        <VueDatePicker
          v-model="dateRange"
          week-picker
          :enable-time-picker="false"
          :clearable="false"
          :format="format"
          @update:model-value="handleDate"
          v-if="weekSelectorIsVisible"
          style="min-width: 233px"
        />
        <button
          class="btn btn-sm"
          type="button"
          @click="weekSelectorIsVisible = !weekSelectorIsVisible"
          v-if="weekSelectorIsVisible"
        >
          Cancel
        </button>

        <div id="prev" v-if="!weekSelectorIsVisible">
          <a href="#" @click.prevent="goToPrevWeek()">
            <i class="bi bi-caret-left-fill" style="color: black"></i>
          </a>
        </div>
        <div
          id="dateRange"
          style="font-weight: 500; cursor: pointer"
          v-if="!weekSelectorIsVisible"
          @click="weekSelectorIsVisible = !weekSelectorIsVisible"
        >
          {{ dayjs(startDate).format('DD/MM/YYYY') }} to
          {{ dayjs(endDate).format('DD/MM/YYYY') }}
        </div>
        <div id="next" v-if="!weekSelectorIsVisible">
          <a href="#" @click.prevent="goToNextWeek()" style="color: black">
            <i class="bi bi-caret-right-fill"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="row" v-if="isLoading">
      <div class="col-12 text-center">
        <CrankCircularProgressIndicator text="Loading..."></CrankCircularProgressIndicator>
      </div>
    </div>
    <div id="ClassesSection" class="scrollable-div">
      <div class="ClassDate" v-for="wd in weekDays" :key="wd.date.toISOString">
        <span class="day">{{ dayjs(wd.date).format('ddd MMM D, YYYY') }}</span>
        <div
          v-for="c in wd.classes"
          :key="c.id"
          style="cursor: pointer"
          @click="selectClass(c.id)"
          :class="{
            selectedClass: c.id === selectedClassId,
            disabledClass: c.showAsDisabled
          }"
        >
          <div>
            <time>{{ dayjs(c.startWithNoTimeZone).format('h:mm A') }}</time>
            <desc style="display: inline-block; width: 100%; align-self: stretch">{{
              c.name
            }}</desc>
            <span>
              {{ '(' + (c.totalBooked + c.totalUnderMaintenanceSpots) + '/' + c.maxCapacity + ')' }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <div v-if="isSynchronizingClasses">
          <h6>
            synchronizing...&nbsp;<span class="spinner-border spinner-border-sm crankSpiner"></span>
          </h6>
        </div>
        <div v-else>
          <SyncAllClassesButton
            :disabled="false"
            @after-sync-all-classes="afterSyncClasses"
            v-if="userCanSyncClasses"
          >
          </SyncAllClassesButton>
        </div>
      </div>
    </div>
  </div>

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
.ReservationClassList {
  padding: 10px;
  background-color: #f8f8f8;
  box-shadow: 0 0 2px 0 #888;
  margin-bottom: 35px;
}

.day {
  font-weight: 700;
  display: block;
  background: gray;
  color: #fff;
  padding-left: 5px;
  font-size: 12px;
  font-weight: 500;
}

.time {
  min-width: 90px;
  display: inline-block;
}

#ClassesSection div.ClassDate > div > div {
  color: #000000;
  font-weight: bold;
}

#ClassesSection div.ClassDate > div > div > time {
  min-width: 90px;
  display: inline-block;
}

#ClassesSection div.ClassDate > div > div {
  text-overflow: ellipsis;
  display: flex;
  margin: -2px 0 -2px 0;
  font-size: 12px;
}

#ClassesSection div.ClassDate {
  margin-bottom: 10px;
}

#ClassesSection div.ClassDate > div {
  padding: 6px;
  background-color: #fff;
  border: 1px solid #bdbdbd;
}

#DateRangeSection {
  display: flex;
  padding: 8px;
  padding-left: 0;
  padding-right: 0;
}

.selectedClass {
  background-color: #ff7f61 !important;
}

.disabledClass {
  background-color: #bdbdbd !important;
}

.crankSpiner {
  color: #ff6f60;
}

.scrollable-div {
  height: 100vh;
  overflow-y: scroll;
}
</style>
