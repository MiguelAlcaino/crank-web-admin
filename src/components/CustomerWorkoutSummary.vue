<script lang="ts">
interface ClassStat {
  enrollment: Enrollment
  distance?: number
  calories?: number
  totalEnergy?: number
  averagePower?: number
  highPower?: number
  averageRpm?: number
  highRpm?: number
  adjustedChartPoints: ChartPoint[]
}

interface Enrollment {
  class: Class
  enrollmentInfo: EnrollmentInfo
}

interface EnrollmentInfo {
  id?: string
  spotNumber?: number
}

interface Class {
  id: string
  name: string
  start: Date
  duration: number
  instructorName: string
}

interface ChartPoint {
  power?: number
  rpm?: number
  time?: number
}
</script>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import type { ApiService } from '@/services/apiService'

import { secondsToMMSS } from '@/utils/utility-functions'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import RankWidget from '@/components/RankWidget.vue'
import SpotIconWidget from '@/components/SpotIconWidget.vue'
import StatIconWidget from '@/components/StatIconWidget.vue'
import StatSlashWidget from '@/components/StatSlashWidget.vue'
import WorkoutSummaryChart from '@/components/WorkoutSummaryChart.vue'

const apiService = inject<ApiService>('gqlApiService')!

const props = defineProps<{
  classId: string
  userId: string
  enrollmentId: string
}>()

const emits = defineEmits<{
  (e: 'setResendStatsIsVisible', isVisible: boolean): void
}>()

const isLoading = ref<boolean>(false)
const classStat = ref<ClassStat | null>(null)
const errorModalIsVisible = ref<boolean>(false)

onMounted(() => {
  getSingleWorkoutStat()
})

async function getSingleWorkoutStat() {
  classStat.value = null

  try {
    isLoading.value = true

    classStat.value = (await apiService.singleWorkoutStat(props.enrollmentId)) as ClassStat

    emits('setResendStatsIsVisible', classStat.value !== null)
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div v-if="classStat">
    <div class="row">
      <div class="col-12 text-center">
        <h3>WORKOUT SUMMARY</h3>
      </div>
    </div>
    <div v-if="isLoading">
      <div class="row">
        <div class="col-12 text-center">
          <CrankCircularProgressIndicator text="Loading..."></CrankCircularProgressIndicator>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row mt-3">
        <div class="col-12">
          <div class="col-12 text-center">
            <h4>{{ classStat?.enrollment.class.name }}</h4>
            <br />
            <p>
              <b>TIME: </b>
              <span>{{ dayjs(classStat?.enrollment.class.start).format('h:mm a') }}</span>
              |
              <b>DURATION: </b>
              <span>{{ classStat?.enrollment.class.duration }}</span> mins.
            </p>
            <p><b>INSTRUCTOR: </b> {{ classStat?.enrollment.class.instructorName }}</p>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 text-center">
          <WorkoutSummaryChart
            v-if="classStat?.adjustedChartPoints"
            :chart-points="classStat?.adjustedChartPoints"
          ></WorkoutSummaryChart>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-sm-6">
          <StatIconWidget
            icon="duration"
            :value="secondsToMMSS(classStat?.enrollment.class.duration)"
            title="DURATION"
          ></StatIconWidget>
        </div>
        <div class="col-sm-6">
          <StatIconWidget
            icon="distance"
            :value="(classStat?.distance?.toFixed(1) ?? '0') + 'KM'"
            title="DISTANCE"
          ></StatIconWidget>
        </div>
        <div class="col-sm-6">
          <StatIconWidget
            icon="calories"
            :value="classStat?.calories?.toFixed(1) ?? '0'"
            title="CALORIES"
          ></StatIconWidget>
        </div>
        <div class="col-sm-6">
          <StatIconWidget
            icon="total_energy"
            :value="classStat?.totalEnergy?.toFixed(1) ?? '0'"
            title="TOTAL ENERGY"
          ></StatIconWidget>
        </div>
        <div class="col-sm-6">
          <SpotIconWidget
            :class-name="classStat?.enrollment.class.name"
            :spot-number="classStat?.enrollment.enrollmentInfo.spotNumber"
          ></SpotIconWidget>
        </div>
        <div class="col-sm-6">
          <RankWidget
            v-if="classStat?.enrollment.class.id"
            :class-id="classStat?.enrollment.class.id"
            :user-id="userId"
          ></RankWidget>
        </div>
        <div class="col-sm-6">
          <StatSlashWidget
            title="POWER"
            :avg-value="classStat?.averagePower ?? 0"
            :high-value="classStat?.highPower ?? 0"
          ></StatSlashWidget>
        </div>
        <div class="col-sm-6">
          <StatSlashWidget
            title="RPM"
            :avg-value="classStat?.averageRpm ?? 0"
            :high-value="classStat?.highRpm ?? 0"
          ></StatSlashWidget>
        </div>
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

<style scoped lang="css">
p {
  font-family: 'BigJohn', sans-serif;
}
h4 {
  color: #737373;
}
</style>
