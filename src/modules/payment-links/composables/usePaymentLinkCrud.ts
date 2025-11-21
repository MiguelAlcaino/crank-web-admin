import type { ApiService } from '@/services/apiService'
import { readonly, ref } from 'vue'
import type { PaymentLink } from '../interfaces'
import type { SiteEnum } from '@/modules/shared/interfaces'
import type { Site } from '@/modules/shared/interfaces/site'

const paymentLinks = ref<PaymentLink[]>([])

export const usePaymentLinkCrud = (apiService: ApiService) => {
  const hasError = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const isSaving = ref<boolean>(false)

  const currencyOptions = [{ name: 'AED', code: 'AED' }]

  const sites = ref<Site[]>([])
  const loadingSites = ref(false)

  async function getAvailableSites() {
    sites.value = []
    loadingSites.value = true
    try {
      sites.value = await apiService.getAvailableSites()
    } catch (error) {
      // ignore
    } finally {
      loadingSites.value = false
    }
  }

  async function getPaymentLinks() {
    hasError.value = false
    isLoading.value = true
    paymentLinks.value = []

    try {
      paymentLinks.value = (await apiService.getPaymentLinks(null)) as PaymentLink[]
    } catch (error) {
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function createPaymentLink(paymentLinkData: {
    amount: number
    currency: string
    site: SiteEnum
    title: string
  }) {
    isSaving.value = true
    hasError.value = false

    try {
      await apiService.createPaymentLink(paymentLinkData)
      await getPaymentLinks() // Refresh list
      return true
    } catch (error) {
      hasError.value = true
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function updatePaymentLink(
    id: string,
    paymentLinkData: {
      amount?: number
      currency?: string
      id: string
      site?: SiteEnum
      title?: string
    }
  ) {
    isSaving.value = true
    hasError.value = false

    try {
      await apiService.updatePaymentLink(paymentLinkData)
      await getPaymentLinks() // Refresh list
      return true
    } catch (error) {
      hasError.value = true
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function deletePaymentLink(id: string) {
    isSaving.value = true
    hasError.value = false

    try {
      const success = await apiService.deletePaymentLink(id)
      if (success) {
        await getPaymentLinks()
      }
      return success
    } catch (error) {
      hasError.value = true
      return false
    } finally {
      isSaving.value = false
    }
  }

  return {
    // Properties
    isLoading: readonly(isLoading),
    hasError: readonly(hasError),
    paymentLinks: readonly(paymentLinks),
    currencyOptions: readonly(ref(currencyOptions)),

    sites: readonly(sites),
    loadingSites: readonly(loadingSites),

    // Methods
    getPaymentLinks,
    createPaymentLink,
    updatePaymentLink,
    deletePaymentLink,
    getAvailableSites
  }
}
