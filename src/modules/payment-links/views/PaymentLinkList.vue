<script setup lang="ts">
import { inject, onMounted } from 'vue'

import type { ApiService } from '@/services/apiService'
import { usePaymentLinkCrud } from '../composables/usePaymentLinkCrud'
import PaymentLinkEdit from '../components/PaymentLinkEdit.vue'
import PaymentLinkCreate from '../components/PaymentLinkCreate.vue'
const apiService = inject<ApiService>('gqlApiService')!
const { isLoading, paymentLinks, getPaymentLinks } = usePaymentLinkCrud(apiService)

onMounted(() => {
  getPaymentLinks()
})

function afterUpdate() {
  getPaymentLinks()
}
</script>

<template>
  <h1>Payment Links</h1>

  <div class="row">
    <div class="col-12 d-flex justify-content-end">
      <PaymentLinkCreate></PaymentLinkCreate>
    </div>
  </div>
  <br />
  <div class="row">
    <div class="col-12">
      <table class="table">
        <thead>
          <tr>
            <th class="text-center">TITLE</th>
            <th class="text-center">AMOUNT</th>
            <th class="text-center">URL</th>
            <th class="text-center">SITE</th>
            <th class="text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paymentLinks" v-bind:key="item.id" v-bind:index="index">
            <td class="text-center">{{ item.title }}</td>
            <td class="text-center">{{ item.amount }} {{ item.currency }}</td>
            <td class="text-center">
              <a :href="item.url" target="_blank">{{ item.url }}</a>
            </td>
            <td class="text-center">{{ item.site.name }}</td>
            <td>
              <PaymentLinkEdit :payment-link="item" @after-update="afterUpdate"></PaymentLinkEdit>
            </td>
          </tr>
          <tr v-if="!isLoading && paymentLinks?.length === 0">
            <td colspan="5" class="text-center">
              <p>NO DATA AVAILABLE IN TABLE</p>
            </td>
          </tr>
          <tr v-if="isLoading">
            <td colspan="5" class="text-center">LOADING...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
