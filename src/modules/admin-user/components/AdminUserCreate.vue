<script setup lang="ts">
import type { ApiService } from '@/services/apiService'
import { computed, inject, reactive, ref } from 'vue'

import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { email, helpers, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'

import { Role } from '@/utils/userRoles'
import type { Site, SiteEnum } from '@/gql/graphql'
import type { Instructor } from '../interfaces'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

const apiService = inject<ApiService>('gqlApiService')!

const modalIsVisible = ref<boolean>(false)
const isSaving = ref<boolean>(false)

const instructors = ref<Instructor[]>([])
const loadingInstructors = ref<boolean>(false)
const availableSites = ref<Site[]>([])
const loadingSites = ref<boolean>(false)
const instructorsControlIsVisible = ref<boolean>(false)

const successModalIsVisible = ref<boolean>(false)
const errorMessage = ref<string>('')
const errorModalIsVisible = ref<boolean>(false)

const emits = defineEmits<{
  (e: 'afterCreate'): void
}>()

const roleOptions = [
  { label: 'Super Admin', value: Role.ROLE_SUPER_ADMIN },
  { label: 'Staff', value: Role.ROLE_STAFF },
  { label: 'Instructor', value: Role.ROLE_INSTRUCTOR }
]

const formData = reactive({
  username: '',
  email: '',
  role: null as string | null,
  linkedInstructorIds: [] as string[],
  linkedSiteCodes: [] as SiteEnum[],
  favoriteSite: null as SiteEnum | null
})

const selectedInstructors = computed({
  get() {
    return formData.linkedInstructorIds
      .map((id) => instructors.value.find((instructor) => instructor.id === id))
      .filter((instructor): instructor is Instructor => instructor !== undefined)
  },
  set(selected) {
    formData.linkedInstructorIds = selected.map((instructor) => instructor.id)
  }
})

const selectedSites = computed({
  get() {
    return formData.linkedSiteCodes
      .map((code) => availableSites.value.find((site) => site.code === code))
      .filter((site): site is Site => site !== undefined)
  },
  set(selected) {
    formData.linkedSiteCodes = selected.map((site) => site.code)
  }
})

const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage('Username is required', required)
    },
    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('The email address is not valid', email)
    },
    role: {
      required: helpers.withMessage('Rol is required', required)
    },
    linkedInstructorIds: {},
    linkedSiteCodes: {},
    favoriteSite: {
      requiredIfLinkedSiteCodesSelected: helpers.withMessage(
        'Favorite Site is required',
        (value, { linkedSiteCodes }) => {
          return linkedSiteCodes.length === 0 || !!value
        }
      )
    }
  }
})

const v$ = useVuelidate(rules, formData, { $scope: false })

const openModal = () => {
  formData.email = ''
  formData.username = ''
  formData.role = null
  formData.linkedInstructorIds = []
  formData.linkedSiteCodes = []
  formData.favoriteSite = null

  selectedInstructors.value = []
  selectedSites.value = []

  instructorsControlIsVisible.value = false

  v$.value.$reset()

  getAvailableSites()
  getAvailableInstructors()

  modalIsVisible.value = true
}

const closeModal = () => {
  modalIsVisible.value = false
}

const submitForm = async () => {
  const isValid = await v$.value.$validate()

  if (isValid) {
    try {
      isSaving.value = true

      var response = await apiService.addAdminUser({
        username: formData.username,
        email: formData.email,
        role: formData.role!,
        linkedInstructorIds: formData.linkedInstructorIds,
        linkedSiteCodes: formData.linkedSiteCodes,
        favoriteSite: formData.favoriteSite
      })

      if (response.__typename == 'AdminUser') {
        closeModal()
        successModalIsVisible.value = true
      } else if (response.__typename == 'EmailAlreadyUsedError') {
        errorMessage.value =
          'The provided email is already used by another user. Please choose another one.'
        errorModalIsVisible.value = true
      } else if (response.__typename == 'UsernameAlreadyUsedError') {
        errorMessage.value =
          'The provided username is already used by another user. Please choose another one.'
        errorModalIsVisible.value = true
      } else {
        errorModalIsVisible.value = true
        errorMessage.value = ERROR_UNKNOWN
      }
    } catch (error) {
      errorModalIsVisible.value = true
      errorMessage.value = ERROR_UNKNOWN
    } finally {
      isSaving.value = false
    }
  }
}

const onChangeRole = () => {
  formData.linkedInstructorIds = []
  instructorsControlIsVisible.value = formData.role === Role.ROLE_INSTRUCTOR
}

async function getAvailableInstructors(): Promise<void> {
  instructors.value = []
  loadingInstructors.value = true

  try {
    instructors.value = await apiService.getAvailableInstructors()
  } catch (error) {
    // ignore
  } finally {
    loadingInstructors.value = false
  }
}

async function getAvailableSites(): Promise<void> {
  availableSites.value = []
  loadingSites.value = true
  try {
    availableSites.value = await apiService.getAvailableSites()
  } catch (error) {
    // ignore
  } finally {
    loadingSites.value = false
  }
}

function onConfirmSuccessModal() {
  successModalIsVisible.value = false
  emits('afterCreate')
}
</script>

