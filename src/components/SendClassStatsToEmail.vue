<script setup lang="ts">
import { computed, inject, reactive, ref } from 'vue'

import type { ApiService } from '@/services/apiService'

import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { email, helpers, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const apiService = inject<ApiService>('gqlApiService')!

const props = defineProps<{
  enrollmentId: string
  userEmail: string
}>()

const isLoading = ref<boolean>(false)
const successModalIsVisible = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)
const modalIsVisible = ref<boolean>(false)

const sendEmailForm = reactive({
  email: ''
})

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('The email address is not valid', email)
    }
  }
})

const v$ = useVuelidate(rules, sendEmailForm)

async function onClickConfirm() {
  const isValid = await v$.value.$validate()

  if (isValid) {
    isLoading.value = true

    try {
      const success = await apiService.sendClassStatsToEmail(
        sendEmailForm.email,
        props.enrollmentId
      )
      if (success) {
        successModalIsVisible.value = true
      } else {
        errorModalIsVisible.value = true
      }
    } catch (error) {
      errorModalIsVisible.value = true
    } finally {
      modalIsVisible.value = false
      isLoading.value = false
    }
  } else {
    console.error('error form')
  }
}

function openModal() {
  sendEmailForm.email = props.userEmail
  modalIsVisible.value = true
}
</script>

<template>
  <div>
    <DefaultButtonComponent
      text="Resend email"
      type="button"
      @on-click="openModal()"
    ></DefaultButtonComponent>

    <transition name="modal" v-if="modalIsVisible">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header border-0">
                <h5 class="modal-title">Resend email</h5>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-12">
                    <form @submit.prevent="onClickConfirm" autocomplete="off">
                      <div class="form-row">
                        <div class="col-md-12 mb-3">
                          <label for="emailRegistration" class="input-label">Email *</label>
                          <input
                            type="email"
                            v-model="sendEmailForm.email"
                            class="form-control"
                            id="emailRegistration"
                            maxlength="200"
                            placeholder="Email"
                            required
                          />
                          <small
                            v-for="error in v$.email.$errors"
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
                </div>
              </div>
              <div class="modal-footer border-0">
                <DefaultButtonComponent
                  text="Cancel"
                  type="button"
                  variant="secondary"
                  :disabled="isLoading"
                  @on-click="modalIsVisible = false"
                ></DefaultButtonComponent>

                <DefaultButtonComponent
                  text="Send email"
                  type="button"
                  :is-loading="isLoading"
                  @on-click="onClickConfirm()"
                ></DefaultButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Success Modal -->
    <ModalComponent
      v-if="successModalIsVisible"
      title="SUCCESS"
      message="EMAIL SENT SUCCESSFULLY."
      :closable="false"
      @on-ok="successModalIsVisible = false"
      :cancel-text="null"
    >
    </ModalComponent>

    <!-- Error Modal -->
    <ModalComponent
      title="Error"
      :message="ERROR_UNKNOWN"
      :closable="false"
      v-if="errorModalIsVisible"
      @on-ok="errorModalIsVisible = false"
      :cancel-text="null"
    >
    </ModalComponent>
  </div>
</template>

<style scoped></style>
