<script setup lang="ts">
import { defineProps, inject, onMounted, ref } from 'vue'
import { AdminUser } from '../interfaces'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { ApiService } from '@/services/apiService'

import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import { authService } from '@/services/authService'

const apiService = inject<ApiService>('gqlApiService')!

const props = defineProps<{
  adminUser: AdminUser
}>()

const emits = defineEmits<{
  (e: 'afterDelete'): void
}>()

const isLoading = ref<boolean>(false)
const modalIsVisible = ref<boolean>(false)
const successModalIsVisible = ref<boolean>(false)
const errorMessage = ref<string>('')
const errorModalIsVisible = ref<boolean>(false)
const deleteButtonIsVisible = ref<boolean>(true)

onMounted(() => {
  const user = authService.getUser()
  deleteButtonIsVisible.value = !(user?.username === props.adminUser.username)
})

async function onConfirmDelete() {
  try {
    isLoading.value = true

    var success = await apiService.removeAdminUser(props.adminUser.id)

    if (success) {
      successModalIsVisible.value = true
    } else {
      errorModalIsVisible.value = true
      errorMessage.value = ERROR_UNKNOWN
    }
  } catch (error) {
    errorModalIsVisible.value = true
    errorMessage.value = ERROR_UNKNOWN
  } finally {
    isLoading.value = false
  }
}

function closeModal() {
  modalIsVisible.value = false
}
</script>

<template>
  <DefaultButtonComponent
    :text="'Delete'"
    :type="'button'"
    :variant="'danger'"
    :is-loading="false"
    @on-click="modalIsVisible = true"
    v-if="deleteButtonIsVisible"
  >
  </DefaultButtonComponent>

  <transition name="modal" v-if="modalIsVisible">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title">Delete user {{ adminUser?.username }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="closeModal">&times;</span>
              </button>
            </div>
            <div class="modal-body">ARE YOU SURE YOU WANT TO PROCEED?</div>
            <div class="modal-footer border-0">
              <DefaultButtonComponent
                text="Cancel"
                type="button"
                :disabled="isLoading"
                variant="secondary"
                @on-click="closeModal"
              ></DefaultButtonComponent>

              <DefaultButtonComponent
                text="Delete"
                type="button"
                variant="danger"
                :is-loading="isLoading"
                :disabled="isLoading"
                @on-click="onConfirmDelete"
                class="ml-2"
              >
              </DefaultButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- Error Modal -->
  <ModalComponent
    v-if="errorModalIsVisible"
    title="ERROR"
    :message="errorMessage"
    :closable="false"
    @on-ok="errorModalIsVisible = false"
    :cancel-text="null"
  >
  </ModalComponent>

  <!-- Success Modal -->
  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    message="user successfully deleted."
    :closable="false"
    @on-ok="emits('afterDelete')"
    :cancel-text="null"
  >
  </ModalComponent>
</template>

<style scoped></style>
