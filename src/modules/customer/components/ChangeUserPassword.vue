<script setup lang="ts">
import { inject, ref, reactive, computed } from 'vue'
import { required, minLength, sameAs, helpers } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

import type { ApiService } from '@/services/apiService'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'

import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { SUCCESS_RESET_PASSWORD } from '@/utils/successMessages'

const apiService = inject<ApiService>('gqlApiService')!

const isSaving = ref<boolean>(false)
const changePasswordModalIsVisible = ref<boolean>(false)
const successModalIsVisible = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)
const errorMessage = ref<string>('')

const checkPass = helpers.regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/)

const newPasswordIsVisible = ref<boolean>(false)
const confirmNewPasswordIsVisible = ref<boolean>(false)

const props = defineProps<{
  userId: string
}>()

const formData = reactive({
  newPassword: '',
  confirmNewPassword: ''
})

const rules = computed(() => {
  return {
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

const submitForm = async () => {
  const isValid = await v$.value.$validate()

  if (isValid) {
    //TODO: implement updateUserPassword

    isSaving.value = true

    isSaving.value = false
  } else {
    console.error('error form')
  }
}

function onClickChangeUserPassword() {
  changePasswordModalIsVisible.value = true
}
</script>

<template>
  <DefaultButtonComponent
    text="Change Password"
    type="button"
    @on-click="onClickChangeUserPassword"
  ></DefaultButtonComponent>

  <transition name="modal" v-if="changePasswordModalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">CHANGE PASSSWORD</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="changePasswordModalIsVisible = false"
                  >&times;</span
                >
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitForm" autocomplete="off">
                <div class="form-row">
                  <!-- new password -->
                  <div class="col-md-12 mb-3">
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
                          <i v-if="newPasswordIsVisible" class="bi bi-eye-slash-fill"></i>
                          <i v-else class="bi bi-eye-fill"></i>
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

                <div class="form-row">
                  <div class="col-md-12 mb-3">
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
                          <i v-if="confirmNewPasswordIsVisible" class="bi bi-eye-slash-fill"></i>
                          <i v-else class="bi bi-eye-fill"></i>
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
              </form>
            </div>
            <div class="modal-footer border-0">
              <DefaultButtonComponent
                text="Cancel"
                type="button"
                :disabled="isSaving"
                variant="secondary"
                @on-click="changePasswordModalIsVisible = false"
              ></DefaultButtonComponent>

              <DefaultButtonComponent
                text="CHANGE"
                type="button"
                :is-loading="isSaving"
                :disabled="isSaving"
                @on-click="submitForm"
              ></DefaultButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- error modal -->
  <ModalComponent
    title="ERROR"
    :message="errorMessage"
    :closable="false"
    v-if="errorModalIsVisible"
    @on-ok="errorModalIsVisible = false"
    :cancel-text="null"
  >
  </ModalComponent>

  <!-- success modal -->
  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    :message="SUCCESS_RESET_PASSWORD"
    :ok-loading="false"
    @on-ok="$router.go(-1)"
    :cancel-text="null"
    :closable="true"
  >
  </ModalComponent>
</template>

<style scoped></style>
