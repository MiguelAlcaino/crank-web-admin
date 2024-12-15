<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import Popper from 'vue3-popper'
import IconPositionNotBookable from '@/modules/class-schedule/components/icons/IconPositionNotBookable.vue'
import BookableSpotPosition from '@/modules/class-schedule/components/BookableSpotPosition.vue'
import ViewUserProfileButton from '@/modules/class-schedule/components/ViewUserProfileButton.vue'
import CheckInCheckOutUserInClass from '@/modules/class-schedule/components/CheckInCheckOutUserInClass.vue'
import BadgeStateIndicator from '@/modules/class-schedule/components/BadgeStateIndicator.vue'

import type { EnrollmentStatusEnum, SpotActionEnum } from '../interfaces'
import { PositionIconEnum } from '@/modules/shared/interfaces'

import { useClassOptionsWithMatrix } from '../composables/useClassOptionsWithMatrix'
const { spotsTableModeEnabled, toggleSpotsMode } = useClassOptionsWithMatrix()

interface SpotPosition {
  x: number
  y: number
  icon: PositionIconEnum
  user?: User | null
  enabled?: boolean
  isCheckedIn?: boolean
  spotNumber?: number | null
  isBookedForFree?: boolean | null
  isSpotWithOnlyStats?: boolean
  hasStats?: boolean | null
  isFirstTimeInThisTypeOfClass?: boolean
  isFirstTimeWithThisInstructor?: boolean
  isTodayUserBirthday?: boolean
  isUserLeaderboardEnabled?: boolean
  bookedViaClassPass?: boolean
}

interface ClassPosition {
  x: number
  y: number
  icon: PositionIconEnum
  spotNumber?: number | null
  enabled?: boolean | null
}

interface BookableSpotClickedEvent {
  spotNumber: number | null
  isBooked: boolean
}

interface User {
  firstName: string
  lastName: string
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
  isFirstTimeInThisTypeOfClass: boolean
  isFirstTimeWithThisInstructor: boolean
  isTodayUserBirthday: boolean
  isUserLeaderboardEnabled: boolean
  bookedViaClassPass: boolean
}

interface IdentifiableSiteUser {
  id: string
  identifiableUser: IdentifiableUser
}

interface IdentifiableUser {
  id?: string
  user?: User
}

interface Props {
  matrix?: ClassPosition[]
  selectedSpotNumber?: number | null
  enrollments: EnrollmentInfo[]
  spotNumberBookedByCurrentUser?: number | null
  spotAction?: SpotActionEnum
  spotSelectionIsDisabled?: boolean
  orphanedClassStatsSpots: number[]
  editCustomerProfileUrl?: string | null
  userCanCheckInCheckOut: boolean
}

const props = withDefaults(defineProps<Props>(), {
  spotSelectionIsDisabled: false
})

const emits = defineEmits<{
  (e: 'clickSpot', event: BookableSpotClickedEvent): void
  (e: 'afterToggleSpotsMode'): void
}>()

const spotsTable = ref<Array<Array<SpotPosition>>>([])
const sortKey = ref<keyof User>('firstName')
const sortOrder = ref<'asc' | 'desc'>('asc')

onMounted(() => {
  if (props.matrix) {
    spotsTable.value = getMatrixOfSpotPositions(props.matrix)
  }
})

watch(
  () => props.matrix,
  (matrix) => {
    spotsTable.value = getMatrixOfSpotPositions(matrix!)
  },
  {
    deep: true
  }
)

watch(
  () => props.enrollments,
  () => {
    spotsTable.value = getMatrixOfSpotPositions(props.matrix!)
    sortKey.value = 'firstName'
    sortOrder.value = 'asc'
  },
  {
    deep: true
  }
)

