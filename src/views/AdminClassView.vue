<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'

import ClassDetails from '@/components/ClassDetails.vue'
import CalendarList from '@/components/CalendarList.vue'
import DefaultButtonComponent from '@/components/DefaultButtonComponent.vue'

const goBackUrl = ref<string | undefined | null>(undefined)

onMounted(() => {
  goBackUrl.value = inject<string | undefined | null>('goBackUrl')
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
    <div class="col-lg-3 col-md-3 col-sm-4">
      <CalendarList @select-class="selectClass" ref="calendarList"></CalendarList>
    </div>
    <div class="col-lg-9 col-md-9 col-sm-8">
      <ClassDetails
        :class-id="classId"
        @available-spots-changed="availableSpotsChanged"
      ></ClassDetails>
    </div>
  </div>
</template>
