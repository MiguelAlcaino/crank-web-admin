<script setup lang="ts">
import { inject, ref, computed } from 'vue'

// Interfaces and Services
import type { ApiService } from '@/services/apiService'
import type { PaymentLink } from '../interfaces'
import { usePaymentLinkCrud } from '../composables/usePaymentLinkCrud'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

// UI Components
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import PaymentLinkDelete from './PaymentLinkDelete.vue'
import PaymentLinkForm from './PaymentLinkForm.vue'

// Props: We receive the object to edit
const props = defineProps<{
  paymentLink: PaymentLink
}>()

// Dependency Injection
const apiService = inject<ApiService>('gqlApiService')!
const { updatePaymentLink, currencyOptions } = usePaymentLinkCrud(apiService)

// Local States
const modalIsVisible = ref<boolean>(false)
const isSaving = ref<boolean>(false)

// States for Error and Success Handling
const successModalIsVisible = ref<boolean>(false)
const errorMessage = ref<string>('')
const errorModalIsVisible = ref<boolean>(false)

// Reference to the form component
const formRef = ref<InstanceType<typeof PaymentLinkForm> | null>(null)

/**
 * We calculate the initial data for the form.
 * We transform flat data (strings) into objects if the form requires it (e.g., Currency).
 */
const initialData = computed(() => {
  return {
    title: props.paymentLink.title,
    amount: props.paymentLink.amount,
    currency: currencyOptions.find((c) => c.code === props.paymentLink.currency) || null,
    notificationEmailAddress: props.paymentLink.notificationEmailAddress,
    site: props.paymentLink.site
  }
})

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

      // 3. Call API to update
      const success = await updatePaymentLink({
        id: props.paymentLink.id,
        title: data.title,
        amount: data.amount!,
        currency: data.currency!.code,
        notificationEmailAddress: data.notificationEmailAddress!,
        site: data.site!.code
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
  <!-- Pencil Button to open edit modal -->
  <button type="button" class="btn btn-link btn-sm" @click="openModal">
    <i class="bi bi-pencil-fill"></i>
  </button>

  <!-- Modal -->
  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <!-- Header -->
            <div class="modal-header border-0">
              <h5 class="modal-title">Edit payment link '{{ paymentLink?.title }}'</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="closeModal">&times;</span>
              </button>
            </div>

            <!-- Body-->
            <div class="modal-body">
              <!-- We pass initial-data to pre-fill the form -->
              <PaymentLinkForm ref="formRef" :initial-data="initialData" />
            </div>

            <!-- Footer: Specific actions for Edit (Delete, Cancel, Update) -->
            <div class="modal-footer border-0 d-flex justify-content-between">
              <!-- Delete Button (Left) -->
              <div>
                <PaymentLinkDelete :payment-link="paymentLink"></PaymentLinkDelete>
              </div>

              <!-- Cancel and Update Buttons (Right) -->
              <div>
                <DefaultButtonComponent
                  text="Cancel"
                  type="button"
                  :disabled="isSaving"
                  variant="secondary"
                  @on-click="closeModal"
                ></DefaultButtonComponent>

                <DefaultButtonComponent
                  text="Update"
                  type="button"
                  :is-loading="isSaving"
                  :disabled="isSaving"
                  @on-click="submitForm"
                  class="ml-2"
                >
                </DefaultButtonComponent>
              </div>
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
    message="Payment link successfully updated."
    :closable="false"
    @on-ok="onSuccessOk"
    :cancel-text="null"
  >
  </ModalComponent>
</template>

<style scoped></style>
