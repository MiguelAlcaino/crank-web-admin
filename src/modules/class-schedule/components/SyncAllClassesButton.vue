<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import type { ApiService } from '@/services/apiService'
import { authService } from '@/services/authService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { Role } from '@/utils/userRoles'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import type { SiteEnum } from '@/modules/shared/interfaces'

const props = defineProps<{
  site: SiteEnum
  disabled: boolean
}>()

const emits = defineEmits<{
  (e: 'afterSyncAllClasses', isSynchronizingClasses: boolean): void
}>()

const apiService = inject<ApiService>('gqlApiService')!
const isSyncing = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)
const userCanSyncClasses = ref<boolean>(false)

onMounted(async () => {
  userCanSyncClasses.value = authService.userHasRole(Role.ROLE_SUPER_ADMIN)
})

async function syncAllClasses() {
  isSyncing.value = true

  try {
    const isSynchronizingClasses = await apiService.syncAllClasses(props.site)
    emits('afterSyncAllClasses', isSynchronizingClasses)
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isSyncing.value = false
  }
}
</script>

<template>
  <DefaultButtonComponent
    text="SYNC ALL CLASSES"
    type="button"
    :is-loading="isSyncing"
    @on-click="syncAllClasses"
    :disabled="props.disabled"
    v-if="userCanSyncClasses"
  ></DefaultButtonComponent>

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
