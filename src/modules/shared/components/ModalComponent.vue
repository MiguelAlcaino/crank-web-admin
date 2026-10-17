<script lang="ts">
interface Props {
  title: string
  message: string
  cancelText?: string | null
  okText?: string | null
  okLoading?: boolean
  cancelLoading?: boolean
  okDisabled?: boolean
  cancelDisabled?: boolean
  closable?: boolean
}
</script>

<script setup lang="ts">
withDefaults(defineProps<Props>(), {
  cancelText: 'Cancel',
  okText: 'OK',
  okLoading: false,
  cancelLoading: false,
  cancelDisabled: false,
  okDisabled: false,
  closable: false
})

const emits = defineEmits<{
  (e: 'onOk'): void
  (e: 'onCancel'): void
}>()
</script>
<template>
  <transition name="modal">
    <div class="modal-mask">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">{{ title }}</h5>
              <button
                v-if="closable"
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
              <div class="message-font" v-html="message"></div>
            </div>
            <div class="modal-footer border-0">
              <button
                type="button"
                class="btn btn-default"
                v-if="cancelText !== null"
                @click="emits('onCancel')"
                :disabled="cancelDisabled || cancelLoading || okLoading"
              >
                {{ cancelText }}
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  v-if="cancelLoading"
                ></span>
              </button>
              <button
                class="btn btn-primary"
                type="button"
                v-if="okText !== null"
                :disabled="okLoading || okDisabled || cancelLoading"
                @click="emits('onOk')"
              >
                {{ okText }}
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  v-if="okLoading"
                ></span>
              </button>
            </div>
          </div>
        </div>
    </div>
  </transition>
</template>

<style lang="css" scoped>
p {
  font-family: 'Avenir', sans-serif;
}

.message-font {
  text-transform: uppercase;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}
</style>
