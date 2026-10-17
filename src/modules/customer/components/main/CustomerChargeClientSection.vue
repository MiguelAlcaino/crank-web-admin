<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import {
  defaultChargeEmailBody,
  priceWithVat,
  useChargeClient
} from '../../composables/useChargeClient'

interface Props {
  apolloClient: ApolloClient<NormalizedCacheObject>
  customerId: string
  firstName: string
  lastName: string
}

const props = defineProps<Props>()

const { products, isLoading, hasLoadError, isSending, fetchProducts, sendEmail } = useChargeClient(
  props.apolloClient,
  props.customerId
)

const isOpen = ref(false)
const selectedProductId = ref<string | null>(null)
const emailBody = ref('')
const errorMessage = ref<string | null>(null)
const sentTo = ref<string | null>(null)

const selectedProduct = computed(
  () => products.value.find((product) => product.id === selectedProductId.value) ?? null
)

// A new package proposes a new email; the admin can still edit it afterwards.
watch(selectedProduct, (product) => {
  emailBody.value = defaultChargeEmailBody(props.firstName, props.lastName, product?.name ?? null)
})

async function open() {
  isOpen.value = true
  sentTo.value = null
  errorMessage.value = null
  emailBody.value = defaultChargeEmailBody(props.firstName, props.lastName, null)
  await fetchProducts()
}

async function send() {
  if (selectedProductId.value === null) return
  if (!confirm('Send this email to the customer?')) return

  sentTo.value = null
  const outcome = await sendEmail(selectedProductId.value, emailBody.value)
  if (outcome.sent) {
    errorMessage.value = null
    sentTo.value = outcome.recipientEmail
  } else {
    errorMessage.value = outcome.message
  }
}
</script>

<template>
  <div>
    <div class="d-flex align-items-center gap-2 mb-2">
      <h6 class="mb-0">Charge client</h6>
      <button v-if="!isOpen" type="button" class="btn btn-sm btn-success" @click="open">
        Charge a package
      </button>
      <button v-else type="button" class="btn btn-sm btn-outline-secondary" @click="isOpen = false">
        Close
      </button>
    </div>

    <form v-if="isOpen" class="col-lg-8" @submit.prevent="send">
      <div v-if="isLoading" class="text-muted small mb-2">Loading packages...</div>
      <div v-else-if="hasLoadError" class="alert alert-danger">Failed to load the packages.</div>
      <div v-else-if="products.length === 0" class="alert alert-warning">
        There is no package this customer can be charged for in their sites.
      </div>

      <template v-else>
        <div class="mb-2">
          <label for="charge-product" class="form-label small">MB Package</label>
          <select
            id="charge-product"
            v-model="selectedProductId"
            class="form-select form-select-sm"
          >
            <option :value="null" disabled>Choose a package</option>
            <option v-for="product in products" :key="product.id" :value="product.id">
              {{ product.site.name }} - {{ product.name }} AED {{ priceWithVat(product.price) }}
            </option>
          </select>
        </div>
        <div class="mb-2">
          <label for="charge-amount" class="form-label small">Amount charged (VAT included)</label>
          <input
            id="charge-amount"
            class="form-control form-control-sm"
            disabled
            :value="selectedProduct ? `AED ${priceWithVat(selectedProduct.price)}` : ''"
          />
        </div>
        <div class="mb-2">
          <label for="charge-email-body" class="form-label small">
            Email body ([#link] becomes the purchase link)
          </label>
          <textarea
            id="charge-email-body"
            v-model="emailBody"
            class="form-control form-control-sm"
            rows="7"
          ></textarea>
        </div>

        <div v-if="sentTo" class="alert alert-success">An email was sent to {{ sentTo }}.</div>
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

        <button
          type="submit"
          class="btn btn-primary btn-sm"
          :disabled="selectedProductId === null || isSending || emailBody.trim() === ''"
        >
          Send email
          <span v-if="isSending" class="spinner-border spinner-border-sm"></span>
        </button>
      </template>
    </form>
  </div>
</template>
