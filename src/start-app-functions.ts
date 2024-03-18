import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'
import '@vueform/slider/themes/default.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.css'
import { ApiService } from '@/services/apiService'
import { newAnonymousClient, newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useAuthenticationStore } from '@/stores/authToken'
import SimpleTypeahead from 'vue3-simple-typeahead'
import RegisterView from '@/views/RegisterView.vue'

export const startRegisterUserApp = async function(urlAfterSubmit: string, gqlUrl: string, token: string, appDiv: string) {
  const app = createApp({
    setup() {
      provide('url-after-submit', urlAfterSubmit)
      provide(
        'gqlApiService',
        new ApiService(newAuthenticatedApolloClient(gqlUrl), newAnonymousClient(gqlUrl))
      )
    },
    render: () => h(RegisterView)
  })

  app.use(createPinia()).use(router).use(SimpleTypeahead).use(ContextMenu)
  useAuthenticationStore().setSession(token)

  app.mount(appDiv)
}