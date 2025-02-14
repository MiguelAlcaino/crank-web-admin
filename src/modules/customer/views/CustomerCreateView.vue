<script lang="ts">
interface Country {
  code: string
  name: string
  states?: State[] | undefined
}

interface State {
  code: string
  name: string
}
</script>

<script setup lang="ts">
import { onMounted, reactive, ref, computed, inject } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs, maxLength, helpers } from '@vuelidate/validators'
import { GenderEnum, type RegisterUserInput } from '@/gql/graphql'

import { authService } from '@/services/authService'
import type { ApiService } from '@/services/apiService'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import dayjs from 'dayjs'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import { getFormattedPhoneNumber } from '@/utils/utility-functions'
import { ValidationError } from '@/utils/errors/saveUserErrors'
import type { AdminSite } from '@/modules/shared/interfaces'

const isSaving = ref(false)
const isLoggingIn = ref(false)
const successModalIsVisible = ref(false)
const errorModalIsVisible = ref(false)
const errorMessage = ref('')

const countries = ref([] as Country[])
const countryStates = ref([] as State[])
const currentDate = ref(new Date())

const passwordIsVisible = ref(true)
const confirmPasswordIsVisible = ref(true)
const urlAfterSubmit = ref<string | null>(null)
const defaultPassword = 'crank123'
const userId = ref<string | null>(null)

const formData = reactive({
  location: null,
  firstName: '',
  lastName: '',
  email: '',
  password: defaultPassword,
  confirmPassword: defaultPassword,
  gender: '',
  birthdate: null as Date | null,
  country: 'AE',
  cityState: '',
  address1: '',
  address2: '',
  phone: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactRelationship: '',
  leaderboardUsername: '',
  acceptTermsAndConditions: false
})

const checkPass = helpers.regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/)

const rules = computed(() => {
  return {
    location: {
      required: helpers.withMessage('Location is required', required)
    },
    firstName: {
      required: helpers.withMessage('First Name is required', required),
      maxLength: maxLength(50)
    },
    lastName: {
      required: helpers.withMessage('Last Name is required', required),
      maxLength: maxLength(50)
    },
    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('The email address is not valid', email)
    },
    password: {
      required: helpers.withMessage('Field is required', required),
      minLength: helpers.withMessage(
        'The password must contain at least 8 characters',
        minLength(8)
      ),
      checkPass: helpers.withMessage('The password must contain a letter and a number', checkPass)
    },
    confirmPassword: {
      required: helpers.withMessage('Field is required', required),
      sameAs: helpers.withMessage(
        'The password confirmation does not match',
        sameAs(formData.password)
      )
    },
    gender: {
      required: helpers.withMessage('Gender required', required)
    },
    birthdate: {
      required: helpers.withMessage('Date of Birth is required', required)
    },
    country: {
      required: helpers.withMessage('Country is required', required)
    },
    cityState: {
      required: helpers.withMessage('City/State is required', required)
    },
    address1: { maxLength: maxLength(255) },
    address2: { maxLength: maxLength(255) },
    phone: {
      required: helpers.withMessage(
        'Valid mobile number is required to redeem the trial package through an SMS validation code',
        required
      ),
      validateUAEphone: helpers.withMessage(
        'A UAE phone number must start with +9715',
        validateUAEphone
      ),
      minLength: helpers.withMessage(
        'Valid mobile number is required to redeem the trial package through an SMS validation code',
        minLength(7)
      ),
      lengthUAEphone: helpers.withMessage('Invalid Mobile Number', lengthUAEphone)
    },
    emergencyContactName: {
      required: helpers.withMessage('Emergency Contact Name is required', required)
    },
    emergencyContactPhone: {
      required: helpers.withMessage('Emergency contact number is required', required)
    },
    emergencyContactRelationship: {
      required: helpers.withMessage('Emergency contact relationship is required', required)
    },
    leaderboardUsername: {
      required: helpers.withMessage('Leaderboard Nickname is required', required)
    },
    acceptTermsAndConditions: {
      sameAs: helpers.withMessage('You must accept the terms and conditions', sameAs(true))
    }
  }
})

