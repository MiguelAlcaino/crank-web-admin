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

interface IdentifiableUser {
  id?: string
  user?: User
}

interface SimpleSiteUser {
  site: SiteEnum
  externalUserId: string
}

interface User {
  address1: string
  address2?: string
  birthdate?: Date
  city: string
  country: Country
  doesExistInSite: boolean
  email: string
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelationship?: string
  firstName: string
  gender?: GenderEnum
  hideMetrics?: boolean
  lastName: string
  leaderboardUsername?: string
  phone: string
  state?: State
  weight?: number
  zipCode: string
  siteUsers: SimpleSiteUser[]
}

enum GenderEnum {
  /** Feminine */
  F = 'F',
  /** Masculine */
  M = 'M',
  /** Not defined */
  N = 'N'
}
</script>

<script setup lang="ts">
import { onMounted, reactive, ref, computed, inject } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, maxLength, helpers, minValue, minLength } from '@vuelidate/validators'
import type { UserInput } from '@/gql/graphql'
import type { ApiService } from '@/services/apiService'

import UpdateUserPassword from '@/modules/customer/components/UpdateUserPassword.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import ResetUserPassword from '@/modules/customer/components/ResetUserPassword.vue'
import ExternalUserIds from '@/modules/customer/components/ExternalUserIds.vue'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import dayjs from 'dayjs'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import { getFormattedPhoneNumber } from '@/utils/utility-functions'
import { SUCCESS_UPDATE_PROFILE } from '@/utils/successMessages'
import { useRoute } from 'vue-router'
import type { SiteEnum } from '@/modules/shared/interfaces'

const route = useRoute()

const isSaving = ref(false)
const successModalIsVisible = ref(false)
const errorModalIsVisible = ref(false)
const errorModalMessage = ref('')
const weightInputMessageIsVisible = ref(false)
const isLoading = ref(false)

const countries = ref([] as Country[])
const countryStates = ref([] as State[])

const currentDate = ref(new Date())
const userEmail = ref<string>('')

const userId = ref<string>('')
const siteUsers = ref<SimpleSiteUser[]>([])

const formData = reactive({
  firstName: '',
  lastName: '',
  gender: '',
  birthdate: null as Date | null,
  weight: 0,
  country: null as string | null,
  cityState: null as string | null,
  address1: '',
  address2: '',
  phone: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactRelationship: '',
  leaderboardUsername: '',
  joinTheLeaderboard: false
})

const rules = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage('First Name is required', required),
      maxLength: maxLength(50)
    },
    lastName: {
      required: helpers.withMessage('Last Name is required', required),
      maxLength: maxLength(50)
    },
    gender: {
      required: helpers.withMessage('Gender required', required)
    },
    birthdate: {
      required: helpers.withMessage('Date of Birth is required', required)
    },
    weight: {
      required: helpers.withMessage('Weight is required', required),
      minValue: helpers.withMessage('Weight must be higher than 1', minValue(1))
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
    joinTheLeaderboard: {
      required: helpers.withMessage('Field is required', required)
    }
  }
})

const validateUAEphone = (phone: string) =>
  phone.startsWith('+971') ? getFormattedPhoneNumber(phone).startsWith('+9715') : true

const lengthUAEphone = (phone: string) =>
  phone.startsWith('+971') ? getFormattedPhoneNumber(phone).length === 13 : true

const v$ = useVuelidate(rules, formData, { $scope: false })
const apiService = inject<ApiService>('gqlApiService')!

onMounted(() => {
  userId.value = geUserId()
  getCountries()
  getUser()
})

function geUserId(): string {
  let userId = inject<string | undefined>('userId')
  if (userId) {
    return userId as string
  }

  return route.params.id as string
}

