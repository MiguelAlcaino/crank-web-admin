import { ApiService } from '@/services/apiService'
import { inject, onMounted, ref } from 'vue'
import type { GiftCard } from '../interfaces'

export const useGiftCard = () => {
  const isLoading = ref<boolean>(false)
  const hasError = ref<boolean>(false)
  const giftCards = ref<GiftCard[]>([])

  const getGiftCards = async () => {
    isLoading.value = true

    try {
      const apiService = inject<ApiService>('gqlApiService')!

      giftCards.value = await apiService.getGiftCards()

      console.log(giftCards.value)
    } catch (error) {
      console.error(error)
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    getGiftCards()
  })

  return {
    isLoading,
    hasError,
    giftCards
  }
}
