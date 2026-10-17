import type { BillingIntervalEnum, ClassPackageTypeEnum } from '@/gql/graphql'

export interface ProductAlertBeforePurchasing {
  title: string
  description: string
}

export interface ClassPackage {
  id: string
  title: string
  subtitle: string | null
  buttonText: string | null
  currency: string
  type: ClassPackageTypeEnum | null
  alertBeforePurchasing: ProductAlertBeforePurchasing | null
  isVisible: boolean
  position: number | null
  isMembership: boolean | null
  isTrialPackage: boolean | null
  isCLassPassPackage: boolean | null
  doesItRequireSmsAuth: boolean | null
  doestItActivateVodForClients: boolean | null
  vodAmountOfDays: number | null
  billingInterval: BillingIntervalEnum | null
  price: number | null
}
