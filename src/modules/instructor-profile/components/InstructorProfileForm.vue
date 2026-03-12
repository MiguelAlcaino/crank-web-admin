<script setup lang="ts">
import { computed, reactive, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { helpers, required, minLength, maxLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import ToggleSwitchComponent from '@/modules/shared/components/ToggleSwitchComponent.vue'

export interface InstructorProfileFormState {
  name: string
  description: string | null | undefined
  active: boolean
  profilePictureFile: File | null
  profilePictureUrl?: string
}

const props = defineProps<{
  initialData?: Partial<InstructorProfileFormState>
}>()

const formData = reactive({
  name: '',
  description: '',
  active: true,
  profilePictureFile: null as File | null,
  removeCurrentProfilePicture: false
})

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Name is required', required),
    minLength: helpers.withMessage('Name must be at least 3 characters', minLength(3)),
    maxLength: helpers.withMessage('Name must not exceed 256 characters', maxLength(256))
  },
  description: {
    maxLength: helpers.withMessage('Description must not exceed 1024 characters', maxLength(1024))
  },
  active: {},
  profilePictureFile: {}
}))

const v$ = useVuelidate(rules, formData, { $scope: false })
const profilePictureInputRef = ref<HTMLInputElement | null>(null)
const profilePictureInputId = 'profilePictureFile'
const fileInputLabel = computed(() =>
  formData.profilePictureFile ? formData.profilePictureFile.name : 'Choose file'
)
const selectedPicturePreviewUrl = ref<string | null>(null)
const removeImageBtnIsVisible = false

watch(
  () => formData.profilePictureFile,
  (file) => {
    if (selectedPicturePreviewUrl.value) {
      URL.revokeObjectURL(selectedPicturePreviewUrl.value)
      selectedPicturePreviewUrl.value = null
    }

    if (file) {
      selectedPicturePreviewUrl.value = URL.createObjectURL(file)
    }
  }
)

onBeforeUnmount(() => {
  if (selectedPicturePreviewUrl.value) {
    URL.revokeObjectURL(selectedPicturePreviewUrl.value)
  }
})

onMounted(() => {
  populateForm()
})

function populateForm() {
  if (!props.initialData) return

  formData.name = props.initialData.name ?? ''
  formData.description = props.initialData.description ?? ''
  formData.active = props.initialData.active ?? true
  formData.profilePictureFile = props.initialData.profilePictureFile ?? null
  formData.removeCurrentProfilePicture = false
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  formData.profilePictureFile = target.files?.[0] ?? null
  if (formData.profilePictureFile) {
    formData.removeCurrentProfilePicture = false
  }
}

function removeCurrentImage() {
  formData.profilePictureFile = null
  formData.removeCurrentProfilePicture = true
  if (profilePictureInputRef.value) {
    profilePictureInputRef.value.value = ''
  }
}

const validateAndGetValues = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return null

  return {
    name: formData.name,
    description: formData.description?.trim() ? formData.description : undefined,
    active: formData.active,
    profilePictureFile: formData.profilePictureFile
      ? formData.profilePictureFile
      : formData.removeCurrentProfilePicture
      ? null
      : undefined
  }
}

const reset = () => {
  v$.value.$reset()
  formData.name = ''
  formData.description = ''
  formData.active = true
  formData.profilePictureFile = null
  formData.removeCurrentProfilePicture = false
  if (profilePictureInputRef.value) {
    profilePictureInputRef.value.value = ''
  }
}

defineExpose({
  validateAndGetValues,
  reset
})
</script>

<template>
  <div>
    <!-- Name -->
    <div class="form-row mb-3">
      <div class="col">
        <label for="name" class="input-label">Name *</label>
        <div class="input-group">
          <input
            id="name"
            class="form-control"
            v-model="formData.name"
            type="text"
            placeholder="Name"
            required
            maxlength="256"
          />
        </div>
        <small
          v-for="error in v$.name.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <!-- Description -->
    <div class="form-row mb-3">
      <div class="col">
        <label for="description" class="input-label">Description</label>
        <div class="input-group">
          <textarea
            id="description"
            class="form-control"
            v-model="formData.description"
            rows="4"
            placeholder="Description"
            maxlength="1024"
          ></textarea>
        </div>
        <small
          v-for="error in v$.description.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <!-- Active -->
    <div class="form-row mb-3">
      <div class="col">
        <ToggleSwitchComponent
          id="instructor-profile-active"
          v-model="formData.active"
          label="Active"
        />
      </div>
    </div>

    <!-- Profile Picture -->
    <div class="form-row mb-3">
      <div class="col">
        <label for="profilePictureFile" class="input-label">Profile picture</label>
        <div
          v-if="
            props.initialData?.profilePictureUrl &&
            !formData.removeCurrentProfilePicture &&
            !formData.profilePictureFile
          "
          class="current-picture-row"
        >
          <img
            :src="props.initialData.profilePictureUrl"
            alt="Current profile picture"
            class="profile-picture-preview"
          />
          <button
            type="button"
            class="btn btn-outline-danger btn-sm"
            @click="removeCurrentImage"
            v-if="removeImageBtnIsVisible"
          >
            Remove current image
          </button>
        </div>
        <div class="custom-file">
          <input
            ref="profilePictureInputRef"
            :id="profilePictureInputId"
            class="custom-file-input"
            type="file"
            accept="image/*"
            @change="onFileChange"
          />
          <label class="custom-file-label" :for="profilePictureInputId" data-browse="Browse">
            {{ fileInputLabel }}
          </label>
        </div>
        <div
          v-if="formData.profilePictureFile && selectedPicturePreviewUrl"
          class="selected-picture-row"
        >
          <img
            :src="selectedPicturePreviewUrl"
            alt="Selected profile picture preview"
            class="profile-picture-preview"
          />
          <small class="form-text mb-0">{{ formData.profilePictureFile.name }}</small>
        </div>
        <small v-if="formData.removeCurrentProfilePicture" class="form-text text-danger">
          Current image will be removed when saving.
        </small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.current-picture-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.selected-picture-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.profile-picture-preview {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #dee2e6;
}
</style>
