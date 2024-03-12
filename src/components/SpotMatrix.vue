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
  positionType: string
  icon: PositionIconEnum
  spotInfo?: SpotInfo
  user?: User | null
  enabled?: boolean
  isCheckedIn?: boolean
}

interface ClassPositionInterface {
  __typename?: string
  x: number
  y: number
  icon: PositionIconEnum
}

interface BookableSpotClickedEvent {
  spotNumber: number | null
  isBooked: boolean
}

interface SpotInfo {
  isBooked: boolean
  spotNumber: number
}

interface User {
  firstName: string
  lastName: string
}

interface BookableSpot extends ClassPositionInterface {
  spotInfo: SpotInfo
  enabled: boolean
}

interface IconPosition extends ClassPositionInterface {}

interface EnrollmentInfo {
  identifiableUser?: IdentifiableUser | null
  enrollmentDateTime: Date
  enrollmentStatus: EnrollmentStatusEnum
  id: string
  isCheckedIn?: boolean
  spotInfo?: SpotInfo | null
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
  matrix?: Array<BookableSpot | IconPosition>
  showUserInSpots?: boolean
  selectedSpotNumber?: number | null
  enrollments?: EnrollmentInfo[] | null
  spotNumberBookedByCurrentUser?: number | null
  spotAction?: SpotActionEnum
  spotSelectionIsDisabled?: boolean
}

const BOOKABLE_SPOT_KEY = 'BookableSpot'
const ICON_POSITION_KEY = 'IconPosition'

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
  classPosition: BookableSpot | IconPosition,
  user: User | null | undefined,
  isCheckedIn?: boolean
): SpotPosition {
  if ('spotInfo' in classPosition) {
    return {
      x: classPosition.x,
      y: classPosition.y,
      positionType: BOOKABLE_SPOT_KEY,
      icon: classPosition.icon,
      spotInfo: classPosition.spotInfo,
      user: user,
      enabled: classPosition.enabled,
      isCheckedIn: isCheckedIn
    }
  }
  return {
    x: classPosition.x,
    y: classPosition.y,
    positionType: ICON_POSITION_KEY,
    icon: classPosition.icon
  }
}

function getMatrixOfSpotPositions(matrix: Array<BookableSpot | IconPosition>): SpotPosition[][] {
  let rows: Array<Array<SpotPosition>> = []
  let classPosition: BookableSpot | IconPosition
  let user: User | null | undefined
  let isCheckedIn: boolean | undefined

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      classPosition = matrix[j]
      if (matrix[j].y === i) {
        if (rows[classPosition.y] === undefined) {
          rows.push([])
        }

        user = null
        isCheckedIn = false

        if ('spotInfo' in classPosition) {
          let spotInfo = classPosition.spotInfo as SpotInfo
          if (spotInfo.spotNumber && props.enrollments) {
            for (let index = 0; index < props.enrollments.length; index++) {
              const enrollment = props.enrollments[index]

              if (enrollment.spotInfo?.spotNumber === spotInfo.spotNumber) {
                isCheckedIn = enrollment.isCheckedIn

                user = enrollment.identifiableUser?.user
                break
              }
            }
          }
        }

        rows[i].push(newSpotPosition(classPosition, user, isCheckedIn))
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
  <div>
    <table class="table table-sm table-borderless" style="margin: 0 auto; margin-bottom: 35px">
      <tbody>
        <tr v-for="(colRow, rowKey) in spotsTable" :key="rowKey" class="text-center">
          <td class="class-position" v-for="(spot, columnKey) in colRow" :key="columnKey">
            <admin-bookable-spot-position
              v-if="spot.positionType === BOOKABLE_SPOT_KEY"
              :spot-number="spot.spotInfo?.spotNumber ?? 0"
              :is-booked="spot.spotInfo?.isBooked ?? false"
              :user="spot.user!"
              :enabled="spot.enabled!"
              @click-spot="onClickSpotAdmin"
              :selected="props.selectedSpotNumber === spot?.spotInfo?.spotNumber"
              :is-checked-in="spot.isCheckedIn"
              :spot-action="spotAction"
              :spot-selection-is-disabled="spotSelectionIsDisabled"
            />
            <icon-position-not-bookable
              v-else-if="spot.positionType === ICON_POSITION_KEY"
              :icon="spot.icon"
            />
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