const sortedEnrollments = computed(() => {
  return [...props.enrollments].sort((a, b) => {
    const aValue = a.identifiableSiteUser?.identifiableUser?.user?.[sortKey.value] || ''
    const bValue = b.identifiableSiteUser?.identifiableUser?.user?.[sortKey.value] || ''
    if (sortOrder.value === 'asc') {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })
})

function newSpotPosition(
  classPosition: ClassPosition,
  user: User | null | undefined,
  isCheckedIn: boolean,
  isBookedForFree: boolean,
  hasStats?: boolean | null,
  isFirstTimeInThisTypeOfClass?: boolean,
  isFirstTimeWithThisInstructor?: boolean,
  isTodayUserBirthday?: boolean,
  isUserLeaderboardEnabled?: boolean,
  bookedViaClassPass?: boolean
): SpotPosition {
  if (classPosition.icon === PositionIconEnum.Spot) {
    return {
      x: classPosition.x,
      y: classPosition.y,
      icon: classPosition.icon,
      spotNumber: classPosition.spotNumber,
      user: user,
      enabled: classPosition.enabled!,
      isCheckedIn: isCheckedIn,
      isBookedForFree: isBookedForFree,
      isSpotWithOnlyStats: props.orphanedClassStatsSpots.includes(classPosition.spotNumber!),
      hasStats: hasStats,
      isFirstTimeInThisTypeOfClass: isFirstTimeInThisTypeOfClass,
      isFirstTimeWithThisInstructor: isFirstTimeWithThisInstructor,
      isTodayUserBirthday: isTodayUserBirthday,
      isUserLeaderboardEnabled: isUserLeaderboardEnabled,
      bookedViaClassPass: bookedViaClassPass
    }
  }
  return {
    x: classPosition.x,
    y: classPosition.y,
    icon: classPosition.icon
  }
}

function getMatrixOfSpotPositions(matrix: ClassPosition[]): SpotPosition[][] {
  let rows: Array<Array<SpotPosition>> = []
  let classPosition: ClassPosition
  let user: User | null | undefined
  let isCheckedIn: boolean
  let isBookedForFree: boolean
  let hasStats: boolean | null | undefined
  let isFirstTimeInThisTypeOfClass: boolean
  let isFirstTimeWithThisInstructor: boolean
  let isTodayUserBirthday: boolean
  let isUserLeaderboardEnabled: boolean
  let bookedViaClassPass: boolean

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      classPosition = matrix[j]
      if (matrix[j].y === i) {
        if (rows[classPosition.y] === undefined) {
          rows.push([])
        }

        user = null
        isCheckedIn = false
        isBookedForFree = false
        hasStats = null
        isFirstTimeInThisTypeOfClass = false
        isFirstTimeWithThisInstructor = false
        isTodayUserBirthday = false
        isUserLeaderboardEnabled = false
        bookedViaClassPass = false

        if (classPosition.icon === PositionIconEnum.Spot) {
          if (classPosition.spotNumber && props.enrollments) {
            for (let index = 0; index < props.enrollments.length; index++) {
              const enrollment = props.enrollments[index]

              if (enrollment.spotNumber === classPosition.spotNumber) {
                isCheckedIn = enrollment.isCheckedIn ?? false
                isBookedForFree = enrollment.isBookedForFree ?? false
                hasStats = enrollment.hasStats
                user = enrollment.identifiableSiteUser?.identifiableUser?.user
                isFirstTimeInThisTypeOfClass = enrollment.isFirstTimeInThisTypeOfClass
                isFirstTimeWithThisInstructor = enrollment.isFirstTimeWithThisInstructor
                isTodayUserBirthday = enrollment.isTodayUserBirthday
                isUserLeaderboardEnabled = enrollment.isUserLeaderboardEnabled
                bookedViaClassPass = enrollment.bookedViaClassPass
                break
              }
            }
          }
        }

        rows[i].push(
          newSpotPosition(
            classPosition,
            user,
            isCheckedIn,
            isBookedForFree,
            hasStats,
            isFirstTimeInThisTypeOfClass,
            isFirstTimeWithThisInstructor,
            isTodayUserBirthday,
            isUserLeaderboardEnabled,
            bookedViaClassPass
          )
        )
      }
    }
  }

  let sortedRows: Array<Array<SpotPosition>> = []
  for (let i = 0; i < rows.length; i++) {
    sortedRows.push(
      rows[i].sort((n1: SpotPosition, n2: SpotPosition) => {
        if (n1.x > n2.x) {
          return 1
        }

        if (n1.x < n2.x) {
          return -1
        }

        return 0
      })
    )
  }

  return sortedRows
}

function onClickSpotAdmin(spotNumber: number) {
  emits('clickSpot', {
    spotNumber: spotNumber
  } as BookableSpotClickedEvent)
}

