import type { ApiService } from '@/services/apiService'
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
    } catch (error) {
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  const afterUpdateGiftCard = (giftCard: GiftCard) => {
    try {
      const index = giftCards.value.findIndex((g) => g.id === giftCard.id)    
      if (index !== -1) {
        const clonedGiftCards = [...giftCards.value]
        clonedGiftCards.splice(index, 1, giftCard)
        giftCards.value = clonedGiftCards
      }
    } catch (error) {
      console.error(error)
    }
  }

  onMounted(() => {
    getGiftCards()
  })

  return {
    isLoading,
    hasError,
    giftCards,
    afterUpdateGiftCard
  }
}
