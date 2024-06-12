<script setup lang="ts">
import DefaultButtonComponent from '@/components/DefaultButtonComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import type { ApiService } from '@/services/apiService'
import { appStore } from '@/stores/appStorage'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { inject, ref } from 'vue'

const props = defineProps<{
  classId: string
}>()

const emits = defineEmits<{
  (e: 'afterSyncClassWithPiq'): void
}>()

const apiService = inject<ApiService>('gqlApiService')!
const isSyncing = ref(false)
const errorModalIsVisible = ref(false)

async function syncClass() {
  isSyncing.value = true

  try {
    await apiService.syncClassWithPiq(appStore().site, props.classId)
    emits('afterSyncClassWithPiq')
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isSyncing.value = false
  }
}
</script>

<template>
  <DefaultButtonComponent
    text="SYNC WITH PIQ"
    type="button"
    :is-loading="isSyncing"
    @on-click="syncClass"
  >
  </DefaultButtonComponent>

  <!-- ERROR modal -->
  <ModalComponent
    title="ERROR"
    :message="ERROR_UNKNOWN"
    :closable="false"
    v-if="errorModalIsVisible"
    @on-ok="errorModalIsVisible = false"
    :cancel-text="null"
  >
  </ModalComponent>
</template>
