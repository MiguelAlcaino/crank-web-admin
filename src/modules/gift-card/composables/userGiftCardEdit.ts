import type { ApiService } from '@/services/apiService'
import { computed, reactive, ref } from 'vue'
import type { GiftCard } from '../interfaces'
import { helpers, minValue, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export const useGiftCardEdit = (apiService: ApiService, emits: Function) => {
  const hasError = ref<boolean>(false)
  const isSuccessful = ref<boolean>(false)
  const modalIsVisible = ref<boolean>(false)
  const isSaving = ref<boolean>(false)
  let giftCard: GiftCard | null = null

  const formData = reactive({
    grandTotal: 0
  })

  const rules = computed(() => {
    return {
      grandTotal: {
        required: helpers.withMessage('Grand Total is required', required),
        minValue: helpers.withMessage('Grand Total must be higher than 1', minValue(1))
      }
    }
  })

  const v$ = useVuelidate(rules, formData, { $scope: false })

  const submitForm = async () => {
    const isValid = await v$.value.$validate()

    if (isValid) {
      updateGiftCard(giftCard!.id, formData.grandTotal)
    } else {
      console.error('error form')
    }
  }

  const afterUpdateGiftCard = (giftCard: GiftCard) => {
    emits('afterUpdateGiftCard', giftCard)
  }

  const openModal = (data: GiftCard) => {
    giftCard = data

    v$.value.$reset()
    formData.grandTotal = giftCard.grandTotal

    modalIsVisible.value = true
  }

  const closeModal = () => {
    giftCard = null
    modalIsVisible.value = false
  }

  async function updateGiftCard(id: string, grandTotal: number) {
    isSuccessful.value = false
    isSaving.value = true

    try {
      const updatedGiftCard = await apiService.updateGiftCard(id, grandTotal)
      if (updatedGiftCard) {
        afterUpdateGiftCard(updatedGiftCard)
      }

      isSuccessful.value = true
    } catch (error) {
      hasError.value = true
    } finally {
      isSaving.value = false
    }
  }

  const onOkSuccess = () => {
    isSuccessful.value = false
    closeModal()
  }

  return {
    hasError,
    modalIsVisible,
    isSaving,
    formData,
    v$,
    isSuccessful,
    openModal,
    closeModal,
    submitForm,
    afterUpdateGiftCard,
    onOkSuccess
  }
}