<template>
  <DefaultButtonComponent text="Create a new user" type="button" @on-click="openModal" />

  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">User creation</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="closeModal">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitForm" autocomplete="off">
                <!-- Username -->
                <div class="form-row mb-3">
                  <div class="col">
                    <label for="username" class="input-label">Username *</label>
                    <div class="input-group">
                      <input
                        id="username"
                        class="form-control"
                        v-model="formData.username"
                        type="text"
                        placeholder="Username"
                        required
                      />
                    </div>

                    <small
                      v-for="error in v$.username.$errors"
                      :key="error.$uid"
                      class="form-text"
                      style="color: red"
                    >
                      {{ error.$message }}
                    </small>
                  </div>
                </div>
                <!-- Email -->
                <div class="form-row mb-3">
                  <div class="col">
                    <label for="email" class="input-label">Email *</label>
                    <div class="input-group">
                      <input
                        id="email"
                        class="form-control"
                        v-model="formData.email"
                        type="email"
                        placeholder="Email"
                        required
                      />
                    </div>

                    <small
                      v-for="error in v$.email.$errors"
                      :key="error.$uid"
                      class="form-text"
                      style="color: red"
                    >
                      {{ error.$message }}
                    </small>
                  </div>
                </div>
                <!-- Rol -->
                <div class="form-row mb-3">
                  <div class="col">
                    <label for="email" class="input-label">Rol *</label>
                    <div class="input-group">
                      <select
                        class="custom-select"
                        required
                        v-model="formData.role"
                        placeholder="Rol"
                        @change="onChangeRole"
                      >
                        <option
                          v-for="(item, index) in roleOptions"
                          :key="index"
                          :value="item.value"
                        >
                          {{ item.label }}
                        </option>
                      </select>
                    </div>

                    <small
                      v-for="error in v$.role.$errors"
                      :key="error.$uid"
                      class="form-text"
                      style="color: red"
                    >
                      {{ error.$message }}
                    </small>
                  </div>
                </div>

                <!-- Mindbody staff -->
                <div class="form-row mb-3" v-if="instructorsControlIsVisible">
                  <div class="col">
                    <label for="linkedInstructorIds" class="input-label">Mindbody staff</label>
                    <div>
                      <multiselect
                        v-model="selectedInstructors"
                        :options="instructors"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Mindbody staff"
                        label="name"
                        track-by="id"
                        :preselect-first="false"
                        class="custom-multiselect"
                        :loading="loadingInstructors"
                      >
                      </multiselect>
                    </div>

                    <small
                      v-for="error in v$.linkedInstructorIds.$errors"
                      :key="error.$uid"
                      class="form-text"
                      style="color: red"
                    >
                      {{ error.$message }}
                    </small>
                  </div>
                </div>

                <!-- Admin sites -->
                <div class="form-row mb-3">
                  <div class="col">
                    <label class="input-label">Admin sites</label>
                    <div>
                      <div>
                        <multiselect
                          v-model="selectedSites"
                          :options="availableSites"
                          :multiple="true"
                          :close-on-select="false"
                          :clear-on-select="false"
                          :preserve-search="true"
                          placeholder="Admin sites"
                          label="name"
                          track-by="code"
                          :preselect-first="false"
                          class="custom-multiselect"
                          :loading="loadingSites"
                          :searchable="false"
                        >
                        </multiselect>
                      </div>

                      <small
                        v-for="error in v$.linkedSiteCodes.$errors"
                        :key="error.$uid"
                        class="form-text"
                        style="color: red"
                      >
                        {{ error.$message }}
                      </small>
                    </div>
                  </div>
                </div>

                <!-- Favorite Site -->
                <div class="form-row mb-3" v-if="formData.linkedSiteCodes.length > 0">
                  <div class="col">
                    <label for="favoriteSite" class="input-label">Favorite Site *</label>
                    <div class="input-group">
                      <select
                        class="custom-select"
                        required
                        v-model="formData.favoriteSite"
                        placeholder="Favorite Site"
                      >
                        <option
                          v-for="(item, index) in selectedSites"
                          :key="index"
                          :value="item.code"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>

                    <small
                      v-for="error in v$.favoriteSite.$errors"
                      :key="error.$uid"
                      class="form-text"
                      style="color: red"
                    >
                      {{ error.$message }}
                    </small>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer border-0">
              <DefaultButtonComponent
                text="Cancel"
                type="button"
                :disabled="isSaving"
                variant="secondary"
                @on-click="closeModal"
              ></DefaultButtonComponent>

              <DefaultButtonComponent
                text="Create and send password to user's email"
                type="button"
                :is-loading="isSaving"
                @on-click="submitForm"
              ></DefaultButtonComponent>
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
    message="user successfully created."
    :closable="false"
    @on-ok="onConfirmSuccessModal"
    :cancel-text="null"
  >
  </ModalComponent>
</template>

<style scoped></style>

<style>
.custom-multiselect .multiselect__tag {
  background-color: #ff7f61;
}

.custom-multiselect .multiselect__tag-icon {
  color: #fff;
}

.custom-multiselect .multiselect__option--highlight {
  background-color: #ff7f61;
  color: #fff;
}

.custom-multiselect .multiselect__option--highlight::after {
  background-color: #ff7f61;
}

.custom-multiselect .multiselect__spinner {
  border-top-color: #ff7f61;
}

.multiselect__spinner::after,
.multiselect__spinner::before {
  border-color: #ff7f61 transparent transparent;
}
</style>
