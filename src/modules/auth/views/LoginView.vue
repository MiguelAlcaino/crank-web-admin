<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import router from '@/router'
import { helpers, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

import { SiteEnum } from '@/gql/graphql'

import DefaultButtonComponent from '@/components/DefaultButtonComponent.vue'
import dayjs from 'dayjs'
import { appStore } from '@/stores/appStorage'
import { useAuthenticationStore } from '@/stores/authToken'

const displayLoginError = ref(false)
const selectedSite = ref('dubai')

const formData = reactive({
  location: SiteEnum.Dubai,
  token: ''
})

const rules = computed(() => {
  return {
    location: {
      required: helpers.withMessage('Location is required', required)
    },
    token: {
      required: helpers.withMessage('Token is required', required)
    }
  }
})

const v$ = useVuelidate(rules, formData)

async function login() {
  const isValid = await v$.value.$validate()

  if (isValid) {
    displayLoginError.value = false

    setCalendarDates()

    useAuthenticationStore().setSession(formData.token)
    appStore().setSite(selectedSite.value as SiteEnum)

    await router.push({ name: 'admin_calendar_class' })
  }
}

function setCalendarDates() {
  const now = dayjs()
  appStore().setCalendarDates(now.startOf('week').toDate(), now.endOf('week').toDate())
}
</script>

<template>
  <div class="d-flex justify-content-center h-100">
    <div class="card">
      <div class="card-body mt-5">
        <form @submit.prevent="login" autocomplete="off">
          <!-- location -->
          <div class="form-row">
            <div class="col-md-12 mb-3">
              <select class="custom-select" v-model="formData.location" required>
                <option :value="SiteEnum.Dubai">Dubai</option>
                <option :value="SiteEnum.AbuDhabi">Abu Dhabi</option>
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

          <!-- token -->
          <div class="form-row">
            <div class="col-md-12 mb-3">
              <label for="token" class="input-label">Token *</label>
              <textarea
                type="text"
                v-model="formData.token"
                class="form-control"
                id="token"
                rows="6"
                placeholder="Token"
                required
              ></textarea>
              <small
                v-for="error in v$.token.$errors"
                :key="error.$uid"
                class="form-text"
                style="color: red"
              >
                {{ error.$message }}
              </small>
            </div>
          </div>

          <small v-if="displayLoginError" class="form-text" style="color: red">
            Incorrect Login
          </small>

          <!--submit button-->
          <div class="row">
            <div class="col-md-12 mb-3">
              <DefaultButtonComponent
                class="btn-block"
                type="submit"
                text="Login"
              ></DefaultButtonComponent>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  font-family: 'Avenir', sans-serif;
}
.page-login-v3 .panel .panel-body {
  padding: 50px 40px 40px;
}

.card {
  height: 613px;
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
}
</style>
