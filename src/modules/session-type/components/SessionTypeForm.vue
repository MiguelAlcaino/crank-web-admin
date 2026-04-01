<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { helpers, maxLength, minLength, required } from '@vuelidate/validators'
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import ToggleSwitchComponent from '@/modules/shared/components/ToggleSwitchComponent.vue'

export interface SessionTypeFormState {
  name: string
  active: boolean
  color?: string | null
  bannerImageFile: File | null
  bannerImagePath?: string | null
  iconFile: File | null
  icon?: string | null
}

const props = defineProps<{
  initialData?: Partial<SessionTypeFormState>
}>()

const formData = reactive({
  name: '',
  active: true,
  color: '',
  bannerImageFile: null as File | null,
  iconFile: null as File | null
})

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Name is required', required),
    minLength: helpers.withMessage('Name must be at least 3 characters', minLength(3)),
    maxLength: helpers.withMessage('Name must not exceed 256 characters', maxLength(256))
  },
  active: {},
  color: {},
  bannerImageFile: {},
  iconFile: {}
}))

const v$ = useVuelidate(rules, formData, { $scope: false })
const bannerImageInputRef = ref<HTMLInputElement | null>(null)
const bannerImageInputId = 'bannerImageFile'
const iconInputRef = ref<HTMLInputElement | null>(null)
const iconInputId = 'iconFile'
const bannerFileError = ref('')
const iconFileError = ref('')
const BANNER_MAX_FILE_SIZE_BYTES = 300 * 1024
const ICON_MAX_FILE_SIZE_BYTES = 100 * 1024
const iconPreviewUrl = ref<string | null>(null)
const fileInputLabel = computed(() =>
  formData.bannerImageFile ? formData.bannerImageFile.name : 'Choose file'
)
const iconFileInputLabel = computed(() =>
  formData.iconFile ? formData.iconFile.name : 'Choose file'
)
const displayedIconPreview = computed(() => iconPreviewUrl.value ?? props.initialData?.icon ?? null)
const colorPalette = [
  '#000000',
  '#FFFFFF',
  '#FF8A73',
  '#89D0C8',
  '#FEC30D',
  '#F9F9F9',
  '#F3F3F3',
  '#E7E7E7',
  '#8A8A8A'
]

function selectColor(color: string) {
  formData.color = color
}

function isSelectedColor(color: string) {
  return formData.color.trim().toUpperCase() === color.toUpperCase()
}

function populateForm() {
  if (!props.initialData) return

  formData.name = props.initialData.name ?? ''
  formData.active = props.initialData.active ?? true
  formData.color = props.initialData.color ?? ''
  formData.bannerImageFile = props.initialData.bannerImageFile ?? null
  formData.iconFile = props.initialData.iconFile ?? null
}

watch(
  [
    () => props.initialData?.name,
    () => props.initialData?.active,
    () => props.initialData?.color,
    () => props.initialData?.bannerImagePath,
    () => props.initialData?.bannerImageFile,
    () => props.initialData?.icon,
    () => props.initialData?.iconFile
  ],
  () => {
    populateForm()
  },
  { immediate: true }
)

watch(
  () => formData.iconFile,
  (iconFile) => {
    if (iconPreviewUrl.value) {
      URL.revokeObjectURL(iconPreviewUrl.value)
      iconPreviewUrl.value = null
    }

    if (iconFile) {
      iconPreviewUrl.value = URL.createObjectURL(iconFile)
    }
  }
)

onBeforeUnmount(() => {
  if (iconPreviewUrl.value) {
    URL.revokeObjectURL(iconPreviewUrl.value)
  }
})

async function onBannerImageChange(event: Event) {
  const target = event.target as HTMLInputElement
  const selectedFile = target.files?.[0] ?? null

  if (!selectedFile) {
    formData.bannerImageFile = null
    bannerFileError.value = ''
    return
  }

  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
  const fileNameLower = selectedFile.name.toLowerCase()
  const hasAllowedMimeType = allowedMimeTypes.includes(selectedFile.type)
  const hasAllowedExtension = allowedExtensions.some((extension) =>
    fileNameLower.endsWith(extension)
  )

  if (!hasAllowedMimeType && !hasAllowedExtension) {
    formData.bannerImageFile = null
    bannerFileError.value = 'Banner must be JPG, PNG, or WEBP.'
    target.value = ''
    return
  }

  if (selectedFile.size > BANNER_MAX_FILE_SIZE_BYTES) {
    formData.bannerImageFile = null
    bannerFileError.value = 'Banner file size must be 300 KB or less.'
    target.value = ''
    return
  }

  try {
    await getImageDimensions(selectedFile)
  } catch {
    formData.bannerImageFile = null
    bannerFileError.value = 'Invalid banner image.'
    target.value = ''
    return
  }

  formData.bannerImageFile = selectedFile
  bannerFileError.value = ''
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      const width = image.naturalWidth
      const height = image.naturalHeight
      URL.revokeObjectURL(objectUrl)
      resolve({ width, height })
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Could not read image dimensions'))
    }

    image.src = objectUrl
  })
}

