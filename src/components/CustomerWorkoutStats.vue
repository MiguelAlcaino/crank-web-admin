<script lang="ts">
interface ClassStat {
  enrollment: Enrollment
  totalEnergy?: number
}

interface Enrollment {
  class: Class
  enrollmentInfo: EnrollmentInfo
}

interface Class {
  id: string
  duration: number
  name: string
  start: Date
}

interface EnrollmentInfo {
  id: string
  spotNumber?: number
}
</script>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import dayjs from 'dayjs'

import router from '@/router'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import ModalComponent from '@/components/ModalComponent.vue'
import CrankCircularProgressIndicator from '@/components/CrankCircularProgressIndicator.vue'
import CustomerWorkoutSummary from '@/components/CustomerWorkoutSummary.vue'
import type { ApiService } from '@/services/apiService'
import { appStore } from '@/stores/appStorage'

const apiService = inject<ApiService>('gqlApiService')!

const props = defineProps<{
  userId: string
}>()

const isLoading = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)
const classStats = ref<ClassStat[]>([])

onMounted(() => {
  getUserWorkoutStats()
})

async function getUserWorkoutStats() {
  classStats.value = []

  try {
    isLoading.value = true
    classStats.value = (await apiService.userWorkoutStats(
      appStore().site,
      props.userId
    )) as ClassStat[]
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="row">
    <div class="col-12">
      <h5>WORKOUT STATS</h5>
    </div>
  </div>
  <div class="row" v-if="isLoading">
    <div class="col-12 text-center">
      <CrankCircularProgressIndicator text="Loading..."></CrankCircularProgressIndicator>
    </div>
  </div>
  <div class="row mt-3" v-else>
    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-sm">
          <thead>
            <tr class="text-center">
              <th>DESCRIPTION</th>
              <th>SPOT</th>
              <th>DATE</th>
              <th>DURATION</th>
              <th>TOTAL ENERGY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in classStats" :key="index">
              <td>{{ item.enrollment.class.name }}</td>
              <td class="text-center">{{ item.enrollment.enrollmentInfo.spotNumber }}</td>
              <td class="text-center">
                {{ dayjs(new Date(item.enrollment.class.start)).format('DD/MM/YYYY h:mm A') }}
              </td>
              <td class="text-center">{{ item.enrollment.class.duration }} mins.</td>
              <td class="text-center">{{ item.totalEnergy?.toFixed(1) ?? '0' }}</td>
              <td class="text-center">
                <CustomerWorkoutSummary
                  :enrollment-id="item.enrollment.enrollmentInfo.id"
                  :class-id="item.enrollment.class.id"
                  :user-id="userId"
                ></CustomerWorkoutSummary>
              </td>
            </tr>
            <tr v-if="classStats?.length === 0 && !isLoading">
              <td colspan="6" class="text-center">
                <p>NO DATA AVAILABLE IN TABLE</p>
              </td>
            </tr>
            <tr v-if="isLoading">
              <td colspan="6" class="text-center"><p>LOADING...</p></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
</template>

<style lang="css" scoped src="bootstrap/dist/css/bootstrap.min.css"></style>
<style lang="css" scoped src="@/assets/main.css"></style>

<style scoped>
p,
td {
  font-family: 'Avenir', sans-serif;
}
</style>
