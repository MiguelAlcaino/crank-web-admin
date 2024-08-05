<script setup lang="ts">
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { inject, ref } from 'vue'

const apiService = inject<ApiService>('gqlApiService')!

const emits = defineEmits<{
  (e: 'afterSync'): void
}>()

const isLoading = ref<boolean>(false)
const successModalIsVisible = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)

async function syncAllGiftCards() {
  isLoading.value = true

  try {
    var success = await apiService.syncAllGiftCards()
    console.log(success)
    if (success) {
      emits('afterSync')
      successModalIsVisible.value = true
    } else {
      errorModalIsVisible.value = true
    }
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <DefaultButtonComponent
    text="Sync All"
    type="button"
    @on-click="syncAllGiftCards"
    :is-loading="isLoading"
  ></DefaultButtonComponent>

  <!-- Success Modal -->
  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    :message="'GIFT CARDS SUCCESSFULLY SYNCHRONIZED.'"
    :closable="false"
    @on-ok="successModalIsVisible = false"
    :cancel-text="null"
  >
  </ModalComponent>

  <!-- Error Modal -->
  <ModalComponent
    v-if="errorModalIsVisible"
    title="Error"
    :message="ERROR_UNKNOWN"
    :cancel-text="null"
    @on-ok="errorModalIsVisible = false"
  >
  </ModalComponent>
</template>

<style scoped></style>
