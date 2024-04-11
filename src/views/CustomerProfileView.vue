<script lang="ts">
interface IdentifiableUser {
  id?: string
  user?: User
}

interface User {
  address1: string
  address2?: string
  birthdate?: Date
  city: string
  country: Country
  doesExistInSite: boolean
  email: string
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelationship?: string
  firstName: string
  gender?: GenderEnum
  hideMetrics?: boolean
  lastName: string
  leaderboardUsername?: string
  phone: string
  state?: State
  weight?: number
  zipCode: string
}

interface Country {
  code: string
  name: string
}

interface State {
  code: string
  name: string
}

export enum GenderEnum {
  /** Feminine */
  F = 'F',
  /** Masculine */
  M = 'M',
  /** Not defined */
  N = 'N'
}
</script>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'

import CustomerWorkoutStats from '@/components/CustomerWorkoutStats.vue'
import DefaultButtonComponent from '@/components/DefaultButtonComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'

import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

const route = useRoute()
const apiService = inject<ApiService>('gqlApiService')!

const userId = ref<string>('')
const isLoading = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)
const identifiableUser = ref<IdentifiableUser | null>(null)
const legacyViewUrl = ref<string | null>(null)

onMounted(() => {
  let _legacyViewUrl = inject<any | undefined>('legacyViewUrl')
  if (_legacyViewUrl) {
    legacyViewUrl.value = _legacyViewUrl
  }

  userId.value = getUserId()
  getUser(userId.value)
})

function getUserId(): string {
  let userId = inject<any | undefined>('userId')
  if (userId !== undefined) {
    return userId as string
  }

  return route.params.id as string
}

async function getUser(userId: string) {
  try {
    isLoading.value = true
    identifiableUser.value = (await apiService.getUser(userId)) as IdentifiableUser
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}

async function goToLegacyView() {
  if (legacyViewUrl.value) {
    window.location.href = legacyViewUrl.value
  }
}
</script>

<template>
  <div class="row">
    <div class="col-6">
      <h5>Email: {{ identifiableUser?.user?.email }}</h5>
    </div>
    <div class="col-6" style="text-align: right">
      <DefaultButtonComponent
        v-if="legacyViewUrl"
        type="button"
        text="Legacy View"
        @on-click="goToLegacyView()"
      ></DefaultButtonComponent>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-12">
      <h6>Personal Information</h6>
      <div class="row">
        <div class="col">
          <p>
            First Name: <b>{{ identifiableUser?.user?.firstName }}</b>
          </p>
        </div>
        <div class="col">
          <p>
            Last Name: <b>{{ identifiableUser?.user?.lastName }}</b>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p>
            Gender:
            <b>{{
              identifiableUser?.user?.gender === GenderEnum.M
                ? 'Male'
                : identifiableUser?.user?.gender === GenderEnum.F
                ? 'Female'
                : ''
            }}</b>
          </p>
        </div>
        <div class="col">
          <p>
            Leaderboard Name: <b>{{ identifiableUser?.user?.leaderboardUsername }}</b>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p>
            Date of Birth:
            <b>{{ dayjs(identifiableUser?.user?.birthdate).format('DD/MM/YYYY') }}</b>
          </p>
        </div>
        <div class="col">
          <p>
            Weight: <b>{{ identifiableUser?.user?.weight ?? '' }} kg</b>
          </p>
        </div>
      </div>
      <hr />
      <h6>Contact Information</h6>
      <div class="row">
        <div class="col">
          <p>
            Country: <b>{{ identifiableUser?.user?.country?.name }}</b>
          </p>
        </div>
        <div class="col">
          <p>
            City/State: <b>{{ identifiableUser?.user?.state?.name }}</b>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p>
            Adress Line 1: <b>{{ identifiableUser?.user?.address1 }}</b>
          </p>
        </div>
        <div class="col">
          <p>
            Adress Line 2: <b>{{ identifiableUser?.user?.address2 }}</b>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p>
            Mobile Number: <b>{{ identifiableUser?.user?.phone }}</b>
          </p>
        </div>
        <div class="col">
          <p>
            Emergency Contact Name:
            <b>{{ identifiableUser?.user?.emergencyContactName }}</b>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p>
            Emergency Contact Number:
            <b>{{ identifiableUser?.user?.emergencyContactPhone }}</b>
          </p>
        </div>
        <div class="col">
          <p>
            Emergency Contact Relationship:
            <b>{{ identifiableUser?.user?.emergencyContactRelationship }}</b>
          </p>
        </div>
      </div>
    </div>
  </div>

  <hr />
  <div class="row">
    <div class="col-12">
      <CustomerWorkoutStats
        v-if="userId"
        :user-id="userId"
        :user-email="identifiableUser?.user?.email"
      ></CustomerWorkoutStats>
    </div>
  </div>

  <ModalComponent
    title="ERROR"
    :message="ERROR_UNKNOWN"
    :closable="false"
    v-if="errorModalIsVisible"
    @on-ok="errorModalIsVisible = false"
  >
  </ModalComponent>
</template>

<style scoped></style>
