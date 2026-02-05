<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
import { helpers, required, minLength, maxLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export interface InstructorProfileFormState {
  name: string
  description: string | null | undefined
  active: boolean
  profilePictureFile: File | null
}

const props = defineProps<{
  initialData?: Partial<InstructorProfileFormState>
}>()

const formData = reactive({
  name: '',
  description: '',
  active: true,
  profilePictureFile: null as File | null
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

onMounted(() => {
  populateForm()
})

function populateForm() {
  if (!props.initialData) return

  formData.name = props.initialData.name ?? ''
  formData.description = props.initialData.description ?? ''
  formData.active = props.initialData.active ?? true
  formData.profilePictureFile = props.initialData.profilePictureFile ?? null
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  formData.profilePictureFile = target.files?.[0] ?? null
}

const validateAndGetValues = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return null

  return {
    name: formData.name,
    description: formData.description?.trim() ? formData.description : undefined,
    active: formData.active,
    profilePictureFile: formData.profilePictureFile ?? undefined
  }
}

const reset = () => {
  v$.value.$reset()
  formData.name = ''
  formData.description = ''
  formData.active = true
  formData.profilePictureFile = null
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
        <div class="form-check">
          <input id="active" class="form-check-input" type="checkbox" v-model="formData.active" />
          <label class="form-check-label" for="active">Active</label>
        </div>
      </div>
    </div>

    <!-- Profile Picture -->
    <div class="form-row mb-3">
      <div class="col">
        <label for="profilePictureFile" class="custom-file-label">Profile picture</label>
        <div class="input-group">
          <input
            id="profilePictureFile"
            class="form-control-file"
            type="file"
            accept="image/*"
            @change="onFileChange"
          />
        </div>
        <small v-if="formData.profilePictureFile" class="form-text">
          Selected: {{ formData.profilePictureFile.name }}
        </small>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
