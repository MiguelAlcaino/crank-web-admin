import type { MindbodySessionType } from '@/modules/session-type/interfaces'
import type { ApiService } from '@/services/apiService'
import { appStore } from '@/stores/appStorage'
import { readonly, ref } from 'vue'

export const useMindbodySessionTypes = (apiService: ApiService) => {
  const availableSessionTypes = ref<MindbodySessionType[]>([])
  const isLoadingSessionTypes = ref<boolean>(false)
  const hasError = ref<boolean>(false)

  async function getAvailableSessionTypes() {
    isLoadingSessionTypes.value = true
    hasError.value = false
    availableSessionTypes.value = []

    try {
      availableSessionTypes.value = await apiService.getMindbodySessionTypes(appStore().site)
    } catch (error) {
      hasError.value = true
    } finally {
      isLoadingSessionTypes.value = false
    }
  }

  return {
    availableSessionTypes: readonly(availableSessionTypes),
    isLoadingSessionTypes: readonly(isLoadingSessionTypes),
    hasError: readonly(hasError),
    getAvailableSessionTypes
  }
}
