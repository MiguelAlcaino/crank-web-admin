<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type:
    | 'isBookedForFree'
    | 'isFirstTimeInThisTypeOfClass'
    | 'isFirstTimeWithThisInstructor'
    | 'isTodayUserBirthday'
    | 'isUserLeaderboardEnabled'
}>()

const text = computed(() => {
  switch (props.type) {
    case 'isBookedForFree':
      return 'Unpaid'
    case 'isFirstTimeInThisTypeOfClass':
      return 'First Timer'
    case 'isFirstTimeWithThisInstructor':
      return 'First Time With Instructor'
    case 'isTodayUserBirthday':
      return 'Birthday'
    case 'isUserLeaderboardEnabled':
      return 'Leaderboard'
    default:
      return ''
  }
})

const badgeClass = computed(() => {
  switch (props.type) {
    case 'isBookedForFree':
      return 'isBookedForFree-badge'
    case 'isFirstTimeInThisTypeOfClass':
      return 'isFirstTimeInThisTypeOfClass-badge'
    case 'isFirstTimeWithThisInstructor':
      return 'isFirstTimeWithThisInstructor-badge'
    case 'isTodayUserBirthday':
      return 'isTodayUserBirthday-badge'
    case 'isUserLeaderboardEnabled':
      return 'isUserLeaderboardEnabled-badge'
    default:
      return ''
  }
})
</script>

<template>
  <span :class="['badge', badgeClass]">
    {{ text }}
  </span>
</template>

<style scoped>
.isFirstTimeWithThisInstructor-badge {
  background-color: #add8e6;
  color: white;
  margin-right: 5px;
}

.isTodayUserBirthday-badge {
  background-color: #32cd32;
  color: white;
  margin-right: 5px;
}

.isUserLeaderboardEnabled-badge {
  background-color: #008000;
  color: white;
  margin-right: 5px;
}

.isBookedForFree-badge {
  background-color: #ffd903;
  color: black;
  margin-right: 5px;
}

.isFirstTimeInThisTypeOfClass-badge {
  background-color: #00b9ff;
  color: white;
  margin-right: 5px;
}
</style>
