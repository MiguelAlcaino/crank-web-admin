<script setup lang="ts">
import { inject, ref } from 'vue'

// Interfaces and Services
import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { usePaymentLinkCrud } from '../composables/usePaymentLinkCrud'

// UI Components
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import PaymentLinkForm from './PaymentLinkForm.vue'

// Dependency Injection
const apiService = inject<ApiService>('gqlApiService')!
const { createPaymentLink } = usePaymentLinkCrud(apiService)

// Local States
const modalIsVisible = ref(false)
const isSaving = ref(false)

// States for Error and Success Handling
const successModalIsVisible = ref(false)
const errorMessage = ref('')
const errorModalIsVisible = ref(false)

// Reference to the form component
const formRef = ref<InstanceType<typeof PaymentLinkForm> | null>(null)

// Open the main modal
const openModal = () => {
  modalIsVisible.value = true
}

// Close the main modal
const closeModal = () => {
  modalIsVisible.value = false
}

// Save logic
const submitForm = async () => {
  // 1. Check child component is mounted
  if (!formRef.value) return

  // 2. Ask the child to validate and give us the clean data
  const data = await formRef.value.validateAndGetValues()

  if (data) {
    try {
      isSaving.value = true

      // 3. Call API to create
      const success = await createPaymentLink({
        title: data.title,
        currency: data.currency!.code,
        site: data.site!.code,
        amount: data.amount!,
        notificationEmailAddress: data.notificationEmailAddress!
      })

      if (success) {
        closeModal()
        successModalIsVisible.value = true
      } else {
        errorMessage.value = ERROR_UNKNOWN
        errorModalIsVisible.value = true
      }
    } catch (error) {
      errorMessage.value = ERROR_UNKNOWN
      errorModalIsVisible.value = true
    } finally {
      isSaving.value = false
    }
  }
}

// Close success modal
function onSuccessOk() {
  successModalIsVisible.value = false
}
</script>

<template>
  <!-- Button -->
  <DefaultButtonComponent text="Create payment link" type="button" @on-click="openModal()" />

  <!-- Modal -->
  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <!-- Header -->
            <div class="modal-header border-0">
              <h5 class="modal-title">Create payment link</h5>
              <button type="button" class="close" @click="closeModal"><span>&times;</span></button>
            </div>

            <!-- Body-->
            <div class="modal-body">
              <PaymentLinkForm ref="formRef" />
            </div>

            <!-- Footer: Specific actions for Create (Cancel, Create) -->
            <div class="modal-footer border-0">
              <DefaultButtonComponent
                text="Cancel"
                type="button"
                :disabled="isSaving"
                variant="secondary"
                @on-click="closeModal"
              />
              <DefaultButtonComponent
                text="Create payment link"
                type="button"
                :is-loading="isSaving"
                @on-click="submitForm"
              />
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
    message="Payment link successfully created."
    :closable="false"
    @on-ok="onSuccessOk"
    :cancel-text="null"
  >
  </ModalComponent>
</template>

<style scoped></style>
