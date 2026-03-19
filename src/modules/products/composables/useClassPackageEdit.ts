import type { ApiService } from '@/services/apiService'
import type { ProductInput } from '@/gql/graphql'
import { computed, reactive, ref } from 'vue'
import type { ClassPackage } from '../interfaces'
import { helpers, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export const useClassPackageEdit = (apiService: ApiService, emits: Function) => {
  const hasError = ref<boolean>(false)
  const isSuccessful = ref<boolean>(false)
  const modalIsVisible = ref<boolean>(false)
  const isSaving = ref<boolean>(false)
  let classPackage: ClassPackage | null = null

  const formData = reactive({
    title: '',
    subtitle: '',
    buttonText: '',
    currency: '',
    isVisible: false,
    isMembership: false,
    isTrialPackage: false,
    isCLassPassPackage: false,
    doesItRequiredSmsAuth: false,
    doestItActivateVodForClients: false,
    vodAmountOfDays: 0,
    alertTitle: '',
    alertDescription: ''
  })

  const rules = computed(() => {
    return {
      title: {
        required: helpers.withMessage('Title is required', required)
      }
    }
  })

  const v$ = useVuelidate(rules, formData, { $scope: false })

  const submitForm = async () => {
    const isValid = await v$.value.$validate()

    if (isValid) {
      await updateClassPackage()
    }
  }

  const openModal = (data: ClassPackage) => {
    classPackage = data

    v$.value.$reset()
    formData.title = data.title
    formData.subtitle = data.subtitle ?? ''
    formData.buttonText = data.buttonText ?? ''
    formData.currency = data.currency
    formData.isVisible = data.isVisible
    formData.isMembership = data.isMembership ?? false
    formData.isTrialPackage = data.isTrialPackage ?? false
    formData.isCLassPassPackage = data.isCLassPassPackage ?? false
    formData.doesItRequiredSmsAuth = data.doesItRequireSmsAuth ?? false
    formData.doestItActivateVodForClients = data.doestItActivateVodForClients ?? false
    formData.vodAmountOfDays = data.vodAmountOfDays ?? 0
    formData.alertTitle = data.alertBeforePurchasing?.title ?? ''
    formData.alertDescription = data.alertBeforePurchasing?.description ?? ''

    modalIsVisible.value = true
  }

  const closeModal = () => {
    classPackage = null
    modalIsVisible.value = false
  }

  async function updateClassPackage() {
    isSuccessful.value = false
    isSaving.value = true

    try {
      const input: ProductInput = {
        title: formData.title,
        subtitle: formData.subtitle || undefined,
        buttonText: formData.buttonText || undefined,
        currency: formData.currency || undefined,
        isVisible: formData.isVisible,
        isMembership: formData.isMembership,
        isTrialPackage: formData.isTrialPackage,
        isCLassPassPackage: formData.isCLassPassPackage,
        doesItRequiredSmsAuth: formData.doesItRequiredSmsAuth,
        doestItActivateVodForClients: formData.doestItActivateVodForClients,
        vodAmountOfDays: formData.doestItActivateVodForClients ? formData.vodAmountOfDays : 0,
        alertBeforePurchasing:
          formData.alertTitle || formData.alertDescription
            ? { title: formData.alertTitle, description: formData.alertDescription }
            : undefined
      }

      const updated = await apiService.updateClassPackage(classPackage!.id, input)
      const updatedPkg: ClassPackage = {
        id: updated.id,
        title: updated.title,
        subtitle: updated.subtitle ?? null,
        buttonText: updated.buttonText ?? null,
        currency: updated.currency,
        type: updated.type ?? null,
        alertBeforePurchasing: updated.alertBeforePurchasing
          ? {
              title: updated.alertBeforePurchasing.title,
              description: updated.alertBeforePurchasing.description
            }
          : null,
        isVisible: updated.isVisible,
        position: updated.position ?? null,
        isMembership: updated.isMembership ?? null,
        isTrialPackage: updated.isTrialPackage ?? null,
        isCLassPassPackage: updated.isCLassPassPackage ?? null,
        doesItRequireSmsAuth: updated.doesItRequireSmsAuth ?? null,
        doestItActivateVodForClients: updated.doestItActivateVodForClients ?? null,
        vodAmountOfDays: updated.vodAmountOfDays ?? null,
        price: classPackage!.price
      }
      emits('afterUpdateClassPackage', updatedPkg)
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
    onOkSuccess
  }
}
