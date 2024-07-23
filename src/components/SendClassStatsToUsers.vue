<script setup lang="ts">
import { inject, ref } from 'vue'

import type { ApiService } from '@/services/apiService'

import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import DefaultButtonComponent from '../modules/shared/components/DefaultButtonComponent.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

const apiService = inject<ApiService>('gqlApiService')!

const props = defineProps<{
  classId: string
}>()

const isLoading = ref<boolean>(false)
const confirmationModalIsVisible = ref<boolean>(false)
const successModalIsVisible = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)

async function sendClassStatsToUsers() {
  isLoading.value = true

  try {
    const success = await apiService.sendClassStatsToUsers(props.classId)
    if (success) {
      successModalIsVisible.value = true
    } else {
      errorModalIsVisible.value = true
    }
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    confirmationModalIsVisible.value = false
    isLoading.value = false
  }
}
</script>

<template>
  <DefaultButtonComponent
    text="Resend stats emails"
    type="button"
    @on-click="confirmationModalIsVisible = true"
  ></DefaultButtonComponent>

  <!-- Confirm Modal -->
  <ModalComponent
    v-if="confirmationModalIsVisible"
    title="WARNING "
    message="THIS ACTION WILL TRIGGER AN EMAIL TO EACH OF THE USERS OF THIS CLASS CONTAINING THEIR STATS FOR THIS CLASS. ARE YOU SURE YOU WANT TO PROCEED?"
    cancel-text="Cancel"
    ok-text="CONFIRM"
    :ok-loading="isLoading"
    :cancel-disabled="isLoading"
    :closable="false"
    @on-cancel="confirmationModalIsVisible = false"
    @on-ok="sendClassStatsToUsers()"
  >
  </ModalComponent>

  <!-- Success Modal -->
  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    message="EMAILS SENT SUCCESSFULLY."
    :closable="false"
    @on-ok="successModalIsVisible = false"
    :cancel-text="null"
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
</template>

<style scoped></style>
