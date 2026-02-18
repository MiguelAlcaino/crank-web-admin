<script setup lang="ts">
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import type { SiteEnum } from '@/modules/shared/interfaces'
import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { computed, inject, ref } from 'vue'
import { useMindbodySessionTypes } from '../composables/useMindbodySessionTypes'
import { useSessionTypes } from '../composables/useSessionTypes'
import type { MindbodySessionType } from '../interfaces'
import { getSessionTypeErrorMessage } from '../utils/getSessionTypeErrorMessage'
import MindbodySessionTypeDraggable from './MindbodySessionTypeDraggable.vue'
import SessionTypeForm from './SessionTypeForm.vue'

const apiService = inject<ApiService>('gqlApiService')!
const { createSessionType } = useSessionTypes(apiService)
const { availableSessionTypes, isLoadingSessionTypes, getAvailableSessionTypes } =
  useMindbodySessionTypes(apiService)
const props = defineProps<{
  site: SiteEnum | null
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
  if (!props.site) return
  if (props.disabled) return
  modalIsVisible.value = true
  assignedSessionTypes.value = []
  getAvailableSessionTypes(props.site)
}

const closeModal = () => {
  modalIsVisible.value = false
  assignedSessionTypes.value = []
}

const submitForm = async () => {
  if (!formRef.value) return
  if (!props.site) return

  const data = await formRef.value.validateAndGetValues()

  if (data) {
    try {
      isSaving.value = true

      const success = await createSessionType({
        site: props.site,
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
  <DefaultButtonComponent
    text="Create session type"
    type="button"
    :disabled="!site || !!disabled"
    @on-click="openModal()"
  />

  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">Create session type</h5>
              <button type="button" class="close" @click="closeModal"><span>&times;</span></button>
            </div>

            <div class="modal-body">
              <SessionTypeForm ref="formRef" />
              <div class="mt-4">
                <h6>Associate Mindbody Session Types</h6>
                <MindbodySessionTypeDraggable
                  :available-session-types="availableSessionTypesComputed"
                  :assigned-session-types="assignedSessionTypes"
                  :is-loading="isLoadingSessionTypes"
                  @update:assignedSessionTypes="assignedSessionTypes = $event"
                />
              </div>
            </div>

            <div class="modal-footer border-0">
              <DefaultButtonComponent
                text="Cancel"
                type="button"
                :disabled="isSaving"
                variant="secondary"
                @on-click="closeModal"
              />
              <DefaultButtonComponent
                text="Create session type"
                type="button"
                :is-loading="isSaving"
                @on-click="submitForm"
              />
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
    message="Session type successfully created."
    :closable="false"
    @on-ok="onSuccessOk"
    :cancel-text="null"
  >
  </ModalComponent>
</template>
