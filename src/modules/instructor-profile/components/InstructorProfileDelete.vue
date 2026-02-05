<script setup lang="ts">
import { inject, ref } from 'vue'
import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { useInstructorProfiles } from '../composables/useInstructorProfiles'
import type { InstructorProfile } from '../interfaces/Instructor-profile'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'

const apiService = inject<ApiService>('gqlApiService')!
const { deleteInstructorProfile } = useInstructorProfiles(apiService)

const props = defineProps<{
  instructorProfile: InstructorProfile
}>()

const isLoading = ref<boolean>(false)
const modalIsVisible = ref<boolean>(false)
const successModalIsVisible = ref<boolean>(false)
const errorMessage = ref<string>('')
const errorModalIsVisible = ref<boolean>(false)
const deleteButtonIsVisible = ref<boolean>(true)

function closeModal() {
  modalIsVisible.value = false
}

async function onConfirmDelete() {
  try {
    isLoading.value = true

    const success = await deleteInstructorProfile(props.instructorProfile.id)

    if (success) {
      closeModal()
      successModalIsVisible.value = true
    } else {
      errorModalIsVisible.value = true
      errorMessage.value = ERROR_UNKNOWN
    }
  } catch (error) {
    errorModalIsVisible.value = true
    errorMessage.value = ERROR_UNKNOWN
  } finally {
    isLoading.value = false
  }
}

function onSuccessOk() {
  successModalIsVisible.value = false
}
</script>

<template>
  <DefaultButtonComponent
    :text="'Delete'"
    :type="'button'"
    :variant="'danger'"
    :is-loading="isLoading"
    @on-click="modalIsVisible = true"
    v-if="deleteButtonIsVisible"
  />

  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">Delete instructor profile</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="closeModal">&times;</span>
              </button>
            </div>
            <div class="modal-body">ARE YOU SURE YOU WANT TO PROCEED?</div>
            <div class="modal-footer border-0">
              <DefaultButtonComponent
                text="Cancel"
                type="button"
                :disabled="isLoading"
                variant="secondary"
                @on-click="closeModal"
              />

              <DefaultButtonComponent
                text="Delete"
                type="button"
                variant="danger"
                :is-loading="isLoading"
                :disabled="isLoading"
                @on-click="onConfirmDelete"
                class="ml-2"
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
  />

  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    message="Instructor profile successfully deleted."
    :closable="false"
    @on-ok="onSuccessOk"
    :cancel-text="null"
  />
</template>

<style scoped></style>
