<script setup lang="ts">
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import type { SiteEnum } from '@/modules/shared/interfaces'
import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { inject, ref } from 'vue'
import { useCalendarList } from '../composables/useCalendarList'

const props = defineProps<{
  classId: string
  disabled: boolean
}>()

const apiService = inject<ApiService>('gqlApiService')!
const { selectedSite } = useCalendarList(apiService)

const emits = defineEmits<{
  (e: 'afterSyncClass', isSynchronizing: boolean): void
  (e: 'disableSyncButtons', disabled: boolean): void
}>()

const isSyncing = ref(false)
const errorModalIsVisible = ref(false)

async function syncClass() {
  isSyncing.value = true
  emits('disableSyncButtons', true)

  var isSynchronizing = false

  try {
    isSynchronizing = await apiService.syncClass(selectedSite.value as SiteEnum, props.classId)
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
