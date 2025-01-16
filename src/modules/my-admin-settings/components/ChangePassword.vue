<script setup lang="ts">
import { computed, inject, reactive, ref } from 'vue'

import type { ApiService } from '@/services/apiService'

import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { helpers, minLength, required, sameAs } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const apiService = inject<ApiService>('gqlApiService')!

const isSaving = ref<boolean>(false)

const successModalIsVisible = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)
const errorMessage = ref<string>('')

const currentPasswordIsVisible = ref<boolean>(false)
const newPasswordIsVisible = ref<boolean>(false)
const confirmNewPasswordIsVisible = ref<boolean>(false)

const modalIsVisible = ref<boolean>(false)

const formData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})

const checkPass = helpers.regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/)

const rules = computed(() => {
  return {
    currentPassword: {
      required: helpers.withMessage('Field is required', required)
    },
    newPassword: {
      required: helpers.withMessage('Field is required', required),
      minLength: helpers.withMessage(
        'The password must contain at least 8 characters',
        minLength(8)
      ),
      checkPass: helpers.withMessage('The password must contain a letter and a number', checkPass)
    },
    confirmNewPassword: {
      required: helpers.withMessage('Field is required', required),
      sameAs: helpers.withMessage(
        'The password confirmation does not match',
        sameAs(formData.newPassword)
      )
    }
  }
})

const v$ = useVuelidate(rules, formData)

function onClickChangePassword() {
  formData.newPassword = ''
  formData.confirmNewPassword = ''
  formData.currentPassword = ''
  v$.value.$reset()

  modalIsVisible.value = true
}

const submitForm = async () => {
  const isValid = await v$.value.$validate()

  if (isValid) {
    isSaving.value = true
    var response = await apiService.updateCurrentAdminUserPassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword
    })
    isSaving.value = false

    if (response === 'Success') {
      successModalIsVisible.value = true
    } else {
      if (response === 'PasswordMustContainLetterOrNumberException') {
        errorMessage.value = 'THE PASSWORD MUST CONTAIN A LETTER AND A NUMBER.'
      } else if (response === 'MinimumPasswordLengthException') {
        errorMessage.value = 'THE PASSWORD MUST CONTAIN AT LEAST 8 CHARACTERS.'
      } else if (response === 'IncorrectPasswordException') {
        errorMessage.value = 'INVALID CURRENT PASSWORD.'
      } else {
        errorMessage.value = ERROR_UNKNOWN
      }
      errorModalIsVisible.value = true
    }
  } else {
    console.error('error form')
  }
}

function closeModals() {
  modalIsVisible.value = false
  successModalIsVisible.value = false
  errorModalIsVisible.value = false
}
</script>

<template>
  <DefaultButtonComponent text="Change Password" type="button" @on-click="onClickChangePassword">
  </DefaultButtonComponent>

  <!-- Set Password Modal -->
  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">Change Password</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="modalIsVisible = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitForm" autocomplete="off">
                <div class="form-row">
                  <!-- current password -->
                  <div class="col-12">
                    <label for="currentPassword" class="input-label">Current Password *</label>
                    <div class="input-group">
                      <input
                        id="currentPassword"
                        class="form-control"
                        v-model="formData.currentPassword"
                        :type="currentPasswordIsVisible ? 'text' : 'password'"
                        placeholder="Current Password"
                        maxlength="50"
                        required
                      />
                      <div
                        class="input-group-prepend"
                        @click="currentPasswordIsVisible = !currentPasswordIsVisible"
                        style="cursor: pointer"
                      >
                        <span
                          class="input-group-text"
                          id="currentPasswordEye"
                          style="background-color: transparent"
                        >
                          <i v-if="currentPasswordIsVisible" class="bi bi-eye-fill"></i>
                          <i v-else class="bi bi-eye-slash-fill"></i>
                        </span>
                      </div>
                      <small
                        v-for="error in v$.currentPassword.$errors"
                        :key="error.$uid"
                        class="form-text"
                        style="color: red"
                      >
                        {{ error.$message }}
                      </small>
                    </div>
                  </div>
                </div>
                <!-- new password -->
                <div class="form-row">
                  <div class="col-12">
                    <label for="newPassword" class="input-label">New Password *</label>
                    <div class="input-group">
                      <input
                        id="newPassword"
                        class="form-control"
                        v-model="formData.newPassword"
                        :type="newPasswordIsVisible ? 'text' : 'password'"
                        placeholder="New Password"
                        maxlength="50"
                        required
                      />
                      <div
                        class="input-group-prepend"
                        @click="newPasswordIsVisible = !newPasswordIsVisible"
                        style="cursor: pointer"
                      >
                        <span
                          class="input-group-text"
                          id="newPasswordEye"
                          style="background-color: transparent"
                        >
                          <i v-if="newPasswordIsVisible" class="bi bi-eye-fill"></i>
                          <i v-else class="bi bi-eye-slash-fill"></i>
                        </span>
                      </div>
                    </div>
                    <small
                      v-for="error in v$.newPassword.$errors"
                      :key="error.$uid"
                      class="form-text"
                      style="color: red"
                    >
                      {{ error.$message }}
                    </small>
                  </div>
                </div>
                <!-- Confirm new password -->
                <div class="form-row">
                  <div class="col-12 mb-3">
                    <label for="confirmNewPassword" class="input-label"
                      >Confirm New Password *</label
                    >
                    <div class="input-group">
                      <input
                        id="confirmNewPassword"
                        class="form-control"
                        v-model="formData.confirmNewPassword"
                        :type="confirmNewPasswordIsVisible ? 'text' : 'password'"
                        placeholder="Confirm New Password"
                        maxlength="50"
                        required
                      />
                      <div
                        class="input-group-prepend"
                        @click="confirmNewPasswordIsVisible = !confirmNewPasswordIsVisible"
                        style="cursor: pointer"
                      >
                        <span
                          class="input-group-text"
                          id="confirmNewPasswordEye"
                          style="background-color: transparent"
                        >
                          <i v-if="confirmNewPasswordIsVisible" class="bi bi-eye-fill"></i>
                          <i v-else class="bi bi-eye-slash-fill"></i>
                        </span>
                      </div>
                    </div>
                    <small
                      v-for="error in v$.confirmNewPassword.$errors"
                      :key="error.$uid"
                      class="form-text"
                      style="color: red"
                    >
                      {{ error.$message }}
                    </small>
                  </div>
                </div>
                <br />
                <div class="form-row">
                  <div class="col-md-12 mb-3 text-right">
                    <DefaultButtonComponent
                      text="Cancel"
                      type="button"
                      variant="secondary"
                      @on-click="modalIsVisible = false"
                    ></DefaultButtonComponent>
                    &nbsp;
                    <button class="btn btn-primary" type="submit" :disabled="isSaving">
                      Update Password
                      <span class="spinner-border spinner-border-sm" v-if="isSaving"></span>
                    </button>
                  </div>
                </div>
              </form>
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
    message="YOUR PASSWORD WAS CHANGED."
    :closable="false"
    @on-ok="closeModals"
    :cancel-text="null"
  >
  </ModalComponent>

  <!-- Error Modal -->
  <ModalComponent
    title="Error"
    :message="errorMessage"
    :closable="false"
    v-if="errorModalIsVisible"
    @on-ok="errorModalIsVisible = false"
    :cancel-text="null"
  >
  </ModalComponent>
</template>

<style scoped></style>
