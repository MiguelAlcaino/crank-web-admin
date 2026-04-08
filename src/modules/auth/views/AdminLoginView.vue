<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import { useAuthenticationStore } from '@/stores/authToken'
import { authService } from '@/services/authService'

const router = useRouter()

const isLoading = ref(false)
const loginError = ref('')

const formData = reactive({
  email: '',
  password: ''
})

async function login() {
  if (!formData.email || !formData.password) {
    loginError.value = 'Email and password are required'
    return
  }

  isLoading.value = true
  loginError.value = ''

  try {
    const restUrl = import.meta.env.VITE_CRANK_REST_SERVER_URL
    const response = await axios.post(
      `${restUrl}admin_login_check`,
      {
        email: formData.email,
        password: formData.password
      },
      { withCredentials: true }
    )

    useAuthenticationStore().setSession(response.data.token)
    authService.startRefreshTokenTimer()

    const redirect = router.currentRoute.value.query.redirect as string | undefined
    await router.push(redirect || { name: 'admin_dashboard' })
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response?.status === 401) {
      loginError.value = 'Invalid email or password'
    } else {
      loginError.value = 'An error occurred. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-container d-flex align-items-center justify-content-center min-vh-100">
    <div class="card shadow-sm" style="width: 100%; max-width: 400px">
      <div class="card-body p-4">
        <h4 class="card-title text-center mb-4">CRANK Admin</h4>

        <form @submit.prevent="login" autocomplete="on">
          <div class="form-group mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              v-model="formData.email"
              class="form-control"
              id="email"
              placeholder="admin@example.com"
              autocomplete="email"
              required
              :disabled="isLoading"
            />
          </div>

          <div class="form-group mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              v-model="formData.password"
              class="form-control"
              id="password"
              placeholder="Password"
              autocomplete="current-password"
              required
              :disabled="isLoading"
            />
          </div>

          <div v-if="loginError" class="alert alert-danger py-2 mb-3" role="alert">
            {{ loginError }}
          </div>

          <button
            type="submit"
            class="btn btn-dark btn-block w-100"
            :disabled="isLoading"
          >
            <span v-if="isLoading">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  background-color: #f8f9fa;
}
</style>
