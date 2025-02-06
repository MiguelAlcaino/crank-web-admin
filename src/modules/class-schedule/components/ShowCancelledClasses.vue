<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'

import { ApiService } from '@/services/apiService'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

const apiService = inject<ApiService>('gqlApiService')!

const emits = defineEmits<{
  (e: 'afterChange'): void
}>()

onMounted(() => {
  getShowCancelledClasses()
})

const isLoading = ref<boolean>(false)
const showCancelledClasses = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)

const getShowCancelledClasses = async () => {
  try {
    isLoading.value = true

    var response = await apiService.getCurrentAdminUser(['showCancelledClasses'])

    if (response) {
      showCancelledClasses.value = response.showCancelledClasses ?? false
    }
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}

const handleCheckboxChange = async () => {
  try {
    isLoading.value = true

    var response = await apiService.updateCurrentAdminUser({
      showCancelledClasses: showCancelledClasses.value
    })

    if (response) {
      showCancelledClasses.value = response.showCancelledClasses ?? false

      emits('afterChange')
    }
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="custom-control custom-switch">
    <input
      type="checkbox"
      class="custom-control-input"
      id="toggleSwitch"
      v-model="showCancelledClasses"
      @change="handleCheckboxChange"
      :disabled="isLoading"
    />
    <label class="custom-control-label" for="toggleSwitch">
      {{ showCancelledClasses ? 'Hide cancelled classes' : 'Show cancelled classes' }}
    </label>
    <div v-if="isLoading" class="spinner"></div>
  </div>

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

<style scoped>
.custom-control-input:focus ~ .custom-control-label::before {
  border-color: #ff6f60 !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 47, 69, 0.25) !important;
}

.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #ff6f60 !important;
  background-color: #ff6f60 !important;
}

.custom-control-input:active ~ .custom-control-label::before {
  background-color: #ff6f60 !important;
  border-color: #ff6f60 !important;
}

.custom-control-input:focus:not(:checked) ~ .custom-control-label::before {
  border-color: #ff6f60 !important;
}

.custom-control-input-green:not(:disabled):active ~ .custom-control-label::before {
  background-color: #ff6f60 !important;
  border-color: #ff6f60 !important;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #ff6f60;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-left: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
