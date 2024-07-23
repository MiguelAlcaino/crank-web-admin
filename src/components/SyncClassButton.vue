<script setup lang="ts">
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import type { ApiService } from '@/services/apiService'
import { appStore } from '@/stores/appStorage'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { inject, ref } from 'vue'

const props = defineProps<{
  classId: string
  disabled: boolean
}>()

const emits = defineEmits<{
  (e: 'afterSyncClass', isSynchronizing: boolean): void
  (e: 'disableSyncButtons', disabled: boolean): void
}>()

const apiService = inject<ApiService>('gqlApiService')!
const isSyncing = ref(false)
const errorModalIsVisible = ref(false)

async function syncClass() {
  isSyncing.value = true
  emits('disableSyncButtons', true)

  var isSynchronizing = false

  try {
    isSynchronizing = await apiService.syncClass(appStore().site, props.classId)
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isSyncing.value = false
    emits('disableSyncButtons', false)
    emits('afterSyncClass', isSynchronizing)
  }
}
</script>

<template>
  <DefaultButtonComponent
    text="SYNC WITH MB"
    type="button"
    size="sm"
    :is-loading="isSyncing"
    @on-click="syncClass"
    :disabled="disabled"
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
