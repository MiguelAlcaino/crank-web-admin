import { onMounted, ref } from 'vue'
import type { CalendarListWeekDay } from '../interfaces'
import { authService } from '@/services/authService'
import type { AdminSite } from '@/modules/shared/interfaces'

const weekDays = ref<CalendarListWeekDay[]>([])
const sites = ref<AdminSite[]>([])
const selectedSite = ref<string | null>(null)

export const useCalendarList = () => {
  onMounted(() => {
    getAvailableSites()
  })

  function getAvailableSites() {
    sites.value = authService.getAvailableSites()
    if (sites.value.length > 0 && selectedSite.value == null) {
      selectedSite.value = sites.value[0].serviceKey
    }
  }

  function updateTotalBooked(classId: string, operation: 'increase' | 'decrease') {
    let wasFound = false
    for (let i = 0; i < weekDays.value.length; i++) {
      const weekDay = weekDays.value[i]

      for (let j = 0; j < weekDay.classes.length; j++) {
        const calendarClass = weekDay.classes[j]
        if (calendarClass.id === classId) {
          operation === 'increase' ? calendarClass.totalBooked++ : calendarClass.totalBooked--
          wasFound = true
          break
        }
      }
      if (wasFound) break
    }
  }

  function updateTotalUnderMaintenanceSpots(classId: string, operation: 'increase' | 'decrease') {
    let wasFound = false
    for (let i = 0; i < weekDays.value.length; i++) {
      const weekDay = weekDays.value[i]

      for (let j = 0; j < weekDay.classes.length; j++) {
        const calendarClass = weekDay.classes[j]
        if (calendarClass.id === classId) {
          operation === 'increase'
            ? calendarClass.totalUnderMaintenanceSpots++
            : calendarClass.totalUnderMaintenanceSpots--
          wasFound = true
          break
        }
      }
      if (wasFound) break
    }
  }

  return {
    weekDays,
    sites,
    selectedSite,
    updateTotalBooked,
    updateTotalUnderMaintenanceSpots
  }
}
