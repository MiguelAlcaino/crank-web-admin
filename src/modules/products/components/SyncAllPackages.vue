<script setup lang="ts">
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import type { ApiService } from '@/services/apiService'
import type { SiteEnum } from '@/gql/graphql'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { inject, ref } from 'vue'

const apiService = inject<ApiService>('gqlApiService')!
const site = inject<string>('site')!

const emits = defineEmits<{
  (e: 'afterSync'): void
}>()

const isLoading = ref<boolean>(false)
const successModalIsVisible = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)

async function syncAllPackages() {
  isLoading.value = true

  try {
    await apiService.syncAllPackagesBySite(site as SiteEnum)
    emits('afterSync')
    successModalIsVisible.value = true
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
    @on-click="syncAllPackages"
    :is-loading="isLoading"
  >
  </DefaultButtonComponent>

  <!-- Success Modal -->
  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    :message="'PACKAGES SUCCESSFULLY SYNCHRONIZED.'"
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
