<script lang="ts">
interface WaitlistEntry {
  id: string
  identifiableSiteUser?: IdentifiableSiteUser | null
}

interface IdentifiableSiteUser {
  id: string
  identifiableUser: IdentifiableUser
}

interface IdentifiableUser {
  id: string
  user: User
}

interface User {
  firstName: string
  lastName: string
}

interface RemoveFromWaitlistResult {
  __typename: 'RemoveFromWaitlistResult' | 'WaitlistEntryNotFoundError'
  code?: string | null
  success?: boolean | null
}
</script>

<script setup lang="ts">
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import type { SiteEnum } from '@/modules/shared/interfaces'

import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN, ERROR_WAITLIST_ENTRY_NOT_FOUND } from '@/utils/errorMessages'
import { inject, ref } from 'vue'

import { useCalendarList } from '../composables/useCalendarList'

const apiService = inject<ApiService>('gqlApiService')!
const { selectedSite } = useCalendarList(apiService)

const props = defineProps<{
  classId: string
  disabled: boolean
}>()

const errorModalIsVisible = ref<boolean>(false)
const successModalIsVisible = ref<boolean>(false)
const confirmModalIsVisible = ref<boolean>(false)
const errorModalMessage = ref<string>('')
const modalIsVisible = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const isRemoving = ref<boolean>(false)
const waitlistEntryIdSelected = ref<string | null>(null)
const waitlistEntries = ref<WaitlistEntry[]>([])

function openModal() {
  getWaitlistEntries()
  modalIsVisible.value = true
}

async function getWaitlistEntries() {
  waitlistEntries.value = []

  try {
    isLoading.value = true
    waitlistEntries.value = (await apiService.getClassWaitlistEntries(
      selectedSite.value as SiteEnum,
      props.classId
    )) as WaitlistEntry[]
  } catch (error) {
    errorModalMessage.value = ERROR_UNKNOWN
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}

async function removeUserFromWaitlist(waitlistEntryId: string) {
  try {
    isRemoving.value = true
    const response = (await apiService.removeUserFromWaitlist(
      waitlistEntryId
    )) as RemoveFromWaitlistResult

    if (response.success) {
      successModalIsVisible.value = true
      getWaitlistEntries()
    } else {
      if (response.__typename === 'WaitlistEntryNotFoundError') {
        errorModalMessage.value = ERROR_WAITLIST_ENTRY_NOT_FOUND
        errorModalIsVisible.value = true
      } else {
        errorModalMessage.value = ERROR_UNKNOWN
        errorModalIsVisible.value = true
      }
    }
  } catch (error) {
    errorModalMessage.value = ERROR_UNKNOWN
    errorModalIsVisible.value = true
  } finally {
    isRemoving.value = false
    confirmModalIsVisible.value = false
  }
}

function showConfirmModal(waitlistEntry: WaitlistEntry) {
  waitlistEntryIdSelected.value = waitlistEntry.id
  confirmModalIsVisible.value = true
}
</script>

<template>
  <DefaultButtonComponent
    text="View Waitlist"
    type="button"
    @on-click="openModal()"
    :disabled="props.disabled"
  >
  </DefaultButtonComponent>

  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">Waitlist Entries</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="modalIsVisible = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="table-responsive">
                <table class="table table-sm">
                  <thead>
                    <tr class="text-center">
                      <th>NO</th>
                      <th>FIRST NAME</th>
                      <th>LAST NAME</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in waitlistEntries" :key="index">
                      <td class="text-center align-middle">
                        {{ index + 1 }}
                      </td>
                      <td class="text-center align-middle">
                        {{
                          item.identifiableSiteUser?.identifiableUser.user?.firstName.toUpperCase()
                        }}
                      </td>
                      <td class="text-center align-middle">
                        {{
                          item.identifiableSiteUser?.identifiableUser.user?.lastName.toUpperCase()
                        }}
                      </td>
                      <td class="text-center align-middle">
                        <DefaultButtonComponent
                          text="REMOVE"
                          type="button"
                          @on-click="showConfirmModal(item)"
                        >
                        </DefaultButtonComponent>
                      </td>
                    </tr>
                    <tr v-if="waitlistEntries.length === 0 && !isLoading">
                      <td colspan="4" class="text-center">
                        <p>NO DATA AVAILABLE IN TABLE</p>
                      </td>
                    </tr>
                    <tr v-if="isLoading" class="text-center">
                      <td colspan="4">LOADING...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- ERROR modal -->
  <ModalComponent
    title="ERROR"
    :message="errorModalMessage"
    :closable="false"
    :cancel-text="null"
    v-if="errorModalIsVisible"
    @on-ok="errorModalIsVisible = false"
  >
  </ModalComponent>

  <!-- Success Modal -->
  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    message="THE USER HAS BEEN SUCCESSFULLY REMOVED FROM THE WAITLIST."
    :cancel-text="null"
    ok-text="OK"
    @on-ok="successModalIsVisible = false"
  >
  </ModalComponent>

  <!-- Confirm Modal -->
  <ModalComponent
    v-if="confirmModalIsVisible"
    title="CONFIRM"
    message="ARE YOU SURE YOU WANT TO REMOVE THE USER FROM THE WAITLIST?"
    cancel-text="No"
    ok-text="Yes"
    :ok-loading="isRemoving"
    @on-cancel="confirmModalIsVisible = false"
    @on-ok="removeUserFromWaitlist(waitlistEntryIdSelected!)"
  >
  </ModalComponent>
</template>
