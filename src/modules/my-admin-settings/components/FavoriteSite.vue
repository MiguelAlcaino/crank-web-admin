<script setup lang="ts">
import { computed, inject, onMounted, reactive, ref } from 'vue'
import { helpers, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

import type { Site } from '@/modules/shared/interfaces/site'
import type { AdminUserSites } from '@/modules/class-schedule/interfaces/admin-user-sites'
import type { SiteEnum } from '@/modules/shared/interfaces'

import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'

const apiService = inject<ApiService>('gqlApiService')!

const sites = ref<Site[]>([])
const isLoadingSites = ref(false)
const isSaving = ref(false)
const isEditing = ref(false)
const errorModalIsVisible = ref(false)

const formData = reactive({
  favoriteSite: null as SiteEnum | null
})

const rules = computed(() => {
  return {
    favoriteSite: { required: helpers.withMessage('Favorite Site is required', required) }
  }
})

const v$ = useVuelidate(rules, formData, { $scope: false })

onMounted(() => {
  getAvailableSites()
})

async function getAvailableSites() {
  sites.value = []
  isLoadingSites.value = true

  try {
    const adminUserSites = (await apiService.getCurrentAdminUserSites()) as AdminUserSites

    sites.value = adminUserSites.linkedSites

    if (adminUserSites.favoriteSite !== null) {
      let favoriteSiteCode = adminUserSites.favoriteSite.code as SiteEnum | null
      if (sites.value.filter((site: Site) => site.code === favoriteSiteCode).length === 0) {
        favoriteSiteCode = sites.value.length > 0 ? sites.value[0].code : null
      }

      formData.favoriteSite = favoriteSiteCode
    } else {
      formData.favoriteSite = sites.value.length > 0 ? sites.value[0].code : null
    }
  } catch (error) {
    sites.value = []
  } finally {
    isLoadingSites.value = false
  }
}

async function onSave() {
  const isValid = await v$.value.$validate()

  if (!isValid) {
    return
  }

  updateCurrentAdminUserFavoriteSite()
}

function onCancel() {
  isEditing.value = false
  v$.value.$reset()
  getAvailableSites()
}

function onEdit() {
  isEditing.value = true
}

function updateCurrentAdminUserFavoriteSite() {
  isSaving.value = true

  apiService
    .updateCurrentAdminUserFavoriteSite({ favoriteSite: formData.favoriteSite })
    .then((result) => {
      sites.value = result.linkedSites!
      formData.favoriteSite = result.favoriteSite?.code || null
    })
    .catch(() => {
      isSaving.value = false
      errorModalIsVisible.value = true
    })
    .finally(() => {
      isSaving.value = false
      isEditing.value = false
    })
}
</script>

<template>
  <div class="row align-items-center">
    <div class="col-lg-4 col-md-6 col-sm-8 col-12">
      <label for="favoriteSite" class="input-label">Favorite Site</label>
      <div class="input-group">
        <select
          id="favoriteSite"
          class="custom-select"
          v-model="formData.favoriteSite"
          required
          :disabled="isLoadingSites || isSaving || !isEditing"
        >
          <option v-for="site in sites" :key="site.code" :value="site.code">
            {{ site.name }}
          </option>
        </select>
        <div
          v-if="isLoadingSites"
          class="spinner-border text-primary position-absolute custom-select-spinner"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
        <div class="input-group-append">
          <DefaultButtonComponent
            text="Edit"
            type="button"
            @on-click="onEdit"
            :disabled="isLoadingSites"
            v-if="!isEditing"
          />
          <DefaultButtonComponent
            text="Save"
            type="button"
            @on-click="onSave"
            :isLoading="isSaving"
            v-if="isEditing"
          />
          <DefaultButtonComponent
            text="Cancel"
            type="button"
            :disabled="isSaving"
            @on-click="onCancel"
            variant="secondary"
            v-if="isEditing"
          />
        </div>
      </div>
      <small
        v-for="error in v$.favoriteSite.$errors"
        :key="error.$uid"
        class="form-text"
        style="color: red"
      >
        {{ error.$message }}
      </small>
    </div>
  </div>

  <ModalComponent
    v-if="errorModalIsVisible"
    title="ERROR"
    :message="ERROR_UNKNOWN"
    :closable="false"
    @on-ok="errorModalIsVisible = false"
    :cancel-text="null"
  >
  </ModalComponent>
</template>

<style scoped>
.custom-select-spinner {
  color: #ff7f61 !important;
  top: 30%;
  right: 28px;
  width: 1rem;
  height: 1rem;
  border-width: 0.2em;
}
</style>
