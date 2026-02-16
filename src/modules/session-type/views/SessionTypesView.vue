<script setup lang="ts">
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import SiteSelector from '@/modules/shared/components/SiteSelector.vue'
import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { inject, onMounted, ref } from 'vue'
import SessionTypeCreate from '../components/SessionTypeCreate.vue'
import SessionTypeEdit from '../components/SessionTypeEdit.vue'
import { useSessionTypes } from '../composables/useSessionTypes'
import { appStore } from '@/stores/appStorage'
import type { Site } from '@/modules/shared/interfaces/site'
import type { SiteEnum } from '@/modules/shared/interfaces'
import type { AdminUserSites } from '@/modules/class-schedule/interfaces/admin-user-sites'

const apiService = inject<ApiService>('gqlApiService')!
const { isLoading, sessionTypes, hasLoadError, getSessionTypes } = useSessionTypes(apiService)

const errorModalVisible = ref<boolean>(false)
const sites = ref<Site[]>([])
const isLoadingSites = ref(false)
const selectedSite = ref<SiteEnum | null>(appStore().site)

onMounted(async () => {
  await getAvailableSites()
  await getSessionTypes()
  if (hasLoadError.value) {
    errorModalVisible.value = true
  }
})

async function getAvailableSites() {
  sites.value = []
  isLoadingSites.value = true

  try {
    const adminUserSites = (await apiService.getCurrentAdminUserSites()) as AdminUserSites
    sites.value = adminUserSites.linkedSites

    if (sites.value.length === 0) {
      selectedSite.value = null
      return
    }

    const hasCurrentSite = sites.value.some((site) => site.code === selectedSite.value)
    if (!hasCurrentSite) {
      selectedSite.value = sites.value[0].code
      appStore().setSite(selectedSite.value)
    }
  } catch (error) {
    sites.value = []
  } finally {
    isLoadingSites.value = false
  }
}

async function onSiteChange(site: SiteEnum | null) {
  if (!site || site === appStore().site) {
    return
  }

  appStore().setSite(site)
  selectedSite.value = site
  await getSessionTypes()
}
</script>

<template>
  <h1>Session Types</h1>

  <div class="row">
    <div class="col-md-4 col-sm-6 col-12 mb-2">
      <SiteSelector
        v-model="selectedSite"
        :sites="sites"
        :is-loading="isLoadingSites"
        :disabled="isLoadingSites || isLoading"
        required
        @change="onSiteChange"
      />
    </div>
    <div class="col-md-8 col-sm-6 col-12 d-flex justify-content-sm-end justify-content-start">
      <SessionTypeCreate />
    </div>
  </div>
  <br />
  <div class="row">
    <div class="col-12">
      <table class="table">
        <thead>
          <tr>
            <th class="text-center">ID</th>
            <th class="text-center">NAME</th>
            <th class="text-center">STATUS</th>
            <th class="text-center">BANNER</th>
            <th class="text-center">MINDBODY SESSION TYPES</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sessionTypes" v-bind:key="item.id" v-bind:index="index">
            <td class="text-center">{{ item.id }}</td>
            <td class="text-center">{{ item.name }}</td>
            <td class="text-center">
              <span
                :class="[
                  'status-badge',
                  item.active ? 'status-badge-active' : 'status-badge-inactive'
                ]"
              >
                {{ item.active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="text-center">
              <a
                v-if="item.bannerImagePath"
                :href="item.bannerImagePath"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  :src="item.bannerImagePath"
                  :alt="`${item.name} banner`"
                  class="banner-thumb"
                />
              </a>
              <span v-else>-</span>
            </td>
            <td class="text-center">
              <span v-if="item.mindbodySessionTypes && item.mindbodySessionTypes.length > 0">
                {{ item.mindbodySessionTypes.map((s) => s.name).join(', ') }}
              </span>
              <span v-else>-</span>
            </td>
            <td>
              <SessionTypeEdit :session-type="item" />
            </td>
          </tr>
          <tr v-if="!isLoading && sessionTypes?.length === 0">
            <td colspan="6" class="text-center">
              <p>NO DATA AVAILABLE IN TABLE</p>
            </td>
          </tr>
          <tr v-if="isLoading">
            <td colspan="6" class="text-center">LOADING...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <ModalComponent
    v-if="errorModalVisible"
    title="ERROR"
    :message="ERROR_UNKNOWN"
    :closable="false"
    @on-ok="errorModalVisible = false"
    :cancel-text="null"
  >
  </ModalComponent>
</template>

<style scoped>
.banner-thumb {
  width: 96px;
  height: 56px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #dee2e6;
}

.status-badge {
  display: inline-block;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
}

.status-badge-active {
  background-color: rgba(255, 138, 115, 1);
  color: rgb(255, 255, 255);
}

.status-badge-inactive {
  background-color: rgba(231, 231, 231, 1);
  color: rgba(138, 138, 138, 1);
}
</style>
