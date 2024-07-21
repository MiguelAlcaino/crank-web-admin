import type { Site } from './site.interface'

export interface GiftCard {
  id: string
  description: string
  grandTotal: number
  purchaseUrl: string
  salePrice: number
  site: Site
  terms: string
}
