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
import RoomLayoutView from '@/views/admin/RoomLayoutView.vue'
import { SiteEnum } from '@/gql/graphql'
import { appStore } from '@/stores/appStorage'

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

export const startRoomLayoutCreateApp = async function(gqlUrl: string, token: string, site: string, roomLayoutListUrl: string, appDiv: string) {
  const app = createApp({
    setup() {
      provide('roomLayoutListUrl', roomLayoutListUrl)
      provide(
        'gqlApiService',
        new ApiService(newAuthenticatedApolloClient(gqlUrl), newAnonymousClient(gqlUrl))
      )
    },
    render: () => h(RoomLayoutView)
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

  app.mount(appDiv)
}
