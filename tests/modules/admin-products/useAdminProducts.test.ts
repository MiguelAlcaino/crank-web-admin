import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import { ProductDisplayCategory } from '../../../src/gql-main/graphql'
import { useAdminProducts } from '../../../src/modules/admin-products/composables/useAdminProducts'
import type { AdminProduct } from '../../../src/modules/admin-products/composables/adminProducts'

function product(id: string, category: ProductDisplayCategory, displayOrder: number): AdminProduct {
  return {
    __typename: 'AdminProduct',
    id,
    mindbodyId: `mb-${id}`,
    name: `Package ${id}`,
    price: 100,
    category,
    displayOrder,
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
    muviNumberOfDays: null
  }
}

function apolloClient(client: { query?: unknown; mutate?: unknown }) {
  return client as unknown as ApolloClient<NormalizedCacheObject>
}

describe('useAdminProducts', () => {
  it('flags a failed load and shows no lists', async () => {
    const query = vi.fn().mockRejectedValue(new Error('boom'))
    const products = useAdminProducts(apolloClient({ query }), ref('dubai'))

    await products.fetchProducts()

    expect(products.hasLoadError.value).toBe(true)
    expect(products.groups.value.regular).toEqual([])
  })

  it('loads the site packages into their lists', async () => {
    const query = vi.fn().mockResolvedValue({
      data: {
        adminProducts: [
          product('1', ProductDisplayCategory.Trial, 1),
          product('2', ProductDisplayCategory.Regular, 1)
        ]
      }
    })
    const products = useAdminProducts(apolloClient({ query }), ref('dubai'))

    await products.fetchProducts()

    expect(query.mock.calls[0][0].variables).toEqual({ site: 'dubai' })
    expect(products.groups.value.trial.map((p) => p.id)).toEqual(['1'])
    expect(products.groups.value.regular.map((p) => p.id)).toEqual(['2'])
  })

  it('answers error when the order mutation fails', async () => {
    const mutate = vi.fn().mockRejectedValue(new Error('boom'))
    const products = useAdminProducts(apolloClient({ mutate }), ref('dubai'))

    expect(await products.saveOrder()).toBe('error')
    expect(products.isSavingOrder.value).toBe(false)
  })

  it('answers not_found when a package is unknown, keeping the lists as they are', async () => {
    const mutate = vi.fn().mockResolvedValue({
      data: { updateProductsOrder: { __typename: 'ProductNotFound', code: 'product.not_found' } }
    })
    const products = useAdminProducts(apolloClient({ mutate }), ref('dubai'))
    products.setCategory(ProductDisplayCategory.Regular, [
      product('7', ProductDisplayCategory.Regular, 0)
    ])

    expect(await products.saveOrder()).toBe('not_found')
    expect(products.groups.value.regular.map((p) => p.id)).toEqual(['7'])
  })

  it('saves the lists as they are on screen and shows what the backend answers', async () => {
    const mutate = vi.fn().mockResolvedValue({
      data: {
        updateProductsOrder: {
          __typename: 'AdminProductList',
          products: [product('7', ProductDisplayCategory.Membership, 1)]
        }
      }
    })
    const products = useAdminProducts(apolloClient({ mutate }), ref('dubai'))
    // Dragged from regular into membership.
    products.setCategory(ProductDisplayCategory.Membership, [
      product('7', ProductDisplayCategory.Regular, 0)
    ])

    expect(await products.saveOrder()).toBe('saved')
    expect(mutate.mock.calls[0][0].variables.input).toContainEqual({
      category: ProductDisplayCategory.Membership,
      productIds: ['7']
    })
    expect(products.groups.value.membership[0].category).toBe(ProductDisplayCategory.Membership)
  })

  it('replaces an edited package in its list', () => {
    const products = useAdminProducts(apolloClient({}), ref('dubai'))
    products.setCategory(ProductDisplayCategory.Regular, [
      product('1', ProductDisplayCategory.Regular, 0),
      product('2', ProductDisplayCategory.Regular, 1)
    ])

    products.replaceProduct({ ...product('2', ProductDisplayCategory.Regular, 1), name: 'Edited' })

    expect(products.groups.value.regular.map((p) => p.name)).toEqual(['Package 1', 'Edited'])
  })

  it('answers false when the sync fails and shows the synced list when it succeeds', async () => {
    const failing = useAdminProducts(
      apolloClient({ mutate: vi.fn().mockRejectedValue(new Error('boom')) }),
      ref('dubai')
    )
    expect(await failing.sync()).toBe(false)

    const mutate = vi.fn().mockResolvedValue({
      data: { syncProducts: [product('9', ProductDisplayCategory.Special, 0)] }
    })
    const syncing = useAdminProducts(apolloClient({ mutate }), ref('qatar'))
    expect(await syncing.sync()).toBe(true)
    expect(mutate.mock.calls[0][0].variables).toEqual({ site: 'qatar' })
    expect(syncing.groups.value.special.map((p) => p.id)).toEqual(['9'])
  })
})
