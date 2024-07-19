<script setup lang="ts">
// TODO: Implement the logic to fetch the gift cards from the API
import { inject, onMounted, ref } from 'vue';

import CrankCircularProgressIndicator from '@/components/CrankCircularProgressIndicator.vue';

import { GiftCard } from '../interfaces/gift-card.interface';
import { ERROR_UNKNOWN } from '@/utils/errorMessages';
import { ApiService } from '@/services/apiService';

const apiService = inject<ApiService>('gqlApiService')!

const isLoading = ref<boolean>(false)
const giftcards = ref<GiftCard[]>([])

const errorModalIsVisible = ref<boolean>(false)

onMounted(() => {
    getGiftCards()
})

async function getGiftCards() {
  isLoading.value = false
  try {




    //const response = await apiService.currentUserEnrollmentsPaginated(
    
    

  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}

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
        <tr
          v-for="(giftCard, index) in giftcards" :key="index"      
        >
          <td class="align-middle"></td>
          <td class="align-middle"></td>
          <td class="text-center align-middle"></td>
          <td class="text-center align-middle"></td>
          <td class="text-center align-middle"></td>
          <td></td>
          <td class="align-middle"></td>
        </tr>
        <tr v-if="giftcards.length === 0 && !isLoading">
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

<style scoped>

</style>