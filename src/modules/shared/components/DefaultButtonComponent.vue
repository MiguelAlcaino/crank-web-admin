<script setup lang="ts">
interface Props {
  text: string
  isLoading?: boolean
  disabled?: boolean
  type: 'button' | 'submit'
  block?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'lg'
}
withDefaults(defineProps<Props>(), {
  isLoading: false,
  disabled: false,
  type: 'button',
  block: false,
  variant: 'primary'
})

const emits = defineEmits<{
  (e: 'onClick'): void
}>()
</script>
<template>
  <button
    :type="type"
    class="btn"
    @click="emits('onClick')"
    :disabled="disabled || isLoading"
    :class="{
      'btn-block': block,
      'btn-primary': variant === 'primary',
      'btn-secondary': variant === 'secondary',
      'btn-danger': variant === 'danger',
      'btn-sm': size === 'sm',
      'btn-lg': size === 'lg',
      disabled: disabled
    }"
  >
    {{ text }}
    <span class="spinner-border spinner-border-sm" v-if="isLoading"></span>
  </button>
</template>
