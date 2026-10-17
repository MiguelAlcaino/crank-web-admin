<script setup lang="ts">
import dayjs from 'dayjs'

import type { FailedMessageDetails } from '../composables/useFailedMessages'
import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'

defineProps<{
  message: FailedMessageDetails | null
  isLoading: boolean
  error: string | null
}>()

const emits = defineEmits<{
  (e: 'close'): void
}>()

function formatDate(value: string | null | undefined): string {
  return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-'
}
</script>

<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">Failed message detail</h5>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                @click="emits('close')"
              ></button>
            </div>
            <div class="modal-body">
              <div v-if="isLoading" class="text-center">
                <CrankCircularProgressIndicator text="Loading..."></CrankCircularProgressIndicator>
              </div>
              <div v-else-if="error" class="alert alert-danger mb-0" role="alert">{{ error }}</div>
              <template v-else-if="message">
                <table class="table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">ID</th>
                      <td>
                        <code>{{ message.id }}</code>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Message class</th>
                      <td>
                        <code>{{ message.messageClass }}</code>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Summary</th>
                      <td>{{ message.summary ?? '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Exception</th>
                      <td>
                        <code>{{ message.exceptionClass ?? '-' }}</code>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Failed at</th>
                      <td>{{ formatDate(message.failedAt) }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Retries</th>
                      <td>{{ message.retryCount }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Original transport</th>
                      <td>{{ message.originalTransport ?? '-' }}</td>
                    </tr>
                  </tbody>
                </table>

                <div v-if="message.errorMessage" class="mb-3">
                  <h6>Error message</h6>
                  <pre class="border rounded p-2 error-message">{{ message.errorMessage }}</pre>
                </div>

                <div v-if="message.payfortDetails" class="card">
                  <div class="card-header">Payfort details</div>
                  <div class="card-body">
                    <table class="table table-sm table-borderless mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">Merchant reference</th>
                          <td>{{ message.payfortDetails.merchantReference ?? '-' }}</td>
                        </tr>
                        <tr>
                          <th scope="row">Amount</th>
                          <td>{{ message.payfortDetails.amount ?? '-' }}</td>
                        </tr>
                        <tr>
                          <th scope="row">Response message</th>
                          <td>{{ message.payfortDetails.responseMessage ?? '-' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </template>
              <p v-else class="text-center mb-0">
                Message not found. It may have been retried or discarded already.
              </p>
            </div>
            <div class="modal-footer border-0">
              <DefaultButtonComponent
                text="Close"
                type="button"
                variant="secondary"
                @on-click="emits('close')"
              ></DefaultButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.error-message {
  max-height: 250px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
