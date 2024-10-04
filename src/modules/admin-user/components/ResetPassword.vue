<script setup lang="ts">
import { inject, ref } from 'vue'
import { AdminUser } from '../interfaces'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import { ApiService } from '@/services/apiService'

const apiService = inject<ApiService>('gqlApiService')!

const props = defineProps<{
  adminUser: AdminUser
}>()

const errorModalIsVisible = ref<boolean>(false)
const confirmationModalIsVisible = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const successModalIsVisible = ref<boolean>(false)

async function sendResetPassword() {
  isLoading.value = true

  try {
    const success = await apiService.resetAdminUserPassword(props.adminUser.id)

    if (success) successModalIsVisible.value = true
    else errorModalIsVisible.value = true
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
    confirmationModalIsVisible.value = false
  }
}
</script>

<template>
  <div>
    <DefaultButtonComponent
      text="Reset password"
      type="button"
      @on-click="confirmationModalIsVisible = true"
      variant="secondary"
    />

    <!-- Confirm Modal -->
    <ModalComponent
      v-if="confirmationModalIsVisible"
      title="Reset password"
      :message="`This action will reset <b>${props.adminUser.username}'s</b> password.<br> After confirmation, an email will be sent to <b>${props.adminUser.email}</b> with the new password.`"
      cancel-text="Cancel"
      ok-text="CONFIRM"
      :ok-loading="isLoading"
      :cancel-disabled="isLoading"
      :closable="false"
      @on-cancel="confirmationModalIsVisible = false"
      @on-ok="sendResetPassword()"
    >
    </ModalComponent>

    <!-- Error Modal -->
    <ModalComponent
      v-if="errorModalIsVisible"
      title="ERROR"
      :message="ERROR_UNKNOWN"
      :closable="false"
      @on-ok="errorModalIsVisible = false"
      :cancel-text="null"
    >
    </ModalComponent>

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
  </div>
</template>

<style scoped></style>