async function onIconChange(event: Event) {
  const target = event.target as HTMLInputElement
  const selectedFile = target.files?.[0] ?? null

  if (!selectedFile) {
    formData.iconFile = null
    iconFileError.value = ''
    return
  }

  const isSvgMimeType = selectedFile.type === 'image/svg+xml'
  const hasSvgExtension = selectedFile.name.toLowerCase().endsWith('.svg')

  if (!isSvgMimeType && !hasSvgExtension) {
    formData.iconFile = null
    iconFileError.value = 'Icon must be an SVG (.svg).'
    target.value = ''
    return
  }

  if (selectedFile.size > ICON_MAX_FILE_SIZE_BYTES) {
    formData.iconFile = null
    iconFileError.value = 'Icon file size must be 100 KB or less.'
    target.value = ''
    return
  }

  formData.iconFile = selectedFile
  iconFileError.value = ''
}

const validateAndGetValues = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid || bannerFileError.value || iconFileError.value) return null

  return {
    name: formData.name,
    active: formData.active,
    color: formData.color || undefined,
    bannerImageFile: formData.bannerImageFile ?? undefined,
    iconFile: formData.iconFile ?? undefined
  }
}

const reset = () => {
  v$.value.$reset()
  formData.name = ''
  formData.active = true
  formData.color = ''
  formData.bannerImageFile = null
  formData.iconFile = null
  bannerFileError.value = ''
  iconFileError.value = ''
  if (bannerImageInputRef.value) {
    bannerImageInputRef.value.value = ''
  }
  if (iconInputRef.value) {
    iconInputRef.value.value = ''
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
        <ToggleSwitchComponent id="session-type-active" v-model="formData.active" label="Active" />
      </div>
    </div>

    <div class="form-row mb-3">
      <div class="col-md-6 col-12">
        <label class="input-label">Color</label>
        <div class="color-palette mb-2">
          <button
            v-for="color in colorPalette"
            :key="color"
            type="button"
            class="color-swatch"
            :class="{ 'color-swatch-selected': isSelectedColor(color) }"
            :style="{ backgroundColor: color }"
            :title="color"
            @click="selectColor(color)"
          />
        </div>
        <small class="text-muted">Selected: {{ formData.color || 'None' }}</small>
      </div>
    </div>

    <div class="form-row mb-3">
      <div class="col">
        <label for="bannerImageFile" class="input-label">Banner image</label>
        <small class="d-block text-muted mb-2">JPG, PNG, or WEBP. Max 300 KB.</small>
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
            accept="image/jpeg,image/png,image/webp"
            @change="onBannerImageChange"
          />
          <label class="custom-file-label" :for="bannerImageInputId" data-browse="Browse">
            {{ fileInputLabel }}
          </label>
        </div>
        <small v-if="bannerFileError" class="form-text" style="color: red">
          {{ bannerFileError }}
        </small>
      </div>
    </div>

    <div class="form-row mb-3">
      <div class="col">
        <label for="iconFile" class="input-label">Icon</label>
        <small class="d-block text-muted mb-2">SVG only. Max 100 KB.</small>
        <div v-if="displayedIconPreview" class="mb-2">
          <img :src="displayedIconPreview" alt="Current icon" class="icon-image-preview" />
        </div>
        <div class="custom-file">
          <input
            ref="iconInputRef"
            :id="iconInputId"
            class="custom-file-input"
            type="file"
            accept="image/svg+xml,.svg"
            @change="onIconChange"
          />
          <label class="custom-file-label" :for="iconInputId" data-browse="Browse">
            {{ iconFileInputLabel }}
          </label>
        </div>
        <small v-if="iconFileError" class="form-text" style="color: red">
          {{ iconFileError }}
        </small>
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

.icon-image-preview {
  width: 56px;
  height: 56px;
  object-fit: contain;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background-color: #fff;
}

.color-palette {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.color-swatch {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  cursor: pointer;
}

.color-swatch-selected {
  box-shadow: 0 0 0 2px #343a40;
}
</style>
