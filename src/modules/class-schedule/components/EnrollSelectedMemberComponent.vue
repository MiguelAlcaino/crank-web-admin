<script lang="ts">
interface IdentifiableSiteUser {
  id: string
  identifiableUser: IdentifiableUser
}

interface IdentifiableUser {
  id?: string
  user?: User
}

interface User {
  email?: string | null
  firstName?: string | null
  lastName?: string | null
}
</script>

<script setup lang="ts">
import type { ApiService } from '@/services/apiService'

import { inject, ref } from 'vue'

import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import {
  ERROR_BOOKING_OVERLAPS_ANOTHER_ONE,
  ERROR_CLASS_IS_FULL,
  ERROR_CLIENT_IS_ALREADY_BOOKED_ADMIN,
  ERROR_CLIENT_IS_ALREADY_ON_WAITLIST,
  ERROR_CLIENT_IS_OUTSIDE_SCHEDULING_WINDOW,
  ERROR_UNKNOWN,
  ERROR_WAITLIST_FULL_ERROR
} from '@/utils/errorMessages'
import { SUCCESS_ADDED_USER_TO_WAITLIST } from '@/utils/successMessages'
import { SiteEnum } from '@/modules/shared/interfaces'
import { useCalendarList } from '../composables/useCalendarList'

const { selectedSite } = useCalendarList()

const apiService = inject<ApiService>('gqlApiService')!

const props = defineProps<{
  classId: string
  spotNumber: number | null
  enrollButtonText: string
  isWaitlistBooking: boolean
  userIdsToHide?: string[] | undefined
}>()

const emits = defineEmits<{
  (e: 'afterEnrolling'): void
}>()

const identifiableSiteUsers = ref<IdentifiableSiteUser[]>([])
const isLoading = ref<boolean>(false)
const selectedIdentifiableSiteUser = ref<IdentifiableSiteUser | null>(null)
const errorModalIsVisible = ref<boolean>(false)
const errorMessage = ref<string>('')
const successModalIsVisible = ref<boolean>(false)
const successMessage = ref<string>('')
const paymentRequiredErrorModalIsVisible = ref<boolean>(false)

const refSimpleTypeahead = ref()

function onClickEnrollSelectedMember() {
  bookUserIntoClass(props.classId, selectedIdentifiableSiteUser.value!.id!, props.spotNumber, true)
}

async function bookUserIntoClass(
  classId: string,
  userId: string,
  spotNumber: number | null,
  isPaymentRequired: boolean
) {
  isLoading.value = true

  const response = await apiService.bookUserIntoClass(
    classId,
    userId,
    spotNumber,
    isPaymentRequired,
    props.isWaitlistBooking
  )

  isLoading.value = false

  if (response === 'BookClassSuccess') {
    identifiableSiteUsers.value = []
    selectedIdentifiableSiteUser.value = null
    refSimpleTypeahead.value?.clearInput()
    paymentRequiredErrorModalIsVisible.value = false

    emits('afterEnrolling')
  } else if (response === 'AddedToWaitlistSuccess') {
    identifiableSiteUsers.value = []
    selectedIdentifiableSiteUser.value = null
    refSimpleTypeahead.value?.clearInput()
    paymentRequiredErrorModalIsVisible.value = false

    successMessage.value = SUCCESS_ADDED_USER_TO_WAITLIST
    successModalIsVisible.value = true

    emits('afterEnrolling')
  } else if (response === 'PaymentRequiredError') {
    if (props.isWaitlistBooking) {
      errorMessage.value = 'This client has no credits in his account.'
      errorModalIsVisible.value = true
    } else {
      paymentRequiredErrorModalIsVisible.value = true
    }
  } else {
    if (response == 'ClassIsFullError') {
      errorMessage.value = ERROR_CLASS_IS_FULL
    } else if (response === 'ClientIsOutsideSchedulingWindowError') {
      errorMessage.value = ERROR_CLIENT_IS_OUTSIDE_SCHEDULING_WINDOW
    } else if (response === 'ClientIsAlreadyBookedError') {
      errorMessage.value = ERROR_CLIENT_IS_ALREADY_BOOKED_ADMIN
    } else if (response === 'BookingOverlapsAnotherOneError') {
      errorMessage.value = ERROR_BOOKING_OVERLAPS_ANOTHER_ONE
    } else if (response == 'WaitlistFullError') {
      errorMessage.value = ERROR_WAITLIST_FULL_ERROR
    } else if (response === 'ClientIsAlreadyOnWaitlistError') {
      errorMessage.value = ERROR_CLIENT_IS_ALREADY_ON_WAITLIST
    } else {
      errorMessage.value = ERROR_UNKNOWN
    }

    errorModalIsVisible.value = true
  }
}

