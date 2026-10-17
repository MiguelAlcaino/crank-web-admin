<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'

import type { FailedMessageQueueEnum } from '@/gql-main/graphql'
import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useToast } from '@/modules/shared/composables/useToast'
import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import PaginationComponent from '@/modules/shared/components/PaginationComponent.vue'
import FailedMessageDetail from '../components/FailedMessageDetail.vue'
import FailedMessageDiscardConfirm from '../components/FailedMessageDiscardConfirm.vue'
import {
  DEFAULT_FAILED_MESSAGE_QUEUE,
  FAILED_MESSAGE_QUEUE_TABS,
  pageAfterRowRemoved,
  shortClassName,
  type FailedMessageActionOutcome
} from '../composables/failedMessages'
import { useFailedMessages, type FailedMessageRow } from '../composables/useFailedMessages'

/*
 * Failed messages: Symfony Messenger messages that exhausted their retries and sit in a Doctrine
 * failure transport, one tab per failure queue, with retry and discard.
 */
const LIMIT = 25

const toast = useToast()
const apolloClient = newAuthenticatedApolloClient(import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL)
const {
  failedMessages,
  total,
  isLoading,
  loadError,
  selectedMessage,
  isLoadingDetail,
  detailError,
  actingId,
  actingAction,
  fetchFailedMessages,
  fetchFailedMessage,
  retryFailedMessage,
  discardFailedMessage
} = useFailedMessages(apolloClient)

const activeQueue = ref<FailedMessageQueueEnum>(DEFAULT_FAILED_MESSAGE_QUEUE)
const currentPage = ref(1)
const detailIsVisible = ref(false)
const discardTarget = ref<FailedMessageRow | null>(null)

const showsPayfortDetails = computed(
  () => FAILED_MESSAGE_QUEUE_TABS.find((tab) => tab.queue === activeQueue.value)?.hasPayfortDetails
)
const columnCount = computed(() => (showsPayfortDetails.value ? 8 : 7))

function loadList() {
  return fetchFailedMessages(activeQueue.value, currentPage.value, LIMIT)
}

function selectQueue(queue: FailedMessageQueueEnum) {
  if (queue === activeQueue.value) {
    return
  }
  activeQueue.value = queue
  currentPage.value = 1
  loadList()
}

function goToPage(page: number) {
  currentPage.value = page
  loadList()
}

function formatDate(value: string | null | undefined): string {
  return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-'
}

function openDetail(row: FailedMessageRow) {
  detailIsVisible.value = true
  fetchFailedMessage(activeQueue.value, row.id)
}

async function onRetry(row: FailedMessageRow) {
  await handleOutcome(await retryFailedMessage(activeQueue.value, row.id))
}

async function onConfirmDiscard() {
  const target = discardTarget.value
  if (target === null) {
    return
  }
  const outcome = await discardFailedMessage(activeQueue.value, target.id)
  discardTarget.value = null
  await handleOutcome(outcome)
}

/** Shows the outcome and, unless the action failed, reloads the list the row has left. */
async function handleOutcome(outcome: FailedMessageActionOutcome) {
  if (outcome.kind === 'error') {
    toast.error(outcome.message)
    return
  }

  if (outcome.kind === 'success') {
    toast.success(outcome.message)
  } else {
    toast.warning(outcome.message)
  }

  currentPage.value = pageAfterRowRemoved(currentPage.value, failedMessages.value.length)
  await loadList()
}

onMounted(loadList)
</script>

<template>
  <div>
    <h4 class="mb-3">Failed Messages</h4>

    <ul class="nav nav-tabs">
      <li v-for="tab in FAILED_MESSAGE_QUEUE_TABS" :key="tab.queue" class="nav-item">
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

    <div v-if="loadError" class="alert alert-danger mt-3" role="alert">{{ loadError }}</div>

    <div class="mt-3">
      <p v-if="!isLoading && !loadError">{{ total }} record(s) found</p>
      <div class="table-responsive">
        <table class="table table-sm table-striped align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Summary</th>
              <template v-if="showsPayfortDetails">
                <th>Merchant Ref</th>
                <th>Amount</th>
              </template>
              <th v-else>Message Class</th>
              <th>Exception</th>
              <th>Failed At</th>
              <th class="text-center">Retries</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td :colspan="columnCount" class="text-center">
                <CrankCircularProgressIndicator text="Loading..."></CrankCircularProgressIndicator>
              </td>
            </tr>
            <tr v-else-if="failedMessages.length === 0 && !loadError">
              <td :colspan="columnCount" class="text-center text-muted py-3">
                No failed messages in this queue
              </td>
            </tr>
            <template v-else>
              <tr v-for="item in failedMessages" :key="item.id">
                <td>
                  <code>{{ item.id }}</code>
                </td>
                <td>{{ item.summary ?? '-' }}</td>
                <template v-if="showsPayfortDetails">
                  <td>{{ item.payfortDetails?.merchantReference ?? '-' }}</td>
                  <td>{{ item.payfortDetails?.amount ?? '-' }}</td>
                </template>
                <td v-else :title="item.messageClass">
                  <code>{{ shortClassName(item.messageClass) }}</code>
                </td>
                <td :title="item.exceptionClass ?? undefined">
                  <code>{{ shortClassName(item.exceptionClass) }}</code>
                </td>
                <td class="text-nowrap">{{ formatDate(item.failedAt) }}</td>
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
            </template>
          </tbody>
        </table>
      </div>

      <PaginationComponent
        v-if="total > LIMIT"
        :key="`${activeQueue}-${total}`"
        :page="currentPage"
        :limit="LIMIT"
        :total="total"
        @page-changed="goToPage"
      ></PaginationComponent>
    </div>

    <FailedMessageDetail
      v-if="detailIsVisible"
      :message="selectedMessage"
      :is-loading="isLoadingDetail"
      :error="detailError"
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
  </div>
</template>
