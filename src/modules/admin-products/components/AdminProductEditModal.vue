<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import { UpdateProductDocument } from '@/gql-main/graphql'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import {
  formToUpdateProductInput,
  productFormError,
  productToForm,
  updateProductErrorMessage,
  type AdminProduct
} from '../composables/adminProducts'

interface Props {
  product: AdminProduct
  apolloClient: ApolloClient<NormalizedCacheObject>
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'saved', product: AdminProduct): void
  (e: 'close'): void
}>()

const form = reactive(productToForm(props.product))
const isSaving = ref(false)
const errorMessage = ref<string | null>(null)

async function submit() {
  errorMessage.value = productFormError(form)
  if (errorMessage.value !== null) {
    return
  }

  isSaving.value = true
  try {
    const { data } = await props.apolloClient.mutate({
      mutation: UpdateProductDocument,
      variables: { id: props.product.id, input: formToUpdateProductInput(form) }
    })
    const result = data?.updateProduct
    if (!result) {
      errorMessage.value = ERROR_UNKNOWN
      return
    }
    if (result.__typename === 'AdminProduct') {
      emits('saved', result)
      return
    }
    errorMessage.value = updateProductErrorMessage(result)
  } catch (e) {
    errorMessage.value = ERROR_UNKNOWN
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="modal-mask">
    <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editing {{ product.name }}</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="emits('close')"
          ></button>
        </div>
        <form @submit.prevent="submit" autocomplete="off">
          <div class="modal-body">
            <table class="table table-sm align-middle">
              <tbody>
                <tr>
                  <th>Mindbody ID</th>
                  <td>{{ product.mindbodyId }}</td>
                </tr>
                <tr>
                  <th>Mindbody title</th>
                  <td>{{ product.name }}</td>
                </tr>
                <tr>
                  <th>Mindbody price</th>
                  <td>AED {{ Math.round(product.price) }}</td>
                </tr>
              </tbody>
            </table>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="product-custom-title" class="form-label">Custom title</label>
                <input
                  id="product-custom-title"
                  v-model="form.customTitle"
                  class="form-control"
                  type="text"
                  :placeholder="product.name"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="product-subtitle" class="form-label">Subtitle</label>
                <input id="product-subtitle" v-model="form.subtitle" class="form-control" />
              </div>
              <div class="col-md-6 mb-3">
                <label for="product-pay-button" class="form-label">Text inside Pay button</label>
                <input id="product-pay-button" v-model="form.textPayButton" class="form-control" />
              </div>
              <div class="col-md-6 mb-3">
                <label for="product-error-message" class="form-label">
                  Error message when it's not possible to purchase the package
                </label>
                <input
                  id="product-error-message"
                  v-model="form.errorMessageWhenTryingToPurchase"
                  class="form-control"
                />
              </div>
              <div class="col-md-12 mb-3">
                <label for="product-popup-title" class="form-label">
                  Terms and conditions popup's title
                </label>
                <input
                  id="product-popup-title"
                  v-model="form.popupTitleAfterClickOnBuy"
                  class="form-control"
                />
              </div>
              <div class="col-md-12 mb-3">
                <label for="product-popup-description" class="form-label">
                  Terms and conditions displayed in a popup
                </label>
                <textarea
                  id="product-popup-description"
                  v-model="form.popupDescriptionAfterClickOnBuy"
                  class="form-control"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div class="form-check mb-2">
              <input
                id="product-is-visible"
                v-model="form.isVisible"
                class="form-check-input"
                type="checkbox"
              />
              <label class="form-check-label" for="product-is-visible">
                Is visible? (If not checked, it is hidden from the index but still purchasable
                directly from a link)
              </label>
            </div>
            <div class="form-check mb-2">
              <input
                id="product-is-membership"
                v-model="form.isMembership"
                class="form-check-input"
                type="checkbox"
              />
              <label class="form-check-label" for="product-is-membership">Is membership?</label>
            </div>
            <div class="form-check mb-2">
              <input
                id="product-is-trial"
                v-model="form.isTrialPackage"
                class="form-check-input"
                type="checkbox"
              />
              <label class="form-check-label" for="product-is-trial">Is trial package?</label>
            </div>
            <div class="form-check mb-2">
              <input
                id="product-is-class-pass"
                v-model="form.isClassPassPackage"
                class="form-check-input"
                type="checkbox"
              />
              <label class="form-check-label" for="product-is-class-pass">
                Is ClassPass package?
              </label>
            </div>
            <div class="form-check mb-3">
              <input
                id="product-requires-sms"
                v-model="form.doesItRequireSmsVerification"
                class="form-check-input"
                type="checkbox"
              />
              <label class="form-check-label" for="product-requires-sms">
                Does it require SMS authentication?
              </label>
            </div>

            <h6>VOD</h6>
            <div class="form-check mb-2">
              <input
                id="product-muvi-enabled"
                v-model="form.muviEnabled"
                class="form-check-input"
                type="checkbox"
              />
              <label class="form-check-label" for="product-muvi-enabled">
                Does it activate VOD for clients?
              </label>
            </div>
            <div v-if="form.muviEnabled" class="mb-3 col-md-6">
              <label for="product-muvi-days" class="form-label">
                How many VOD days does this package provide?
              </label>
              <input
                id="product-muvi-days"
                v-model.number="form.muviNumberOfDays"
                class="form-control"
                type="number"
                min="1"
              />
            </div>

            <div v-if="errorMessage" class="alert alert-danger mb-0">{{ errorMessage }}</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="emits('close')">Cancel</button>
            <button type="submit" class="btn btn-success" :disabled="isSaving">
              Update
              <span v-if="isSaving" class="spinner-border spinner-border-sm"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  width: 100%;
}
</style>
