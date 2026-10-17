<script setup lang="ts">
import { useToast } from '@/modules/shared/composables/useToast'

const toast = useToast()

function alertClass(type: string): string {
  const map: Record<string, string> = {
    success: 'alert-success',
    error: 'alert-danger',
    warning: 'alert-warning',
    info: 'alert-info'
  }
  return map[type] || 'alert-info'
}
</script>

<template>
  <div class="toast-container">
    <div
      v-for="msg in toast.messages.value"
      :key="msg.id"
      class="alert"
      :class="alertClass(msg.type)"
      role="alert"
    >
      {{ msg.message }}
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="toast.remove(msg.id)"
       >
        </button>
    </div>
  </div>
</template>

<style scoped>
.toast-container {
  position: relative;
  z-index: 1050;
}

.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0 0 0 1rem;
}
</style>
