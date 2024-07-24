<script lang="ts">
interface ClassSchedule {
  id: string
  type: string
  instructorName: string
  dayOfWeek: string
  startWithNoTimeZone: Date
  endWithNoTimeZone: Date
  roomLayout: RoomLayout
  capacity: number
}

interface RoomLayout {
  id: string
  name: string
  capacity: number
}
</script>

<script setup lang="ts">
import { appStore } from '@/stores/appStorage'
import { inject, onMounted, ref } from 'vue'
import dayjs from 'dayjs'

import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'

import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

const apiService = inject<ApiService>('gqlApiService')!

const isLoading = ref(false)
const checked = ref(false)
const indeterminate = ref(false)
const setOfCheckedId = ref<Set<string>>(new Set())

const enableUpdateRoomLayout = ref(false)

const roomLayouts = ref<RoomLayout[]>([])
const filteredRoomLayouts = ref<RoomLayout[]>([])
const selectedRoomLayoutId = ref<string | null>('-1')
var allClassSchedules: ClassSchedule[] = []
const filteredClassSchedules = ref<ClassSchedule[]>([])
const types = ref<string[]>([])
const typeFilterSelected = ref<string | null>(null)
const capacities = ref<number[]>([])
const capacityFilterSelected = ref<number | null>(null)

const confirmModalIsVisible = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)
const successModalIsVisible = ref<boolean>(false)

const urlSyncAll = ref<string>('#')

const isSaving = ref(false)

const isLoadingClassTypes = ref(false)
const isLoadingRoomLayouts = ref(false)

onMounted(() => {
  let _urlSyncAll = inject<any | undefined>('url-sync-all')
  if (_urlSyncAll) {
    urlSyncAll.value = _urlSyncAll
  }

  getAvailableClassTypes()
  getRoomLayouts()
  getClassSchedules()
})

async function getAvailableClassTypes() {
  isLoadingClassTypes.value = true

  types.value = (await apiService.availableClassTypes(appStore().site)) as string[]

  isLoadingClassTypes.value = false
}

async function getClassSchedules() {
  isLoading.value = true

  allClassSchedules = (await apiService.classSchedules(
    appStore().site
  )) as unknown as ClassSchedule[]

  filteredClassSchedules.value = allClassSchedules
  capacities.value = extractDifferentCapacities(filteredClassSchedules.value)

  isLoading.value = false
}

async function getRoomLayouts() {
  isLoadingRoomLayouts.value = true

  roomLayouts.value = (await apiService.roomLayouts(appStore().site, null)) as RoomLayout[]

  filteredRoomLayouts.value = roomLayouts.value

  isLoadingRoomLayouts.value = false
}

function updateCheckedSet(id: string, checked: boolean): void {
  if (checked) {
    setOfCheckedId.value.add(id)
  } else {
    setOfCheckedId.value.delete(id)
  }
}

function refreshCheckedStatus(): void {
  const listOfEnabledData = filteredClassSchedules.value

  checked.value = listOfEnabledData.every(({ id }) => setOfCheckedId.value.has(id))

  indeterminate.value =
    listOfEnabledData.some(({ id }) => setOfCheckedId.value.has(id)) && !checked.value

  refreshEnableUpdateRoomLayout()
  filterRoomLayouts()
}

function onItemChecked(id: string, event: Event): void {
  const checked = (event.target as any).checked as boolean

  updateCheckedSet(id, checked)
  refreshCheckedStatus()
}

function onAllChecked(event: Event): void {
  const checked = (event.target as any).checked as boolean

  filteredClassSchedules.value.forEach(({ id }) => updateCheckedSet(id, checked))

  refreshCheckedStatus()
}

function refreshEnableUpdateRoomLayout(): void {
  var maxCapacity = filteredClassSchedules.value
    .filter((item) => setOfCheckedId.value.has(item.id))
    .map((item) => item.capacity)

  enableUpdateRoomLayout.value = maxCapacity.every((val, i, arr) => val === arr[0])
}

