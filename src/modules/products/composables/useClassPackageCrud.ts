import type { ApiService } from '@/services/apiService'
import { ClassPackageTypeEnum } from '@/gql/graphql'
import { computed, onMounted, ref } from 'vue'
import type { ClassPackage } from '../interfaces'

export const useClassPackageCrud = (apiService: ApiService, site: string) => {
  const isLoading = ref<boolean>(false)
  const hasError = ref<boolean>(false)
  const isSaving = ref<boolean>(false)
  const classPackages = ref<ClassPackage[]>([])

  const categorizedPackages = computed(() => {
    const byType = (type: ClassPackageTypeEnum) =>
      classPackages.value
        .filter((p) => p.type === type)
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))

    return {
      regular: byType(ClassPackageTypeEnum.Regular),
      trial: byType(ClassPackageTypeEnum.Trial),
      vod: byType(ClassPackageTypeEnum.Vod),
      special: byType(ClassPackageTypeEnum.Special),
      membership: byType(ClassPackageTypeEnum.Membership)
    }
  })

  const getClassPackages = async () => {
    classPackages.value = []
    hasError.value = false
    isLoading.value = true

    try {
      const result = await apiService.getClassPackages(site as any)
      classPackages.value = result.map((p) => ({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle ?? null,
        buttonText: p.buttonText ?? null,
        currency: p.currency,
        type: p.type ?? null,
        alertBeforePurchasing: p.alertBeforePurchasing
          ? {
              title: p.alertBeforePurchasing.title,
              description: p.alertBeforePurchasing.description
            }
          : null,
        isVisible: p.isVisible,
        position: p.position ?? null,
        isMembership: p.isMembership ?? null,
        isTrialPackage: p.isTrialPackage ?? null,
        isCLassPassPackage: p.isCLassPassPackage ?? null,
        doesItRequireSmsAuth: p.doesItRequireSmsAuth ?? null,
        doestItActivateVodForClients: p.doestItActivateVodForClients ?? null,
        vodAmountOfDays: p.vodAmountOfDays ?? null,
        price: p.variants?.[0]?.price ?? null
      }))
    } catch (error) {
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  const afterUpdateClassPackage = (pkg: ClassPackage) => {
    try {
      const index = classPackages.value.findIndex((p) => p.id === pkg.id)
      if (index !== -1) {
        const cloned = [...classPackages.value]
        cloned.splice(index, 1, pkg)
        classPackages.value = cloned
      }
    } catch (error) {
      console.error(error)
    }
  }

  const saveOrder = async (categories: {
    regular: ClassPackage[]
    trial: ClassPackage[]
    vod: ClassPackage[]
    special: ClassPackage[]
    membership: ClassPackage[]
  }) => {
    isSaving.value = true
    hasError.value = false

    try {
      const orders = [
        ...buildOrders(categories.regular, ClassPackageTypeEnum.Regular),
        ...buildOrders(categories.trial, ClassPackageTypeEnum.Trial),
        ...buildOrders(categories.vod, ClassPackageTypeEnum.Vod),
        ...buildOrders(categories.special, ClassPackageTypeEnum.Special),
        ...buildOrders(categories.membership, ClassPackageTypeEnum.Membership)
      ]

      await apiService.updateClassPackagesOrder(orders)

      // Update local state to reflect new positions and types
      for (const order of orders) {
        const pkg = classPackages.value.find((p) => p.id === order.classPackageId)
        if (pkg) {
          pkg.position = order.position
          pkg.type = order.type
        }
      }

      return true
    } catch (error) {
      hasError.value = true
      return false
    } finally {
      isSaving.value = false
    }
  }

  const buildOrders = (packages: ClassPackage[], type: ClassPackageTypeEnum) => {
    return packages.map((pkg, index) => ({
      classPackageId: pkg.id,
      position: index + 1,
      type
    }))
  }

  onMounted(() => {
    getClassPackages()
  })

  return {
    isLoading,
    hasError,
    isSaving,
    classPackages,
    categorizedPackages,
    getClassPackages,
    afterUpdateClassPackage,
    saveOrder
  }
}
