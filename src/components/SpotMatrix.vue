<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import IconPositionNotBookable from '@/components/icons/IconPositionNotBookable.vue'
import AdminBookableSpotPosition from '@/components/AdminBookableSpotPosition.vue'

enum PositionIconEnum {
  Empty = 'empty',
  Fan = 'fan',
  Instructor = 'instructor',
  Speaker = 'speaker',
  Spot = 'spot',
  Tv = 'tv'
}

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
}

interface IdentifiableSiteUser {
  id: string
  identifiableUser: IdentifiableUser
}

interface IdentifiableUser {
  id?: string
  user?: User
}

enum EnrollmentStatusEnum {
  Active = 'active',
  Cancelled = 'cancelled',
  LateCancelled = 'lateCancelled',
  Unknown = 'unknown',
  Waitlisted = 'waitlisted'
}

enum SpotActionEnum {
  none,
  asignUserToSpot,
  changeMemberSpot,
  swapSpot
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
}

const props = withDefaults(defineProps<Props>(), {
  showUserInSpots: false,
  spotSelectionIsDisabled: false
})

const emits = defineEmits<{
  (e: 'clickSpot', event: BookableSpotClickedEvent): void
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
  isBookedForFree: boolean
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
      isSpotWithOnlyStats: props.orphanedClassStatsSpots.includes(classPosition.spotNumber!)
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

        if (classPosition.icon === PositionIconEnum.Spot) {
          if (classPosition.spotNumber && props.enrollments) {
            for (let index = 0; index < props.enrollments.length; index++) {
              const enrollment = props.enrollments[index]

              if (enrollment.spotNumber === classPosition.spotNumber) {
                isCheckedIn = enrollment.isCheckedIn ?? false
                isBookedForFree = enrollment.isBookedForFree ?? false

                user = enrollment.identifiableSiteUser?.identifiableUser?.user
                break
              }
            }
          }
        }

        rows[i].push(newSpotPosition(classPosition, user, isCheckedIn, isBookedForFree))
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
  <div class="table-responsive">
    <table class="table table-sm table-borderless" style="margin: 0 auto; margin-bottom: 35px">
      <tbody>
        <tr v-for="(colRow, rowKey) in spotsTable" :key="rowKey" class="text-center">
          <td class="class-position" v-for="(spot, columnKey) in colRow" :key="columnKey">
            <admin-bookable-spot-position
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
            />
            <icon-position-not-bookable v-else :icon="spot.icon" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
td.class-position {
  padding: 5px;
}

.table {
  width: 15%;
}
</style>
