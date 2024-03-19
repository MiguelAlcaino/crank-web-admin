<script setup lang="ts">
import { inject, ref } from 'vue'
import dayjs from 'dayjs'
import type {
  ResetPasswordLinkSentSuccessfully,
  TooManyResetPasswordLinkRequestsError
} from '@/gql/graphql'

import type { ApiService } from '@/services/apiService'

import DefaultButtonComponent from '@/components/DefaultButtonComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { SUCCESS_RESET_PASSWORD_LINK_SENT } from '@/utils/successMessages'

const apiService = inject<ApiService>('gqlApiService')!

const props = defineProps<{
  email: string
}>()

const isLoading = ref<boolean>(false)
const confirmationModalIsVisible = ref<boolean>(false)
const successModalIsVisible = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)
const errorMessage = ref<string>('')

function onClickResetUserPassword() {
  confirmationModalIsVisible.value = true
}

async function requestPasswordLink() {
  isLoading.value = true

  const response = (await apiService.requestPasswordLink(props.email)) as
    | ResetPasswordLinkSentSuccessfully
    | TooManyResetPasswordLinkRequestsError
    | null
  isLoading.value = false

  confirmationModalIsVisible.value = false

  if (response) {
    if (response.__typename === 'ResetPasswordLinkSentSuccessfully') {
      successModalIsVisible.value = true
    } else if (response.__typename === 'TooManyResetPasswordLinkRequestsError') {
      errorMessage.value =
        'A RESET LINK HAS ALREADY BEEN SENT TO YOU. PLEASE TRY AGAIN AFTER ' +
        dayjs(response.availableAgainAt).format('DD/MM/YYYY h:mm a')
      errorModalIsVisible.value = true
    } else {
      errorMessage.value = ERROR_UNKNOWN
      errorModalIsVisible.value = true
    }
  } else {
    errorMessage.value = ERROR_UNKNOWN
    errorModalIsVisible.value = true
  }
}
</script>

<template>
  <DefaultButtonComponent
    text="Reset Password"
    type="button"
    @on-click="onClickResetUserPassword"
  ></DefaultButtonComponent>

  <!-- Confirm Modal -->
  <ModalComponent
    v-if="confirmationModalIsVisible"
    title="RESET PASSWORD"
    message="ARE YOU SURE YOU WANT TO PROCEED?"
    cancel-text="No"
    ok-text="Yes"
    :ok-loading="isLoading"
    @on-cancel="confirmationModalIsVisible = false"
    @on-ok="requestPasswordLink()"
  >
  </ModalComponent>

  <!-- Success Modal -->
  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    :message="SUCCESS_RESET_PASSWORD_LINK_SENT"
    :closable="false"
    @on-ok="successModalIsVisible = false"
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
