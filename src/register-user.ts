import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import RegisterView from '@/views/RegisterView.vue'
import router from '@/router'
import '@/assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ApiService } from '@/services/apiService'
import { newAnonymousClient, newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useAuthenticationStore } from '@/stores/authToken'
import { SiteEnum } from './gql/graphql'
import { appStore } from './stores/appStorage'
import SimpleTypeahead from 'vue3-simple-typeahead'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import '@vueform/slider/themes/default.css'

startApp()

async function startApp() {
  console.log('V1.0.0')
  const selection = <HTMLElement | null>document.querySelector('#vue-app-parameters')
  const token = selection?.dataset.token as string
  const gqlUrl = selection?.dataset.gqlUrl as string
  const site = selection?.dataset.site as string
  const userListUrl = selection?.dataset.roomLayoutListUrl as string

  const app = createApp({
    setup() {
      provide('userListUrl', userListUrl)
      provide(
        'gqlApiService',
        new ApiService(newAuthenticatedApolloClient(gqlUrl), newAnonymousClient(gqlUrl))
      )
    },
    render: () => h(RegisterView)
  })

  app.use(createPinia()).use(router).use(SimpleTypeahead).use(ContextMenu)
  useAuthenticationStore().setSession(token)

  if (site) {
    if (site === SiteEnum.Dubai.toString()) {
      appStore().setSite(SiteEnum.Dubai)
    } else if (site === SiteEnum.AbuDhabi) {
      appStore().setSite(SiteEnum.AbuDhabi)
    } else {
      throw Error
    }
  } else {
    throw Error
  }

  app.mount('#app')
}
