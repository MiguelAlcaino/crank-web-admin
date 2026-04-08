<script setup lang="ts">
import { reactive, computed } from 'vue'
import type { CountryWithPhoneCode, BlacklistEntry } from '../composables/useBlacklistCrud'

const props = defineProps<{
  countries: readonly CountryWithPhoneCode[]
  entry?: BlacklistEntry | null
  isSaving: boolean
}>()

const emit = defineEmits<{
  submit: [countryId: string, mobilePhoneNumber: string]
  cancel: []
}>()

const formData = reactive({
  countryId: props.entry?.countryId || '',
  mobilePhoneNumber: props.entry?.mobilePhoneNumber || ''
})

const isEditing = computed(() => !!props.entry)

function onSubmit() {
  if (!formData.countryId || !formData.mobilePhoneNumber) return
  emit('submit', formData.countryId, formData.mobilePhoneNumber)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="country">Country</label>
      <select
        id="country"
        v-model="formData.countryId"
        class="form-control"
        required
        :disabled="isSaving"
      >
        <option value="" disabled>Select a country</option>
        <option
          v-for="country in countries"
          :key="country.id"
          :value="country.id"
        >
          {{ country.name }} ({{ country.formattedPhoneCode }})
        </option>
      </select>
    </div>

    <div class="mb-3">
      <label for="mobilePhoneNumber">Mobile Phone Number</label>
      <input
        id="mobilePhoneNumber"
        type="tel"
        v-model="formData.mobilePhoneNumber"
        class="form-control"
        placeholder="e.g. 501234567"
        required
        :disabled="isSaving"
      />
    </div>

    <div class="d-flex justify-content-end">
      <button
        type="button"
        class="btn btn-secondary me-2"
        @click="emit('cancel')"
        :disabled="isSaving"
      >
        Cancel
      </button>
      <button type="submit" class="btn btn-dark" :disabled="isSaving || !formData.countryId || !formData.mobilePhoneNumber">
        <span v-if="isSaving">
          <span class="spinner-border spinner-border-sm" role="status"></span>
          Saving...
        </span>
        <span v-else>{{ isEditing ? 'Update' : 'Create' }}</span>
      </button>
    </div>
  </form>
</template>
