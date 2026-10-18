<script setup lang="ts">
import { ref } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import { parseMindbodySaleId, recordTransactionFromMindbodySale } from '../recordFromMindbodySale'
import type { IncompleteTransactionFeedback } from '../composables/useIncompleteTransactionFeedbacks'

interface Props {
  feedback: IncompleteTransactionFeedback
  apolloClient: ApolloClient<NormalizedCacheObject>
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'recorded'): void
  (e: 'close'): void
}>()

const saleIdInput = ref('')
const isSaving = ref(false)
const errorMessage = ref<string | null>(null)

async function submit() {
  const mindbodySaleId = parseMindbodySaleId(saleIdInput.value)
  if (mindbodySaleId === null) {
    errorMessage.value = 'Enter the Mindbody sale id: a positive whole number.'
    return
  }

  errorMessage.value = null
  isSaving.value = true
  try {
    const outcome = await recordTransactionFromMindbodySale(
      props.apolloClient,
      props.feedback.id,
      mindbodySaleId
    )
    if (outcome.recorded) {
      emits('recorded')
      return
    }
    errorMessage.value = outcome.message
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="modal-mask">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Record from Mindbody sale</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="emits('close')"
          ></button>
        </div>
        <form @submit.prevent="submit" autocomplete="off">
          <div class="modal-body">
            <p class="mb-2">
              Merchant reference <strong>{{ feedback.merchantReference ?? '-' }}</strong>
              <template v-if="feedback.siteCustomer?.identifiableUser?.user">
                &middot; {{ feedback.siteCustomer.identifiableUser.user.firstName }}
                {{ feedback.siteCustomer.identifiableUser.user.lastName }}
                ({{ feedback.siteCustomer.identifiableUser.user.email }})
              </template>
            </p>
            <div class="alert alert-warning small">
              Use only after checking in Mindbody that this sale is this customer's purchase of this
              package. The transaction is completed from the sale without buying it again, as if the
              payment had gone through: the purchase email, VOD and membership follow.
            </div>
            <label for="record-sale-id" class="form-label">Mindbody sale id</label>
            <input
              id="record-sale-id"
              v-model="saleIdInput"
              class="form-control"
              type="text"
              inputmode="numeric"
              placeholder="e.g. 72463"
              :disabled="isSaving"
            />
            <div v-if="errorMessage" class="alert alert-danger mt-3 mb-0" role="alert">
              {{ errorMessage }}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="emits('close')">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="isSaving">
              Record sale
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
