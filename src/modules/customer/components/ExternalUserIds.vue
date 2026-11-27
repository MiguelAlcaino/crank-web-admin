<script lang="ts">
interface SimpleSiteUserWithError {
  // Rows added in this modal have no site until one is picked.
  site: string | null
  externalUserId: string
  errorMessage?: string | null
  siteErrorMessage?: string | null
  // True for a site record created in this modal, false for one the customer already has.
  isNew?: boolean
  key: string
}
</script>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'

import type { ApiService } from '@/services/apiService'

import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import type {
  EditUserResultUnion,
  OtherUserHasThisExternalIdError,
  SimpleSiteUser,
  Site
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
const availableSites = ref<Site[]>([])
let newRowCounter = 0

// A customer has one record per site, so only sites not already used by a row can be added.
const unusedSites = computed<Site[]>(() =>
  availableSites.value.filter(
    (site) => !siteUsers.value.some((siteUser) => siteUser.site === site.code)
  )
)

function sitesSelectableFor(row: SimpleSiteUserWithError): Site[] {
  return availableSites.value.filter(
    (site) =>
      site.code === row.site ||
      !siteUsers.value.some((siteUser) => siteUser !== row && siteUser.site === site.code)
  )
}

function siteName(code: string | null): string {
  return availableSites.value.find((site) => site.code === code)?.name ?? code ?? ''
}

function onClickUpdateMindbodyIds() {
  getUserSites()
  modalIsVisible.value = true
}

async function getUserSites() {
  siteUsers.value = []

  isLoading.value = true

  try {
    const [userSites, sites] = await Promise.all([
      apiService.getUserSites(props.userId),
      apiService.getAvailableSites()
    ])

    availableSites.value = sites ?? []
    siteUsers.value = (userSites ?? []).map((siteUser) => ({
      site: siteUser.site,
      externalUserId: siteUser.externalUserId,
      isNew: false,
      key: 'existing-' + siteUser.site
    }))
  } finally {
    isLoading.value = false
  }
}

function onClickAddSite() {
  newRowCounter++
  siteUsers.value.push({
    // Preselect when there is only one site left to add.
    site: unusedSites.value.length === 1 ? unusedSites.value[0].code : null,
    externalUserId: '',
    isNew: true,
    key: 'new-' + newRowCounter
  })
}

function onClickRemoveRow(row: SimpleSiteUserWithError) {
  siteUsers.value = siteUsers.value.filter((siteUser) => siteUser !== row)
}

function validate(): boolean {
  let isValid = true

  for (const siteUser of siteUsers.value) {
    if (
      siteUser.externalUserId === '' ||
      siteUser.externalUserId === null ||
      siteUser.externalUserId === undefined
    ) {
      siteUser.errorMessage = 'This field is required'
      isValid = false
    } else {
      siteUser.errorMessage = ''
    }

    if (!siteUser.site) {
      siteUser.siteErrorMessage = 'This field is required'
      isValid = false
    } else {
      siteUser.siteErrorMessage = ''
    }
  }

  return isValid
}

function onClickSave() {
  if (validate()) {
    confirmationModalIsVisible.value = true
  }
}

async function onClickConfirm() {
  confirmationModalIsVisible.value = false

  if (validate()) {
    isSaving.value = true

    try {
      var editUserResultUnion = (await apiService.editUserSites(
        props.userId,
        siteUsers.value.map((siteUser) => ({
          site: siteUser.site,
          externalUserId: siteUser.externalUserId
        })) as SimpleSiteUser[]
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
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                @click="modalIsVisible = false"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="text-center">SITE</th>
                        <th class="text-center">MINDBODY ID</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in siteUsers" :key="item.key">
                        <td class="text-center">
                          <template v-if="item.isNew">
                            <select
                              :id="'site-' + item.key"
                              class="form-select"
                              v-model="item.site"
                              required
                            >
                              <option :value="null" disabled>Select a site</option>
                              <option
                                v-for="site in sitesSelectableFor(item)"
                                :key="site.code"
                                :value="site.code"
                              >
                                {{ site.name }}
                              </option>
                            </select>
                            <small class="form-text" style="color: red">
                              {{ item.siteErrorMessage }}
                            </small>
                          </template>
                          <template v-else>{{ siteName(item.site) }}</template>
                        </td>
                        <td>
                          <input
                            :id="'externalUserId-' + item.key"
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
                        <td class="text-center">
                          <button
                            v-if="item.isNew"
                            type="button"
                            class="btn btn-sm btn-outline-danger"
                            aria-label="Remove site"
                            @click="onClickRemoveRow(item)"
                          >
                            &times;
                          </button>
                        </td>
                      </tr>
                      <tr v-if="!isLoading && siteUsers?.length === 0">
                        <td colspan="3" class="text-center">
                          <p>NO DATA AVAILABLE IN TABLE</p>
                        </td>
                      </tr>
                      <tr v-if="isLoading">
                        <td colspan="3" class="text-center">LOADING...</td>
                      </tr>
                    </tbody>
                  </table>
                  <DefaultButtonComponent
                    v-if="!isLoading && unusedSites.length > 0"
                    text="+ Add site"
                    type="button"
                    variant="secondary"
                    size="sm"
                    @on-click="onClickAddSite"
                  ></DefaultButtonComponent>
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
                :disabled="isLoading || siteUsers.length === 0"
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
    :message="'MINDBODY IDS WERE SUCCESSFULLY SAVED.'"
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
