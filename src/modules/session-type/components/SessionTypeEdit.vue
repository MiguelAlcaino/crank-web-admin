<script setup lang="ts">
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import type { SessionType } from '@/modules/session-type/interfaces'
import type { SiteEnum } from '@/modules/shared/interfaces'
import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { computed, inject, ref } from 'vue'
import { useMindbodySessionTypes } from '../composables/useMindbodySessionTypes'
import { useSessionTypes } from '../composables/useSessionTypes'
import type { MindbodySessionType } from '../interfaces'
import { getSessionTypeErrorMessage } from '../utils/getSessionTypeErrorMessage'
import MindbodySessionTypeDraggable from './MindbodySessionTypeDraggable.vue'
import SessionTypeDelete from './SessionTypeDelete.vue'
import SessionTypeForm from './SessionTypeForm.vue'

const apiService = inject<ApiService>('gqlApiService')!
const { updateSessionType } = useSessionTypes(apiService)
const { availableSessionTypes, isLoadingSessionTypes, getAvailableSessionTypes } =
  useMindbodySessionTypes(apiService)

const props = defineProps<{
  sessionType: SessionType
  site: SiteEnum
  disabled?: boolean
}>()

const modalIsVisible = ref(false)
const isSaving = ref(false)
const successModalIsVisible = ref(false)
const errorMessage = ref('')
const errorModalIsVisible = ref(false)
const assignedSessionTypes = ref<MindbodySessionType[]>([])

const availableSessionTypesComputed = computed(() => {
  const assignedIds = assignedSessionTypes.value.map((s) => s.id)
  return availableSessionTypes.value.filter((item) => !assignedIds.includes(item.id))
})

const formRef = ref<InstanceType<typeof SessionTypeForm> | null>(null)

const openModal = () => {
  if (props.disabled) return
  modalIsVisible.value = true
  assignedSessionTypes.value = props.sessionType.mindbodySessionTypes
    ? [...props.sessionType.mindbodySessionTypes]
    : []
  getAvailableSessionTypes(props.site)
}

const closeModal = () => {
  modalIsVisible.value = false
  assignedSessionTypes.value = []
}

const submitForm = async () => {
  if (!formRef.value) return

  const data = await formRef.value.validateAndGetValues()

  if (data) {
    try {
      isSaving.value = true

      const success = await updateSessionType(props.sessionType.id, {
        name: data.name,
        active: data.active,
        color: data.color,
        bannerImageFile: data.bannerImageFile,
        iconFile: data.iconFile,
        mindbodySessionTypeIds: assignedSessionTypes.value.map((s) => s.id)
      })

      if (success) {
        closeModal()
        successModalIsVisible.value = true
      } else {
        errorMessage.value = ERROR_UNKNOWN
        errorModalIsVisible.value = true
      }
    } catch (error) {
      errorMessage.value = getSessionTypeErrorMessage(error)
      errorModalIsVisible.value = true
    } finally {
      isSaving.value = false
    }
  }
}

function onSuccessOk() {
  successModalIsVisible.value = false
}
</script>

<template>
  <button type="button" class="btn btn-link btn-sm" :disabled="!!disabled" @click="openModal">
    <i class="bi bi-pencil-fill"></i>
  </button>

  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">Edit session type '{{ sessionType?.name }}'</h5>
              <button type="button" class="close" @click="closeModal"><span>&times;</span></button>
            </div>

            <div class="modal-body">
              <SessionTypeForm
                ref="formRef"
                :initial-data="{
                  name: sessionType.name,
                  active: sessionType.active,
                  color: sessionType.color,
                  bannerImagePath: sessionType.bannerImagePath,
                  icon: sessionType.icon
                }"
              />
              <div class="mt-4">
                <h6>Associated Mindbody Session Types</h6>
                <MindbodySessionTypeDraggable
                  :available-session-types="availableSessionTypesComputed"
                  :assigned-session-types="assignedSessionTypes"
                  :is-loading="isLoadingSessionTypes"
                  @update:assignedSessionTypes="assignedSessionTypes = $event"
                />
              </div>
            </div>

            <div class="modal-footer border-0 d-flex justify-content-between">
              <div>
                <SessionTypeDelete :session-type="sessionType" />
              </div>

              <div>
                <DefaultButtonComponent
                  text="Cancel"
                  type="button"
                  :disabled="isSaving"
                  variant="secondary"
                  @on-click="closeModal"
                />
                <DefaultButtonComponent
                  text="Update"
                  type="button"
                  :is-loading="isSaving"
                  :disabled="isSaving"
                  @on-click="submitForm"
                  class="ml-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <ModalComponent
    v-if="errorModalIsVisible"
    title="ERROR"
    :message="errorMessage"
    :closable="false"
    @on-ok="errorModalIsVisible = false"
    :cancel-text="null"
  >
  </ModalComponent>

  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    message="Session type successfully updated."
    :closable="false"
    @on-ok="onSuccessOk"
    :cancel-text="null"
  >
  </ModalComponent>
</template>
