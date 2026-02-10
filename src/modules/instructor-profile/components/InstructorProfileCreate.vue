<script setup lang="ts">
import { computed, inject, ref } from 'vue'

// Interfaces and Services
import type { ApiService } from '@/services/apiService'
import type { MindbodyStaff } from '../interfaces'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { useInstructorProfiles } from '../composables/useInstructorProfiles'
import { useMindbodyStaffs } from '../composables/useMindbodyStaffs'

// UI Components
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import InstructorProfileForm from './InstructorProfileForm.vue'
import MindbodyStaffDraggable from './MindbodyStaffDraggable.vue'
import { appStore } from '@/stores/appStorage'

// Dependency Injection
const apiService = inject<ApiService>('gqlApiService')!
const { createInstructorProfile } = useInstructorProfiles(apiService)
const { availableStaffs, isLoadingStaffs, getAvailableStaffs } = useMindbodyStaffs(apiService)

// Local States
const modalIsVisible = ref(false)
const isSaving = ref(false)

// Staff management
const assignedStaff = ref<MindbodyStaff[]>([])
const availableStaffComputed = computed(() => {
  const assignedIds = assignedStaff.value.map((s) => s.id)
  return availableStaffs.value.filter((staff) => !assignedIds.includes(staff.id))
})

// States for Error and Success Handling
const successModalIsVisible = ref(false)
const errorMessage = ref('')
const errorModalIsVisible = ref(false)

// Reference to the form component
const formRef = ref<InstanceType<typeof InstructorProfileForm> | null>(null)

// Open the main modal
const openModal = () => {
  modalIsVisible.value = true
  assignedStaff.value = []
  getAvailableStaffs()
}

// Close the main modal
const closeModal = () => {
  modalIsVisible.value = false
  assignedStaff.value = []
}

// Save logic
const submitForm = async () => {
  if (!formRef.value) return

  const data = await formRef.value.validateAndGetValues()

  if (data) {
    try {
      isSaving.value = true

      const success = await createInstructorProfile({
        site: appStore().site,
        name: data.name,
        description: data.description,
        active: data.active,
        profilePictureFile: data.profilePictureFile,
        linkedMindbodyStaffs: assignedStaff.value.map((s) => s.id)
      })

      if (success) {
        closeModal()
        successModalIsVisible.value = true
      } else {
        errorMessage.value = ERROR_UNKNOWN
        errorModalIsVisible.value = true
      }
    } catch (error) {
      errorMessage.value = ERROR_UNKNOWN
      errorModalIsVisible.value = true
    } finally {
      isSaving.value = false
    }
  }
}

// Close success modal
function onSuccessOk() {
  successModalIsVisible.value = false
}
</script>

<template>
  <!-- Button -->
  <DefaultButtonComponent text="Create instructor profile" type="button" @on-click="openModal()" />

  <!-- Modal -->
  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <!-- Header -->
            <div class="modal-header border-0">
              <h5 class="modal-title">Create instructor profile</h5>
              <button type="button" class="close" @click="closeModal"><span>&times;</span></button>
            </div>

            <!-- Body-->
            <div class="modal-body">
              <InstructorProfileForm ref="formRef" />

              <!-- Mindbody Staffs Section -->
              <div class="mt-4">
                <h6>Associate Mindbody Staffs</h6>

                <MindbodyStaffDraggable
                  :availableStaff="availableStaffComputed"
                  :assignedStaff="assignedStaff"
                  :isLoading="isLoadingStaffs"
                  @update:assignedStaff="assignedStaff = $event"
                />
              </div>
            </div>

            <!-- Footer: Specific actions for Create (Cancel, Create) -->
            <div class="modal-footer border-0">
              <DefaultButtonComponent
                text="Cancel"
                type="button"
                :disabled="isSaving"
                variant="secondary"
                @on-click="closeModal"
              />
              <DefaultButtonComponent
                text="Create instructor profile"
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

  <!-- Error Modal -->
  <ModalComponent
    v-if="errorModalIsVisible"
    title="ERROR"
    :message="errorMessage"
    :closable="false"
    @on-ok="errorModalIsVisible = false"
    :cancel-text="null"
  >
  </ModalComponent>

  <!-- Success Modal -->
  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    message="Instructor profile successfully created."
    :closable="false"
    @on-ok="onSuccessOk"
    :cancel-text="null"
  >
  </ModalComponent>
</template>

<style scoped></style>