function selectItemEventHandler(item: IdentifiableSiteUser) {
  selectedIdentifiableSiteUser.value = item
}

async function onInputEventHandler(event: any) {
  identifiableSiteUsers.value = []
  selectedIdentifiableSiteUser.value = null

  if (event.input.length < 3) return

  isLoading.value = true

  identifiableSiteUsers.value = (await apiService.searchSiteUser(
    selectedSite.value as SiteEnum,
    event.input
  )) as IdentifiableSiteUser[]

  if (props.userIdsToHide && props.userIdsToHide.length > 0) {
    identifiableSiteUsers.value = identifiableSiteUsers.value.filter(
      (user) => !props.userIdsToHide?.includes(user.id)
    )
  }

  isLoading.value = false
}

function onBlurEventHandler(event: any) {}

function itemProjectionFunction(item: IdentifiableSiteUser) {
  return (
    item.identifiableUser?.user?.firstName +
    ' ' +
    item.identifiableUser?.user?.lastName +
    ' - ' +
    item.identifiableUser?.user?.email
  )
}
</script>

<template>
  <div class="row">
    <div class="col-8">
      <vue3-simple-typeahead
        id="typeahead_users"
        class="custom-select"
        placeholder="Please enter 3 or more characters"
        :items="identifiableSiteUsers"
        :minInputLength="3"
        @selectItem="selectItemEventHandler"
        @onInput="onInputEventHandler"
        @onBlur="onBlurEventHandler"
        :itemProjection="itemProjectionFunction"
        ref="refSimpleTypeahead"
      >
        <template #list-item-text="slot"
          ><span v-html="slot.boldMatchText(slot.itemProjection(slot.item))"></span
        ></template>
      </vue3-simple-typeahead>
    </div>
    <div class="col-4">
      <button
        class="btn btn-primary"
        type="button"
        :disabled="
          selectedIdentifiableSiteUser === null ||
          selectedIdentifiableSiteUser === undefined ||
          isLoading
        "
        @click="onClickEnrollSelectedMember()"
      >
        {{ props.enrollButtonText }}
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          v-if="isLoading"
        ></span>
      </button>
    </div>
  </div>
  <br />
  <!-- PaymentRequiredError Modal -->
  <ModalComponent
    v-if="paymentRequiredErrorModalIsVisible"
    title="Warning"
    message="This client has no credits in his account. Do you want to continue?"
    cancel-text="No"
    ok-text="Yes"
    @on-cancel="paymentRequiredErrorModalIsVisible = false"
    :ok-loading="isLoading"
    @on-ok="
      bookUserIntoClass(props.classId, selectedIdentifiableSiteUser?.id!, props.spotNumber, false)
    "
  >
  </ModalComponent>

  <!-- Error Modal -->
  <ModalComponent
    v-if="errorModalIsVisible"
    title="Error"
    :message="errorMessage"
    :cancel-text="null"
    @on-ok="errorModalIsVisible = false"
  >
  </ModalComponent>

  <!-- Success Modal -->
  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    :message="successMessage"
    :cancel-text="null"
    @on-ok="successModalIsVisible = false"
  >
  </ModalComponent>
</template>
