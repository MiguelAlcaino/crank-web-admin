<script setup lang="ts">
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

import type { GiftCard } from '../interfaces'

import { useGiftCardEdit } from '../composables/userGiftCardEdit'
import { inject } from 'vue'
import type { ApiService } from '@/services/apiService'

interface Props {
  giftCard: GiftCard
}

defineProps<Props>()

const emits = defineEmits<{
  (e: 'afterUpdateGiftCard', event: GiftCard): void
}>()

const {
  modalIsVisible,
  isSaving,
  formData,
  v$,
  hasError,
  isSuccessful,
  openModal,
  closeModal,
  submitForm,
  onOkSuccess
} = useGiftCardEdit(inject<ApiService>('gqlApiService')!, emits)
</script>

<template>
  <DefaultButtonComponent
    text="Edit"
    size="sm"
    type="button"
    @on-click="openModal(giftCard)"
  ></DefaultButtonComponent>

  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">EDIT</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="closeModal">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitForm" autocomplete="off">
                <!-- Grand Total -->
                <div class="form-row">
                  <div class="col-md-6 mb-3">
                    <label for="grandTotal" class="input-label">Grand Total *</label>
                    <div class="input-group">
                      <input
                        id="grandTotal"
                        class="form-control"
                        v-model="formData.grandTotal"
                        type="number"
                        placeholder="Grand Total"
                        required
                        step="1"
                      />
                    </div>

                    <small
                      v-for="error in v$.grandTotal.$errors"
                      :key="error.$uid"
                      class="form-text"
                      style="color: red"
                    >
                      {{ error.$message }}
                    </small>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer border-0">
              <DefaultButtonComponent
                text="Cancel"
                type="button"
                :disabled="isSaving"
                variant="secondary"
                @on-click="closeModal"
              ></DefaultButtonComponent>

              <DefaultButtonComponent
                text="UPDATE"
                type="button"
                :is-loading="isSaving"
                @on-click="submitForm"
              ></DefaultButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- Success Modal -->
  <ModalComponent
    v-if="isSuccessful"
    title="SUCCESS"
    :message="'GIFTCARD WAS SUCCESSFULLY UPDATED.'"
    :closable="false"
    @on-ok="onOkSuccess"
    :cancel-text="null"
  >
  </ModalComponent>

  <!-- Error Modal -->
  <ModalComponent
    v-if="hasError"
    title="Error"
    :message="ERROR_UNKNOWN"
    :cancel-text="null"
    @on-ok="hasError = false"
  >
  </ModalComponent>
</template>

<style lang="css" scoped></style>
