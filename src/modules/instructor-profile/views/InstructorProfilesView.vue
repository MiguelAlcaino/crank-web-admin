<script setup lang="ts">
import type { ApiService } from '@/services/apiService'
import { inject, onMounted, ref } from 'vue'
import { useInstructorProfiles } from '../composables/useInstructorProfiles'
import InstructorProfileCreate from '../components/InstructorProfileCreate.vue'
import InstructorProfileEdit from '../components/InstructorProfileEdit.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import SiteSelector from '@/modules/shared/components/SiteSelector.vue'
import dayjs from 'dayjs'
import type { Site } from '@/modules/shared/interfaces/site'
import type { SiteEnum } from '@/modules/shared/interfaces'
import type { AdminUserSites } from '@/modules/class-schedule/interfaces/admin-user-sites'

const apiService = inject<ApiService>('gqlApiService')!
const { isLoading, instructorProfiles, hasLoadError, getInstructorProfiles } =
  useInstructorProfiles(apiService)

const errorModalVisible = ref<boolean>(false)
const sites = ref<Site[]>([])
const isLoadingSites = ref(false)
const selectedSite = ref<SiteEnum | null>(null)

const formatDate = (date: Date): string => {
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
}

onMounted(async () => {
  await getAvailableSites()
  if (selectedSite.value) {
    await getInstructorProfiles(selectedSite.value)
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
      instructorProfiles.value = []
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
    instructorProfiles.value = []
  } finally {
    isLoadingSites.value = false
  }
}

async function onSiteChange(site: SiteEnum | null) {
  if (!site) {
    return
  }

  selectedSite.value = site
  await getInstructorProfiles(site)
}
</script>

<template>
  <h1>Instructor Profiles</h1>

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
      <InstructorProfileCreate :site="selectedSite" />
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
            <th class="text-center">DESCRIPTION</th>
            <th class="text-center">PROFILE PICTURE</th>
            <th class="text-center">STATUS</th>
            <th class="text-center">MINDBODY STAFFS</th>
            <th class="text-center">CREATED AT</th>
            <th class="text-center">UPDATED AT</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in instructorProfiles" v-bind:key="item.id" v-bind:index="index">
            <td class="text-center">{{ item.id }}</td>
            <td class="text-center">{{ item.name }}</td>
            <td class="text-center">{{ item.description }}</td>
            <td class="text-center">
              <a
                v-if="item.profilePictureUrl"
                :href="item.profilePictureUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  :src="item.profilePictureUrl"
                  :alt="`${item.name} profile picture`"
                  class="profile-picture-thumb"
                />
              </a>
              <span v-else>-</span>
            </td>
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
              <span v-if="item.mindbodyStaffs && item.mindbodyStaffs.length > 0">
                {{ item.mindbodyStaffs.map((s) => `${s.firstName} ${s.lastName}`).join(', ') }}
              </span>
              <span v-else>-</span>
            </td>
            <td class="text-center">{{ formatDate(item.createdAt) }}</td>
            <td class="text-center">{{ formatDate(item.updatedAt) }}</td>
            <td>
              <InstructorProfileEdit :instructorProfile="item" :site="selectedSite as SiteEnum" />
            </td>
          </tr>
          <tr v-if="!isLoading && instructorProfiles?.length === 0">
            <td colspan="9" class="text-center">
              <p>NO DATA AVAILABLE IN TABLE</p>
            </td>
          </tr>
          <tr v-if="isLoading">
            <td colspan="9" class="text-center">LOADING...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Error Modal -->
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
.profile-picture-thumb {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 50%;
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
