<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id: string
  modelValue: boolean
  disabled?: boolean
  isLoading?: boolean
  label?: string
  trueLabel?: string
  falseLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  isLoading: false
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const resolvedLabel = computed(() => {
  if (props.trueLabel || props.falseLabel) {
    return props.modelValue ? props.trueLabel : props.falseLabel
  }

  return props.label
})

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  const checked = target.checked

  emits('update:modelValue', checked)
  emits('change', checked)
}
</script>

<template>
  <div class="custom-control custom-switch">
    <input
      :id="id"
      type="checkbox"
      class="custom-control-input"
      :checked="modelValue"
      @change="handleChange"
      :disabled="disabled || isLoading"
    />
    <label class="custom-control-label" :for="id">
      {{ resolvedLabel }}
    </label>
    <div v-if="isLoading" class="spinner"></div>
  </div>
</template>

<style scoped>
.custom-control-input:focus ~ .custom-control-label::before {
  border-color: #ff6f60 !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 47, 69, 0.25) !important;
}

.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #ff6f60 !important;
  background-color: #ff6f60 !important;
}

.custom-control-input:active ~ .custom-control-label::before {
  background-color: #ff6f60 !important;
  border-color: #ff6f60 !important;
}

.custom-control-input:focus:not(:checked) ~ .custom-control-label::before {
  border-color: #ff6f60 !important;
}

.custom-control-input-green:not(:disabled):active ~ .custom-control-label::before {
  background-color: #ff6f60 !important;
  border-color: #ff6f60 !important;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #ff6f60;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-left: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
