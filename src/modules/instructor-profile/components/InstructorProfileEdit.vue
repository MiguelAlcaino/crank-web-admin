<script setup lang="ts">
import { inject, ref, onMounted } from 'vue'

// Interfaces and Services
import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { useInstructorProfiles } from '../composables/useInstructorProfiles'
import { useMindbodyStaffs } from '../composables/useMindbodyStaffs'
import type { InstructorProfile } from '../interfaces/Instructor-profile'

// UI Components
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import InstructorProfileDelete from './InstructorProfileDelete.vue'
import InstructorProfileForm from './InstructorProfileForm.vue'

// Dependency Injection
const apiService = inject<ApiService>('gqlApiService')!
const { updateInstructorProfile, unlinkMindbodyStaff, linkMindbodyStaff } =
  useInstructorProfiles(apiService)
const { availableStaffs, isLoadingStaffs, getAvailableStaffs, getStaffsNotLinked } =
  useMindbodyStaffs(apiService)

// Props
const props = defineProps<{
  instructorProfile: InstructorProfile
}>()

// Local States
const modalIsVisible = ref(false)
const isSaving = ref(false)
const isUnlinkingStaff = ref(false)
const isLinkingStaff = ref(false)
const selectedStaffIds = ref<string[]>([])

// States for Error and Success Handling
const successModalIsVisible = ref(false)
const errorMessage = ref('')
const errorModalIsVisible = ref(false)

// Reference to the form component
const formRef = ref<InstanceType<typeof InstructorProfileForm> | null>(null)

// Open the main modal
const openModal = () => {
  modalIsVisible.value = true
  selectedStaffIds.value = []
  getAvailableStaffs()
}

// Close the main modal
const closeModal = () => {
  modalIsVisible.value = false
  selectedStaffIds.value = []
}

// Save logic
const submitForm = async () => {
  // 1. Check child component is mounted
  if (!formRef.value) return

  // 2. Ask the child to validate and give us the clean data
  const data = await formRef.value.validateAndGetValues()

  if (data) {
    try {
      isSaving.value = true

      // 3. Call API to update
      const success = await updateInstructorProfile(props.instructorProfile.id, {
        name: data.name,
        description: data.description,
        active: data.active,
        profilePictureFile: data.profilePictureFile
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

// Unlink staff function
async function onUnlinkStaff(staffId: string) {
  try {
    isUnlinkingStaff.value = true
    const success = await unlinkMindbodyStaff(props.instructorProfile.id, [staffId])

    if (!success) {
      errorMessage.value = ERROR_UNKNOWN
      errorModalIsVisible.value = true
    }
  } catch (error) {
    errorMessage.value = ERROR_UNKNOWN
    errorModalIsVisible.value = true
  } finally {
    isUnlinkingStaff.value = false
  }
}

// Link staff function
async function onLinkStaffs() {
  if (selectedStaffIds.value.length === 0) {
    errorMessage.value = 'Please select at least one staff member'
    errorModalIsVisible.value = true
    return
  }

  try {
    isLinkingStaff.value = true
    const success = await linkMindbodyStaff(props.instructorProfile.id, selectedStaffIds.value)

    if (success) {
      selectedStaffIds.value = []
    } else {
      errorMessage.value = ERROR_UNKNOWN
      errorModalIsVisible.value = true
    }
  } catch (error) {
    errorMessage.value = ERROR_UNKNOWN
    errorModalIsVisible.value = true
  } finally {
    isLinkingStaff.value = false
  }
}
</script>

<template>
  <!-- Pencil Button to open edit modal -->
  <button type="button" class="btn btn-link btn-sm" @click="openModal">
    <i class="bi bi-pencil-fill"></i>
  </button>

  <!-- Modal -->
  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <!-- Header -->
            <div class="modal-header border-0">
              <h5 class="modal-title">Edit instructor profile '{{ instructorProfile?.name }}'</h5>
              <button type="button" class="close" @click="closeModal"><span>&times;</span></button>
            </div>

            <!-- Body-->
            <div class="modal-body">
              <InstructorProfileForm ref="formRef" :initialData="instructorProfile" />

              <!-- Mindbody Staffs Section -->
              <div class="mt-4">
                <h6>Associated Mindbody Staffs</h6>

                <!-- Current Staffs -->
                <div
                  v-if="instructorProfile.mindbodyStaffs && instructorProfile.mindbodyStaffs.length > 0"
                  class="list-group mb-3"
                >
                  <div
                    v-for="staff in instructorProfile.mindbodyStaffs"
                    :key="staff.id"
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{{ staff.firstName }} {{ staff.lastName }}</strong>
                      <br />
                      <small class="text-muted">{{ staff.email }}</small>
                    </div>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-danger"
                      @click="onUnlinkStaff(staff.id)"
                      :disabled="isUnlinkingStaff"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>

                <!-- Add New Staffs -->
                <div class="card p-3">
                  <h6 class="mb-2">Add Mindbody Staff</h6>
                  <div class="form-group mb-2">
                    <label for="staffSelect" class="form-label">Select staff member(s)</label>
                    <select
                      id="staffSelect"
                      class="form-control"
                      multiple
                      v-model="selectedStaffIds"
                      :disabled="isLoadingStaffs || isLinkingStaff"
                    >
                      <option
                        v-for="staff in getStaffsNotLinked(
                          instructorProfile.mindbodyStaffs?.map((s) => s.id) || []
                        )"
                        :key="staff.id"
                        :value="staff.id"
                      >
                        {{ staff.firstName }} {{ staff.lastName }} ({{ staff.email }})
                      </option>
                    </select>
                    <small class="form-text text-muted">Hold Ctrl/Cmd to select multiple</small>
                  </div>
                  <button
                    type="button"
                    class="btn btn-sm btn-primary"
                    @click="onLinkStaffs"
                    :disabled="isLinkingStaff || selectedStaffIds.length === 0"
                    :class="{ 'spinner-border spinner-border-sm': isLinkingStaff }"
                  >
                    <span v-if="!isLinkingStaff">Add Staff</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Footer: Specific actions for Edit (Delete, Cancel, Update) -->
            <div class="modal-footer border-0 d-flex justify-content-between">
              <div>
                <InstructorProfileDelete :instructorProfile="instructorProfile" />
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
    message="Instructor profile successfully updated."
    :closable="false"
    @on-ok="onSuccessOk"
    :cancel-text="null"
  >
  </ModalComponent>
</template>

<style scoped></style>