function toggleSpotsModeView() {
  toggleSpotsMode()
  emits('afterToggleSpotsMode')
}

const sortBy = (key: keyof User) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}
</script>

<template>
  <div class="row">
    <div class="col-12 text-right">
      <Popper
        :hover="true"
        :arrow="true"
        :content="spotsTableModeEnabled ? 'Show matrix view' : 'Show table view'"
        class="popper-dark"
      >
        <i
          :class="['bi', spotsTableModeEnabled ? 'bi-diagram-3' : 'bi-card-checklist']"
          style="cursor: pointer; font-size: 24px"
          @click="toggleSpotsModeView"
        ></i>
      </Popper>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="table-responsive">
        <!-- matrix -->
        <table
          v-if="!spotsTableModeEnabled"
          class="table table-sm table-borderless table-spot"
          style="margin: 0 auto; margin-bottom: 35px"
        >
          <tbody>
            <tr v-for="(colRow, rowKey) in spotsTable" :key="rowKey" class="text-center">
              <td class="class-position" v-for="(spot, columnKey) in colRow" :key="columnKey">
                <BookableSpotPosition
                  v-if="spot.icon === PositionIconEnum.Spot"
                  :spot-number="spot.spotNumber ?? 0"
                  :is-booked="spot.user ? true : false"
                  :user="spot.user!"
                  :enabled="spot.enabled!"
                  @click-spot="onClickSpotAdmin"
                  :selected="props.selectedSpotNumber === spot?.spotNumber"
                  :is-checked-in="spot.isCheckedIn"
                  :spot-action="spotAction"
                  :spot-selection-is-disabled="spotSelectionIsDisabled"
                  :is-booked-for-free="spot.isBookedForFree"
                  :is-spot-with-only-stats="spot.isSpotWithOnlyStats ?? false"
                  :has-stats="spot.hasStats"
                  :isFirstTimeInThisTypeOfClass="spot.isFirstTimeInThisTypeOfClass ?? false"
                  :isFirstTimeWithThisInstructor="spot.isFirstTimeWithThisInstructor ?? false"
                  :isTodayUserBirthday="spot.isTodayUserBirthday ?? false"
                  :isUserLeaderboardEnabled="spot.isUserLeaderboardEnabled ?? false"
                  :bookedViaClassPass="spot.bookedViaClassPass ?? false"
                />
                <icon-position-not-bookable v-else :icon="spot.icon" />
              </td>
            </tr>
          </tbody>
        </table>
        <!-- table -->
        <table class="table" v-else>
          <thead>
            <tr class="text-center">
              <th @click="sortBy('firstName')" style="cursor: pointer">
                First Name
                <span v-if="sortKey === 'firstName'">
                  <i
                    :class="sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'"
                  ></i>
                </span>
              </th>
              <th @click="sortBy('lastName')" style="cursor: pointer">
                Last Name
                <span v-if="sortKey === 'lastName'">
                  <i
                    :class="sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'"
                  ></i>
                </span>
              </th>
              <th>Spot</th>
              <th>Sign in</th>
              <th>View Profile</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedEnrollments" :key="item.id">
              <td>{{ item.identifiableSiteUser?.identifiableUser?.user?.firstName }}</td>
              <td>{{ item.identifiableSiteUser?.identifiableUser?.user?.lastName }}</td>
              <td class="text-center">{{ item.spotNumber }}</td>
              <td class="text-center">
                <CheckInCheckOutUserInClass
                  v-if="item.id != null && item.isCheckedIn != null"
                  :enrollment-id="item.id"
                  :is-checked-in="item.isCheckedIn"
                  :disabled="false"
                ></CheckInCheckOutUserInClass>
              </td>
              <td class="center-content">
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
                <BadgeStateIndicator
                  type="bookedViaClassPass"
                  v-if="item.bookedViaClassPass"
                ></BadgeStateIndicator>
              </td>
            </tr>
            <tr v-if="sortedEnrollments.length === 0">
              <td colspan="6" class="text-center">There are no users enrolled in this class</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
td.class-position {
  padding: 5px;
}

.table-spot {
  width: 15%;
}

.popper-dark {
  --popper-theme-background-color: #333333;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: white;
  --popper-theme-border-width: 0px;
  --popper-theme-border-radius: 2px;
  --popper-theme-padding: 4px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
