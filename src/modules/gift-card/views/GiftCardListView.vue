<script setup lang="ts">
import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import GiftCardEdit from '../components/GiftCardEdit.vue'
import SyncAllGiftCards from '../components/SyncAllGiftCards.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

import { useGiftCard } from '../composables/useGiftCard'
import type { ApiService } from '@/services/apiService'
import { inject } from 'vue'

const { isLoading, giftCards, hasError, afterUpdateGiftCard, getGiftCards } = useGiftCard(
  inject<ApiService>('gqlApiService')!
)

async function refreshGiftCards() {
  await getGiftCards()
}
</script>

<template>
  <div class="row">
    <div class="col-6">
      <h4>Gift Cards</h4>
    </div>
    <div class="col-6 pull-right">
      <SyncAllGiftCards @after-sync="refreshGiftCards"></SyncAllGiftCards>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <hr />
    </div>
  </div>

  <div class="row">
    <div class="table-responsive">
      <table class="table table-sm table-hover">
        <thead>
          <tr class="text-center">
            <th>SITE</th>
            <th>DESCRIPTION</th>
            <th>SALE PRICE</th>
            <th>GRAND TOTAL</th>
            <th>GIFT CARD TERMS</th>
            <th>LINK TO PURCHASE</th>
            <th>OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in giftCards" :key="index">
            <td class="text-center align-middle">{{ item.site.name }}</td>
            <td>{{ item.description }}</td>
            <td class="text-right align-middle">AED {{ item.salePrice }}</td>
            <td class="text-right align-middle">AED {{ item.grandTotal }}</td>
            <td>{{ item.terms }}</td>
            <td class="text-center">
              <a :href="item.purchaseUrl" class="btn btn-sm btn-secondary">Link</a>
            </td>
            <td>
              <GiftCardEdit
                :giftCard="item"
                @after-update-gift-card="afterUpdateGiftCard"
              ></GiftCardEdit>
            </td>
          </tr>
          <tr v-if="giftCards.length === 0 && !isLoading">
            <td colspan="7" class="text-center align-middle">
              <p>NO DATA AVAILABLE IN TABLE</p>
            </td>
          </tr>
          <tr v-if="isLoading">
            <td colspan="7" class="text-center">
              <CrankCircularProgressIndicator text="LOADING..."></CrankCircularProgressIndicator>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Error Modal -->
  <ModalComponent
    v-if="hasError"
    title="Error"
    :message="ERROR_UNKNOWN"
    :cancel-text="null"
    @on-ok="hasError = false"
  >
  </ModalComponent>
</template>

<style scoped>
a {
  font-family: 'BigJohn', sans-serif;
}

.pull-right {
  display: flex;
  justify-content: flex-end;
}
</style>
