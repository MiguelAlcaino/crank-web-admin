import { ref, type Ref } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import {
  AdminProductsDocument,
  SyncProductsDocument,
  UpdateProductsOrderDocument,
  type SiteEnum
} from '@/gql-main/graphql'
import {
  buildProductsOrderInput,
  emptyProductsByCategory,
  groupProductsByCategory,
  type AdminProduct,
  type ProductsByCategory
} from './adminProducts'

export type SaveOrderResult = 'saved' | 'not_found' | 'error'

/**
 * Packages of a site on crank-payments main (`adminProducts`), split into the five category lists
 * the admin reorders by drag and drop (`updateProductsOrder`), plus the Mindbody sync
 * (`syncProducts`). Super admin only on the backend.
 */
export const useAdminProducts = (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  site: Ref<string>
) => {
  /** The lists as they are on screen; drag and drop replaces them through setCategory. */
  const groups = ref<ProductsByCategory>(emptyProductsByCategory())
  const isLoading = ref(false)
  const hasLoadError = ref(false)
  const isSavingOrder = ref(false)
  const isSyncing = ref(false)

  function show(products: readonly AdminProduct[]) {
    groups.value = groupProductsByCategory(products)
  }

  async function fetchProducts() {
    isLoading.value = true
    hasLoadError.value = false
    try {
      const { data } = await apolloClient.query({
        query: AdminProductsDocument,
        variables: { site: site.value as SiteEnum },
        fetchPolicy: 'network-only'
      })
      show(data.adminProducts)
    } catch (e) {
      groups.value = emptyProductsByCategory()
      hasLoadError.value = true
    } finally {
      isLoading.value = false
    }
  }

  function setCategory(category: keyof ProductsByCategory, products: AdminProduct[]) {
    groups.value = { ...groups.value, [category]: products }
  }

  /** Puts an edited package back in its list, where it was. */
  function replaceProduct(updated: AdminProduct) {
    const next = { ...groups.value }
    for (const category of Object.keys(next) as Array<keyof ProductsByCategory>) {
      next[category] = next[category].map((product) =>
        product.id === updated.id ? updated : product
      )
    }
    groups.value = next
  }

  async function saveOrder(): Promise<SaveOrderResult> {
    isSavingOrder.value = true
    try {
      const { data } = await apolloClient.mutate({
        mutation: UpdateProductsOrderDocument,
        variables: {
          site: site.value as SiteEnum,
          input: buildProductsOrderInput(groups.value)
        }
      })
      const result = data?.updateProductsOrder
      if (result?.__typename === 'AdminProductList') {
        show(result.products)
        return 'saved'
      }

      return result?.__typename === 'ProductNotFound' ? 'not_found' : 'error'
    } catch (e) {
      return 'error'
    } finally {
      isSavingOrder.value = false
    }
  }

  async function sync(): Promise<boolean> {
    isSyncing.value = true
    try {
      const { data } = await apolloClient.mutate({
        mutation: SyncProductsDocument,
        variables: { site: site.value as SiteEnum }
      })
      show(data?.syncProducts ?? [])
      return true
    } catch (e) {
      return false
    } finally {
      isSyncing.value = false
    }
  }

  return {
    groups,
    isLoading,
    hasLoadError,
    isSavingOrder,
    isSyncing,
    fetchProducts,
    setCategory,
    replaceProduct,
    saveOrder,
    sync
  }
}
