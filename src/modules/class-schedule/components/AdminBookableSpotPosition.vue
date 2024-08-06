<script lang="ts">
interface User {
  firstName: string
  lastName: string
}

enum SpotActionEnum {
  none,
  asignUserToSpot,
  changeMemberSpot,
  swapSpot
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
}
</script>

<script setup lang="ts">
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
  <div v-if="spotAction === SpotActionEnum.changeMemberSpot">
    <div v-if="isBooked" :class="['changeMemberSpot-bookedSpot', selected ? 'selectedSpot' : '']">
      {{ spotNumber + (isCheckedIn === true ? '✓' : '') }}
      <br />
      {{ user?.firstName }} {{ user?.lastName }}
    </div>
    <div
      v-else-if="enabled"
      :class="['changeMemberSpot-spotAvailable']"
      @click="spotSelectionIsDisabled ? null : selectSpot()"
    >
      {{ spotNumber }}
    </div>
    <div v-else :class="['changeMemberSpot-disabledSpot']">
      {{ spotNumber }}
    </div>
  </div>
  <div v-else-if="spotAction === SpotActionEnum.swapSpot">
    <div
      v-if="isBooked"
      @click="selected ? null : spotSelectionIsDisabled ? null : selectSpot()"
      :class="[
        'changeMemberSpot-bookedSpot',
        selected ? 'selectedSpot' : 'swapMemberSpot-bookedSpot'
      ]"
    >
      {{ spotNumber + (isCheckedIn === true ? '✓' : '') }}
      <br />
      {{ user?.firstName }} {{ user?.lastName }}
    </div>
    <div v-else-if="enabled" :class="['empty-spot-not-selectable']">
      {{ spotNumber }}
    </div>
    <div v-else :class="['changeMemberSpot-disabledSpot']">
      {{ spotNumber }}
    </div>
  </div>
  <div v-else>
    <div
      v-if="isBooked"
      @click="spotSelectionIsDisabled ? null : selectSpot()"
      :class="[
        spotSelectionIsDisabled ? 'spotEnabledNotClickable' : 'enabledSpot',
        selected ? 'selectedSpot' : '',
        isBookedForFree && !selected ? 'isBookedForFree' : '',
        isBookedForFree && selected ? 'isBookedForFreeSelected' : ''
      ]"
    >
      {{ spotNumber + (isCheckedIn === true ? '✓' : '') }}
      <br />
      {{ user?.firstName }} {{ user?.lastName }}
    </div>
    <div
      v-else-if="enabled"
      :class="[
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
.disabledSpot {
  background: #f37676;
  height: 60px;
  width: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border: 2px #000000 solid;
  font-weight: 400;
  font-size: 9px;
  cursor: pointer;
}

.disabledSpotNotClickable {
  background: #f37676;
  height: 60px;
  width: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border: 2px #000000 solid;
  font-weight: 400;
  font-size: 9px;
}

.enabledSpot {
  background: #ffffff;
  height: 60px;
  width: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border: 2px #000000 solid;
  font-weight: bold;
  font-size: 9px;
  cursor: pointer;
}

.spotEnabledNotClickable {
  background: #ffffff;
  height: 60px;
  width: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border: 2px #000000 solid;
  font-weight: bold;
  font-size: 9px;
}

.empty-spot-not-selectable {
  background: #ffffff;
  height: 60px;
  width: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border: 2px #000000 solid;
  font-weight: bold;
  font-size: 9px;
}

.selectedSpot {
  border: 2px dashed !important;
}

.changeMemberSpot-spotAvailable {
  background: #ffebcd;
  height: 60px;
  width: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border: 2px #000000 solid;
  font-weight: bold;
  font-size: 9px;
  cursor: pointer;
}

.changeMemberSpot-disabledSpot {
  background: #f37676;
  height: 60px;
  width: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border: 2px #000000 solid;
  font-weight: bold;
  font-size: 9px;
}

.changeMemberSpot-bookedSpot {
  background: #ffffff;
  height: 60px;
  width: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border: 2px #000000 solid;
  font-weight: bold;
  font-size: 9px;
}

.swapMemberSpot-bookedSpot {
  background: #ffffff;
  height: 60px;
  width: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  border: 2px #000000 solid;
  font-weight: bold;
  font-size: 9px;
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
</style>
