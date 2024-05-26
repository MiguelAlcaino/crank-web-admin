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

import { appStore } from '@/stores/appStorage'
import type { ApiService } from '@/services/apiService'

import { ERROR_UNKNOWN } from '@/utils/errorMessages'

import CrankCircularProgressIndicator from '@/components/CrankCircularProgressIndicator.vue'
import CustomerWorkoutSummaryModal from '@/components/CustomerWorkoutSummaryModal.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import SendClassStatsToEmail from '@/components/SendClassStatsToEmail.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

const apiService = inject<ApiService>('gqlApiService')!

const props = defineProps<{
  userId: string
  userEmail?: string | null
}>()

const isLoading = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)
const classStats = ref<ClassStat[]>([])

const pageLimit = 20
const currentPage = ref<number>(1)
const total = ref<number>(0)

onMounted(() => {
  userWorkoutStatsPaginated()
})

async function userWorkoutStatsPaginated() {
  classStats.value = []

  try {
    isLoading.value = true
    const paginatedClassStats = await apiService.userWorkoutStatsPaginated(
      appStore().site,
      props.userId,
      {
        page: currentPage.value,
        limit: pageLimit
      }
    )

    total.value = paginatedClassStats.total
    classStats.value = paginatedClassStats.classStats as ClassStat[]
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}

function pageChanged(page: number) {
  currentPage.value = page
  userWorkoutStatsPaginated()
}
</script>

<template>
  <div class="row">
    <div class="col-12">
      <h5>WORKOUT STATS</h5>
    </div>
  </div>
  <div class="row mt-3">
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in classStats" :key="index">
              <td>{{ item.enrollment.class.name }}</td>
              <td class="text-center">
                {{ item.enrollment.enrollmentInfo.spotNumber }}
              </td>
              <td class="text-center">
                {{ dayjs(new Date(item.enrollment.class.start)).format('DD/MM/YYYY h:mm A') }}
              </td>
              <td class="text-center">{{ item.enrollment.class.duration }} mins.</td>
              <td class="text-center">{{ item.totalEnergy?.toFixed(1) ?? '0' }}</td>
              <td class="text-center">
                <CustomerWorkoutSummaryModal
                  :enrollment-id="item.enrollment.enrollmentInfo.id"
                  :class-id="item.enrollment.class.id"
                  :user-id="userId"
                ></CustomerWorkoutSummaryModal>
              </td>
              <td>
                <SendClassStatsToEmail
                  v-if="userEmail"
                  :classId="item.enrollment.class.id"
                  :userEmail="userEmail"
                  :enrollmentId="item.enrollment.enrollmentInfo.id"
                  class="center-component"
                ></SendClassStatsToEmail>
              </td>
            </tr>
            <tr v-if="classStats?.length === 0 && !isLoading">
              <td colspan="7" class="text-center">
                <p>NO DATA AVAILABLE IN TABLE</p>
              </td>
            </tr>
            <tr v-if="isLoading">
              <td colspan="7" class="text-center">
                <CrankCircularProgressIndicator text="Loading..."></CrankCircularProgressIndicator>
              </td>
            </tr>
          </tbody>
        </table>
        <PaginationComponent
          :page="currentPage"
          :limit="pageLimit"
          :total="total"
          @page-changed="pageChanged"
        ></PaginationComponent>
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

.center-component {
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-component > * {
  justify-content: start;
  align-items: start;
}
</style>
