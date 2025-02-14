<script lang="ts">
interface CheckinResultUnion {
  __typename: 'CheckinSuccess' | 'EnrollmentNotFoundError'
  success?: boolean
  code?: string
}

interface CheckoutResultUnion {
  __typename: 'CheckoutSuccess' | 'EnrollmentNotFoundError'
  success?: boolean
  code?: string
}
</script>

<script setup lang="ts">
import { inject, ref } from 'vue'

import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import { ERROR_ENROLLMENT_NOT_FOUND, ERROR_UNKNOWN } from '@/utils/errorMessages'
import type { ApiService } from '@/services/apiService'

import { useClassDetail } from '../composables/useClassDetail'
import type { SiteEnum } from '@/modules/shared/interfaces'
import { useCalendarList } from '../composables/useCalendarList'
const { checkInEnrollment } = useClassDetail()

const apiService = inject<ApiService>('gqlApiService')!
const { selectedSite } = useCalendarList(apiService)

const props = defineProps<{
  enrollmentId: string
  isCheckedIn: boolean
  disabled: boolean
}>()

const emits = defineEmits<{
  (e: 'afterCheckInCheckOut', isCheckIn: boolean): void
}>()

const isLoading = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)
const errorModalMessage = ref<string>('')

async function checkinUserInClass() {
  try {
    isLoading.value = true

    var response = (await apiService.checkinUserInClass(selectedSite.value as SiteEnum, {
      enrollmentId: props.enrollmentId
    })) as CheckinResultUnion

    if (response.__typename === 'EnrollmentNotFoundError') {
      errorModalMessage.value = ERROR_ENROLLMENT_NOT_FOUND
      errorModalIsVisible.value = true
    }

    if (response.success) {
      emits('afterCheckInCheckOut', true)
      checkInEnrollment(props.enrollmentId, true)
    }
  } catch (error) {
    errorModalMessage.value = ERROR_UNKNOWN
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}

async function checkOutUserInClass() {
  try {
    isLoading.value = true

    var response = (await apiService.checkoutUserInClass(selectedSite.value as SiteEnum, {
      enrollmentId: props.enrollmentId
    })) as CheckoutResultUnion

    if (response.__typename === 'EnrollmentNotFoundError') {
      errorModalMessage.value = ERROR_ENROLLMENT_NOT_FOUND
      errorModalIsVisible.value = true
    }

    if (response.success) {
      emits('afterCheckInCheckOut', false)
      checkInEnrollment(props.enrollmentId, false)
    }
  } catch (error) {
    errorModalMessage.value = ERROR_UNKNOWN
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <DefaultButtonComponent
    v-if="!isCheckedIn"
    text="Check-In"
    type="button"
    @on-click="checkinUserInClass()"
    class="mr-1"
    :is-loading="isLoading"
    :disabled="disabled"
  ></DefaultButtonComponent>
  <DefaultButtonComponent
    v-if="isCheckedIn"
    text="Check-Out"
    type="button"
    @on-click="checkOutUserInClass()"
    class="mr-1"
    :is-loading="isLoading"
    :disabled="disabled"
  ></DefaultButtonComponent>

  <!-- Error Modal -->
  <ModalComponent
    v-if="errorModalIsVisible"
    title="Error"
    :message="errorModalMessage"
    :cancel-text="null"
    @on-ok="errorModalIsVisible = false"
  >
  </ModalComponent>
</template>
