import type { SessionType } from '@/modules/session-type/interfaces'
import type { SiteEnum } from '@/modules/shared/interfaces'
import type { ApiService } from '@/services/apiService'
import { readonly, ref } from 'vue'

const sessionTypes = ref<SessionType[]>([])
const sortSessionTypesByPosition = (items: SessionType[]) =>
  items
    .slice()
    .sort(
      (a, b) => (a.position ?? Number.MAX_SAFE_INTEGER) - (b.position ?? Number.MAX_SAFE_INTEGER)
    )

export const useSessionTypes = (apiService: ApiService) => {
  const hasLoadError = ref<boolean>(false)
  const hasError = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const isSaving = ref<boolean>(false)
  const updatingPositionIds = ref<string[]>([])

  async function getSessionTypes(site: SiteEnum, activeOnly: boolean | null = null) {
    hasLoadError.value = false
    isLoading.value = true
    sessionTypes.value = []

    try {
      sessionTypes.value = sortSessionTypesByPosition(
        await apiService.getSessionTypes(site, activeOnly)
      )
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
    color?: string | null
    bannerImageFile?: File | null
    iconFile?: File | null
    mindbodySessionTypeIds?: string[]
  }) {
    isSaving.value = true
    hasError.value = false

    try {
      const maxPosition = sessionTypes.value.reduce((max, item) => {
        const position = item.position ?? 0
        return position > max ? position : max
      }, 0)

      const created = await apiService.createSessionType({
        ...sessionTypeData,
        position: maxPosition + 1
      })
      const newArr = sessionTypes.value.slice()
      newArr.push(created)
      sessionTypes.value = sortSessionTypesByPosition(newArr)
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
      color?: string | null
      position?: number | null
      bannerImageFile?: File | null
      iconFile?: File | null
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
        sessionTypes.value = sortSessionTypesByPosition(newArr)
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

  async function reorderSessionTypes(orderedIds: string[]) {
    isSaving.value = true
    hasError.value = false
    const previous = sessionTypes.value.slice()

    try {
      const byId = new Map(previous.map((item) => [item.id, item]))
      const reordered: SessionType[] = []
      for (let i = 0; i < orderedIds.length; i++) {
        const found = byId.get(orderedIds[i])
        if (!found) {
          continue
        }
        reordered.push({ ...found, position: i + 1 })
      }
      sessionTypes.value = reordered

      const changed = orderedIds
        .map((id, index) => {
          const previousItem = byId.get(id)
          const newPosition = index + 1
          if (previousItem?.position === newPosition) {
            return null
          }
          return { id, position: newPosition }
        })
        .filter((item): item is { id: string; position: number } => item !== null)

      updatingPositionIds.value = changed.map((item) => item.id)

      for (const item of changed) {
        await apiService.updateSessionType(item.id, { position: item.position })
      }

      return true
    } catch (error) {
      sessionTypes.value = previous
      hasError.value = true
      throw error
    } finally {
      updatingPositionIds.value = []
      isSaving.value = false
    }
  }

  return {
    isLoading: readonly(isLoading),
    isSaving: readonly(isSaving),
    updatingPositionIds: readonly(updatingPositionIds),
    hasError: readonly(hasError),
    hasLoadError: readonly(hasLoadError),
    sessionTypes: sessionTypes,
    getSessionTypes,
    createSessionType,
    updateSessionType,
    deleteSessionType,
    reorderSessionTypes
  }
}
