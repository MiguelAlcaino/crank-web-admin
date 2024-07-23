<script lang="ts">
interface SimpleSiteUserWithError {
  site: string
  externalUserId: string
  errorMessage?: string | null
}
</script>

<script setup lang="ts">
import { inject, ref } from 'vue'

import type { ApiService } from '@/services/apiService'

import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import type {
  EditUserResultUnion,
  OtherUserHasThisExternalIdError,
  SimpleSiteUser
} from '@/gql/graphql'

const apiService = inject<ApiService>('gqlApiService')!

const props = defineProps<{
  userId: string
}>()

const isLoading = ref<boolean>(false)
const confirmationModalIsVisible = ref<boolean>(false)
const successModalIsVisible = ref<boolean>(false)
const errorModalIsVisible = ref<boolean>(false)
const errorMessage = ref<string>('')
const modalIsVisible = ref<boolean>(false)
const isSaving = ref<boolean>(false)
const siteUsers = ref<SimpleSiteUserWithError[]>([])

function onClickUpdateMindbodyIds() {
  getUserSites()
  modalIsVisible.value = true
}

async function getUserSites() {
  siteUsers.value = []

  isLoading.value = true

  siteUsers.value = (await apiService.getUserSites(props.userId)) as SimpleSiteUserWithError[]

  isLoading.value = false
}

function onClickSave() {
  let isValid = true

  for (let i = 0; i < siteUsers.value.length; i++) {
    if (
      siteUsers.value[i].externalUserId === '' ||
      siteUsers.value[i].externalUserId === null ||
      siteUsers.value[i].externalUserId === undefined
    ) {
      siteUsers.value[i].errorMessage = 'This field is required'
      isValid = false
    } else {
      siteUsers.value[i].errorMessage = ''
    }
  }

  if (isValid) {
    confirmationModalIsVisible.value = true
  }
}

async function onClickConfirm() {
  confirmationModalIsVisible.value = false

  let isValid = true

  for (let i = 0; i < siteUsers.value.length; i++) {
    if (
      siteUsers.value[i].externalUserId === '' ||
      siteUsers.value[i].externalUserId === null ||
      siteUsers.value[i].externalUserId === undefined
    ) {
      siteUsers.value[i].errorMessage = 'This field is required'
      isValid = false
    } else {
      siteUsers.value[i].errorMessage = ''
    }
  }

  if (isValid) {
    isSaving.value = true

    try {
      var editUserResultUnion = (await apiService.editUserSites(
        props.userId,
        siteUsers.value as SimpleSiteUser[]
      )) as EditUserResultUnion

      if (editUserResultUnion.__typename === 'IdentifiableUser') {
        successModalIsVisible.value = true
      } else if (editUserResultUnion.__typename === 'OtherUserHasThisExternalIdError') {
        const otherUserHasThisExternalIdError =
          editUserResultUnion as OtherUserHasThisExternalIdError
        errorMessage.value =
          "WE COULDN'T PROCESS THAT BECAUSE THERE'S ANOTHER USER WITH THIS ID ALREADY ( " +
          otherUserHasThisExternalIdError?.siteUser?.siteUserInfo?.site +
          ':' +
          otherUserHasThisExternalIdError?.siteUser?.identifiableUser?.user?.email +
          ' ). PLEASE VERIFY THE ID AND TRY AGAIN.'
        errorModalIsVisible.value = true
      }
    } catch (error) {
      errorMessage.value = ERROR_UNKNOWN
      errorModalIsVisible.value = true
    } finally {
      isSaving.value = false
    }
  }
}

function onClickSuccessModalOk() {
  successModalIsVisible.value = false
  modalIsVisible.value = false
}
</script>

<template>
  <DefaultButtonComponent
    text="Update mindbody Ids"
    type="button"
    @on-click="onClickUpdateMindbodyIds"
  ></DefaultButtonComponent>

  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">Update mindbody Ids</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="modalIsVisible = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="text-center">SITE</th>
                        <th class="text-center">MINDBODY ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in siteUsers"
                        v-bind:key="item.site"
                        v-bind:index="index"
                      >
                        <td class="text-center">{{ item.site }}</td>
                        <td>
                          <input
                            id="externalUserId{{ item.site }}"
                            class="form-control"
                            v-model="item.externalUserId"
                            type="number"
                            placeholder="External User Id"
                            maxlength="20"
                            required
                          />
                          <small class="form-text" style="color: red">
                            {{ item.errorMessage }}
                          </small>
                        </td>
                      </tr>
                      <tr v-if="!isLoading && siteUsers?.length === 0">
                        <td colspan="2" class="text-center">
                          <p>NO DATA AVAILABLE IN TABLE</p>
                        </td>
                      </tr>
                      <tr v-if="isLoading">
                        <td colspan="2" class="text-center">LOADING...</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="modal-footer border-0">
              <DefaultButtonComponent
                text="Cancel"
                type="button"
                variant="secondary"
                @on-click="modalIsVisible = false"
              ></DefaultButtonComponent>

              <DefaultButtonComponent
                text="SAVE"
                type="button"
                :is-loading="isSaving"
                @on-click="onClickSave()"
              ></DefaultButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- Confirm Modal -->
  <ModalComponent
    v-if="confirmationModalIsVisible"
    title="CONFIRM"
    message="ARE YOU SURE YOU WANT TO PROCEED?"
    cancel-text="No"
    ok-text="Yes"
    :ok-loading="isLoading"
    @on-cancel="confirmationModalIsVisible = false"
    @on-ok="onClickConfirm()"
  >
  </ModalComponent>

  <!-- Success Modal -->
  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    :message="'MINDBODY ID WAS SUCCESSFULLY UPDATED.'"
    :closable="false"
    @on-ok="onClickSuccessModalOk"
    :cancel-text="null"
  >
  </ModalComponent>

  <!-- Error Modal -->
  <ModalComponent
    title="Error"
    :message="errorMessage"
    :closable="false"
    v-if="errorModalIsVisible"
    @on-ok="errorModalIsVisible = false"
    :cancel-text="null"
  >
  </ModalComponent>
</template>

<style scoped></style>
