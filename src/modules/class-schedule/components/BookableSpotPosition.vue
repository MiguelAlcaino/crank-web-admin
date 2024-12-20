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
  icon: PositionIconEnum
}
</script>

<script setup lang="ts">
import { PositionIconEnum } from '@/modules/shared/interfaces'
import { SpotActionEnum } from '../interfaces'
import IconBookablePosition from './icons/IconBookablePosition.vue'

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
      <IconBookablePosition :icon="icon" class="type-spot-icon-position"></IconBookablePosition>

      <div class="center-content">
        <div class="center-number">{{ spotNumber + (isCheckedIn === true ? '✓' : '') }}</div>
        <div class="center-name">{{ user?.firstName }} {{ user?.lastName }}</div>
      </div>
    </div>
    <div
      v-else-if="enabled"
      :class="['baseSpot', 'changeMemberSpot-spotAvailable']"
      @click="spotSelectionIsDisabled ? null : selectSpot()"
    >
      <IconBookablePosition :icon="icon" class="type-spot-icon-position"></IconBookablePosition>

      <div class="center-content">
        <div class="center-number">{{ spotNumber }}</div>
      </div>
    </div>
    <div v-else :class="['baseSpot', 'changeMemberSpot-disabledSpot']">
      <IconBookablePosition :icon="icon" class="type-spot-icon-position"></IconBookablePosition>

      <div class="center-content">
        <div class="center-number">{{ spotNumber }}</div>
      </div>
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
      <IconBookablePosition :icon="icon" class="type-spot-icon-position"></IconBookablePosition>

      <div class="center-content">
        <div class="center-number">
          {{ spotNumber + (isCheckedIn === true ? '✓' : '') }}
        </div>
        <div class="center-name">{{ user?.firstName }} {{ user?.lastName }}</div>
      </div>
    </div>
    <div v-else-if="enabled" :class="['baseSpot', 'empty-spot-not-selectable']">
      <IconBookablePosition :icon="icon" class="type-spot-icon-position"></IconBookablePosition>

      <div class="center-content">
        <div class="center-number">{{ spotNumber }}</div>
      </div>
    </div>
    <div v-else :class="['baseSpot', 'changeMemberSpot-disabledSpot']">
      <IconBookablePosition :icon="icon" class="type-spot-icon-position"></IconBookablePosition>

      <div class="center-content">
        <div class="center-number">{{ spotNumber }}</div>
      </div>
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
      <IconBookablePosition :icon="icon" class="type-spot-icon-position"></IconBookablePosition>

      <div class="center-content">
        <div class="center-number">{{ spotNumber + (isCheckedIn === true ? '✓' : '') }}</div>
        <div class="center-name">{{ user?.firstName }} {{ user?.lastName }}</div>
      </div>

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
      <IconBookablePosition :icon="icon" class="type-spot-icon-position"></IconBookablePosition>

      <div class="center-content">
        <div class="center-number">{{ spotNumber }}</div>
      </div>
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
      <IconBookablePosition :icon="icon" class="type-spot-icon-position"></IconBookablePosition>

      <div class="center-content">
        <div class="center-number">{{ spotNumber }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.baseSpot {
  height: 90px;
  width: 90px;
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

.center-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.center-number {
  font-size: 10px;
  font-weight: bold;
}

.center-name {
  font-size: 8px;
  font-weight: bold;
  margin-top: 2px;
}

.type-spot-icon-position {
  position: absolute;
  bottom: 0px;
  right: 0;
  transform: translateX(-50%);
  font-size: 18px;
}
</style>
