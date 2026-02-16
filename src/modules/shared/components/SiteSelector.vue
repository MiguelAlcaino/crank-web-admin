<script setup lang="ts">
import type { Site } from '@/modules/shared/interfaces/site'

withDefaults(
  defineProps<{
    modelValue: Site['code'] | null
    sites: Site[]
    disabled?: boolean
    isLoading?: boolean
    required?: boolean
    id?: string
  }>(),
  {
    disabled: false,
    isLoading: false,
    required: false,
    id: undefined
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: Site['code'] | null): void
  (e: 'change', value: Site['code'] | null): void
}>()

function onChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  const value = (target.value || null) as Site['code'] | null
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="position-relative">
    <select
      :id="id"
      class="custom-select"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      @change="onChange"
    >
      <option v-for="site in sites" :key="site.code" :value="site.code">
        {{ site.name }}
      </option>
    </select>
    <div
      v-if="isLoading"
      class="spinner-border text-primary position-absolute custom-select-spinner"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<style scoped>
.custom-select-spinner {
  color: #ff7f61 !important;
  top: 30%;
  right: 28px;
  width: 1rem;
  height: 1rem;
  border-width: 0.2em;
}
</style>
