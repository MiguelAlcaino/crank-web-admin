<script setup lang="ts">
import type { ApiService } from '@/services/apiService'
import { inject, onMounted, ref } from 'vue'
import { useInstructorProfiles } from '../composables/useInstructorProfiles'
import InstructorProfileCreate from '../components/InstructorProfileCreate.vue'
import InstructorProfileEdit from '../components/InstructorProfileEdit.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import dayjs from 'dayjs'

const apiService = inject<ApiService>('gqlApiService')!
const { isLoading, instructorProfiles, hasLoadError, getInstructorProfiles } =
  useInstructorProfiles(apiService)

const errorModalVisible = ref<boolean>(false)

const formatDate = (date: Date): string => {
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
}

onMounted(async () => {
  await getInstructorProfiles()
  if (hasLoadError.value) {
    errorModalVisible.value = true
  }
})
</script>

<template>
  <h1>Instructor Profiles</h1>

  <div class="row">
    <div class="col-12 d-flex justify-content-end">
      <InstructorProfileCreate />
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
              <InstructorProfileEdit :instructorProfile="item" />
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
