import type { SessionType } from '@/modules/session-type/interfaces'
import type { SiteEnum } from '@/modules/shared/interfaces'
import type { ApiService } from '@/services/apiService'
import { appStore } from '@/stores/appStorage'
import { readonly, ref } from 'vue'

const sessionTypes = ref<SessionType[]>([])

export const useSessionTypes = (apiService: ApiService) => {
  const hasLoadError = ref<boolean>(false)
  const hasError = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const isSaving = ref<boolean>(false)

  async function getSessionTypes() {
    hasLoadError.value = false
    isLoading.value = true
    sessionTypes.value = []

    try {
      sessionTypes.value = await apiService.getSessionTypes(appStore().site)
    } catch (error) {
      hasLoadError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function createSessionType(sessionTypeData: {
    site: SiteEnum
    name: string
    active?: boolean
    bannerImageFile?: File | null
    mindbodySessionTypeIds?: string[]
  }) {
    isSaving.value = true
    hasError.value = false

    try {
      const created = await apiService.createSessionType(sessionTypeData)
      const newArr = sessionTypes.value.slice()
      newArr.push(created)
      sessionTypes.value = newArr
      return true
    } catch (error) {
      hasError.value = true
      throw error
    } finally {
      isSaving.value = false
    }
  }

  async function updateSessionType(
    id: string,
    sessionTypeData: {
      name?: string
      active?: boolean
      bannerImageFile?: File | null
      mindbodySessionTypeIds?: string[]
    }
  ) {
    isSaving.value = true
    hasError.value = false

    try {
      const updated = await apiService.updateSessionType(id, sessionTypeData)
      const idx = sessionTypes.value.findIndex((l) => l.id === id)
      if (idx !== -1) {
        const newArr = sessionTypes.value.slice()
        newArr[idx] = updated
        sessionTypes.value = newArr
      }
      return true
    } catch (error) {
      hasError.value = true
      throw error
    } finally {
      isSaving.value = false
    }
  }

  async function deleteSessionType(id: string) {
    isSaving.value = true
    hasError.value = false

    try {
      const success = await apiService.deleteSessionType(id)
      if (success) {
        const idx = sessionTypes.value.findIndex((l) => l.id === id)
        if (idx !== -1) {
          const newArr = sessionTypes.value.slice()
          newArr.splice(idx, 1)
          sessionTypes.value = newArr
        }
      }
      return success
    } catch (error) {
      hasError.value = true
      throw error
    } finally {
      isSaving.value = false
    }
  }

  return {
    isLoading: readonly(isLoading),
    isSaving: readonly(isSaving),
    hasError: readonly(hasError),
    hasLoadError: readonly(hasLoadError),
    sessionTypes: sessionTypes,
    getSessionTypes,
    createSessionType,
    updateSessionType,
    deleteSessionType
  }
}
