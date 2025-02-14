<script lang="ts">
interface RoomLayout {
  id: string
  name: string
  columns: number
  rows: number
}
</script>

<script setup lang="ts">
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import type { SiteEnum } from '@/modules/shared/interfaces'
import type { ApiService } from '@/services/apiService'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { inject, ref } from 'vue'

import { useCalendarList } from '../composables/useCalendarList'

const apiService = inject<ApiService>('gqlApiService')!
const { selectedSite } = useCalendarList(apiService)

const props = defineProps<{
  classId: string
  roomLayoutId?: string
  maxCapacity: number
  disabled: boolean
}>()

const emits = defineEmits<{
  (e: 'afterChangingRoomLayout'): void
}>()

const isSaving = ref<boolean>(false)
const modalIsVisible = ref<boolean>(false)
const confirmModalIsVisible = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const currentNameRoomLayout = ref<string>('')
const selectedRoomLayoutId = ref<string | null>(null)

const errorModalIsVisible = ref<boolean>(false)
const successModalIsVisible = ref<boolean>(false)

const roomLayouts = ref<RoomLayout[]>([])

function openModal() {
  getRoomLayouts()
  modalIsVisible.value = true
}

async function getRoomLayouts() {
  selectedRoomLayoutId.value = null
  currentNameRoomLayout.value = ''
  roomLayouts.value = []

  isLoading.value = true
  roomLayouts.value = (await apiService.roomLayouts(
    selectedSite.value as SiteEnum,
    props.maxCapacity
  )) as RoomLayout[]
  isLoading.value = false

  const currentRoomLayout = roomLayouts.value.find((x) => x.id === props.roomLayoutId)

  if (currentRoomLayout) {
    currentNameRoomLayout.value = currentRoomLayout.name
    selectedRoomLayoutId.value = currentRoomLayout.id
  }
}

async function assignRoomLayoutId() {
  isSaving.value = true
  const result = await apiService.editClass({
    classId: props.classId,
    roomLayoutId: selectedRoomLayoutId.value
  })
  isSaving.value = false

  confirmModalIsVisible.value = false
  modalIsVisible.value = false

  if (result.__typename === 'EditClassSuccessResult') {
    emits('afterChangingRoomLayout')
    successModalIsVisible.value = true
  } else {
    errorModalIsVisible.value = true
  }
}
</script>

<template>
  <DefaultButtonComponent
    text="CHANGE LAYOUT"
    type="button"
    @on-click="openModal()"
    :disabled="disabled"
  >
  </DefaultButtonComponent>

  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">CHANGE LAYOUT</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="modalIsVisible = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>
                Current Layout: <b>{{ currentNameRoomLayout }}</b>
              </p>
              <label for="countryRegistration" class="input-label">Layout Options:</label>
              <select
                class="custom-select"
                v-model="selectedRoomLayoutId"
                id="countryRegistration"
                required
              >
                <option :value="null">-- NO ROOM LAYOUT --</option>
                <option v-for="(item, index) in roomLayouts" :key="index" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="modal-footer border-0">
              <DefaultButtonComponent
                text="CHANGE"
                type="button"
                :is-loading="isSaving"
                v-if="selectedRoomLayoutId !== roomLayoutId && !isLoading"
                :disabled="selectedRoomLayoutId === roomLayoutId && !isLoading"
                @on-click="confirmModalIsVisible = true"
              ></DefaultButtonComponent>

              <DefaultButtonComponent
                text="Cancel"
                type="button"
                :disabled="isSaving"
                variant="secondary"
                @on-click="modalIsVisible = false"
              ></DefaultButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- Confirm Modal -->
  <ModalComponent
    v-if="confirmModalIsVisible"
    title="Confirm"
    message="ARE YOU SURE YOU WANT TO CHANGE THE ROOM LAYOUT FOR THIS CLASS?"
    cancel-text="No"
    ok-text="Yes"
    :ok-loading="isSaving"
    @on-cancel="confirmModalIsVisible = false"
    @on-ok="assignRoomLayoutId()"
  >
  </ModalComponent>

  <!-- Success Modal -->
  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    message="ROOM LAYOUT ASSIGNED SUCCESSFULLY."
    :cancel-text="null"
    ok-text="OK"
    @on-ok="successModalIsVisible = false"
  >
  </ModalComponent>

  <!-- Error Modal -->
  <ModalComponent
    v-if="errorModalIsVisible"
    title="ERROR"
    :message="ERROR_UNKNOWN"
    :cancel-text="null"
    ok-text="OK"
    @on-ok="errorModalIsVisible = false"
  >
  </ModalComponent>
</template>