function filterRoomLayouts(): void {
  const capacities = allClassSchedules
    .filter((item) => setOfCheckedId.value.has(item.id))
    .map((item) => item.capacity)

  const distinctCapacities = capacities.filter((value, index, self) => {
    return self.indexOf(value) === index
  })

  if (distinctCapacities.length === 0) {
    filteredRoomLayouts.value = roomLayouts.value
    return
  }

  if (distinctCapacities.length > 1) {
    filteredRoomLayouts.value = []
  }

  if (distinctCapacities.length === 1) {
    filteredRoomLayouts.value = roomLayouts.value.filter(
      (item) => item.capacity === distinctCapacities[0]
    )
  }
}

function onFilterChange() {
  setOfCheckedId.value.clear()
  checked.value = false
  indeterminate.value = false

  filterRoomLayouts()
  applyFilters()
}

async function onClickConfirm() {
  try {
    isSaving.value = true

    const classScheduleIds = Array.from(setOfCheckedId.value)
    const roomLayoutId = selectedRoomLayoutId.value

    const classSchedulesUpdated = (await apiService.setRoomLayoutForClassSchedules(
      classScheduleIds,
      roomLayoutId!
    )) as unknown as ClassSchedule[]

    let tempClassSchedule: ClassSchedule[] = []

    for (const item of allClassSchedules) {
      if (classScheduleIds.includes(item.id)) {
        const index = classSchedulesUpdated.findIndex((x) => x.id === item.id)

        if (classSchedulesUpdated[index]) {
          tempClassSchedule.push(classSchedulesUpdated[index])
        }
      } else {
        tempClassSchedule.push(item)
      }
    }

    allClassSchedules = tempClassSchedule

    applyFilters()

    selectedRoomLayoutId.value = '-1'
    setOfCheckedId.value.clear()
    refreshCheckedStatus()

    successModalIsVisible.value = true
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isSaving.value = false
    confirmModalIsVisible.value = false
  }
}

function applyFilters() {
  filteredClassSchedules.value = allClassSchedules

  if (typeFilterSelected.value) {
    filteredClassSchedules.value = filteredClassSchedules.value.filter(
      (item) => item.type === typeFilterSelected.value
    )
  }

  if (capacityFilterSelected.value) {
    filteredClassSchedules.value = filteredClassSchedules.value.filter(
      (item) => item.capacity === capacityFilterSelected.value
    )
  }
}

function extractDifferentCapacities(items: ClassSchedule[]) {
  const capacities = items.map((item) => item.capacity)

  return capacities.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
}
</script>

