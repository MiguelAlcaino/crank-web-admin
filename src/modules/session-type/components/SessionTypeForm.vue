<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { helpers, maxLength, minLength, required } from '@vuelidate/validators'
import { computed, reactive, ref, watch } from 'vue'

export interface SessionTypeFormState {
  name: string
  active: boolean
  bannerImageFile: File | null
  bannerImagePath?: string | null
}

const props = defineProps<{
  initialData?: Partial<SessionTypeFormState>
}>()

const formData = reactive({
  name: '',
  active: true,
  bannerImageFile: null as File | null
})

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Name is required', required),
    minLength: helpers.withMessage('Name must be at least 3 characters', minLength(3)),
    maxLength: helpers.withMessage('Name must not exceed 256 characters', maxLength(256))
  },
  active: {},
  bannerImageFile: {}
}))

const v$ = useVuelidate(rules, formData, { $scope: false })
const bannerImageInputRef = ref<HTMLInputElement | null>(null)
const bannerImageInputId = 'bannerImageFile'
const fileInputLabel = computed(() =>
  formData.bannerImageFile ? formData.bannerImageFile.name : 'Choose file'
)

function populateForm() {
  if (!props.initialData) return

  formData.name = props.initialData.name ?? ''
  formData.active = props.initialData.active ?? true
  formData.bannerImageFile = props.initialData.bannerImageFile ?? null
}

watch(
  () => props.initialData,
  () => {
    populateForm()
  },
  { immediate: true }
)

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  formData.bannerImageFile = target.files?.[0] ?? null
}

const validateAndGetValues = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return null

  return {
    name: formData.name,
    active: formData.active,
    bannerImageFile: formData.bannerImageFile ?? undefined
  }
}

const reset = () => {
  v$.value.$reset()
  formData.name = ''
  formData.active = true
  formData.bannerImageFile = null
  if (bannerImageInputRef.value) {
    bannerImageInputRef.value.value = ''
  }
}

defineExpose({
  validateAndGetValues,
  reset
})
</script>

<template>
  <div>
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

    <div class="form-row mb-3">
      <div class="col">
        <div class="form-check">
          <input id="active" class="form-check-input" type="checkbox" v-model="formData.active" />
          <label class="form-check-label" for="active">Active</label>
        </div>
      </div>
    </div>

    <div class="form-row mb-3">
      <div class="col">
        <label for="bannerImageFile" class="input-label">Banner image</label>
        <div v-if="props.initialData?.bannerImagePath && !formData.bannerImageFile" class="mb-2">
          <img
            :src="props.initialData.bannerImagePath"
            alt="Current banner image"
            class="banner-image-preview"
          />
        </div>
        <div class="custom-file">
          <input
            ref="bannerImageInputRef"
            :id="bannerImageInputId"
            class="custom-file-input"
            type="file"
            accept="image/*"
            @change="onFileChange"
          />
          <label class="custom-file-label" :for="bannerImageInputId" data-browse="Browse">
            {{ fileInputLabel }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner-image-preview {
  max-width: 180px;
  max-height: 100px;
  object-fit: cover;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}
</style>
