<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useSystemSettings } from '../composables/useSystemSettings'
import { useToast } from '@/modules/shared/composables/useToast'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const gqlUrl = import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL
const apolloClient = newAuthenticatedApolloClient(gqlUrl)
const crud = useSystemSettings(apolloClient)
const toast = useToast()

const sendEmail = ref(true)
const editorContent = ref('')
const isClearingCache = ref(false)

onMounted(async () => {
  await crud.fetchSettings()
  if (crud.settings.value) {
    sendEmail.value = crud.settings.value.sendSuccessfulPurchaseEmail
    editorContent.value = crud.settings.value.textBottomIndexPage || ''
  }
})

async function saveSettings() {
  const success = await crud.updateSettings(sendEmail.value, editorContent.value || null)
  if (success) {
    toast.success('System settings have been updated successfully')
  } else {
    toast.error('Failed to update settings')
  }
}

async function handleClearCache() {
  isClearingCache.value = true
  const success = await crud.clearCache()
  if (success) {
    toast.success('The cache has been cleared successfully')
  } else {
    toast.error('Failed to clear cache')
  }
  isClearingCache.value = false
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>System Settings</h4>
      <button
        class="btn btn-primary"
        @click="handleClearCache"
        :disabled="isClearingCache || crud.isSaving.value"
      >
        <span v-if="isClearingCache">
          <span class="spinner-border spinner-border-sm" role="status"></span>
          Clearing...
        </span>
        <span v-else>Reset Cache</span>
      </button>
    </div>

    <!-- Loading -->
    <div v-if="crud.isLoading.value" class="text-center py-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error -->
    <div v-if="crud.hasError.value" class="alert alert-danger">
      {{ crud.errorMessage.value }}
    </div>

    <!-- Settings Form -->
    <form v-if="!crud.isLoading.value && crud.settings.value" @submit.prevent="saveSettings">
      <div class="mb-3">
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="sendEmail"
            v-model="sendEmail"
            :disabled="crud.isSaving.value"
          />
          <label class="form-check-label" for="sendEmail">
            Send successful purchase email
          </label>
        </div>
      </div>

      <div class="mb-3">
        <label>Text bottom index page</label>
        <QuillEditor
          v-model:content="editorContent"
          content-type="html"
          theme="snow"
          :toolbar="[
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ header: [1, 2, 3, false] }],
            ['link'],
            ['clean']
          ]"
        />
      </div>

      <button
        type="submit"
        class="btn btn-dark"
        :disabled="crud.isSaving.value"
      >
        <span v-if="crud.isSaving.value">
          <span class="spinner-border spinner-border-sm" role="status"></span>
          Saving...
        </span>
        <span v-else>Save Settings</span>
      </button>
    </form>
  </div>
</template>
