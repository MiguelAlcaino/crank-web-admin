<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import type { ApolloClient } from '@apollo/client'

import { FailedMessageQueueEnum } from '@/gql/graphql'
import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useFailedMessages } from '../composables/useFailedMessages'
import type { FailedMessageActionResult, FailedMessageRow } from '../composables/useFailedMessages'
import FailedMessageDetail from '../components/FailedMessageDetail.vue'
import FailedMessageDiscardConfirm from '../components/FailedMessageDiscardConfirm.vue'
import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import PaginationComponent from '@/modules/shared/components/PaginationComponent.vue'

const apolloClient = inject<ApolloClient<any>>(
  'failedMessagesApolloClient',
  () => newAuthenticatedApolloClient(import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL),
  true
)

const {
  failedMessages,
  total,
  isLoading,
  hasError,
  selectedMessage,
  isLoadingDetail,
  actingId,
  actingAction,
  fetchFailedMessages,
  fetchFailedMessage,
  retryFailedMessage,
  discardFailedMessage
} = useFailedMessages(apolloClient)

const tabs = [
  { label: 'Payfort feedback', queue: FailedMessageQueueEnum.PayfortTransactionFeedback },
  { label: 'Default queue', queue: FailedMessageQueueEnum.Default }
]

const activeQueue = ref<FailedMessageQueueEnum>(FailedMessageQueueEnum.PayfortTransactionFeedback)
const currentPage = ref<number>(1)
const limit = 25

const detailIsVisible = ref<boolean>(false)
const discardTarget = ref<FailedMessageRow | null>(null)

const alert = ref<{ type: 'success' | 'warning' | 'danger'; text: string } | null>(null)
let alertTimeout: ReturnType<typeof setTimeout> | null = null

const isPayfortTab = computed(
  () => activeQueue.value === FailedMessageQueueEnum.PayfortTransactionFeedback
)
const columnCount = computed(() => (isPayfortTab.value ? 8 : 7))

onMounted(() => {
  loadList()
})

onBeforeUnmount(() => {
  if (alertTimeout) clearTimeout(alertTimeout)
})

async function loadList() {
  await fetchFailedMessages(activeQueue.value, currentPage.value, limit)
}

function selectQueue(queue: FailedMessageQueueEnum) {
  if (queue === activeQueue.value) return

  activeQueue.value = queue
  currentPage.value = 1
  loadList()
}

function goToPage(page: number) {
  currentPage.value = page
  loadList()
}

function showAlert(type: 'success' | 'warning' | 'danger', text: string) {
  alert.value = { type, text }
  if (alertTimeout) clearTimeout(alertTimeout)
  alertTimeout = setTimeout(() => (alert.value = null), 5000)
}

function shortClassName(fqcn: string | null | undefined): string {
  return fqcn ? (fqcn.split('\\').pop() as string) : '-'
}

function formatDate(dateStr: string | null | undefined): string {
  return dateStr ? new Date(dateStr).toLocaleString() : '-'
}

function openDetail(row: FailedMessageRow) {
  detailIsVisible.value = true
  fetchFailedMessage(activeQueue.value, row.id)
}

async function onRetry(row: FailedMessageRow) {
  const result = await retryFailedMessage(activeQueue.value, row.id)
  await handleActionResult(result, 'Message re-dispatched for processing.')
}

async function onConfirmDiscard() {
  if (discardTarget.value === null) return

  const result = await discardFailedMessage(activeQueue.value, discardTarget.value.id)
  discardTarget.value = null
  await handleActionResult(result, 'Failed message discarded.')
}

async function handleActionResult(result: FailedMessageActionResult, successText: string) {
  if (result === 'error') {
    showAlert('danger', 'Action failed. Please try again later.')
    return
  }

  if (result === 'success') {
    showAlert('success', successText)
  } else {
    showAlert('warning', 'Message not found. It may have been retried or discarded already.')
  }

  if (failedMessages.value.length === 1 && currentPage.value > 1) {
    currentPage.value = currentPage.value - 1
  }
  await loadList()
}
</script>

