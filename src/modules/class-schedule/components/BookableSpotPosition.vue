<script lang="ts">
interface User {
  firstName: string
  lastName: string
}

interface Props {
  spotNumber: number
  isBooked: boolean
  user: User | null
  enabled: boolean
  selected: boolean
  isCheckedIn?: boolean
  spotAction?: SpotActionEnum
  spotSelectionIsDisabled?: boolean
  isBookedForFree?: boolean | null
  isSpotWithOnlyStats: boolean
  hasStats?: boolean | null
  isFirstTimeInThisTypeOfClass: boolean
}
</script>

<script setup lang="ts">
import { SpotActionEnum } from '../interfaces'

const props = withDefaults(defineProps<Props>(), {
  spotSelectionIsDisabled: false
})

const emits = defineEmits<{
  (e: 'clickSpot', spotNumber: number): void
}>()

function selectSpot() {
  emits('clickSpot', props.spotNumber)
}
</script>

<template>
  <!-- changeMemberSpot -->
  <div v-if="spotAction === SpotActionEnum.changeMemberSpot">
    <div
      v-if="isBooked"
      :class="['baseSpot', 'changeMemberSpot-bookedSpot', selected ? 'selectedSpot' : '']"
    >
      {{ spotNumber + (isCheckedIn === true ? '✓' : '') }}
      <br />
      {{ user?.firstName }} {{ user?.lastName }}
    </div>
    <div
      v-else-if="enabled"
      :class="['baseSpot', 'changeMemberSpot-spotAvailable']"
      @click="spotSelectionIsDisabled ? null : selectSpot()"
    >
      {{ spotNumber }}
    </div>
    <div v-else :class="['baseSpot', 'changeMemberSpot-disabledSpot']">
      {{ spotNumber }}
    </div>
  </div>
  <!-- swapSpot -->
  <div v-else-if="spotAction === SpotActionEnum.swapSpot">
    <div
      v-if="isBooked"
      @click="selected ? null : spotSelectionIsDisabled ? null : selectSpot()"
      :class="[
        'baseSpot',
        'changeMemberSpot-bookedSpot',
        selected ? 'selectedSpot' : 'swapMemberSpot-bookedSpot'
      ]"
    >
      {{ spotNumber + (isCheckedIn === true ? '✓' : '') }}
      <br />
      {{ user?.firstName }} {{ user?.lastName }}
    </div>
    <div v-else-if="enabled" :class="['baseSpot', 'empty-spot-not-selectable']">
      {{ spotNumber }}
    </div>
    <div v-else :class="['baseSpot', 'changeMemberSpot-disabledSpot']">
      {{ spotNumber }}
    </div>
  </div>
  <!-- none || asignUserToSpot -->
  <div v-else>
    <div
      v-if="isBooked"
      @click="spotSelectionIsDisabled ? null : selectSpot()"
      :class="[
        'baseSpot',
        spotSelectionIsDisabled ? 'spotEnabledNotClickable' : 'enabledSpot',
        selected ? 'selectedSpot' : '',
        isBookedForFree && !selected ? 'isBookedForFree' : '',
        hasStats === false && !selected ? 'isSpotWithouttats' : '',
        isFirstTimeInThisTypeOfClass && !selected ? 'isFirstTimeInThisTypeOfClass' : ''
      ]"
    >
      {{ spotNumber + (isCheckedIn === true ? '✓' : '') }}
      <br />
      {{ user?.firstName }} {{ user?.lastName }}
    </div>
    <div
      v-else-if="enabled"
      :class="[
        'baseSpot',
        spotSelectionIsDisabled ? 'spotEnabledNotClickable' : 'enabledSpot',
        selected ? 'selectedSpot' : '',
        isSpotWithOnlyStats && !selected ? 'isSpotWithOnlyStats' : '',
        isSpotWithOnlyStats && selected ? 'isSpotWithOnlyStatsSelected' : '',
        hasStats === false && !selected ? 'isSpotWithouttats' : '',
        hasStats === false && selected ? 'isSpotWithoutStatsSelected' : ''
      ]"
      @click="spotSelectionIsDisabled ? null : selectSpot()"
    >
      {{ spotNumber }}
    </div>
    <div
      v-else
      :class="[
        'baseSpot',
        spotSelectionIsDisabled ? 'disabledSpotNotClickable' : 'disabledSpot',
        selected ? 'selectedSpot' : ''
      ]"
      @click="spotSelectionIsDisabled ? null : selectSpot()"
    >
      {{ spotNumber }}
    </div>
  </div>
</template>

<style scoped>
.baseSpot {
  height: 60px;
  width: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-weight: bold;
  font-size: 9px;
  border: 2px #000000 solid;
  /* box-shadow: 0 0 0 3px #ffd903,
    0 0 0 6px #f37676; */
}

.disabledSpot {
  background: #f37676;
  font-weight: 400;
  cursor: pointer;
}

.disabledSpotNotClickable {
  background: #f37676;
  font-weight: 400;
}

.enabledSpot {
  background: #ffffff;
  cursor: pointer;
}

.spotEnabledNotClickable {
  background: #ffffff;
}

.empty-spot-not-selectable {
  background: #ffffff;
}

.selectedSpot {
  border: 2px dashed !important;
}

.changeMemberSpot-spotAvailable {
  background: #ffebcd;
  cursor: pointer;
}

.changeMemberSpot-disabledSpot {
  background: #f37676;
}

.changeMemberSpot-bookedSpot {
  background: #ffffff;
}

.swapMemberSpot-bookedSpot {
  background: #ffffff;
  cursor: pointer;
}

.isBookedForFree {
  border: 2px solid #ffd903 !important;
}

.isBookedForFreeSelected {
  border: 2px dashed #ffd903 !important;
}

.isSpotWithOnlyStats {
  border: 2px solid #8a00e7 !important;
}

.isSpotWithOnlyStatsSelected {
  border: 2px dashed #8a00e7 !important;
}

.isSpotWithouttats {
  border: 2px solid #ff7e62 !important;
}

.isSpotWithoutStatsSelected {
  border: 2px dashed #ff7e62 !important;
}

.isFirstTimeInThisTypeOfClass {
  border: 2px solid #00b9ff !important;
}

.isFirstTimeInAClassSelected {
  border: 2px dashed #00b9ff !important;
}
</style>
