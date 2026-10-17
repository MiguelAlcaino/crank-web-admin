<script setup lang="ts">
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'

import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useToast } from '@/modules/shared/composables/useToast'
import IssueGiftCardCodeModal from '../components/IssueGiftCardCodeModal.vue'
import {
  newestStatusesFirst,
  useCustomerGiftCards,
  type CustomerGiftCard
} from '../composables/useCustomerGiftCards'

/*
 * Pending Gift Cards (the legacy Twig /admin/customer-gift-card page): paid gift card orders whose
 * code an admin still has to issue by hand.
 */
const toast = useToast()
const apolloClient = newAuthenticatedApolloClient(import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL)
const { giftCards, isLoading, hasLoadError, isIssuing, fetchGiftCards, issueCode } =
  useCustomerGiftCards(apolloClient)

const selected = ref<CustomerGiftCard | null>(null)

function formatDate(value: string): string {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
}

function issueSelected(giftCardCode: string, pdfGiftCard: File): Promise<string | null> {
  return issueCode(selected.value!.id, giftCardCode, pdfGiftCard)
}

async function onIssued() {
  toast.success('Gift card code saved and the PDF emailed to the customer.')
  selected.value = null
  await fetchGiftCards()
}

onMounted(fetchGiftCards)
</script>

<template>
  <div>
    <h4 class="mb-3">Pending Gift Cards</h4>

    <div v-if="isLoading" class="text-center py-4">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-else-if="hasLoadError" class="alert alert-danger">Failed to load the gift cards.</div>

    <div v-else class="table-responsive">
      <table class="table table-sm table-striped align-middle">
        <thead>
          <tr>
            <th>Id</th>
            <th>Site</th>
            <th>Gift card</th>
            <th>Bought by</th>
            <th>Recipient</th>
            <th>Status history</th>
            <th>Code</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="giftCards.length === 0">
            <td colspan="8" class="text-center text-muted py-3">No pending gift cards</td>
          </tr>
          <tr v-for="giftCard in giftCards" :key="giftCard.id">
            <td>{{ giftCard.id }}</td>
            <td>{{ giftCard.giftCard.site.name }}</td>
            <td>{{ giftCard.giftCard.description }}</td>
            <td>
              <RouterLink
                v-if="giftCard.customer.id"
                :to="{ name: 'admin_customer_profile', params: { id: giftCard.customer.id } }"
              >
                {{ giftCard.customer.user?.firstName }} {{ giftCard.customer.user?.lastName }}
              </RouterLink>
              <div class="small text-muted">{{ giftCard.customer.user?.email }}</div>
            </td>
            <td>
              {{ giftCard.recipientName ?? '-' }}
              <div v-if="giftCard.recipientEmail" class="small text-muted">
                {{ giftCard.recipientEmail }}
              </div>
            </td>
            <td>
              <ul class="mb-0 ps-3 small">
                <li v-for="(change, index) in newestStatusesFirst(giftCard)" :key="index">
                  {{ change.status }} at {{ formatDate(change.createdAt) }}
                </li>
              </ul>
            </td>
            <td>{{ giftCard.giftCardCode ?? '-' }}</td>
            <td>
              <button type="button" class="btn btn-primary btn-sm" @click="selected = giftCard">
                Add code
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <IssueGiftCardCodeModal
      v-if="selected"
      :key="selected.id"
      :gift-card="selected"
      :is-issuing="isIssuing"
      :issue="issueSelected"
      @issued="onIssued"
      @close="selected = null"
    ></IssueGiftCardCodeModal>
  </div>
</template>
