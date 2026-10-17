<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useToast } from '@/modules/shared/composables/useToast'
import { useAvailableSites } from '@/modules/shared/composables/useAvailableSites'
import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'
import AdminProductCategoryList from '../components/AdminProductCategoryList.vue'
import AdminProductEditModal from '../components/AdminProductEditModal.vue'
import { useAdminProducts } from '../composables/useAdminProducts'
import { PRODUCT_CATEGORIES, type AdminProduct } from '../composables/adminProducts'

/*
 * Packages of crank-payments main's local Product entity (the legacy Twig /admin/product page):
 * five category lists reordered by drag and drop, the edit form and the Mindbody sync.
 */
const route = useRoute()
const toast = useToast()
const apolloClient = newAuthenticatedApolloClient(import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL)
const { sites, fetchSites } = useAvailableSites(apolloClient)

const site = computed(() => route.params.site as string)
const siteName = computed(
  () => sites.value.find((candidate) => candidate.code === site.value)?.name ?? site.value
)

const {
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
} = useAdminProducts(apolloClient, site)

const editedProduct = ref<AdminProduct | null>(null)

async function handleSaveOrder() {
  const result = await saveOrder()
  if (result === 'saved') {
    toast.success('Packages order updated.')
  } else if (result === 'not_found') {
    toast.error('A package in the list no longer exists. Nothing was changed; reload and retry.')
  } else {
    toast.error('The packages order could not be saved.')
  }
}

async function handleSync() {
  if (await sync()) {
    toast.success('Packages synchronized with Mindbody.')
  } else {
    toast.error('The packages could not be synchronized with Mindbody.')
  }
}

function onSaved(product: AdminProduct) {
  replaceProduct(product)
  editedProduct.value = null
  toast.success(`${product.name} updated.`)
}

watch(site, fetchProducts)

onMounted(() => {
  fetchSites()
  fetchProducts()
})
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="mb-0">Packages {{ siteName }}</h4>
      <div>
        <button
          type="button"
          class="btn btn-primary me-2"
          :disabled="isSyncing || isLoading"
          @click="handleSync"
        >
          Sync with Mindbody
          <span v-if="isSyncing" class="spinner-border spinner-border-sm"></span>
        </button>
        <button
          type="button"
          class="btn btn-success"
          :disabled="isSavingOrder || isLoading || hasLoadError"
          @click="handleSaveOrder"
        >
          Save order
          <span v-if="isSavingOrder" class="spinner-border spinner-border-sm"></span>
        </button>
      </div>
    </div>

    <div class="alert alert-info">
      Drag &amp; drop packages between the sections and set their order, then click "Save order".
      This only sets how packages are displayed on the main page; it does not change how they
      behave.
    </div>

    <div v-if="isLoading" class="text-center py-4">
      <CrankCircularProgressIndicator text="LOADING..."></CrankCircularProgressIndicator>
    </div>

    <div v-else-if="hasLoadError" class="alert alert-danger">Failed to load the packages.</div>

    <div v-else class="row">
      <div class="col-lg-8">
        <AdminProductCategoryList
          v-for="{ category, title } in PRODUCT_CATEGORIES"
          :key="category"
          :title="title"
          :products="groups[category]"
          group-name="admin-products"
          @update:products="setCategory(category, $event)"
          @edit="editedProduct = $event"
        ></AdminProductCategoryList>
      </div>
    </div>

    <AdminProductEditModal
      v-if="editedProduct"
      :key="editedProduct.id"
      :product="editedProduct"
      :apollo-client="apolloClient"
      @saved="onSaved"
      @close="editedProduct = null"
    ></AdminProductEditModal>
  </div>
</template>
