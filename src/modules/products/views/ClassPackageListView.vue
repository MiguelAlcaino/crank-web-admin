<script setup lang="ts">
import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import ClassPackageCategoryList from '../components/ClassPackageCategoryList.vue'
import SyncAllPackages from '../components/SyncAllPackages.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

import { useClassPackageCrud } from '../composables/useClassPackageCrud'
import type { ApiService } from '@/services/apiService'
import { inject, ref, watch } from 'vue'
import type { ClassPackage } from '../interfaces'

const site = inject<string>('site')!
const {
  isLoading,
  hasError,
  isSaving,
  categorizedPackages,
  afterUpdateClassPackage,
  getClassPackages,
  saveOrder
} = useClassPackageCrud(inject<ApiService>('gqlApiService')!, site)

const saveSuccessful = ref<boolean>(false)

const regularPackages = ref<ClassPackage[]>([])
const trialPackages = ref<ClassPackage[]>([])
const vodPackages = ref<ClassPackage[]>([])
const specialPackages = ref<ClassPackage[]>([])
const membershipPackages = ref<ClassPackage[]>([])

watch(
  categorizedPackages,
  (val) => {
    regularPackages.value = [...val.regular]
    trialPackages.value = [...val.trial]
    vodPackages.value = [...val.vod]
    specialPackages.value = [...val.special]
    membershipPackages.value = [...val.membership]
  },
  { immediate: true }
)

async function handleSaveOrder() {
  const success = await saveOrder({
    regular: regularPackages.value,
    trial: trialPackages.value,
    vod: vodPackages.value,
    special: specialPackages.value,
    membership: membershipPackages.value
  })
  if (success) {
    saveSuccessful.value = true
  }
}

async function refreshPackages() {
  await getClassPackages()
}
</script>

<template>
  <div class="row">
    <div class="col-4">
      <h4>Class Packages</h4>
    </div>
    <div class="col-8 pull-right">
      <SyncAllPackages @after-sync="refreshPackages" class="me-2"></SyncAllPackages>
      <DefaultButtonComponent
        text="Save Order"
        type="button"
        :is-loading="isSaving"
        @on-click="handleSaveOrder"
      ></DefaultButtonComponent>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <hr />
    </div>
  </div>

  <div class="row" v-if="!isLoading">
    <div class="col-12">
      <div class="alert alert-info" role="alert">
        Drag &amp; drop packages between sections to change category and order. Click "Save Order"
        to persist changes.
      </div>
    </div>
  </div>

  <div class="row" v-if="isLoading">
    <div class="col-12 text-center">
      <CrankCircularProgressIndicator text="LOADING..."></CrankCircularProgressIndicator>
    </div>
  </div>

  <div class="row" v-if="!isLoading">
    <div class="col-12">
      <ClassPackageCategoryList
        title="Regular"
        :packages="regularPackages"
        group-name="class-packages"
        @update:packages="regularPackages = $event"
        @after-update-class-package="afterUpdateClassPackage"
      ></ClassPackageCategoryList>

      <ClassPackageCategoryList
        title="Trial"
        :packages="trialPackages"
        group-name="class-packages"
        @update:packages="trialPackages = $event"
        @after-update-class-package="afterUpdateClassPackage"
      ></ClassPackageCategoryList>

      <ClassPackageCategoryList
        title="VOD"
        :packages="vodPackages"
        group-name="class-packages"
        @update:packages="vodPackages = $event"
        @after-update-class-package="afterUpdateClassPackage"
      ></ClassPackageCategoryList>

      <ClassPackageCategoryList
        title="Special"
        :packages="specialPackages"
        group-name="class-packages"
        @update:packages="specialPackages = $event"
        @after-update-class-package="afterUpdateClassPackage"
      ></ClassPackageCategoryList>

      <ClassPackageCategoryList
        title="Membership"
        :packages="membershipPackages"
        group-name="class-packages"
        @update:packages="membershipPackages = $event"
        @after-update-class-package="afterUpdateClassPackage"
      ></ClassPackageCategoryList>
    </div>
  </div>

  <!-- Save Success Modal -->
  <ModalComponent
    v-if="saveSuccessful"
    title="SUCCESS"
    :message="'ORDER WAS SUCCESSFULLY UPDATED.'"
    :closable="false"
    @on-ok="saveSuccessful = false"
    :cancel-text="null"
  >
  </ModalComponent>

  <!-- Error Modal -->
  <ModalComponent
    v-if="hasError"
    title="Error"
    :message="ERROR_UNKNOWN"
    :cancel-text="null"
    @on-ok="hasError = false"
  >
  </ModalComponent>
</template>

<style scoped>
.pull-right {
  display: flex;
  justify-content: flex-end;
}
</style>
