import { startCalendarApp } from '@/start-app-functions'

const selection = <HTMLElement | null>document.querySelector('#vue-app-admin-class')
const token = selection?.dataset.token as string
const gqlUrl = selection?.dataset.gqlUrl as string
const site = selection?.dataset.site as string
const goBackUrl = selection?.dataset.goBackUrl as string | null | undefined
const editCustomerProfileUrl = selection?.dataset.editCustomerProfileUrl as
  | string
  | null
  | undefined

startCalendarApp(gqlUrl, token, site, '#app', goBackUrl, editCustomerProfileUrl)
