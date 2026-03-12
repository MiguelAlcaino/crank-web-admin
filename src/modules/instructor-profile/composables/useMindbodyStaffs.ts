import type { ApiService } from '@/services/apiService'
import { readonly, ref } from 'vue'
import type { MindbodyStaff } from '../interfaces/mindbody-staff'
import type { SiteEnum } from '@/modules/shared/interfaces'

export const useMindbodyStaffs = (apiService: ApiService) => {
  const availableStaffs = ref<MindbodyStaff[]>([])
  const isLoadingStaffs = ref<boolean>(false)
  const hasError = ref<boolean>(false)

  async function getAvailableStaffs(site: SiteEnum) {
    isLoadingStaffs.value = true
    hasError.value = false
    availableStaffs.value = []

    try {
      availableStaffs.value = await apiService.getMindbodyStaffs(site)
    } catch (error) {
      hasError.value = true
    } finally {
      isLoadingStaffs.value = false
    }
  }

  return {
    // Properties
    availableStaffs: readonly(availableStaffs),
    isLoadingStaffs: readonly(isLoadingStaffs),
    hasError: readonly(hasError),

    // Methods
    getAvailableStaffs
  }
}
