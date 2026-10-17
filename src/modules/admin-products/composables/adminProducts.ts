import {
  ProductDisplayCategory,
  type AdminProductsQuery,
  type ProductCategoryOrderInput,
  type UpdateProductInput,
  type UpdateProductMutation
} from '@/gql-main/graphql'

/** A package of crank-payments main's local Product entity, as the admin edits it. */
export type AdminProduct = AdminProductsQuery['adminProducts'][number]

export type ProductsByCategory = Record<ProductDisplayCategory, AdminProduct[]>

/** The five lists of the packages page, in the order the legacy Twig page shows them. */
export const PRODUCT_CATEGORIES: ReadonlyArray<{
  category: ProductDisplayCategory
  title: string
}> = [
  { category: ProductDisplayCategory.Regular, title: 'Regular' },
  { category: ProductDisplayCategory.Trial, title: 'Trial' },
  { category: ProductDisplayCategory.Vod, title: 'VOD' },
  { category: ProductDisplayCategory.Special, title: 'Special' },
  { category: ProductDisplayCategory.Membership, title: 'Membership' }
]

export function emptyProductsByCategory(): ProductsByCategory {
  return {
    [ProductDisplayCategory.Regular]: [],
    [ProductDisplayCategory.Trial]: [],
    [ProductDisplayCategory.Vod]: [],
    [ProductDisplayCategory.Special]: [],
    [ProductDisplayCategory.Membership]: []
  }
}

/** Splits the packages into their categories, each ordered by displayOrder (stable on ties). */
export function groupProductsByCategory(products: readonly AdminProduct[]): ProductsByCategory {
  const groups = emptyProductsByCategory()

  for (const product of products) {
    groups[product.category].push(product)
  }

  for (const { category } of PRODUCT_CATEGORIES) {
    groups[category] = groups[category]
      .map((product, index) => ({ product, index }))
      .sort((a, b) => a.product.displayOrder - b.product.displayOrder || a.index - b.index)
      .map(({ product }) => product)
  }

  return groups
}

/**
 * The `updateProductsOrder` input for the lists as they are on screen: one entry per category, with
 * the package ids in display order. A package dragged into another list moves to that category.
 */
export function buildProductsOrderInput(groups: ProductsByCategory): ProductCategoryOrderInput[] {
  return PRODUCT_CATEGORIES.map(({ category }) => ({
    category,
    productIds: groups[category].map((product) => product.id)
  }))
}

/** The edit form of a package: the editable fields of the legacy Twig ProductType form. */
export interface ProductForm {
  isVisible: boolean
  customTitle: string
  subtitle: string
  textPayButton: string
  errorMessageWhenTryingToPurchase: string
  popupTitleAfterClickOnBuy: string
  popupDescriptionAfterClickOnBuy: string
  isMembership: boolean
  isTrialPackage: boolean
  isClassPassPackage: boolean
  doesItRequireSmsVerification: boolean
  muviEnabled: boolean
  muviNumberOfDays: number | null
}

export function productToForm(product: AdminProduct): ProductForm {
  return {
    isVisible: product.isVisible,
    customTitle: product.customTitle ?? '',
    subtitle: product.subtitle ?? '',
    textPayButton: product.textPayButton ?? '',
    errorMessageWhenTryingToPurchase: product.errorMessageWhenTryingToPurchase ?? '',
    popupTitleAfterClickOnBuy: product.popupTitleAfterClickOnBuy ?? '',
    popupDescriptionAfterClickOnBuy: product.popupDescriptionAfterClickOnBuy ?? '',
    isMembership: product.isMembership,
    isTrialPackage: product.isTrialPackage,
    isClassPassPackage: product.isClassPassPackage,
    doesItRequireSmsVerification: product.doesItRequireSmsVerification,
    muviEnabled: product.muviEnabled,
    muviNumberOfDays: product.muviNumberOfDays ?? null
  }
}

function blankToNull(value: string): string | null {
  const trimmed = value.trim()

  return trimmed === '' ? null : trimmed
}

/**
 * The `updateProduct` input for the form. `updateProduct` replaces every field at once, so every
 * field is sent: blank texts as null, and no VOD days when VOD is off.
 */
export function formToUpdateProductInput(form: ProductForm): UpdateProductInput {
  return {
    isVisible: form.isVisible,
    customTitle: blankToNull(form.customTitle),
    subtitle: blankToNull(form.subtitle),
    textPayButton: blankToNull(form.textPayButton),
    errorMessageWhenTryingToPurchase: blankToNull(form.errorMessageWhenTryingToPurchase),
    popupTitleAfterClickOnBuy: blankToNull(form.popupTitleAfterClickOnBuy),
    popupDescriptionAfterClickOnBuy: blankToNull(form.popupDescriptionAfterClickOnBuy),
    isMembership: form.isMembership,
    isTrialPackage: form.isTrialPackage,
    isClassPassPackage: form.isClassPassPackage,
    doesItRequireSmsVerification: form.doesItRequireSmsVerification,
    muviEnabled: form.muviEnabled,
    muviNumberOfDays: form.muviEnabled ? form.muviNumberOfDays : null
  }
}

/** Client-side check matching the backend rule: VOD on needs at least one day. */
export function productFormError(form: ProductForm): string | null {
  if (form.muviEnabled && (form.muviNumberOfDays === null || form.muviNumberOfDays < 1)) {
    return 'A package that activates VOD needs at least 1 VOD day.'
  }

  return null
}

type UpdateProductResult = UpdateProductMutation['updateProduct']

/** The message for an `updateProduct` error member, or null when the result is the package. */
export function updateProductErrorMessage(result: UpdateProductResult): string | null {
  switch (result.__typename) {
    case 'AdminProduct':
      return null
    case 'ProductNotFound':
      return 'This package no longer exists. Sync the packages and try again.'
    case 'InvalidProductVodDaysError':
      return 'A package that activates VOD needs at least 1 VOD day.'
  }
}
