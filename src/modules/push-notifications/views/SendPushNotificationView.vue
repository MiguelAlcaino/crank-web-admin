<script setup lang="ts">
import { inject, ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import type { ApiService } from '@/services/apiService'
import { useToast } from '@/modules/shared/composables/useToast'
import { SiteEnum } from '@/modules/shared/interfaces'
import { appStore } from '@/stores/appStorage'
import type { Class } from '@/gql/graphql'

interface IdentifiableUser {
  id: string
  user: {
    firstName: string
    lastName: string
    email: string
  }
}

interface WaitlistEntry {
  id: string
  identifiableSiteUser?: {
    id?: string | null
    identifiableUser?: {
      user?: {
        firstName: string
        lastName: string
        email?: string | null
      } | null
    } | null
  } | null
}

const apiService = inject<ApiService>('gqlApiService')!
const toast = useToast()
const store = appStore()

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

// site + class selector
const selectedSite = ref<SiteEnum>(store.site)
const classes = ref<Class[]>([])
const isLoadingClasses = ref(false)
const selectedClass = ref<Class | null>(null)

// waitlist dropdown
const waitlistEntries = ref<WaitlistEntry[]>([])
const isLoadingWaitlist = ref(false)
const showWaitlistDropdown = ref(false)
const waitlistEntriesFetched = ref(false)

const classesByDay = computed(() => {
  const map: Record<string, Class[]> = {}
  for (const c of classes.value) {
    const day = dayjs(c.startWithNoTimeZone as string).format('YYYY-MM-DD')
    if (!map[day]) map[day] = []
    map[day].push(c)
  }
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
})

async function loadClasses() {
  isLoadingClasses.value = true
  selectedClass.value = null
  clearLcClassFields()
  const today = new Date()
  const plus7 = dayjs().add(7, 'day').toDate()
  classes.value = await apiService.getCalendarClassesForList(selectedSite.value, today, plus7)
  isLoadingClasses.value = false
}

onMounted(() => {
  if (notificationType.value === 'late-cancellation') {
    loadClasses()
  }
})

function onTypeChange() {
  selectedUser.value = null
  userResults.value = []
  clearFields()
  if (notificationType.value === 'late-cancellation' && classes.value.length === 0) {
    loadClasses()
  }
}

function clearLcClassFields() {
  lcClassName.value = ''
  lcClassStartsAt.value = ''
  lcInstructorName.value = ''
  lcClassId.value = ''
  lcWaitlistId.value = ''
  waitlistEntries.value = []
  waitlistEntriesFetched.value = false
}

function clearFields() {
  wlClassName.value = ''
  wlClassStartsAt.value = ''
  lcExpiresAt.value = ''
  clearLcClassFields()
}

function onClassSelect(event: Event) {
  const id = (event.target as HTMLSelectElement).value
  const cls = classes.value.find((c) => c.id === id) ?? null
  selectedClass.value = cls
  if (cls) {
    lcClassId.value = cls.id
    lcClassName.value = cls.name
    lcClassStartsAt.value = dayjs(cls.startWithNoTimeZone as string).format('YYYY-MM-DDTHH:mm')
    lcInstructorName.value = cls.instructorName ?? ''
  }
  lcWaitlistId.value = ''
  waitlistEntries.value = []
  waitlistEntriesFetched.value = false
}

async function onWaitlistFocus() {
  if (!selectedClass.value) return
  showWaitlistDropdown.value = true
  if (waitlistEntriesFetched.value) return
  isLoadingWaitlist.value = true
  const entries = await apiService.getClassWaitlistEntries(selectedSite.value, selectedClass.value.id)
  waitlistEntries.value = (entries ?? []) as WaitlistEntry[]
  waitlistEntriesFetched.value = true
  isLoadingWaitlist.value = false
}

function selectWaitlistEntry(entry: WaitlistEntry) {
  lcWaitlistId.value = entry.id
  showWaitlistDropdown.value = false
}

function onWaitlistBlur() {
  setTimeout(() => {
    showWaitlistDropdown.value = false
  }, 150)
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
  return selectedClass.value !== null && lcWaitlistId.value.trim() !== '' && lcExpiresAt.value !== ''
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
          <!-- Site selector -->
          <div class="row mb-3">
            <div class="col-md-4">
              <label class="form-label">Site</label>
              <select class="form-select" v-model="selectedSite" @change="loadClasses">
                <option :value="SiteEnum.Dubai">Dubai</option>
                <option :value="SiteEnum.AbuDhabi">Abu Dhabi</option>
                <option :value="SiteEnum.TownSquare">Town Square</option>
              </select>
            </div>
          </div>

          <!-- Class selector grouped by day -->
          <div class="row mb-3">
            <div class="col-md-7">
              <label class="form-label">Class</label>
              <div class="position-relative">
                <select class="form-select" :disabled="isLoadingClasses" @change="onClassSelect">
                  <option value="" disabled selected>Select a class…</option>
                  <optgroup
                    v-for="[day, dayClasses] in classesByDay"
                    :key="day"
                    :label="dayjs(day).format('dddd, D MMM YYYY')"
                  >
                    <option v-for="cls in dayClasses" :key="cls.id" :value="cls.id">
                      {{ dayjs(cls.startWithNoTimeZone as string).format('HH:mm') }} — {{ cls.name }} ({{
                        cls.instructorName
                      }})
                    </option>
                  </optgroup>
                </select>
                <div
                  v-if="isLoadingClasses"
                  class="spinner-border spinner-border-sm text-primary position-absolute"
                  style="top: 50%; right: 12px; transform: translateY(-50%)"
                  role="status"
                ></div>
              </div>
            </div>
          </div>

          <!-- Auto-filled fields after class selection -->
          <div v-if="selectedClass" class="row mb-3">
            <div class="col-md-4">
              <label class="form-label">Instructor Name</label>
              <input type="text" class="form-control" :value="lcInstructorName" readonly />
            </div>
            <div class="col-md-4">
              <label class="form-label">Expires At</label>
              <input type="datetime-local" class="form-control" v-model="lcExpiresAt" />
            </div>
          </div>

          <!-- Waitlist ID with suggestions dropdown -->
          <div v-if="selectedClass" class="row mb-3">
            <div class="col-md-5">
              <label class="form-label">Waitlist ID</label>
              <div class="position-relative">
                <input
                  type="text"
                  class="form-control"
                  v-model="lcWaitlistId"
                  placeholder="Waitlist entry ID"
                  @focus="onWaitlistFocus"
                  @blur="onWaitlistBlur"
                  autocomplete="off"
                />
                <div
                  v-if="isLoadingWaitlist"
                  class="spinner-border spinner-border-sm text-primary position-absolute"
                  style="top: 50%; right: 12px; transform: translateY(-50%)"
                  role="status"
                ></div>
                <!-- Suggestions list -->
                <ul
                  v-if="showWaitlistDropdown && waitlistEntries.length > 0"
                  class="list-group position-absolute w-100 shadow-sm"
                  style="z-index: 1000; top: 100%; max-height: 200px; overflow-y: auto"
                >
                  <li
                    v-for="entry in waitlistEntries"
                    :key="entry.id"
                    class="list-group-item list-group-item-action"
                    style="cursor: pointer; font-size: 0.875rem"
                    @mousedown.prevent="selectWaitlistEntry(entry)"
                  >
                    <span class="text-muted me-1">{{ entry.id }}</span>
                    — {{ entry.identifiableSiteUser?.identifiableUser?.user?.email ?? 'unknown' }}
                  </li>
                </ul>
                <div
                  v-else-if="
                    showWaitlistDropdown && !isLoadingWaitlist && waitlistEntriesFetched && waitlistEntries.length === 0
                  "
                  class="position-absolute w-100 bg-white border rounded p-2 text-muted small"
                  style="z-index: 1000; top: 100%"
                >
                  No waitlisted entries for this class — you can still enter an ID manually
                </div>
              </div>
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
