<script setup lang="ts">
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

import type { ClassPackage } from '../interfaces'

import { useClassPackageEdit } from '../composables/useClassPackageEdit'
import { inject } from 'vue'
import type { ApiService } from '@/services/apiService'
import { BillingIntervalEnum } from '@/gql/graphql'

interface Props {
  classPackage: ClassPackage
}

defineProps<Props>()

const emits = defineEmits<{
  (e: 'afterUpdateClassPackage', event: ClassPackage): void
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
} = useClassPackageEdit(inject<ApiService>('gqlApiService')!, emits)

const billingIntervalOptions = Object.values(BillingIntervalEnum)
</script>

<template>
  <DefaultButtonComponent
    text="Edit"
    size="sm"
    type="button"
    @on-click="openModal(classPackage)"
  ></DefaultButtonComponent>

  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">EDIT PACKAGE</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="closeModal">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitForm" autocomplete="off">
                <!-- Title -->
                <div class="form-row">
                  <div class="col-md-6 mb-3">
                    <label for="title" class="input-label">Title *</label>
                    <div class="input-group">
                      <input
                        id="title"
                        class="form-control"
                        v-model="formData.title"
                        type="text"
                        placeholder="Title"
                        required
                      />
                    </div>
                    <small
                      v-for="error in v$.title.$errors"
                      :key="error.$uid"
                      class="form-text"
                      style="color: red"
                    >
                      {{ error.$message }}
                    </small>
                  </div>

                  <!-- Subtitle -->
                  <div class="col-md-6 mb-3">
                    <label for="subtitle" class="input-label">Subtitle</label>
                    <div class="input-group">
                      <input
                        id="subtitle"
                        class="form-control"
                        v-model="formData.subtitle"
                        type="text"
                        placeholder="Subtitle"
                      />
                    </div>
                  </div>
                </div>

                <!-- Button Text & Currency -->
                <div class="form-row">
                  <div class="col-md-6 mb-3">
                    <label for="buttonText" class="input-label">Button Text</label>
                    <div class="input-group">
                      <input
                        id="buttonText"
                        class="form-control"
                        v-model="formData.buttonText"
                        type="text"
                        placeholder="Button Text"
                      />
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="currency" class="input-label">Currency</label>
                    <div class="input-group">
                      <input
                        id="currency"
                        class="form-control"
                        v-model="formData.currency"
                        type="text"
                        placeholder="Currency"
                      />
                    </div>
                  </div>
                </div>

                <!-- Checkboxes -->
                <div class="form-row">
                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input
                        id="isVisible"
                        class="form-check-input"
                        v-model="formData.isVisible"
                        type="checkbox"
                      />
                      <label class="form-check-label" for="isVisible">Is Visible</label>
                    </div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input
                        id="isMembership"
                        class="form-check-input"
                        v-model="formData.isMembership"
                        type="checkbox"
                      />
                      <label class="form-check-label" for="isMembership">Is Membership</label>
                    </div>
                  </div>

                  <div class="col-md-4 mb-3" v-if="formData.isMembership">
                    <label for="billingInterval" class="input-label">Billing Interval</label>
                    <select
                      id="billingInterval"
                      class="form-control"
                      v-model="formData.billingInterval"
                    >
                      <option value="">None</option>
                      <option v-for="opt in billingIntervalOptions" :key="opt" :value="opt">
                        {{ opt }}
                      </option>
                    </select>
                  </div>

                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input
                        id="isTrialPackage"
                        class="form-check-input"
                        v-model="formData.isTrialPackage"
                        type="checkbox"
                      />
                      <label class="form-check-label" for="isTrialPackage">Is Trial Package</label>
                    </div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input
                        id="isCLassPassPackage"
                        class="form-check-input"
                        v-model="formData.isCLassPassPackage"
                        type="checkbox"
                      />
                      <label class="form-check-label" for="isCLassPassPackage"
                        >Is ClassPass Package</label
                      >
                    </div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input
                        id="doesItRequiredSmsAuth"
                        class="form-check-input"
                        v-model="formData.doesItRequiredSmsAuth"
                        type="checkbox"
                      />
                      <label class="form-check-label" for="doesItRequiredSmsAuth"
                        >Requires SMS Auth</label
                      >
                    </div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <div class="form-check">
                      <input
                        id="doestItActivateVodForClients"
                        class="form-check-input"
                        v-model="formData.doestItActivateVodForClients"
                        type="checkbox"
                      />
                      <label class="form-check-label" for="doestItActivateVodForClients"
                        >Activates VOD</label
                      >
                    </div>
                  </div>
                </div>

                <!-- VOD Amount of Days (conditional) -->
                <div class="form-row" v-if="formData.doestItActivateVodForClients">
                  <div class="col-md-6 mb-3">
                    <label for="vodAmountOfDays" class="input-label">VOD Amount of Days</label>
                    <div class="input-group">
                      <input
                        id="vodAmountOfDays"
                        class="form-control"
                        v-model.number="formData.vodAmountOfDays"
                        type="number"
                        placeholder="VOD Amount of Days"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <!-- Alert Before Purchasing -->
                <hr />
                <h6>Alert Before Purchasing</h6>
                <div class="form-row">
                  <div class="col-md-6 mb-3">
                    <label for="alertTitle" class="input-label">Alert Title</label>
                    <div class="input-group">
                      <input
                        id="alertTitle"
                        class="form-control"
                        v-model="formData.alertTitle"
                        type="text"
                        placeholder="Alert Title"
                      />
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="alertDescription" class="input-label">Alert Description</label>
                    <div class="input-group">
                      <input
                        id="alertDescription"
                        class="form-control"
                        v-model="formData.alertDescription"
                        type="text"
                        placeholder="Alert Description"
                      />
                    </div>
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
    :message="'PACKAGE WAS SUCCESSFULLY UPDATED.'"
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
