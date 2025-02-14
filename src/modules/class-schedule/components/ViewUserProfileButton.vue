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
import { inject, ref } from 'vue'
import dayjs from 'dayjs'

import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'
import CustomerWorkoutSummary from '@/modules/class-schedule/components/CustomerWorkoutSummary.vue'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import SendClassStatsToEmail from '@/modules/shared/components/SendClassStatsToEmail.vue'

import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
const apiService = inject<ApiService>('gqlApiService')!

const props = defineProps<{
  userId: string
  classId?: string | null
  enrollmentId?: string | null
  editCustomerProfileUrl?: string | null
}>()

const isLoading = ref<boolean>(false)
const modalIsVisible = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)
const identifiableUser = ref<IdentifiableUser | null>(null)
const editCustomerProfileUrl = ref<string | null | undefined>(props.editCustomerProfileUrl)
const resendStatsIsVisible = ref<boolean>(false)

function onClickViewProfile() {
  resendStatsIsVisible.value = false
  getUser(props.userId)
  modalIsVisible.value = true
}

async function getUser(userId: string) {
  try {
    isLoading.value = true
    identifiableUser.value = (await apiService.getUser(userId)) as IdentifiableUser

    if (identifiableUser.value.user) {
      identifiableUser.value.user.weight =
        identifiableUser.value.user.weight !== null
          ? +identifiableUser.value.user?.weight!.toFixed(2)
          : undefined
    }

    if (editCustomerProfileUrl.value) {
      editCustomerProfileUrl.value = props.editCustomerProfileUrl!.replace('REPLACE_ID', userId)
    }
  } catch (error) {
    errorModalIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <DefaultButtonComponent
    text="View Profile"
    type="button"
    @on-click="onClickViewProfile"
  ></DefaultButtonComponent>

  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">
                Profile
                {{
                  identifiableUser !== null
                    ? ' - ' +
                      (identifiableUser.user?.firstName ?? '') +
                      ' ' +
                      (identifiableUser.user?.lastName ?? '')
                    : ''
                }}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="modalIsVisible = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row" v-if="isLoading">
                <div class="col-12 text-center">
                  <CrankCircularProgressIndicator
                    text="Loading..."
                  ></CrankCircularProgressIndicator>
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
                        First Name:
                        <b>{{ identifiableUser?.user?.firstName }}</b>
                      </p>
                    </div>
                    <div class="col">
                      <p>
                        Last Name:
                        <b>{{ identifiableUser?.user?.lastName }}</b>
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
                        Leaderboard Name:
                        <b>{{ identifiableUser?.user?.leaderboardUsername }}</b>
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
                        Weight:
                        <b>{{ identifiableUser?.user?.weight ?? '' }} kg</b>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <h6>Contact Information</h6>
                  <div class="row">
                    <div class="col">
                      <p>
                        Country:
                        <b>{{ identifiableUser?.user?.country?.name }}</b>
                      </p>
                    </div>
                    <div class="col">
                      <p>
                        City/State:
                        <b>{{ identifiableUser?.user?.state?.name }}</b>
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <p>
                        Address Line 1:
                        <b>{{ identifiableUser?.user?.address1 }}</b>
                      </p>
                    </div>
                    <div class="col">
                      <p>
                        Address Line 2:
                        <b>{{ identifiableUser?.user?.address2 }}</b>
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <p>
                        Mobile Number:
                        <b>{{ identifiableUser?.user?.phone }}</b>
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
              <CustomerWorkoutSummary
                v-if="userId && classId && enrollmentId"
                :user-id="userId"
                :class-id="classId"
                :enrollment-id="enrollmentId"
                @set-resend-stats-is-visible="resendStatsIsVisible = $event"
              ></CustomerWorkoutSummary>
            </div>
            <div class="modal-footer border-0">
              <SendClassStatsToEmail
                v-if="
                  resendStatsIsVisible && identifiableUser?.user?.email && enrollmentId && classId
                "
                :classId="classId"
                :userEmail="identifiableUser?.user?.email"
                :enrollmentId="enrollmentId"
              ></SendClassStatsToEmail>

              <a
                v-if="editCustomerProfileUrl && isLoading === false"
                :href="editCustomerProfileUrl"
                class="btn btn-primary"
              >
                Edit Profile
              </a>

              <DefaultButtonComponent
                text="Close"
                type="button"
                variant="primary"
                @on-click="modalIsVisible = false"
              ></DefaultButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <ModalComponent
    title="ERROR"
    :message="ERROR_UNKNOWN"
    :closable="false"
    v-if="errorModalIsVisible"
    @on-ok="errorModalIsVisible = false"
  >
  </ModalComponent>
</template>

<style scoped>
h6 {
  color: #737373;
}
</style>
