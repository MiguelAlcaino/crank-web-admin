import type { Site } from '@/modules/shared/interfaces/site'

export interface PaymentLink {
  id: string
  title: string
  amount: number
  currency: string
  url: string
  site: Site
}
