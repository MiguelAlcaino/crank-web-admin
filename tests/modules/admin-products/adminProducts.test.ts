import { describe, expect, it } from 'vitest'

import { ProductDisplayCategory } from '../../../src/gql-main/graphql'
import {
  buildProductsOrderInput,
  formToUpdateProductInput,
  groupProductsByCategory,
  productFormError,
  productToForm,
  updateProductErrorMessage,
  type AdminProduct
} from '../../../src/modules/admin-products/composables/adminProducts'

function product(overrides: Partial<AdminProduct> = {}): AdminProduct {
  return {
    __typename: 'AdminProduct',
    id: '1',
    mindbodyId: '100',
    name: '10 classes',
    price: 1000,
    category: ProductDisplayCategory.Regular,
    displayOrder: 0,
    isVisible: true,
    customTitle: null,
    subtitle: null,
    textPayButton: null,
    errorMessageWhenTryingToPurchase: null,
    popupTitleAfterClickOnBuy: null,
    popupDescriptionAfterClickOnBuy: null,
    isMembership: false,
    isTrialPackage: false,
    isClassPassPackage: false,
    doesItRequireSmsVerification: false,
    muviEnabled: false,
    muviNumberOfDays: null,
    ...overrides
  }
}

describe('groupProductsByCategory', () => {
  it('splits by category and orders each list by displayOrder, keeping ties in place', () => {
    const groups = groupProductsByCategory([
      product({ id: 'a', displayOrder: 2 }),
      product({ id: 'b', category: ProductDisplayCategory.Vod, displayOrder: 1 }),
      product({ id: 'c', displayOrder: 1 }),
      product({ id: 'd', displayOrder: 0 }),
      product({ id: 'e', displayOrder: 0 })
    ])

    expect(groups.regular.map((p) => p.id)).toEqual(['d', 'e', 'c', 'a'])
    expect(groups.vod.map((p) => p.id)).toEqual(['b'])
    expect(groups.trial).toEqual([])
    expect(groups.special).toEqual([])
    expect(groups.membership).toEqual([])
  })
})

describe('buildProductsOrderInput', () => {
  it('sends the five lists in page order with the ids as they are on screen', () => {
    const groups = groupProductsByCategory([])
    groups.regular = [product({ id: '3' }), product({ id: '1' })]
    // Dragged from regular into membership: it moves category.
    groups.membership = [product({ id: '2', category: ProductDisplayCategory.Regular })]

    expect(buildProductsOrderInput(groups)).toEqual([
      { category: ProductDisplayCategory.Regular, productIds: ['3', '1'] },
      { category: ProductDisplayCategory.Trial, productIds: [] },
      { category: ProductDisplayCategory.Vod, productIds: [] },
      { category: ProductDisplayCategory.Special, productIds: [] },
      { category: ProductDisplayCategory.Membership, productIds: ['2'] }
    ])
  })
})

describe('product form', () => {
  it('turns null texts into empty inputs', () => {
    const form = productToForm(
      product({ customTitle: 'Ten', muviEnabled: true, muviNumberOfDays: 7 })
    )

    expect(form.customTitle).toBe('Ten')
    expect(form.subtitle).toBe('')
    expect(form.muviEnabled).toBe(true)
    expect(form.muviNumberOfDays).toBe(7)
  })

  it('refuses VOD without at least one day', () => {
    const form = productToForm(product())
    form.muviEnabled = true

    form.muviNumberOfDays = null
    expect(productFormError(form)).not.toBeNull()
    form.muviNumberOfDays = 0
    expect(productFormError(form)).not.toBeNull()
    form.muviNumberOfDays = 1
    expect(productFormError(form)).toBeNull()
  })

  it('sends every field, blank texts as null and no VOD days when VOD is off', () => {
    const form = productToForm(product())
    form.customTitle = '  Ten classes  '
    form.subtitle = '   '
    form.isVisible = false
    form.muviEnabled = false
    form.muviNumberOfDays = 30

    expect(formToUpdateProductInput(form)).toEqual({
      isVisible: false,
      customTitle: 'Ten classes',
      subtitle: null,
      textPayButton: null,
      errorMessageWhenTryingToPurchase: null,
      popupTitleAfterClickOnBuy: null,
      popupDescriptionAfterClickOnBuy: null,
      isMembership: false,
      isTrialPackage: false,
      isClassPassPackage: false,
      doesItRequireSmsVerification: false,
      muviEnabled: false,
      muviNumberOfDays: null
    })
  })

  it('keeps the VOD days when VOD is on', () => {
    const form = productToForm(product())
    form.muviEnabled = true
    form.muviNumberOfDays = 30

    expect(formToUpdateProductInput(form).muviNumberOfDays).toBe(30)
  })
})

describe('updateProductErrorMessage', () => {
  it('has a message for each error member and none for the package', () => {
    expect(
      updateProductErrorMessage({ __typename: 'ProductNotFound', code: 'product.not_found' })
    ).toMatch(/no longer exists/)
    expect(
      updateProductErrorMessage({ __typename: 'InvalidProductVodDaysError', code: 'x' })
    ).toMatch(/VOD day/)
    expect(updateProductErrorMessage(product())).toBeNull()
  })
})
