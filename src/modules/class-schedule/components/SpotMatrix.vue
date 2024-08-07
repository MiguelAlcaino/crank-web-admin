<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Popper from 'vue3-popper'

import IconPositionNotBookable from '@/modules/class-schedule/components/icons/IconPositionNotBookable.vue'
import BookableSpotPosition from '@/modules/class-schedule/components/BookableSpotPosition.vue'
import UserProfile from '@/modules/class-schedule/components/UserProfile.vue'
import CheckInCheckOutUserInClass from '@/modules/class-schedule/components/CheckInCheckOutUserInClass.vue'

import type { EnrollmentStatusEnum, SpotActionEnum } from '../interfaces'
import { PositionIconEnum } from '@/modules/shared/interfaces'

import { useClassSchedule } from '../composables/useClassSchedule'

const { spotsTableModeEnabled, toggleSpotsMode } = useClassSchedule()

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
  showUserInSpots?: boolean
  selectedSpotNumber?: number | null
  enrollments?: EnrollmentInfo[] | null
  spotNumberBookedByCurrentUser?: number | null
  spotAction?: SpotActionEnum
  spotSelectionIsDisabled?: boolean
  orphanedClassStatsSpots: number[]
  editCustomerProfileUrl?: string | null
  userCanCheckInCheckOut: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showUserInSpots: false,
  spotSelectionIsDisabled: false
})

const emits = defineEmits<{
  (e: 'clickSpot', event: BookableSpotClickedEvent): void
  (e: 'afterCheckInOut'): void
}>()

const spotsTable = ref<Array<Array<SpotPosition>>>([])

onMounted(() => {
  if (props.matrix) {
    spotsTable.value = getMatrixOfSpotPositions(props.matrix)
  }
})

watch(
  () => props.matrix,
  (matrix) => {
    spotsTable.value = getMatrixOfSpotPositions(matrix!)
  }
)

watch(
  () => props.enrollments,
  () => {
    spotsTable.value = getMatrixOfSpotPositions(props.matrix!)
  }
)

function newSpotPosition(
  classPosition: ClassPosition,
  user: User | null | undefined,
  isCheckedIn: boolean,
  isBookedForFree: boolean,
  hasStats?: boolean | null
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
      hasStats: hasStats
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

        if (classPosition.icon === PositionIconEnum.Spot) {
          if (classPosition.spotNumber && props.enrollments) {
            for (let index = 0; index < props.enrollments.length; index++) {
              const enrollment = props.enrollments[index]

              if (enrollment.spotNumber === classPosition.spotNumber) {
                isCheckedIn = enrollment.isCheckedIn ?? false
                isBookedForFree = enrollment.isBookedForFree ?? false
                hasStats = enrollment.hasStats
                user = enrollment.identifiableSiteUser?.identifiableUser?.user
                break
              }
            }
          }
        }

        rows[i].push(newSpotPosition(classPosition, user, isCheckedIn, isBookedForFree, hasStats))
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
          @click="toggleSpotsMode"
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Spot</th>
              <th>Sign in</th>
              <th>View Profile</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in enrollments" :key="item.id">
              <td>{{ item.identifiableSiteUser?.identifiableUser?.user?.firstName }}</td>
              <td>{{ item.identifiableSiteUser?.identifiableUser?.user?.lastName }}</td>
              <td class="text-center">{{ item.spotNumber }}</td>
              <td class="text-center">
                <CheckInCheckOutUserInClass
                  v-if="item.id != null && item.isCheckedIn != null"
                  :enrollment-id="item.id"
                  :is-checked-in="item.isCheckedIn"
                  @after-check-in-check-out="emits('afterCheckInOut')"
                  :disabled="false"
                ></CheckInCheckOutUserInClass>
              </td>
              <td class="center-content">
                <UserProfile
                  v-if="item.identifiableSiteUser?.identifiableUser?.id"
                  :user-id="item.identifiableSiteUser?.identifiableUser?.id"
                  :edit-customer-profile-url="editCustomerProfileUrl"
                ></UserProfile>
              </td>
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
