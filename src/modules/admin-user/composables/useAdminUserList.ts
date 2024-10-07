import type { ApiService } from '@/services/apiService'
import { onMounted, readonly, ref } from 'vue'
import type { AdminUser } from '../interfaces'

const adminUsers = ref<AdminUser[]>([])

export const useAdminUserList = (apiService: ApiService) => {
  const hasError = ref<boolean>(false)
  const isLoading = ref<boolean>(false)

  onMounted(() => {
    getAdminUsers()
  })

  async function getAdminUsers() {
    hasError.value = false
    isLoading.value = true

    adminUsers.value = []

    try {
      adminUsers.value = (await apiService.getAdminUsers()) as AdminUser[]
    } catch (error) {
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    // Properties
    isLoading: readonly(isLoading),
    hasError: readonly(hasError),
    adminUsers: adminUsers,

    // Methods
    getAdminUsers
  }
}
