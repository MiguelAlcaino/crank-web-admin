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
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="emits('cancel')">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>
                This will permanently remove message <code>{{ messageId }}</code> from the failure
                queue. It will NOT be processed.
              </p>
              <p v-if="summary" class="text-muted">{{ summary }}</p>
              <p class="mb-0">ARE YOU SURE YOU WANT TO PROCEED?</p>
            </div>
            <div class="modal-footer border-0">
              <DefaultButtonComponent
                text="Cancel"
                type="button"
                :disabled="isLoading"
                variant="secondary"
                @on-click="emits('cancel')"
              ></DefaultButtonComponent>

              <DefaultButtonComponent
                text="Discard"
                type="button"
                variant="danger"
                :is-loading="isLoading"
                :disabled="isLoading"
                @on-click="emits('confirm')"
                class="ml-2"
              ></DefaultButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped></style>
