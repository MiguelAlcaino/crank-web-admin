<script setup lang="ts">
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import SiteSelector from '@/modules/shared/components/SiteSelector.vue'
import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { inject, onMounted, ref } from 'vue'
import Draggable from 'vuedraggable'
import SessionTypeCreate from '../components/SessionTypeCreate.vue'
import SessionTypeEdit from '../components/SessionTypeEdit.vue'
import { useSessionTypes } from '../composables/useSessionTypes'
import type { MindbodySessionType } from '../interfaces'
import type { Site } from '@/modules/shared/interfaces/site'
import type { SiteEnum } from '@/modules/shared/interfaces'
import type { AdminUserSites } from '@/modules/class-schedule/interfaces/admin-user-sites'

const apiService = inject<ApiService>('gqlApiService')!
const {
  isLoading,
  isSaving,
  updatingPositionIds,
  sessionTypes,
  hasLoadError,
  getSessionTypes,
  reorderSessionTypes
} = useSessionTypes(apiService)

const errorModalVisible = ref<boolean>(false)
const sites = ref<Site[]>([])
const isLoadingSites = ref(false)
const selectedSite = ref<SiteEnum | null>(null)
const loadedSite = ref<SiteEnum | null>(null)

onMounted(async () => {
  sessionTypes.value = []
  await getAvailableSites()
  if (selectedSite.value) {
    await getSessionTypes(selectedSite.value, false)
    loadedSite.value = selectedSite.value
  }
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
      sessionTypes.value = []
      return
    }

    let selectedSiteCode: SiteEnum | null =
      adminUserSites.favoriteSite !== null ? (adminUserSites.favoriteSite.code as SiteEnum) : null

    const hasSelectedSite = selectedSiteCode
      ? sites.value.some((site) => site.code === selectedSiteCode)
      : false

    if (!hasSelectedSite) {
      selectedSiteCode = sites.value[0].code
    }

    selectedSite.value = selectedSiteCode
  } catch (error) {
    sites.value = []
    selectedSite.value = null
    sessionTypes.value = []
  } finally {
    isLoadingSites.value = false
  }
}

async function onSiteChange(site: SiteEnum | null) {
  if (!site) {
    return
  }
  if (site === loadedSite.value) {
    return
  }

  selectedSite.value = site
  await getSessionTypes(site, false)
  loadedSite.value = site
}

async function onOrderChanged() {
  if (!selectedSite.value || !sessionTypes.value.length) {
    return
  }

  try {
    const orderedIds = sessionTypes.value.map((item) => item.id)
    await reorderSessionTypes(orderedIds)
  } catch (error) {
    errorModalVisible.value = true
  }
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
      <SessionTypeCreate :site="selectedSite" :disabled="updatingPositionIds.length > 0" />
    </div>
  </div>
  <br />
  <div class="row">
    <div class="col-12">
      <table class="table">
        <thead>
          <tr>
            <th class="text-center"></th>
            <th class="text-center">ID</th>
            <th class="text-center">NAME</th>
            <th class="text-center">STATUS</th>
            <th class="text-center">COLOR</th>
            <th class="text-center">POSITION</th>
            <th class="text-center">BANNER</th>
            <th class="text-center">MINDBODY SESSION TYPES</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-if="!isLoading && !isLoadingSites && sessionTypes?.length === 0">
          <tr>
            <td colspan="9" class="text-center">
              <p>NO DATA AVAILABLE IN TABLE</p>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="isLoading || isLoadingSites">
          <tr>
            <td colspan="9" class="text-center">LOADING...</td>
          </tr>
        </tbody>
        <Draggable
          v-else
          v-model="sessionTypes"
          item-key="id"
          tag="tbody"
          handle=".drag-handle"
          :disabled="isSaving"
          @end="onOrderChanged"
        >
          <template #item="{ element: item }">
            <tr>
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-link p-0 drag-handle"
                  title="Reorder"
                  :disabled="isSaving"
                >
                  <i class="bi bi-list"></i>
                </button>
              </td>
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
                <span v-if="item.color" class="color-cell">
                  <span class="color-dot" :style="{ backgroundColor: item.color }"></span>
                  {{ item.color }}
                </span>
                <span v-else>-</span>
              </td>
              <td class="text-center">
                <span v-if="updatingPositionIds.includes(item.id)" class="position-updating">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </span>
                <span v-else>{{ item.position ?? '-' }}</span>
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
                  {{ item.mindbodySessionTypes.map((s: MindbodySessionType) => s.name).join(', ') }}
                </span>
                <span v-else>-</span>
              </td>
              <td>
                <SessionTypeEdit
                  :session-type="item"
                  :site="selectedSite as SiteEnum"
                  :disabled="updatingPositionIds.length > 0"
                />
              </td>
            </tr>
          </template>
        </Draggable>
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

.color-cell {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.color-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #ced4da;
  display: inline-block;
}

.drag-handle {
  cursor: grab;
  color: #6c757d;
}

.drag-handle:active {
  cursor: grabbing;
}

.position-updating {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
</style>
