<script setup lang="ts">
import type { ApiService } from '@/services/apiService'
import { computed, inject, reactive, ref } from 'vue'

import 'vue-multiselect/dist/vue-multiselect.min.css'
import {
  helpers,
  required,
  minLength,
  maxLength,
  minValue,
  maxValue,
  email,
  integer
} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import Multiselect from 'vue-multiselect'

import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'

import type { Site } from '@/gql/graphql'

import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { usePaymentLinkCrud } from '../composables/usePaymentLinkCrud'

const apiService = inject<ApiService>('gqlApiService')!

const modalIsVisible = ref<boolean>(false)
const isSaving = ref<boolean>(false)

const successModalIsVisible = ref<boolean>(false)
const errorMessage = ref<string>('')
const errorModalIsVisible = ref<boolean>(false)

const { createPaymentLink, currencyOptions, sites, loadingSites, getAvailableSites } =
  usePaymentLinkCrud(apiService)

const formData = reactive({
  title: '',
  currency: null as { name: string; code: string } | null,
  site: null as Site | null,
  amount: 0 as number,
  notificationEmailAddress: null as string | null
})

const rules = computed(() => {
  return {
    title: {
      required: helpers.withMessage('Title is required', required),
      minLength: helpers.withMessage('Title must be at least 3 characters', minLength(3)),
      maxLength: helpers.withMessage('Title must not exceed 256 characters', maxLength(256))
    },
    currency: {
      required: helpers.withMessage('Currency is required', required)
    },
    notificationEmailAddress: {
      required: helpers.withMessage('Notification email is required', required),
      email: helpers.withMessage('The email address is not valid', email),
      maxLength: helpers.withMessage(
        'Notification email must not exceed 256 characters',
        maxLength(256)
      )
    },
    site: {
      required: helpers.withMessage('Site is required', required)
    },
    amount: {
      required: helpers.withMessage('Amount is required', required),
      minValue: helpers.withMessage('Amount must be greater than 0', minValue(1)),
      maxValue: helpers.withMessage('Amount must not exceed 999999', maxValue(999999)),
      integer: helpers.withMessage('Amount must be an integer', integer)
    }
  }
})

const v$ = useVuelidate(rules, formData, { $scope: false })

const openModal = () => {
  formData.title = ''
  formData.currency = currencyOptions[0]
  formData.site = null
  formData.amount = 0
  formData.notificationEmailAddress = ''

  v$.value.$reset()

  getAvailableSites()

  modalIsVisible.value = true
}

const closeModal = () => {
  modalIsVisible.value = false
}

const submitForm = async () => {
  const isValid = await v$.value.$validate()

  if (isValid) {
    try {
      isSaving.value = true

      const success = await createPaymentLink({
        title: formData.title,
        currency: formData.currency!.code,
        site: formData.site!.code,
        amount: formData.amount,
        notificationEmailAddress: formData.notificationEmailAddress!
      })

      if (success) {
        closeModal()
        successModalIsVisible.value = true
      } else {
        errorModalIsVisible.value = true
        errorMessage.value = ERROR_UNKNOWN
      }
    } catch (error) {
      errorModalIsVisible.value = true
      errorMessage.value = ERROR_UNKNOWN
    } finally {
      isSaving.value = false
    }
  }
}

function onConfirmSuccessModal() {
  successModalIsVisible.value = false
}
</script>

<template>
  <DefaultButtonComponent text="Create payment link" type="button" @on-click="openModal()" />

  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">Create payment link</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="closeModal">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitForm" autocomplete="off">
                <!-- Title -->
                <div class="form-row mb-3">
                  <div class="col">
                    <label for="title" class="input-label">Title *</label>
                    <div class="input-group">
                      <input
                        id="title"
                        class="form-control"
                        v-model="formData.title"
                        type="text"
                        placeholder="Title"
                        required
                        maxlength="256"
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
                </div>
                <!-- Amount -->
                <div class="form-row mb-3">
                  <div class="col">
                    <label for="amount" class="input-label">Amount *</label>
                    <div class="input-group">
                      <input
                        id="amount"
                        class="form-control"
                        v-model="formData.amount"
                        type="number"
                        step="1"
                        min="0"
                        placeholder="Amount"
                        required
                      />
                    </div>

                    <small
                      v-for="error in v$.amount.$errors"
                      :key="error.$uid"
                      class="form-text"
                      style="color: red"
                    >
                      {{ error.$message }}
                    </small>
                  </div>
                </div>
                <!-- Currency -->
                <div class="form-row mb-3">
                  <div class="col">
                    <label class="input-label">Currency *</label>
                    <div>
                      <multiselect
                        v-model="formData.currency"
                        :options="currencyOptions"
                        :multiple="false"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select a currency"
                        label="name"
                        track-by="code"
                        :preselect-first="false"
                        class="custom-multiselect"
                        :loading="false"
                        :searchable="false"
                        :allow-empty="false"
                        deselectLabel=""
                      >
                      </multiselect>
                    </div>

                    <small
                      v-for="error in v$.currency.$errors"
                      :key="error.$uid"
                      class="form-text"
                      style="color: red"
                    >
                      {{ error.$message }}
                    </small>
                  </div>
                </div>

                <!-- Notification Email Address -->
                <div class="form-row mb-3">
                  <div class="col">
                    <label for="notificationEmailAddress" class="input-label"
                      >Notification Email *</label
                    >
                    <div class="input-group">
                      <input
                        id="notificationEmailAddress"
                        class="form-control"
                        v-model="formData.notificationEmailAddress"
                        type="email"
                        placeholder="notification@example.com"
                        required
                        maxlength="256"
                      />
                    </div>

                    <small
                      v-for="error in v$.notificationEmailAddress.$errors"
                      :key="error.$uid"
                      class="form-text"
                      style="color: red"
                    >
                      {{ error.$message }}
                    </small>
                  </div>
                </div>

                <!-- Site -->
                <div class="form-row mb-3">
                  <div class="col">
                    <label class="input-label">Site *</label>
                    <div>
                      <multiselect
                        v-model="formData.site"
                        :options="sites"
                        :multiple="false"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Select a site"
                        label="name"
                        track-by="code"
                        :preselect-first="false"
                        class="custom-multiselect"
                        :loading="loadingSites"
                        :searchable="false"
                        :allow-empty="false"
                        deselect-label=""
                      >
                      </multiselect>
                    </div>

                    <small
                      v-for="error in v$.site.$errors"
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
                text="Create payment link"
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
    @on-ok="onConfirmSuccessModal"
    :cancel-text="null"
  >
  </ModalComponent>
</template>

<style scoped></style>

<style>
.custom-multiselect .multiselect__tag {
  background-color: #ff7f61;
}

.custom-multiselect .multiselect__tag-icon {
  color: #fff;
}

.custom-multiselect .multiselect__option--highlight {
  background-color: #ff7f61;
  color: #fff;
}

.custom-multiselect .multiselect__option--highlight::after {
  background-color: #ff7f61;
}

.custom-multiselect .multiselect__spinner {
  border-top-color: #ff7f61;
}

.multiselect__spinner::after,
.multiselect__spinner::before {
  border-color: #ff7f61 transparent transparent;
}
</style>