const validateUAEphone = (phone: string) =>
  phone.startsWith('+971') ? getFormattedPhoneNumber(phone).startsWith('+9715') : true

const lengthUAEphone = (phone: string) =>
  phone.startsWith('+971') ? getFormattedPhoneNumber(phone).length === 13 : true

const v$ = useVuelidate(rules, formData)
const apiService = inject<ApiService>('gqlApiService')!

const sites = ref<AdminSite[]>([])

onMounted(() => {
  let _urlAfterSubmit = inject<string | undefined>('url-after-submit')
  if (_urlAfterSubmit) {
    urlAfterSubmit.value = _urlAfterSubmit
  }

  getAvailableSites()
  getCountries()
  getCountryStates('AE')
})

function getAvailableSites() {
  sites.value = authService.getAvailableSites()
}

const submitForm = async () => {
  const isValid = await v$.value.$validate()

  if (isValid) {
    let gender: GenderEnum = GenderEnum.N

    if (formData.gender === 'M') gender = GenderEnum.M
    else if (formData.gender === 'F') gender = GenderEnum.F

    const input: RegisterUserInput = {
      address1: formData.address1 == '' ? '-' : formData.address1,
      address2: formData.address2,
      birthdate: dayjs(formData.birthdate).format('YYYY-MM-DD'),
      city: formData.cityState,
      country: formData.country,
      email: formData.email,
      emergencyContactName: formData.emergencyContactName,
      emergencyContactPhone: getFormattedPhoneNumber(formData.emergencyContactPhone),
      emergencyContactRelationship: formData.emergencyContactRelationship,
      firstName: formData.firstName,
      gender: gender,
      lastName: formData.lastName,
      leaderboardUsername: formData.leaderboardUsername,
      password: formData.password,
      phone: getFormattedPhoneNumber(formData.phone),
      state: formData.cityState,
      weight: null,
      zipCode: '0000'
    }

    isSaving.value = true
    try {
      userId.value = await apiService.registerIdentifiableUser(formData.location!, input)

      successModalIsVisible.value = true
    } catch (error) {
      if (error instanceof ValidationError) {
        errorMessage.value = error.message
      } else {
        errorMessage.value = ERROR_UNKNOWN
      }
      errorModalIsVisible.value = true
    } finally {
      isSaving.value = false
    }
  } else {
    console.error('error form')
  }
}

const onChangeFirstName = async () => {
  formData.leaderboardUsername = formData.firstName
}

async function getCountries() {
  countries.value = (await apiService.getCountries()) as Country[]
}

async function getCountryStates(countryCode: string) {
  const country = await apiService.getCountry(countryCode)
  countryStates.value = country?.states as State[]
}

function onChangeCountry() {
  getCountryStates(formData.country)
}

async function goToUrlAfterSubmit() {
  successModalIsVisible.value = false

  if (urlAfterSubmit.value) {
    const receivedUrl = urlAfterSubmit.value
    window.location.href = receivedUrl.replace('REPLACE_ID', userId.value!)
  }
}
</script>

