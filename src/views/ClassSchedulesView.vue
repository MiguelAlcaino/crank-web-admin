<script lang="ts">
interface ClassSchedule {
  id: number
  mbId: string
  class: string
  instructor: string
  dayOfTheWeek: string
  starts: string
  ends: string
  roomLayout: string
  maxCapacity: number
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)
const checked = ref(false)
const indeterminate = ref(false)
const setOfCheckedId = ref<Set<number>>(new Set())

const enableUpdateRoomLayout = ref(false)

const classSchedules = ref<ClassSchedule[]>([
  {
    id: 343,
    mbId: '1',
    class: 'Ride',
    instructor: 'Miguel teacher',
    dayOfTheWeek: 'Sunday',
    starts: '2023-11-24 10:00:00',
    ends: '2024-11-24 10:45:00',
    roomLayout: '2 spots layout',
    maxCapacity: 2
  },
  {
    id: 344,
    mbId: '2',
    class: 'Shape',
    instructor: 'Miguel teacher',
    dayOfTheWeek: 'Sunday',
    starts: '2023-11-24 10:00:00',
    ends: '2024-11-24 10:45:00',
    roomLayout: '2 spots layout',
    maxCapacity: 2
  },
  {
    id: 345,
    mbId: '3',
    class: 'Ride',
    instructor: 'Miguel teacher',
    dayOfTheWeek: 'Sunday',
    starts: '2023-11-24 10:00:00',
    ends: '2024-11-24 10:45:00',
    roomLayout: '2 spots layout',
    maxCapacity: 2
  },
  {
    id: 346,
    mbId: '4',
    class: 'Ride',
    instructor: 'Miguel teacher',
    dayOfTheWeek: 'Sunday',
    starts: '2023-11-24 10:00:00',
    ends: '2024-11-24 10:45:00',
    roomLayout: '2 spots layout',
    maxCapacity: 3
  },
  {
    id: 347,
    mbId: '5',
    class: 'Ride',
    instructor: 'Miguel teacher',
    dayOfTheWeek: 'Sunday',
    starts: '2023-11-24 10:00:00',
    ends: '2024-11-24 10:45:00',
    roomLayout: '2 spots layout',
    maxCapacity: 2
  },
  {
    id: 348,
    mbId: '6',
    class: 'Ride',
    instructor: 'Miguel teacher',
    dayOfTheWeek: 'Sunday',
    starts: '2023-11-24 10:00:00',
    ends: '2024-11-24 10:45:00',
    roomLayout: '2 spots layout',
    maxCapacity: 2
  },
  {
    id: 349,
    mbId: '7',
    class: 'Ride',
    instructor: 'Miguel teacher',
    dayOfTheWeek: 'Sunday',
    starts: '2023-11-24 10:00:00',
    ends: '2024-11-24 10:45:00',
    roomLayout: '2 spots layout',
    maxCapacity: 2
  }
])

function updateCheckedSet(id: number, checked: boolean): void {
  if (checked) {
    setOfCheckedId.value.add(id)
  } else {
    setOfCheckedId.value.delete(id)
  }
}

function refreshCheckedStatus(): void {
  const listOfEnabledData = classSchedules.value

  checked.value = listOfEnabledData.every(({ id }) => setOfCheckedId.value.has(id))

  indeterminate.value =
    listOfEnabledData.some(({ id }) => setOfCheckedId.value.has(id)) && !checked.value

  refreshEnableUpdateRoomLayout()
}

function onItemChecked(id: number, event: Event): void {
  const checked = (event.target as any).checked as boolean

  updateCheckedSet(id, checked)
  refreshCheckedStatus()
}

function onAllChecked(event: Event): void {
  const checked = (event.target as any).checked as boolean

  classSchedules.value.forEach(({ id }) => updateCheckedSet(id, checked))

  refreshCheckedStatus()
}

function refreshEnableUpdateRoomLayout(): void {
  var maxCapacity = classSchedules.value
    .filter((item) => setOfCheckedId.value.has(item.id))
    .map((item) => item.maxCapacity)

  enableUpdateRoomLayout.value = maxCapacity.every((val, i, arr) => val === arr[0])
}
</script>

<template>
  <div class="row">
    <div class="col-12">
      <table class="table">
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
            <th class="text-center">MB Id</th>
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
          <tr v-for="(item, index) in classSchedules" v-bind:key="item.id" v-bind:index="index">
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
            <td class="text-center">{{ item.mbId }}</td>
            <td class="text-center">{{ item.class }}</td>
            <td class="text-center">{{ item.maxCapacity }}</td>
            <td class="text-center">{{ item.instructor }}</td>
            <td class="text-center">{{ item.dayOfTheWeek }}</td>
            <td class="text-center">{{ item.starts }}</td>
            <td class="text-center">{{ item.ends }}</td>
            <td class="text-center">{{ item.roomLayout }}</td>
          </tr>
          <tr v-if="!isLoading && classSchedules?.length === 0">
            <td colspan="9" class="text-center">
              <p>NO DATA AVAILABLE IN TABLE</p>
            </td>
          </tr>
          <tr v-if="isLoading">
            <td colspan="9" class="text-center">loading...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  {{ setOfCheckedId }}
  {{ enableUpdateRoomLayout }}
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
