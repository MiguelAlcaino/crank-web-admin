<script setup lang="ts">
import { inject, ref } from 'vue'
import type { PaymentLink } from '../interfaces'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import type { ApiService } from '@/services/apiService'
import { usePaymentLinkCrud } from '../composables/usePaymentLinkCrud'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'

const apiService = inject<ApiService>('gqlApiService')!
const { deletePaymentLink } = usePaymentLinkCrud(apiService)

const props = defineProps<{
  paymentLink: PaymentLink
}>()

const isLoading = ref<boolean>(false)
const modalIsVisible = ref<boolean>(false)
const successModalIsVisible = ref<boolean>(false)
const errorMessage = ref<string>('')
const errorModalIsVisible = ref<boolean>(false)
const deleteButtonIsVisible = ref<boolean>(true)

function closeModal() {
  modalIsVisible.value = false
}

async function onConfirmDelete() {
  try {
    isLoading.value = true

    const success = await deletePaymentLink(props.paymentLink.id)

    if (success) {
      successModalIsVisible.value = true
    } else {
      errorModalIsVisible.value = true
      errorMessage.value = ERROR_UNKNOWN
    }
  } catch (error) {
    errorModalIsVisible.value = true
    errorMessage.value = ERROR_UNKNOWN
  } finally {
    isLoading.value = false
  }
}

function onSuccessOk() {
  successModalIsVisible.value = false
}
</script>

<template>
  <DefaultButtonComponent
    :text="'Delete'"
    :type="'button'"
    :variant="'danger'"
    :is-loading="isLoading"
    @on-click="modalIsVisible = true"
    v-if="deleteButtonIsVisible"
  >
  </DefaultButtonComponent>

  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">Delete payment link</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="closeModal">&times;</span>
              </button>
            </div>
            <div class="modal-body">ARE YOU SURE YOU WANT TO PROCEED?</div>
            <div class="modal-footer border-0">
              <DefaultButtonComponent
                text="Cancel"
                type="button"
                :disabled="isLoading"
                variant="secondary"
                @on-click="closeModal"
              ></DefaultButtonComponent>

              <DefaultButtonComponent
                text="Delete"
                type="button"
                variant="danger"
                :is-loading="isLoading"
                :disabled="isLoading"
                @on-click="onConfirmDelete"
                class="ml-2"
              >
              </DefaultButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <!-- Error Modal -->
  <ModalComponent
    v-if="errorModalIsVisible"
    title="ERROR"
    :message="errorMessage"
    :closable="false"
    @on-ok="errorModalIsVisible = false"
    :cancel-text="null"
  >
  </ModalComponent>

  <!-- Success Modal -->
  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    message="Payment link successfully deleted."
    :closable="false"
    @on-ok="onSuccessOk"
    :cancel-text="null"
  >
  </ModalComponent>
</template>

<style scoped></style>
