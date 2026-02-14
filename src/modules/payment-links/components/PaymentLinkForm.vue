<script setup lang="ts">
import { computed, inject, reactive, onMounted } from 'vue'
import {
  helpers,
  required,
  minLength,
  maxLength,
  minValue,
  maxValue,
  email,
  integer
} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import type { ApiService } from '@/services/apiService'
import type { Site } from '@/modules/shared/interfaces/site'
import { usePaymentLinkCrud } from '../composables/usePaymentLinkCrud'

export interface PaymentLinkFormState {
  title: string
  amount: number | null
  currency: { name: string; code: string } | null
  notificationEmailAddress: string | null
  site: Site | null
}

const props = defineProps<{
  initialData?: PaymentLinkFormState
}>()

const apiService = inject<ApiService>('gqlApiService')!
const { currencyOptions, sites, loadingSites, getAvailableSites } = usePaymentLinkCrud(apiService)

const formData = reactive<PaymentLinkFormState>({
  title: '',
  amount: null,
  currency: null,
  notificationEmailAddress: null,
  site: null
})

const rules = computed(() => ({
  title: {
    required: helpers.withMessage('Title is required', required),
    minLength: helpers.withMessage('Title must be at least 3 characters', minLength(3)),
    maxLength: helpers.withMessage('Title must not exceed 256 characters', maxLength(256))
  },
  amount: {
    required: helpers.withMessage('Amount is required', required),
    minValue: helpers.withMessage('Amount must be greater than 0', minValue(1)),
    maxValue: helpers.withMessage('Amount must not exceed 999999', maxValue(999999)),
    integer: helpers.withMessage('Amount must be an integer', integer)
  },
  currency: {
    required: helpers.withMessage('Currency is required', required)
  },
  notificationEmailAddress: {
    required: helpers.withMessage('Notification email is required', required),
    email: helpers.withMessage('The email address is not valid', email),
    maxLength: helpers.withMessage(
      'Notification email must not exceed 256 characters',
      maxLength(256)
    )
  },
  site: {
    required: helpers.withMessage('Site is required', required)
  }
}))

const v$ = useVuelidate(rules, formData, { $scope: false })

onMounted(() => {
  getAvailableSites()
  populateForm()
})

function populateForm() {
  if (props.initialData) {
    formData.title = props.initialData.title
    formData.amount = props.initialData.amount
    formData.currency = props.initialData.currency
    formData.notificationEmailAddress = props.initialData.notificationEmailAddress
    formData.site = props.initialData.site
  } else {
    formData.currency = currencyOptions[0] || null
  }
}

const validateAndGetValues = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return null

  return { ...formData }
}

const reset = () => {
  v$.value.$reset()
  formData.title = ''
  formData.amount = null
  formData.notificationEmailAddress = ''
  formData.site = null
  formData.currency = currencyOptions[0] || null
}

defineExpose({
  validateAndGetValues,
  reset
})
</script>

<template>
  <div>
    <!-- Title -->
    <div class="form-row mb-3">
      <div class="col">
        <label for="title" class="input-label">Title *</label>
        <div class="input-group">
          <input
            id="title"
            class="form-control"
            v-model="formData.title"
            type="text"
            placeholder="Title"
            required
            maxlength="256"
          />
        </div>
        <small
          v-for="error in v$.title.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <!-- Amount -->
    <div class="form-row mb-3">
      <div class="col">
        <label for="amount" class="input-label">Amount *</label>
        <div class="input-group">
          <input
            id="amount"
            class="form-control"
            v-model="formData.amount"
            type="number"
            step="1"
            min="0"
            placeholder="Amount"
            required
          />
        </div>
        <small
          v-for="error in v$.amount.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <!-- Currency -->
    <div class="form-row mb-3">
      <div class="col">
        <label class="input-label">Currency *</label>
        <multiselect
          v-model="formData.currency"
          :options="currencyOptions"
          :multiple="false"
          label="name"
          track-by="code"
          placeholder="Select a currency"
          class="custom-multiselect"
          :allow-empty="false"
        ></multiselect>
        <small
          v-for="error in v$.currency.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <!-- Notification Email -->
    <div class="form-row mb-3">
      <div class="col">
        <label for="notificationEmailAddress" class="input-label">Notification Email *</label>
        <div class="input-group">
          <input
            id="notificationEmailAddress"
            class="form-control"
            v-model="formData.notificationEmailAddress"
            type="email"
            placeholder="notification@example.com"
            required
            maxlength="256"
          />
        </div>
        <small
          v-for="error in v$.notificationEmailAddress.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <!-- Site -->
    <div class="form-row mb-3">
      <div class="col">
        <label class="input-label">Site *</label>
        <multiselect
          v-model="formData.site"
          :options="sites"
          :multiple="false"
          label="name"
          track-by="code"
          placeholder="Select a site"
          class="custom-multiselect"
          :loading="loadingSites"
          :allow-empty="false"
        ></multiselect>
        <small
          v-for="error in v$.site.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>
  </div>
</template>

<style>
.custom-multiselect .multiselect__tag {
  background-color: #ff7f61;
}

.custom-multiselect .multiselect__tag-icon {
  color: #fff;
}

.custom-multiselect .multiselect__option--highlight {
  background-color: #ff7f61;
  color: #fff;
}

.custom-multiselect .multiselect__option--highlight::after {
  background-color: #ff7f61;
}

.custom-multiselect .multiselect__spinner {
  border-top-color: #ff7f61;
}

.multiselect__spinner::after,
.multiselect__spinner::before {
  border-color: #ff7f61 transparent transparent;
}
</style>