async function getUser(): Promise<void> {
  isLoading.value = true
  try {
    const identifiableUser = (await apiService.getUser(userId.value)) as IdentifiableUser
    siteUsers.value = identifiableUser.user?.siteUsers as SimpleSiteUser[]

    if (identifiableUser.user !== null && identifiableUser.user !== undefined) {
      userEmail.value = identifiableUser.user.email

      if (identifiableUser.user.country?.code) {
        await getCountryStates(identifiableUser.user.country.code)
      }

      formData.firstName = identifiableUser.user.firstName
      formData.lastName = identifiableUser.user.lastName
      formData.gender =
        identifiableUser.user.gender !== null
          ? identifiableUser.user.gender!.toString()
          : GenderEnum.N.toString()
      formData.birthdate = dayjs(identifiableUser.user.birthdate).toDate()
      formData.weight =
        identifiableUser.user.weight !== null ? +identifiableUser.user.weight!.toFixed(2) : 0
      formData.country = identifiableUser.user.country?.code ?? null
      formData.cityState = identifiableUser.user.state?.code ?? null
      formData.address1 = identifiableUser.user.address1
      formData.address2 = identifiableUser.user.address2!
      formData.phone = getFormattedPhoneNumber(identifiableUser.user.phone)
      formData.emergencyContactName = identifiableUser.user.emergencyContactName
      formData.emergencyContactPhone = getFormattedPhoneNumber(
        identifiableUser.user.emergencyContactPhone
      )
      formData.emergencyContactRelationship = identifiableUser.user.emergencyContactRelationship!
      formData.leaderboardUsername = identifiableUser.user.leaderboardUsername!
      formData.joinTheLeaderboard =
        identifiableUser.user.hideMetrics !== null ? !identifiableUser.user.hideMetrics! : false
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const submitForm = async () => {
  const isValid = await v$.value.$validate()

  if (isValid) {
    let gender: GenderEnum = GenderEnum.N

    if (formData.gender === 'M') gender = GenderEnum.M
    else if (formData.gender === 'F') gender = GenderEnum.F

    formData.emergencyContactPhone = getFormattedPhoneNumber(formData.emergencyContactPhone)
    formData.phone = getFormattedPhoneNumber(formData.phone)

    const input: UserInput = {
      address1: formData.address1 == '' ? '-' : formData.address1,
      address2: formData.address2,
      birthdate: dayjs(formData.birthdate).format('YYYY-MM-DD'),
      city: formData.cityState,
      country: formData.country,
      hideMetrics: !formData.joinTheLeaderboard,
      emergencyContactName: formData.emergencyContactName,
      emergencyContactPhone: formData.emergencyContactPhone,
      emergencyContactRelationship: formData.emergencyContactRelationship,
      firstName: formData.firstName,
      gender: gender,
      lastName: formData.lastName,
      leaderboardUsername: formData.leaderboardUsername,
      phone: formData.phone,
      state: formData.cityState,
      weight: formData.weight,
      zipCode: '0000'
    }

    try {
      isSaving.value = true
      const editUserResultUnion = await apiService.editUser(userId.value, input)

      if (editUserResultUnion.__typename === 'IdentifiableUser') {
        successModalIsVisible.value = true
      } else {
        errorModalMessage.value = ERROR_UNKNOWN
        errorModalIsVisible.value = true
      }
    } catch (error) {
      errorModalMessage.value = ERROR_UNKNOWN
      errorModalIsVisible.value = true
    } finally {
      isSaving.value = false
    }
  } else {
    console.error('error form')
  }
}

async function getCountries() {
  countries.value = (await apiService.getCountries()) as Country[]
}

async function getCountryStates(countryCode: string) {
  const country = await apiService.getCountry(countryCode)
  countryStates.value = country?.states as State[]
}

function onChangeCountry() {
  getCountryStates(formData.country!)
}
</script>

<template>
  <h1>My Profile</h1>
  <br />
  <h5>{{ userEmail }}</h5>
  <hr />

  <ResetUserPassword :email="userEmail"></ResetUserPassword>
  &nbsp;
  <UpdateUserPassword :userId="userId"></UpdateUserPassword>
  &nbsp;
  <ExternalUserIds :userId="userId"></ExternalUserIds>

  <hr />
  <form @submit.prevent="submitForm" autocomplete="off">
    <!-- hideMetrics -->
    <div class="form-row">
      <div class="col-md-12 mb-3">
        <div class="custom-control custom-switch">
          <input
            type="checkbox"
            class="custom-control-input"
            v-model="formData.joinTheLeaderboard"
            id="joinTheLeaderboardMyProfile"
          />
          <label class="custom-control-label" for="joinTheLeaderboardMyProfile"
            >Join the Leaderboard?</label
          >
          <small
            v-for="error in v$.joinTheLeaderboard.$errors"
            :key="error.$uid"
            class="form-text"
            style="color: red"
          >
            {{ error.$message }}
          </small>
        </div>
      </div>
    </div>

    <h3>Personal Information</h3>

    <div class="form-row">
      <!-- firstName -->
      <div class="col-md-6 mb-3">
        <label for="firstNameMyProfile" class="input-label">First Name *</label>
        <input
          id="firstNameMyProfile"
          class="form-control"
          v-model="formData.firstName"
          type="text"
          placeholder="First Name"
          maxlength="50"
          required
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
        <label for="lastNameMyProfile" class="input-label">Last Name *</label>
        <input
          id="lastNameMyProfile"
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
        <label for="genderMyProfile" class="input-label">Gender *</label>
        <select
          class="custom-select"
          v-model="formData.gender"
          id="genderMyProfile"
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
        <label for="leaderboardUsernameMyProfile" class="input-label">Leaderboard Nickname *</label>
        <input
          id="leaderboardUsernameMyProfile"
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
        <label for="dateOfBirthMyProfile" class="input-label">Date of Birth *</label>
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

    <!-- weight -->
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="weightMyProfile" class="input-label">Weight *</label>
        <div class="input-group">
          <input
            id="weightMyProfile"
            class="form-control"
            v-model="formData.weight"
            type="number"
            placeholder="Weight"
            required
            step="0.01"
            @focus="weightInputMessageIsVisible = true"
            @blur="weightInputMessageIsVisible = false"
          />
          <div class="input-group-append">
            <span class="input-group-text" id="input-group-append-kg">kg</span>
          </div>
        </div>
        <small v-if="weightInputMessageIsVisible" class="form-text" style="color: #737373">
          Enter your weight to improve the accuracy of your class stats
        </small>

        <small
          v-for="error in v$.weight.$errors"
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
        <label for="countryMyProfile" class="input-label">Country *</label>
        <select
          class="custom-select"
          v-model="formData.country"
          @change="onChangeCountry()"
          id="countryMyProfile"
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
        <label for="cityStateMyProfile" class="input-label">City/State *</label>
        <select class="custom-select" v-model="formData.cityState" id="cityStateMyProfile" required>
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
        <label for="address1MyProfile" class="input-label">Address Line 1</label>
        <input
          id="address1MyProfile"
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
        <label for="address2MyProfile" class="input-label">Address Line 2</label>
        <input
          id="address2MyProfile"
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
        <label for="mobileNumberMyProfile" class="input-label">Mobile Number *</label>
        <vue-tel-input
          v-model="formData.phone"
          mode="international"
          id="mobileNumberMyProfile"
          placeholder="Mobile Number"
          required
          :dropdownOptions="{
            showSearchBox: true,
            showFlags: true,
            showDialCodeInList: true,
            showDialCodeInSelection: false
          }"
          :inputOptions="{
            id: 'mobileNumberMyProfile',
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
        <label for="emergencyContactNameMyProfile" class="input-label"
          >Emergency Contact Name *</label
        >
        <input
          id="emergencyContactNameMyProfile"
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
        <label for="emergencyContactPhoneMyProfile" class="input-label"
          >Emergency Contact Number *</label
        >
        <vue-tel-input
          v-model="formData.emergencyContactPhone"
          mode="international"
          id="emergencyContactPhoneMyProfile"
          placeholder="Emergency Contact Number"
          required
          :dropdownOptions="{
            showSearchBox: true,
            showFlags: true,
            showDialCodeInList: true,
            showDialCodeInSelection: false
          }"
          :inputOptions="{
            id: 'emergencyContactPhoneMyProfile',
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
        <label for="emergencyContactRelationshipMyProfile" class="input-label"
          >Emergency Contact Relationship *</label
        >
        <select
          class="custom-select"
          v-model="formData.emergencyContactRelationship"
          id="emergencyContactRelationshipMyProfile"
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

    <!--submit button-->
    <div class="form-row justify-content-md-center">
      <div class="col-md-3 mb-3">
        <button class="btn btn-primary" type="submit" :disabled="isSaving">
          Save Profile
          <span class="spinner-border spinner-border-sm" v-if="isSaving"></span>
        </button>
      </div>
    </div>
  </form>

  <!-- Success Modal -->
  <ModalComponent
    title="Profile update"
    :message="SUCCESS_UPDATE_PROFILE"
    :closable="false"
    @on-ok="successModalIsVisible = false"
    v-if="successModalIsVisible"
    :cancel-text="null"
  >
  </ModalComponent>

  <!-- Error Modal -->
  <ModalComponent
    title="Error"
    :message="errorModalMessage"
    :closable="false"
    v-if="errorModalIsVisible"
    @on-ok="errorModalIsVisible = false"
  >
  </ModalComponent>
</template>

<style lang="css" scoped src="bootstrap/dist/css/bootstrap.min.css"></style>

<style lang="css" scoped src="@/assets/main.css"></style>

<style lang="css" scoped>
.custom-control-input:focus ~ .custom-control-label::before {
  border-color: #ff6f60 !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 47, 69, 0.25) !important;
}

.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #ff6f60 !important;
  background-color: #ff6f60 !important;
}

.custom-control-input:active ~ .custom-control-label::before {
  background-color: #ff6f60 !important;
  border-color: #ff6f60 !important;
}

.custom-control-input:focus:not(:checked) ~ .custom-control-label::before {
  border-color: #ff6f60 !important;
}

.custom-control-input-green:not(:disabled):active ~ .custom-control-label::before {
  background-color: #ff6f60 !important;
  border-color: #ff6f60 !important;
}

h3 {
  color: #737373;
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

input {
  font-family: 'Avenir', sans-serif;
}

li > span {
  font-family: 'Avenir', sans-serif;
}

li > strong {
  font-family: 'Avenir', sans-serif;
}
</style>
