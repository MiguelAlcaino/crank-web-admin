import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import Popper from 'vue3-popper'

import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faLeftLong, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faStepBackward, faStepForward, faLeftLong)

import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'
import '@vueform/slider/themes/default.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.css'

import { authService } from '@/services/authService'
import { ApiService } from '@/services/apiService'
import { newAnonymousClient, newAuthenticatedApolloClient } from '@/services/graphqlClient'
import { useAuthenticationStore } from '@/stores/authToken'

import SimpleTypeahead from 'vue3-simple-typeahead'
import { appStore } from './stores/appStorage'
import VueApexCharts from 'vue3-apexcharts'
import { SiteEnum } from './modules/shared/interfaces'

startApp()

async function startApp() {
  const selection = <HTMLElement | null>document.querySelector('#app-parameters')
  const view = selection?.dataset.view as string
  const site = selection?.dataset.site as string
  const app = createApp({
    setup() {
      provide(
        'gqlApiService',
        new ApiService(
          newAuthenticatedApolloClient(import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL),
          newAnonymousClient(import.meta.env.VITE_CRANK_GRAPHQL_SERVER_URL)
        )
      )
    },
    render: () => h(App)
  }).component('font-awesome-icon', FontAwesomeIcon)

  app
    .use(createPinia())
    .use(router)
    .use(SimpleTypeahead)
    .use(ContextMenu)
    .use(VueApexCharts)
    .component('Popper', Popper)

  try {
    await authService.startRefreshTokenTimer()
  } catch (e) {
    // In case the refresh token is invalid
    useAuthenticationStore().deleteSession()
  }

  if (site) {
    let siteEnum: SiteEnum

    if (site === SiteEnum.Dubai) {
      siteEnum = SiteEnum.Dubai
    } else if (site === SiteEnum.AbuDhabi) {
      siteEnum = SiteEnum.AbuDhabi
    } else if (site === SiteEnum.TownSquare) {
      siteEnum = SiteEnum.TownSquare
    } else {
      throw Error
    }

    if (!authService.isLoggedId()) {
      appStore().setSite(siteEnum)
    }
  }

  if (view == 'calendar') {
    await router.push('/calendar')
  } else if (view == 'profile') {
    await router.push('/profile')
  } else if (view == 'reset-password') {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    await router.push('/reset-password?token=' + token)
  } else if (view == 'payments') {
    await router.push('/payments')
  }

  app.mount('#app')
}
