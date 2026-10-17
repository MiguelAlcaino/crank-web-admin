<script setup lang="ts">
import { ref } from 'vue'

import { issueGiftCardFormError, type CustomerGiftCard } from '../composables/useCustomerGiftCards'

interface Props {
  giftCard: CustomerGiftCard
  isIssuing: boolean
  /** Issues the code; answers null on success or the message to show. */
  issue: (giftCardCode: string, pdfGiftCard: File) => Promise<string | null>
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'issued'): void
  (e: 'close'): void
}>()

const giftCardCode = ref('')
const pdfGiftCard = ref<File | null>(null)
const errorMessage = ref<string | null>(null)

function onFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files
  pdfGiftCard.value = files && files.length > 0 ? files[0] : null
}

async function submit() {
  errorMessage.value = issueGiftCardFormError(giftCardCode.value, pdfGiftCard.value)
  if (errorMessage.value !== null || pdfGiftCard.value === null) {
    return
  }

  errorMessage.value = await props.issue(giftCardCode.value, pdfGiftCard.value)
  if (errorMessage.value === null) {
    emits('issued')
  }
}
</script>

<template>
  <div class="modal-mask">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add gift card code</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="emits('close')"
          ></button>
        </div>
        <form @submit.prevent="submit" autocomplete="off">
          <div class="modal-body">
            <div class="alert alert-danger">
              <strong>BE CAREFUL HERE!</strong><br />
              Go to the Mindbody <strong>{{ giftCard.giftCard.site.name }}</strong> admin panel and
              sell <strong>{{ giftCard.giftCard.description }}</strong> to
              <strong>{{ giftCard.customer.user?.email }}</strong
              >, and when paying select <strong>Payfort</strong>.<br />
              Copy the gift card code and paste it here, attach the gift card PDF, then press "Send
              gift card". The PDF is emailed to the customer.
            </div>

            <div class="mb-3">
              <label for="gift-card-code" class="form-label">Gift card code</label>
              <input id="gift-card-code" v-model="giftCardCode" class="form-control" type="text" />
            </div>
            <div class="mb-3">
              <label for="gift-card-pdf" class="form-label">Gift card PDF (max 2048 KB)</label>
              <input
                id="gift-card-pdf"
                class="form-control"
                type="file"
                accept="application/pdf,.pdf"
                @change="onFileChange"
              />
            </div>

            <div v-if="errorMessage" class="alert alert-danger mb-0">{{ errorMessage }}</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="emits('close')">Cancel</button>
            <button type="submit" class="btn btn-success" :disabled="isIssuing">
              Send gift card
              <span v-if="isIssuing" class="spinner-border spinner-border-sm"></span>
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
