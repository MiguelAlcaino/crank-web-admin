import { ref } from 'vue'
import type { CalendarListWeekDay } from '../interfaces'

const weekDays = ref<CalendarListWeekDay[]>([])

export const useCalendarList = () => {
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
    updateTotalBooked,
    updateTotalUnderMaintenanceSpots
  }
}
