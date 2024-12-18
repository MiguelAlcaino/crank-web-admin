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
  isFirstTimeWithThisInstructor: boolean
  isTodayUserBirthday: boolean
  isUserLeaderboardEnabled: boolean
  bookedViaClassPass: boolean
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
  <!-- none || assignUserToSpot -->
  <div v-else>
    <div
      v-if="isBooked"
      @click="spotSelectionIsDisabled ? null : selectSpot()"
      :class="[
        'baseSpot',
        spotSelectionIsDisabled ? 'spotEnabledNotClickable' : 'enabledSpot',
        selected ? 'selectedSpot' : '',
        isBookedForFree && !selected ? 'isBookedForFree' : '',
        isFirstTimeInThisTypeOfClass && !selected ? 'isFirstTimeInThisTypeOfClass' : '',
        isFirstTimeWithThisInstructor && !selected ? 'isFirstTimeWithThisInstructor' : '',
        hasStats === false && !selected ? 'isSpotWithoutStats' : ''
      ]"
    >
      {{ spotNumber + (isCheckedIn === true ? '✓' : '') }}
      <br />
      {{ user?.firstName }} {{ user?.lastName }}

      <span
        class="badge top-left"
        style="background-color: red; color: white"
        v-if="isUserLeaderboardEnabled"
        >L</span
      >
      <span
        class="badge top-right"
        style="background-color: green; color: white"
        v-if="isTodayUserBirthday"
        >B</span
      >
      <span
        class="badge bottom-left"
        style="background-color: #ff00ff; color: white"
        v-if="bookedViaClassPass"
        >C</span
      >
    </div>
    <div
      v-else-if="enabled"
      :class="[
        'baseSpot',
        spotSelectionIsDisabled ? 'spotEnabledNotClickable' : 'enabledSpot',
        selected ? 'selectedSpot' : '',
        isSpotWithOnlyStats && !selected ? 'isSpotWithOnlyStats' : '',
        isSpotWithOnlyStats && selected ? 'isSpotWithOnlyStatsSelected' : ''
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
  height: 80px;
  width: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-weight: bold;
  font-size: 9px;
  border: 2px #000000 solid;
  position: relative;
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
  background-color: #ffd903;
}

.isBookedForFreeSelected {
  background-color: #ffd903;
}

.isSpotWithOnlyStats {
  border: 2px solid #8a00e7 !important;
}

.isSpotWithOnlyStatsSelected {
  border: 2px dashed #8a00e7 !important;
}

.isSpotWithoutStats {
  border: 2px solid #ff7e62 !important;
}

.isFirstTimeInThisTypeOfClass {
  border: 2px solid #00b9ff !important;
}

.isFirstTimeWithThisInstructor {
  box-shadow: 0 0 0 2px #add8e6;
}

.baseSpot .top-right {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 9px;
  margin: 3px;
}

.baseSpot .top-left {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 9px;
  margin: 3px;
}

.baseSpot .bottom-left {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 9px;
  margin: 3px;
}
</style>
