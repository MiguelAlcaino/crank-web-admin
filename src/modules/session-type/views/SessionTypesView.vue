<script setup lang="ts">
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { inject, onMounted, ref } from 'vue'
import SessionTypeCreate from '../components/SessionTypeCreate.vue'
import SessionTypeEdit from '../components/SessionTypeEdit.vue'
import { useSessionTypes } from '../composables/useSessionTypes'

const apiService = inject<ApiService>('gqlApiService')!
const { isLoading, sessionTypes, hasLoadError, getSessionTypes } = useSessionTypes(apiService)

const errorModalVisible = ref<boolean>(false)

onMounted(async () => {
  await getSessionTypes()
  if (hasLoadError.value) {
    errorModalVisible.value = true
  }
})
</script>

<template>
  <h1>Session Types</h1>

  <div class="row">
    <div class="col-12 d-flex justify-content-end">
      <SessionTypeCreate />
    </div>
  </div>
  <br />
  <div class="row">
    <div class="col-12">
      <table class="table">
        <thead>
          <tr>
            <th class="text-center">ID</th>
            <th class="text-center">NAME</th>
            <th class="text-center">STATUS</th>
            <th class="text-center">BANNER</th>
            <th class="text-center">MINDBODY SESSION TYPES</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sessionTypes" v-bind:key="item.id" v-bind:index="index">
            <td class="text-center">{{ item.id }}</td>
            <td class="text-center">{{ item.name }}</td>
            <td class="text-center">
              <span
                :class="[
                  'status-badge',
                  item.active ? 'status-badge-active' : 'status-badge-inactive'
                ]"
              >
                {{ item.active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="text-center">
              <a
                v-if="item.bannerImagePath"
                :href="item.bannerImagePath"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  :src="item.bannerImagePath"
                  :alt="`${item.name} banner`"
                  class="banner-thumb"
                />
              </a>
              <span v-else>-</span>
            </td>
            <td class="text-center">
              <span v-if="item.mindbodySessionTypes && item.mindbodySessionTypes.length > 0">
                {{ item.mindbodySessionTypes.map((s) => s.name).join(', ') }}
              </span>
              <span v-else>-</span>
            </td>
            <td>
              <SessionTypeEdit :session-type="item" />
            </td>
          </tr>
          <tr v-if="!isLoading && sessionTypes?.length === 0">
            <td colspan="6" class="text-center">
              <p>NO DATA AVAILABLE IN TABLE</p>
            </td>
          </tr>
          <tr v-if="isLoading">
            <td colspan="6" class="text-center">LOADING...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <ModalComponent
    v-if="errorModalVisible"
    title="ERROR"
    :message="ERROR_UNKNOWN"
    :closable="false"
    @on-ok="errorModalVisible = false"
    :cancel-text="null"
  >
  </ModalComponent>
</template>

<style scoped>
.banner-thumb {
  width: 96px;
  height: 56px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #dee2e6;
}

.status-badge {
  display: inline-block;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
}

.status-badge-active {
  background-color: rgba(255, 138, 115, 1);
  color: rgb(255, 255, 255);
}

.status-badge-inactive {
  background-color: rgba(231, 231, 231, 1);
  color: rgba(138, 138, 138, 1);
}
</style>
