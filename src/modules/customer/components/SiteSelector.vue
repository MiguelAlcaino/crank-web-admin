<script lang="ts"></script>

<script setup lang="ts">
import { authService, type AdminSite } from '@/services/authService'
import { appStore } from '@/stores/appStorage'
import { onMounted, ref } from 'vue'

const emits = defineEmits<{
  (e: 'afterChangingSite'): void
}>()

const sites = ref([] as AdminSite[])

const selectedSite = ref(appStore().site)

onMounted(() => {
  getAvailableSites()
})

function getAvailableSites() {
  sites.value = authService.getAvailableSites()
}

function onChangeSite() {
  appStore().setSite(selectedSite.value)
  emits('afterChangingSite')
}
</script>

<template>
  <select
    class="custom-select"
    v-model="selectedSite"
    @change="onChangeSite()"
    id="countryRegistration"
    required
  >
    <option v-for="(item, index) in sites" :key="index" :value="item.serviceKey">
      {{ item.name }}
    </option>
  </select>
</template>

<style scoped></style>