<template>
  <h1>Failed Messages</h1>

  <div
    v-if="alert"
    class="alert alert-dismissible"
    :class="{
      'alert-success': alert.type === 'success',
      'alert-warning': alert.type === 'warning',
      'alert-danger': alert.type === 'danger'
    }"
    role="alert"
  >
    {{ alert.text }}
    <button type="button" class="btn-close" aria-label="Close" @click="alert = null"></button>
  </div>

  <ul class="nav nav-tabs">
    <li v-for="tab in tabs" :key="tab.queue" class="nav-item">
      <a
        href="#"
        class="nav-link"
        :class="{ active: activeQueue === tab.queue }"
        @click.prevent="selectQueue(tab.queue)"
      >
        {{ tab.label }}
      </a>
    </li>
  </ul>

  <div v-if="hasError" class="alert alert-danger mt-3" role="alert">
    The failed messages could not be loaded. Please try again later.
  </div>

  <div class="row mt-3">
    <div class="col-12">
      <p v-if="!isLoading">{{ total }} record(s) found</p>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Summary</th>
            <template v-if="isPayfortTab">
              <th>Merchant Ref</th>
              <th>Amount</th>
            </template>
            <th v-else>Message Class</th>
            <th>Exception</th>
            <th>Failed At</th>
            <th>Retries</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in failedMessages" :key="item.id">
            <td>
              <code>{{ item.id }}</code>
            </td>
            <td>{{ item.summary ?? '-' }}</td>
            <template v-if="isPayfortTab">
              <td>{{ item.payfortDetails?.merchantReference ?? '-' }}</td>
              <td>{{ item.payfortDetails?.amount ?? '-' }}</td>
            </template>
            <td v-else :title="item.messageClass">
              <code>{{ shortClassName(item.messageClass) }}</code>
            </td>
            <td :title="item.exceptionClass ?? undefined">
              <code>{{ shortClassName(item.exceptionClass) }}</code>
            </td>
            <td>{{ formatDate(item.failedAt) }}</td>
            <td class="text-center">{{ item.retryCount }}</td>
            <td class="text-end text-nowrap">
              <DefaultButtonComponent
                text="View"
                type="button"
                variant="secondary"
                size="sm"
                :disabled="actingId !== null"
                @on-click="openDetail(item)"
              ></DefaultButtonComponent>
              <DefaultButtonComponent
                text="Retry"
                type="button"
                size="sm"
                class="ms-1"
                :is-loading="actingId === item.id && actingAction === 'retry'"
                :disabled="actingId !== null"
                @on-click="onRetry(item)"
              ></DefaultButtonComponent>
              <DefaultButtonComponent
                text="Discard"
                type="button"
                variant="danger"
                size="sm"
                class="ms-1"
                :disabled="actingId !== null"
                @on-click="discardTarget = item"
              ></DefaultButtonComponent>
            </td>
          </tr>
          <tr v-if="!isLoading && failedMessages.length === 0">
            <td :colspan="columnCount" class="text-center">
              <p>No failed messages in this queue</p>
            </td>
          </tr>
          <tr v-if="isLoading">
            <td :colspan="columnCount" class="text-center">
              <CrankCircularProgressIndicator text="Loading..."></CrankCircularProgressIndicator>
            </td>
          </tr>
        </tbody>
      </table>

      <PaginationComponent
        v-if="total > limit"
        :page="currentPage"
        :limit="limit"
        :total="total"
        @page-changed="goToPage"
      ></PaginationComponent>
    </div>
  </div>

  <FailedMessageDetail
    v-if="detailIsVisible"
    :message="selectedMessage"
    :is-loading="isLoadingDetail"
    @close="detailIsVisible = false"
  ></FailedMessageDetail>

  <FailedMessageDiscardConfirm
    v-if="discardTarget !== null"
    :message-id="discardTarget.id"
    :summary="discardTarget.summary ?? null"
    :is-loading="actingId === discardTarget.id && actingAction === 'discard'"
    @confirm="onConfirmDiscard"
    @cancel="discardTarget = null"
  ></FailedMessageDiscardConfirm>
</template>
