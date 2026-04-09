<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ClassDetails from '@/modules/class-schedule/components/ClassDetails.vue'
import CalendarList from '@/modules/class-schedule/components/CalendarList.vue'
import DefaultButtonComponent from '@/modules/shared/components/DefaultButtonComponent.vue'

const route = useRoute()
const router = useRouter()

const goBackUrl = ref<string | undefined | null>(undefined)
const editCustomerProfileUrl = ref<string | undefined | null>(undefined)

onMounted(() => {
  goBackUrl.value = inject<string | undefined | null>('goBackUrl')
  editCustomerProfileUrl.value = inject<string | undefined | null>('editCustomerProfileUrl')
})

// Captured once — not reactive to later route changes
const initialClassId = (route.query.classId as string) ?? null
const initialClassDate = (route.query.classDate as string) ?? null

const classId = ref<string | null>(null)
const calendarList = ref<InstanceType<typeof CalendarList> | null>(null)

function selectClass(id: string | null, date: string | null) {
  classId.value = id
  router.replace({ query: id ? { classId: id, classDate: date } : {} })
}

async function goBack() {
  if (goBackUrl.value) {
    window.location.href = goBackUrl.value
  }
}
</script>

<template>
  <div class="row ms-1">
    <div class="col-lg-12 mb-3">
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
      <CalendarList
        @select-class="selectClass"
        ref="calendarList"
        :initial-class-id="initialClassId"
        :initial-date="initialClassDate"
      />
    </div>
    <div class="col-lg-9 col-md-6 col-sm-12 col-12">
      <ClassDetails
        :class-id="classId"
        :edit-customer-profile-url="editCustomerProfileUrl"
      ></ClassDetails>
    </div>
  </div>
</template>
