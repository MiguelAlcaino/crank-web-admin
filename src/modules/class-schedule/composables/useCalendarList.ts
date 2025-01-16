import { onMounted, readonly, ref } from 'vue'
import type { CalendarListWeekDay } from '../interfaces'
import type { SiteEnum } from '@/modules/shared/interfaces'
import type { ApiService } from '@/services/apiService'
import type { AdminUserSites } from '../interfaces/admin-user-sites'
import type { Site } from '@/modules/shared/interfaces/site'

const weekDays = ref<CalendarListWeekDay[]>([])
const sites = ref<Site[]>([])
const selectedSite = ref<string | null>(null)
const isLoadingSites = ref(false)

export const useCalendarList = (apiService: ApiService) => {
  onMounted(() => {})

  async function getAvailableSites() {
    sites.value = []
    isLoadingSites.value = true

    try {
      const adminUserSites = (await apiService.getCurrentAdminUserSites()) as AdminUserSites

      sites.value = adminUserSites.linkedSites

      if (adminUserSites.favoriteSite !== null) {
        let selectedSiteCode = adminUserSites.favoriteSite.code as SiteEnum | null
        if (sites.value.filter((site: Site) => site.code === selectedSiteCode).length === 0) {
          selectedSiteCode = sites.value.length > 0 ? sites.value[0].code : null
        }

        selectedSite.value = selectedSiteCode
      } else {
        selectedSite.value = sites.value.length > 0 ? sites.value[0].code : null
      }
    } catch (error) {
      sites.value = []
    } finally {
      isLoadingSites.value = false
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
    isLoadingSites: readonly(isLoadingSites),
    updateTotalBooked,
    updateTotalUnderMaintenanceSpots,
    getAvailableSites
  }
}
