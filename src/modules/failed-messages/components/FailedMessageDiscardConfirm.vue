<script setup lang="ts">
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'

defineProps<{
  messageId: string
  summary: string | null
  isLoading: boolean
}>()

const emits = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">Discard failed message</h5>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                :disabled="isLoading"
                @click="emits('cancel')"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                This will permanently remove message <code>{{ messageId }}</code> from the failure
                queue. It will NOT be processed.
              </p>
              <p v-if="summary" class="text-muted">{{ summary }}</p>
              <p class="mb-0">Are you sure you want to proceed?</p>
            </div>
            <div class="modal-footer border-0">
              <DefaultButtonComponent
                text="Cancel"
                type="button"
                variant="secondary"
                :disabled="isLoading"
                @on-click="emits('cancel')"
              ></DefaultButtonComponent>
              <DefaultButtonComponent
                text="Discard"
                type="button"
                variant="danger"
                class="ms-2"
                :is-loading="isLoading"
                @on-click="emits('confirm')"
              ></DefaultButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
