<script setup lang="ts">
import { inject, ref } from 'vue'
import type { ApiService } from '@/services/apiService'
import { useToast } from '@/modules/shared/composables/useToast'

interface IdentifiableUser {
  id: string
  user: {
    firstName: string
    lastName: string
    email: string
  }
}

const apiService = inject<ApiService>('gqlApiService')!
const toast = useToast()

const notificationType = ref<'waitlist-booking' | 'late-cancellation'>('waitlist-booking')

const userResults = ref<IdentifiableUser[]>([])
const selectedUser = ref<IdentifiableUser | null>(null)
const isSearching = ref(false)
const isSending = ref(false)

// waitlist-booking fields
const wlClassName = ref('')
const wlClassStartsAt = ref('')

// late-cancellation fields
const lcClassName = ref('')
const lcClassStartsAt = ref('')
const lcInstructorName = ref('')
const lcClassId = ref('')
const lcWaitlistId = ref('')
const lcExpiresAt = ref('')

function onTypeChange() {
  selectedUser.value = null
  userResults.value = []
  clearFields()
}

function clearFields() {
  wlClassName.value = ''
  wlClassStartsAt.value = ''
  lcClassName.value = ''
  lcClassStartsAt.value = ''
  lcInstructorName.value = ''
  lcClassId.value = ''
  lcWaitlistId.value = ''
  lcExpiresAt.value = ''
}

async function onInputEventHandler(event: any) {
  userResults.value = []
  selectedUser.value = null
  if (event.input.length < 3) return
  isSearching.value = true
  userResults.value = await apiService.searchUser(event.input)
  isSearching.value = false
}

function selectItemEventHandler(item: IdentifiableUser) {
  selectedUser.value = item
}

function itemProjectionFunction(item: IdentifiableUser) {
  return `${item.user.firstName} ${item.user.lastName} - ${item.user.email}`
}

function toIsoString(localDatetime: string): string {
  // datetime-local gives "YYYY-MM-DDTHH:mm", convert to ISO with seconds
  return localDatetime ? `${localDatetime}:00` : ''
}

async function sendNotification() {
  if (!selectedUser.value) return

  isSending.value = true
  try {
    let result: { __typename: string }

    if (notificationType.value === 'waitlist-booking') {
      result = await apiService.adminSendWaitlistBookingNotification({
        customerId: selectedUser.value.id,
        className: wlClassName.value,
        classStartsAt: toIsoString(wlClassStartsAt.value)
      })
    } else {
      result = await apiService.adminSendLateCancellationNotification({
        customerId: selectedUser.value.id,
        className: lcClassName.value,
        classStartsAt: toIsoString(lcClassStartsAt.value),
        instructorName: lcInstructorName.value,
        classId: lcClassId.value,
        waitlistId: lcWaitlistId.value,
        expiresAt: toIsoString(lcExpiresAt.value)
      })
    }

    if (result.__typename === 'CustomerNotFoundError') {
      toast.error('Customer not found')
    } else {
      toast.success('Notification sent successfully')
      selectedUser.value = null
      userResults.value = []
      clearFields()
    }
  } catch {
    toast.error('An error occurred while sending the notification')
  } finally {
    isSending.value = false
  }
}

const canSend = () => {
  if (!selectedUser.value) return false
  if (notificationType.value === 'waitlist-booking') {
    return wlClassName.value.trim() !== '' && wlClassStartsAt.value !== ''
  }
  return (
    lcClassName.value.trim() !== '' &&
    lcClassStartsAt.value !== '' &&
    lcInstructorName.value.trim() !== '' &&
    lcClassId.value.trim() !== '' &&
    lcWaitlistId.value.trim() !== '' &&
    lcExpiresAt.value !== ''
  )
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4>Send Push Notification</h4>
    </div>

    <div class="card">
      <div class="card-body">
        <!-- Notification type -->
        <div class="row mb-3">
          <div class="col-md-4">
            <label class="form-label">Notification Type</label>
            <select class="form-select" v-model="notificationType" @change="onTypeChange">
              <option value="waitlist-booking">Out of Waitlist</option>
              <option value="late-cancellation">Late Cancellation</option>
            </select>
          </div>
        </div>

        <!-- Customer search -->
        <div class="row mb-3">
          <div class="col-md-8">
            <label class="form-label">Customer</label>
            <div class="position-relative">
              <vue3-simple-typeahead
                id="typeahead_notification_user"
                class="form-control"
                placeholder="Search by name or email (min. 3 characters)"
                :items="userResults"
                :minInputLength="3"
                @selectItem="selectItemEventHandler"
                @onInput="onInputEventHandler"
                :itemProjection="itemProjectionFunction"
              >
                <template #list-item-text="slot">
                  <span v-html="slot.boldMatchText(slot.itemProjection(slot.item))"></span>
                </template>
              </vue3-simple-typeahead>
              <div
                v-if="isSearching"
                class="spinner-border spinner-border-sm text-primary position-absolute"
                style="top: 50%; right: 12px; transform: translateY(-50%)"
                role="status"
              ></div>
            </div>
            <div v-if="selectedUser" class="form-text text-success">
              Selected: {{ selectedUser.user.firstName }} {{ selectedUser.user.lastName }}
              ({{ selectedUser.user.email }})
            </div>
          </div>
        </div>

        <hr />

        <!-- Out of Waitlist fields -->
        <div v-if="notificationType === 'waitlist-booking'">
          <div class="row mb-3">
            <div class="col-md-5">
              <label class="form-label">Class Name</label>
              <input type="text" class="form-control" v-model="wlClassName" placeholder="e.g. CrankFit Dubai" />
            </div>
            <div class="col-md-4">
              <label class="form-label">Class Starts At</label>
              <input type="datetime-local" class="form-control" v-model="wlClassStartsAt" />
            </div>
          </div>
        </div>

        <!-- Late Cancellation fields -->
        <div v-else>
          <div class="row mb-3">
            <div class="col-md-5">
              <label class="form-label">Class Name</label>
              <input type="text" class="form-control" v-model="lcClassName" placeholder="e.g. CrankFit Dubai" />
            </div>
            <div class="col-md-4">
              <label class="form-label">Class Starts At</label>
              <input type="datetime-local" class="form-control" v-model="lcClassStartsAt" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-5">
              <label class="form-label">Instructor Name</label>
              <input type="text" class="form-control" v-model="lcInstructorName" placeholder="e.g. John Smith" />
            </div>
            <div class="col-md-4">
              <label class="form-label">Expires At</label>
              <input type="datetime-local" class="form-control" v-model="lcExpiresAt" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-4">
              <label class="form-label">Class ID</label>
              <input type="text" class="form-control" v-model="lcClassId" placeholder="Class ID" />
            </div>
            <div class="col-md-4">
              <label class="form-label">Waitlist ID</label>
              <input type="text" class="form-control" v-model="lcWaitlistId" placeholder="Waitlist entry ID" />
            </div>
          </div>
        </div>

        <!-- Send button -->
        <div class="row mt-2">
          <div class="col-12">
            <button
              class="btn btn-primary"
              type="button"
              :disabled="!canSend() || isSending"
              @click="sendNotification"
            >
              <span v-if="isSending">
                <span class="spinner-border spinner-border-sm" role="status"></span>
                Sending...
              </span>
              <span v-else>Send Notification</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
