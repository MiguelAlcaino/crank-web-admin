<script setup lang="ts">
import type { ApiService } from '@/services/apiService'
import { inject, onMounted, ref, watch } from 'vue'
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

onMounted(() => {
  getInstructorProfiles()
})

watch(hasLoadError, (val) => {
  if (val) errorModalVisible.value = true
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
            <th class="text-center">PROFILE PICTURE URL</th>
            <th class="text-center">ACTIVE</th>
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
              <a :href="item.profilePictureUrl" target="_blank">{{ item.profilePictureUrl }}</a>
            </td>
            <td class="text-center">{{ item.active }}</td>
            <td class="text-center">{{ formatDate(item.createdAt) }}</td>
            <td class="text-center">{{ formatDate(item.updatedAt) }}</td>
            <td>
              <InstructorProfileEdit :instructorProfile="item" />
            </td>
          </tr>
          <tr v-if="!isLoading && instructorProfiles?.length === 0">
            <td colspan="8" class="text-center">
              <p>NO DATA AVAILABLE IN TABLE</p>
            </td>
          </tr>
          <tr v-if="isLoading">
            <td colspan="8" class="text-center">LOADING...</td>
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

<style scoped></style>
