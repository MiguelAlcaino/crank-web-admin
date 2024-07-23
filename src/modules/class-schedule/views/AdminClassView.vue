<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'

import ClassDetails from '@/components/ClassDetails.vue'
import CalendarList from '@/components/CalendarList.vue'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'

const goBackUrl = ref<string | undefined | null>(undefined)
const editCustomerProfileUrl = ref<string | undefined | null>(undefined)

onMounted(() => {
  goBackUrl.value = inject<string | undefined | null>('goBackUrl')
  editCustomerProfileUrl.value = inject<string | undefined | null>('editCustomerProfileUrl')
})

const classId = ref<string | null>(null)
const calendarList = ref<InstanceType<typeof CalendarList> | null>(null)

function selectClass(id: string | null) {
  classId.value = id
}

function availableSpotsChanged() {
  calendarList.value?.getCalendarClasses(false)
}

async function goBack() {
  if (goBackUrl.value) {
    window.location.href = goBackUrl.value
  }
}
</script>

<template>
  <div class="row">
    <div class="col-lg-12">
      <DefaultButtonComponent
        text="Go Back"
        @on-click="goBack()"
        type="button"
        :block="false"
        variant="primary"
        size="sm"
        v-if="goBackUrl"
      ></DefaultButtonComponent>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-3 col-md-6 col-sm-12 col-12">
      <CalendarList @select-class="selectClass" ref="calendarList"></CalendarList>
    </div>
    <div class="col-lg-9 col-md-6 col-sm-12 col-12">
      <ClassDetails
        :class-id="classId"
        @available-spots-changed="availableSpotsChanged"
        :edit-customer-profile-url="editCustomerProfileUrl"
      ></ClassDetails>
    </div>
  </div>
</template>
