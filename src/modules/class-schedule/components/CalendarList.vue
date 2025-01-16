<script setup lang="ts">
import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import dayjs from 'dayjs'
import { inject, onMounted, ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'
import SyncAllClassesButton from '@/modules/class-schedule/components/SyncAllClassesButton.vue'

import type { CalendarListClass } from '../interfaces'
import type { SiteEnum } from '@/modules/shared/interfaces'
import { useCalendarList } from '../composables/useCalendarList'

const apiService = inject<ApiService>('gqlApiService')!
const { weekDays, sites, selectedSite, isLoadingSites, getAvailableSites } =
  useCalendarList(apiService)

dayjs.Ls.en.weekStart = 1

const isLoading = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)

const dateRange = ref<[Date, Date]>([
  dayjs(Date()).startOf('week').toDate(),
  dayjs(Date()).endOf('week').toDate()
])

const weekSelectorIsVisible = ref<boolean>(false)

const selectedClassId = ref<string | null>(null)

const isSynchronizingClasses = ref(false)

const emits = defineEmits<{
  (e: 'selectClass', classId: string | null): void
}>()

onMounted(async () => {
  await getAvailableSites()

  if (selectedSite.value) {
    checkIfAllClassAreSynchronized()
    await getCalendarClasses()
    scrollToTodayClass()
  }
})

async function checkIfAllClassAreSynchronized() {
  isSynchronizingClasses.value = await apiService.checkIfAllClassAreSynchronized(
    selectedSite.value as SiteEnum
  )

  if (isSynchronizingClasses.value) {
    initIntervalCheckSynchronizationClasses()
  }
}

async function getCalendarClasses(): Promise<void> {
  selectClass(null)

  dateRange.value = [dateRange.value[0], dateRange.value[1]]

  weekDays.value = []

  isLoading.value = true

  try {
    const calendarClasses = (await apiService.getCalendarClassesForList(
      selectedSite.value as SiteEnum,
      dateRange.value[0],
      dateRange.value[1]
    )) as CalendarListClass[]

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
        showAsDisabled: calendarClass.showAsDisabled,
        instructorName: calendarClass.instructorName
      })
    }
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}

function goToPrevWeek(): void {
  const date = dayjs(dateRange.value[0])

  dateRange.value[0] = date.subtract(1, 'weeks').startOf('week').toDate()
  dateRange.value[1] = date.subtract(1, 'weeks').endOf('week').toDate()

  getCalendarClasses()
}

function goToNextWeek(): void {
  const date = dayjs(dateRange.value[0])

  dateRange.value[0] = date.add(1, 'weeks').startOf('week').toDate()
  dateRange.value[1] = date.add(1, 'weeks').endOf('week').toDate()

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
      const isSynchronizing = await apiService.checkIfAllClassAreSynchronized(
        selectedSite.value as SiteEnum
      )
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

const handleDate = () => {
  getCalendarClasses()
}

const format = (modelData: [Date, Date]) => {
  return `${dayjs(modelData[0]).format('DD/MM/YYYY')} to ${dayjs(modelData[1]).format(
    'DD/MM/YYYY'
  )}`
}

function scrollToTodayClass() {
  const today = dayjs().format('YYYY-MM-DD')
  const todayClassElement = document.getElementById(`${today}`)
  if (todayClassElement) {
    todayClassElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div v-if="!isLoadingSites && sites.length === 0">
    <p>The calendar cannot be displayed because your user does not have a site assigned.</p>
  </div>
  <div class="row ml-1">
    <div class="col-lg-7 col-md-10 col-sm-12 ml-auto mr-3">
      <div class="position-relative">
        <select
          class="custom-select"
          v-model="selectedSite"
          required
          :disabled="isLoadingSites || isLoading"
          @change="onAfterChangingSite()"
        >
          <option v-for="site in sites" :key="site.code" :value="site.code">
            {{ site.name }}
          </option>
        </select>
        <div
          v-if="isLoadingSites"
          class="spinner-border text-primary position-absolute custom-select-spinner"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
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
          {{ dayjs(dateRange[0]).format('DD/MM/YYYY') }} to
          {{ dayjs(dateRange[1]).format('DD/MM/YYYY') }}
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
        <span class="day" :id="`${dayjs(wd.date).format('YYYY-MM-DD')}`">{{
          dayjs(wd.date).format('ddd MMM D, YYYY')
        }}</span>
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
            <desc style="display: inline-block; width: 100%; align-self: stretch">
              {{ c.name }} - {{ c.instructorName }}
            </desc>
            <span>
              {{ '(' + (c.totalBooked + c.totalUnderMaintenanceSpots) + '/' + c.maxCapacity + ')' }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12 text-center">
        <div v-if="isSynchronizingClasses">
          <h6>
            synchronizing...&nbsp;<span class="spinner-border spinner-border-sm crankSpiner"></span>
          </h6>
        </div>
        <div v-else>
          <SyncAllClassesButton
            v-if="selectedSite"
            :disabled="false"
            @after-sync-all-classes="afterSyncClasses"
            :site="selectedSite as SiteEnum"
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

  max-height: 82vh;
  overflow-y: auto;
}

.custom-select-spinner {
  color: #ff7f61 !important;
  top: 30%;
  right: 28px;
  width: 1rem;
  height: 1rem;
  border-width: 0.2em;
}
</style>
