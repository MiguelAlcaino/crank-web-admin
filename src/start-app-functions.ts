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
import CustomerCreateView from '@/views/CustomerCreateView.vue'
import CustomerEditView from '@/views/CustomerEditView.vue'
import RoomLayoutView from '@/views/RoomLayoutView.vue'
import CustomerProfileView from '@/views/CustomerProfileView.vue'
import { SiteEnum } from '@/gql/graphql'
import { appStore } from '@/stores/appStorage'
import AdminClassView from '@/views/AdminClassView.vue'
import ClassSchedulesView from './views/ClassSchedulesView.vue'
import VueApexCharts from 'vue3-apexcharts'

export const startCustomerCreateApp = async function (
  urlAfterSubmit: string,
  gqlUrl: string,
  token: string,
  appDiv: string
) {
  const app = createApp({
    setup() {
      provide('url-after-submit', urlAfterSubmit)
      provide(
        'gqlApiService',
        new ApiService(newAuthenticatedApolloClient(gqlUrl), newAnonymousClient(gqlUrl))
      )
    },
    render: () => h(CustomerCreateView)
  })

  app.use(createPinia()).use(router).use(SimpleTypeahead).use(ContextMenu)
  useAuthenticationStore().setSession(token)

  app.mount(appDiv)
}

export const startCustomerEditApp = async function (
  gqlUrl: string,
  token: string,
  userId: string,
  appDiv: string
) {
  const app = createApp({
    setup() {
      provide('userId', userId)
      provide(
        'gqlApiService',
        new ApiService(newAuthenticatedApolloClient(gqlUrl), newAnonymousClient(gqlUrl))
      )
    },
    render: () => h(CustomerEditView)
  })

  app.use(createPinia()).use(router).use(SimpleTypeahead).use(ContextMenu)
  useAuthenticationStore().setSession(token)

  app.mount(appDiv)
}

export const startRoomLayoutCreateApp = async function (
  gqlUrl: string,
  token: string,
  site: string,
  roomLayoutListUrl: string,
  appDiv: string
) {
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

export const startRoomLayoutEditApp = async function (
  gqlUrl: string,
  token: string,
  site: string,
  roomLayoutId: string,
  roomLayoutListUrl: string,
  appDiv: string
) {
  const app = createApp({
    setup() {
      provide('roomLayoutId', roomLayoutId)
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

export const startCalendarApp = async function (
  gqlUrl: string,
  token: string,
  site: string,
  appDiv: string
) {
  const app = createApp({
    setup() {
      provide(
        'gqlApiService',
        new ApiService(newAuthenticatedApolloClient(gqlUrl), newAnonymousClient(gqlUrl))
      )
    },
    render: () => h(AdminClassView)
  })

  app.use(createPinia()).use(router).use(VueApexCharts).use(SimpleTypeahead)
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

export const startClassScheduleApp = async function (
  urlSyncAll: string,
  gqlUrl: string,
  token: string,
  site: string,
  appDiv: string
) {
  const app = createApp({
    setup() {
      provide('url-sync-all', urlSyncAll)
      provide(
        'gqlApiService',
        new ApiService(newAuthenticatedApolloClient(gqlUrl), newAnonymousClient(gqlUrl))
      )
    },
    render: () => h(ClassSchedulesView)
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

export const startCustomerProfileApp = async function (
  gqlUrl: string,
  token: string,
  userId: string,
  appDiv: string,
  legacyViewUrl?: string | null
) {
  const app = createApp({
    setup() {
      provide('userId', userId)
      provide('legacyViewUrl', legacyViewUrl)
      provide(
        'gqlApiService',
        new ApiService(newAuthenticatedApolloClient(gqlUrl), newAnonymousClient(gqlUrl))
      )
    },
    render: () => h(CustomerProfileView)
  })

  app.use(createPinia()).use(router).use(SimpleTypeahead).use(VueApexCharts).use(ContextMenu)
  useAuthenticationStore().setSession(token)

  app.mount(appDiv)
}