<template>
  <h1>Registration</h1>
  <h3>Location</h3>

  <form @submit.prevent="submitForm" autocomplete="off">
    <!-- location -->
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <select class="custom-select" v-model="formData.location" required>
          <option v-for="(item, index) in sites" :key="index" :value="item.serviceKey">
            {{ item.name }}
          </option>
        </select>
        <small
          v-for="error in v$.location.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>
    <hr />
    <h3>Profile Information</h3>
    <!-- email -->
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="emailRegistration" class="input-label">Email *</label>
        <input
          type="email"
          v-model="formData.email"
          class="form-control"
          id="emailRegistration"
          maxlength="200"
          placeholder="Email"
          required
        />
        <small
          v-for="error in v$.email.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <div class="form-row">
      <!-- password -->
      <div class="col-md-6 mb-3">
        <label for="passwordRegistration" class="input-label">Password *</label>
        <div class="input-group">
          <input
            id="passwordRegistration"
            class="form-control"
            v-model="formData.password"
            :type="passwordIsVisible ? 'text' : 'password'"
            placeholder="Password"
            maxlength="50"
            required
          />
          <div
            class="input-group-prepend"
            @click="passwordIsVisible = !passwordIsVisible"
            style="cursor: pointer"
          >
            <span class="input-group-text" id="passwordEye" style="background-color: transparent">
              <i v-if="passwordIsVisible" class="bi bi-eye-slash-fill"></i>
              <i v-else class="bi bi-eye-fill"></i>
            </span>
          </div>
        </div>
        <small
          v-for="error in v$.password.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
      <!-- confirm Password -->
      <div class="col-md-6 mb-3">
        <label for="confirmPasswordRegistration" class="input-label">Confirm Password *</label>
        <div class="input-group">
          <input
            id="confirmPasswordRegistration"
            class="form-control"
            v-model="formData.confirmPassword"
            :type="confirmPasswordIsVisible ? 'text' : 'password'"
            placeholder="Confirm Password"
            maxlength="50"
            required
          />
          <div
            class="input-group-prepend"
            @click="confirmPasswordIsVisible = !confirmPasswordIsVisible"
            style="cursor: pointer"
          >
            <span class="input-group-text" id="passwordEye" style="background-color: transparent">
              <i v-if="confirmPasswordIsVisible" class="bi bi-eye-slash-fill"></i>
              <i v-else class="bi bi-eye-fill"></i>
            </span>
          </div>
        </div>
        <small
          v-for="error in v$.confirmPassword.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>
    <hr />
    <h3>Personal Information</h3>
    <div class="form-row">
      <!-- firstName -->
      <div class="col-md-6 mb-3">
        <label for="firstNameRegistration" class="input-label">First Name *</label>
        <input
          id="firstNameRegistration"
          class="form-control"
          v-model="formData.firstName"
          type="text"
          placeholder="First Name"
          maxlength="50"
          required
          v-on:input="onChangeFirstName"
        />
        <small
          v-for="error in v$.firstName.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
      <!-- lastName -->
      <div class="col-md-6 mb-3">
        <label for="lastNameRegistration" class="input-label">Last Name *</label>
        <input
          id="lastNameRegistration"
          class="form-control"
          v-model="formData.lastName"
          type="text"
          placeholder="Last Name"
          maxlength="50"
          required
        />
        <small
          v-for="error in v$.lastName.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <!--gender-->
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="genderRegistration" class="input-label">Gender *</label>
        <select
          class="custom-select"
          v-model="formData.gender"
          id="genderRegistration"
          placeholder="Gender"
          required
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <small
          v-for="error in v$.gender.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <!--leaderboardUsername-->
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="leaderboardUsernameRegistration" class="input-label"
          >Leaderboard Nickname *</label
        >
        <input
          id="leaderboardUsernameRegistration"
          class="form-control"
          v-model="formData.leaderboardUsername"
          type="text"
          placeholder="Leaderboard Nickname"
          maxlength="50"
          required
        />
        <small
          v-for="error in v$.leaderboardUsername.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <!--birthdate-->
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="dateOfBirthRegistration" class="input-label">Date of Birth *</label>
        <VueDatePicker
          v-model="formData.birthdate"
          :enable-time-picker="false"
          placeholder="Date of Birth *"
          id="dateOfBirthMyProfile"
          required
          :clearable="false"
          :max-date="currentDate"
        />
        <small
          v-for="error in v$.birthdate.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <hr />
    <h3>Contact Information</h3>
    <!--country-->
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="countryRegistration" class="input-label">Country *</label>
        <select
          class="custom-select"
          v-model="formData.country"
          @change="onChangeCountry()"
          id="countryRegistration"
          required
        >
          <option v-for="(item, index) in countries" :key="index" :value="item.code">
            {{ item.name }}
          </option>
        </select>
        <small
          v-for="error in v$.country.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
      <!-- cityState -->
      <div class="col-md-6 mb-3">
        <label for="cityStateRegistration" class="input-label">City/State *</label>
        <select
          class="custom-select"
          v-model="formData.cityState"
          id="cityStateRegistration"
          required
        >
          <option v-for="(item, index) in countryStates" :key="index" :value="item.code">
            {{ item.name }}
          </option>
        </select>
        <small
          v-for="error in v$.cityState.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <div class="form-row">
      <!--address1-->
      <div class="col-md-6 mb-3">
        <label for="address1Registration" class="input-label">Address Line 1</label>
        <input
          id="address1Registration"
          class="form-control"
          v-model="formData.address1"
          type="text"
          placeholder="Address Line 1"
          maxlength="255"
        />
        <small
          v-for="error in v$.address1.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
      <!--address2-->
      <div class="col-md-6 mb-3">
        <label for="address2Registration" class="input-label">Address Line 2</label>
        <input
          id="address2Registration"
          class="form-control"
          v-model="formData.address2"
          type="text"
          placeholder="Address Line 2"
          maxlength="255"
        />
        <small
          v-for="error in v$.address2.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <div class="form-row">
      <!--phone-->
      <div class="col-md-6 mb-3">
        <label for="mobileNumberRegistration" class="input-label">Mobile Number *</label>
        <vue-tel-input
          v-model="formData.phone"
          mode="international"
          id="mobileNumberRegistration"
          placeholder="Mobile Number"
          required
          defaultCountry="AE"
          :dropdownOptions="{
            showSearchBox: true,
            showFlags: true,
            showDialCodeInList: true,
            showDialCodeInSelection: false
          }"
          :inputOptions="{
            id: 'mobileNumberRegistration',
            showDialCode: true,
            required: true
          }"
          :validCharactersOnly="true"
        ></vue-tel-input>

        <small
          v-for="error in v$.phone.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <div class="form-row">
      <!-- emergencyContactName -->
      <div class="col-md-6 mb-3">
        <label for="emergencyContactNameRegistration" class="input-label"
          >Emergency Contact Name *</label
        >
        <input
          id="emergencyContactNameRegistration"
          class="form-control"
          v-model="formData.emergencyContactName"
          type="text"
          placeholder="Emergency Contact Name"
          maxlength="100"
          required
        />
        <small
          v-for="error in v$.emergencyContactName.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
      <!--emergencyContactPhone-->
      <div class="col-md-6 mb-3">
        <label for="emergencyContactPhoneRegistration" class="input-label"
          >Emergency Contact Number *</label
        >
        <vue-tel-input
          v-model="formData.emergencyContactPhone"
          mode="international"
          id="emergencyContactPhoneRegistration"
          placeholder="Emergency Contact Number"
          required
          defaultCountry="AE"
          :dropdownOptions="{
            showSearchBox: true,
            showFlags: true,
            showDialCodeInList: true,
            showDialCodeInSelection: false
          }"
          :inputOptions="{
            id: 'emergencyContactPhoneRegistration',
            showDialCode: true,
            required: true
          }"
          :validCharactersOnly="true"
        ></vue-tel-input>
        <small
          v-for="error in v$.emergencyContactPhone.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
      <!-- emergencyContactRelationship -->
      <div class="col-md-6 mb-3">
        <label for="emergencyContactRelationshipRegistration" class="input-label"
          >Emergency Contact Relationship *</label
        >
        <select
          class="custom-select"
          v-model="formData.emergencyContactRelationship"
          id="emergencyContactRelationshipRegistration"
          required
        >
          <option value="Friend">Friend</option>
          <option value="Relative">Relative</option>
          <option value="Other">Other</option>
        </select>
        <small
          v-for="error in v$.emergencyContactRelationship.$errors"
          :key="error.$uid"
          class="form-text"
          style="color: red"
        >
          {{ error.$message }}
        </small>
      </div>
    </div>

    <hr />

    <!-- acceptTermsAndConditions -->
    <div class="form-row">
      <div class="col-md-12 mb-3">
        <div class="form-check">
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="acceptTermsAndConditionsCheck"
              v-model="formData.acceptTermsAndConditions"
            />
            <label class="custom-control-label" for="acceptTermsAndConditionsCheck">
              I understand and accept the
              <a href="https://www.crank-fit.com/terms-conditions" target="_blank">
                Terms & Conditions
              </a>
            </label>
          </div>
          <small
            v-for="error in v$.acceptTermsAndConditions.$errors"
            :key="error.$uid"
            class="form-text"
            style="color: red"
          >
            {{ error.$message }}
          </small>
        </div>
      </div>
    </div>

    <!--submit button-->
    <div class="form-row justify-content-md-center">
      <div class="col-md-2 mb-3">
        <button class="btn btn-primary btn-block" type="submit" :disabled="isSaving">
          Register<span class="spinner-border spinner-border-sm" v-if="isSaving"></span>
        </button>
      </div>
    </div>
  </form>

  <!-- Error Modal -->
  <ModalComponent
    v-if="errorModalIsVisible"
    title="Error"
    :message="errorMessage"
    :cancel-text="null"
    @on-ok="errorModalIsVisible = false"
  >
  </ModalComponent>

  <!-- Success Modal -->
  <ModalComponent
    v-if="successModalIsVisible"
    title="SUCCESS"
    message="The account has been successfully created."
    :cancel-text="null"
    :closable="false"
    @on-ok="goToUrlAfterSubmit()"
    :ok-loading="isLoggingIn"
  >
  </ModalComponent>
