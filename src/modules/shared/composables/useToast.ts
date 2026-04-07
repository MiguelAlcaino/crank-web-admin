import { ref, readonly } from 'vue'

export interface ToastMessage {
  id: number
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

const messages = ref<ToastMessage[]>([])
let nextId = 0

function addToast(type: ToastMessage['type'], message: string, duration = 5000) {
  const id = nextId++
  messages.value.push({ id, type, message })

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }
}

function removeToast(id: number) {
  messages.value = messages.value.filter((m) => m.id !== id)
}

export function useToast() {
  return {
    messages: readonly(messages),
    success(message: string) {
      addToast('success', message)
    },
    error(message: string) {
      addToast('error', message)
    },
    warning(message: string) {
      addToast('warning', message)
    },
    info(message: string) {
      addToast('info', message)
    },
    remove: removeToast
  }
}
