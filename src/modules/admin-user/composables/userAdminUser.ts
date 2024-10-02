import type { ApiService } from '@/services/apiService'
import { onMounted, readonly, ref } from 'vue'

export const useAdminUser = (apiService: ApiService, emits: Function) => {
  const hasError = ref<boolean>(false)
  const isLoading = ref<boolean>(false)

  onMounted(() => {
    getAdminUsers()
  })

  function getAdminUsers() {
    try {
      isLoading.value = true
    } catch (error) {
      // ignored
    } finally {
      isLoading.value = false
    }
  }

  return {
    // Properties
    isLoading: readonly(isLoading)

    // Methods
  }
}