</template>

<style scoped>
h3 {
  color: #737373;
}

a {
  color: #000000;
  font-weight: bold;
  text-decoration: underline;
}

a:hover {
  color: #000000;
  font-weight: bold;
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #ff7f61 !important;
  border-color: #ff7f61 !important;
}

.custom-checkbox .custom-control-input:checked:focus ~ .custom-control-label::before {
  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem #ff7f61;
  border-color: #ff7f61 !important;
}

.custom-checkbox .custom-control-input:focus ~ .custom-control-label::before {
  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 0, 0, 0.25);
  border-color: #ff7f61 !important;
}

.custom-checkbox .custom-control-input:active ~ .custom-control-label::before {
  background-color: #ffc6b9;
  border-color: #ff7f61 !important;
}
</style>

<style lang="css">
/* Datepicker Theming */
.dp__theme_light {
  --dp-background-color: #ffffff !important;
  --dp-text-color: #212121 !important;
  --dp-hover-color: #f3f3f3 !important;
  --dp-hover-text-color: #212121 !important;
  --dp-hover-icon-color: #959595 !important;
  --dp-primary-color: #ff7f61 !important;
  --dp-primary-text-color: #f8f5f5 !important;
  --dp-secondary-color: #c0c4cc !important;
  --dp-border-color: #ddd !important;
  --dp-menu-border-color: #ddd !important;
  --dp-border-color-hover: #aaaeb7 !important;
  --dp-disabled-color: #f6f6f6 !important;
  --dp-scroll-bar-background: #f3f3f3 !important;
  --dp-scroll-bar-color: #959595 !important;
  --dp-success-color: #000000 !important;
  --dp-success-color-disabled: #a3d9b1 !important;
  --dp-icon-color: #959595 !important;
  --dp-danger-color: #ff6f60 !important;
  --dp-highlight-color: rgba(255, 127, 97, 0.1) !important;
}

.dp__range_end,
.dp__range_start,
.dp__active_date {
  background: var(--dp-danger-color) !important;
  color: var(--dp-primary-text-color) !important;
}

.dp__action_select {
  background: #000000 !important;
  color: var(--dp-primary-text-color) !important;
}

li > span {
  font-family: 'Avenir', sans-serif;
}

li > strong {
  font-family: 'Avenir', sans-serif;
}
</style>
