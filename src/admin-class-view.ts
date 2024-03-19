import { startCalendarApp } from '@/start-app-functions'

const selection = <HTMLElement | null>document.querySelector('#vue-app-admin-class')
const token = selection?.dataset.token as string
const gqlUrl = selection?.dataset.gqlUrl as string
const site = selection?.dataset.site as string

startCalendarApp(gqlUrl, token, site, '#app')
