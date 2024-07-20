<script setup lang="ts">
// TODO: Implement the logic to fetch the gift cards from the API
import { ref, watch } from 'vue'

import CrankCircularProgressIndicator from '@/components/CrankCircularProgressIndicator.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

import { useGiftCard } from '../composables/useGiftCard'

const { isLoading, giftCards, hasError } = useGiftCard()
const errorModalIsVisible = ref<boolean>(false)

watch(hasError, (value) => {
  console.log('hasError', value)
  if (value) {
    errorModalIsVisible.value = true
  }
})
</script>

<template>
  <div>
    <div class="table-responsive">
      <table class="table table-sm">
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
            <td class="text-right align-middle">{{ item.salePrice }}</td>
            <td class="text-right align-middle">{{ item.grandTotal }}</td>
            <td>{{ item.terms }}</td>
            <td class="text-center"></td>
            <td class="text-center"></td>
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

    <!-- Error Modal -->
    <ModalComponent
      v-if="errorModalIsVisible"
      title="Error"
      :message="ERROR_UNKNOWN"
      :cancel-text="null"
      @on-ok="errorModalIsVisible = false"
    >
    </ModalComponent>
  </div>
</template>

<style scoped></style>
