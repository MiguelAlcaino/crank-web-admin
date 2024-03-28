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

import DefaultButtonComponent from '@/components/DefaultButtonComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import CrankCircularProgressIndicator from '@/components/CrankCircularProgressIndicator.vue'

import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

const route = useRoute()
const apiService = inject<ApiService>('gqlApiService')!

//31735
const userId = ref<string>('31735')
const isLoading = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)
const identifiableUser = ref<IdentifiableUser | null>(null)

onMounted(() => {
  //userId.value = getUserId()
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
</script>

<template>
  <div class="row" v-if="isLoading">
    <div class="col-12 text-center">
      <CrankCircularProgressIndicator text="Loading..."></CrankCircularProgressIndicator>
    </div>
  </div>
  <div class="row" v-else>
    <div class="col-12">
      <h5>Email: {{ identifiableUser?.user?.email }}</h5>
      <hr />
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
</template>

<style scoped></style>