<template>
  <div class="row">
    <div class="col-12" style="text-align: right">
      <a :href="urlSyncAll" class="btn btn-primary">Sync All</a>
    </div>
  </div>
  <div class="row">
    <div class="col-6 col-sm-6 col-md-6 col-lg-5 col-xl-3">
      <select
        class="custom-select"
        v-model="typeFilterSelected"
        id="typeFilter"
        required
        @change="onFilterChange"
      >
        <option :value="null">Type filter (none selected)</option>
        <option v-for="(item, index) in types" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="col-6 col-sm-6 col-md-6 col-lg-5 col-xl-3">
      <select
        class="custom-select"
        v-model="capacityFilterSelected"
        id="capacityFilter"
        required
        @change="onFilterChange"
      >
        <option :value="null">Capacity filter (none selected)</option>
        <option v-for="(item, index) in capacities" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
  </div>
  <br />
  <div class="row" v-if="setOfCheckedId.size > 0">
    <div class="col-6 col-sm-6 col-md-6 col-lg-5 col-xl-3">
      <select
        class="custom-select"
        v-model="selectedRoomLayoutId"
        id="countryRegistration"
        required
      >
        <option value="-1">Select a room layout</option>
        <option :value="null">-- NO ROOM LAYOUT --</option>
        <option v-for="(item, index) in filteredRoomLayouts" :key="index" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-4">
      <DefaultButtonComponent
        text="Update Selected"
        type="button"
        @on-click="confirmModalIsVisible = true"
        :disabled="
          !enableUpdateRoomLayout || setOfCheckedId.size === 0 || selectedRoomLayoutId === '-1'
        "
      ></DefaultButtonComponent>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-sm table-hover">
          <thead>
            <tr>
              <th class="text-center">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="checkboxSelectAll"
                    v-model="checked"
                    :indeterminate="indeterminate"
                    @change="onAllChecked($event)"
                  />
                  <label class="custom-control-label" for="checkboxSelectAll"></label>
                </div>
              </th>
              <th class="text-center">ID</th>
              <th class="text-center">Class</th>
              <th class="text-center">Capacity</th>
              <th class="text-center">Instructor</th>
              <th class="text-center">Day of the Week</th>
              <th class="text-center">Starts</th>
              <th class="text-center">Ends</th>
              <th class="text-center">Room Layout</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in filteredClassSchedules"
              v-bind:key="item.id"
              v-bind:index="index"
            >
              <td class="text-center">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    :id="'checkboxSelect' + item.id"
                    v-bind:checked="setOfCheckedId.has(item.id)"
                    @change="onItemChecked(item.id, $event)"
                  />
                  <label class="custom-control-label" :for="'checkboxSelect' + item.id"></label>
                </div>
              </td>
              <td class="text-center">{{ item.id }}</td>
              <td class="text-center">{{ item.type }}</td>
              <td class="text-center">{{ item.capacity }}</td>
              <td class="text-center">{{ item.instructorName }}</td>
              <td class="text-center">{{ item.dayOfWeek }}</td>
              <td class="text-center">
                {{ dayjs(item.startWithNoTimeZone).format('DD/MM/YYYY h:mm A') }}
              </td>
              <td class="text-center">
                {{ dayjs(item.endWithNoTimeZone).format('DD/MM/YYYY h:mm A') }}
              </td>
              <td class="text-center">{{ item?.roomLayout?.name }}</td>
            </tr>
            <tr v-if="!isLoading && filteredClassSchedules?.length === 0">
              <td colspan="9" class="text-center">
                <p>
                  {{
                    'NO DATA AVAILABLE IN TABLE' +
                    (capacityFilterSelected || typeFilterSelected
                      ? ' WITHIN THE FILTERED RANGE'
                      : '')
                  }}
                </p>
              </td>
            </tr>
            <tr v-if="isLoading">
              <td colspan="9" class="text-center">LOADING...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Confirm Modal -->
  <ModalComponent
    v-if="confirmModalIsVisible"
    title="CONFIRM"
    message="ARE YOU SURE YOU WANT TO PROCEED?"
    cancel-text="No"
    ok-text="Yes"
    :ok-loading="isSaving"
    :cancel-disabled="isSaving"
    @on-cancel="confirmModalIsVisible = false"
    @on-ok="onClickConfirm()"
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

  <!-- SUCCESS Modal -->
  <ModalComponent
    title="SUCCESS"
    message="THE CLASS SCHEDULES HAVE BEEN UPDATED SUCCESSFULLY"
    :closable="false"
    @on-ok="successModalIsVisible = false"
    v-if="successModalIsVisible"
    :cancel-text="null"
  >
  </ModalComponent>
</template>

<style scoped>
.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::before {
  background-color: #ff7f61 !important;
  border-color: #ff7f61 !important;
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #ff7f61 !important;
  border-color: #ff7f61 !important;
}

.custom-checkbox .custom-control-input:checked:focus ~ .custom-control-label::before {
  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem #ff7f61;
  border-color: #ff7f61 !important;
}

.custom-checkbox .custom-control-input:focus ~ .custom-control-label::before {
  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 0, 0, 0.25);
  border-color: #ff7f61 !important;
}

.custom-checkbox .custom-control-input:active ~ .custom-control-label::before {
  background-color: #ffc6b9;
  border-color: #ff7f61 !important;
}
</style>
