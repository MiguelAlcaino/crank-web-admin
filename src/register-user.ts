import { startCustomerCreateApp } from '@/start-app-functions'

const selection = <HTMLElement | null>document.querySelector('#vue-app-parameters')
const token = selection?.dataset.token as string
const gqlUrl = selection?.dataset.gqlUrl as string
const urlAfterSubmit = selection?.dataset.urlAfterSubmit as string
const appDiv = selection?.dataset.appDiv as string

startCustomerCreateApp(urlAfterSubmit, gqlUrl, token, appDiv)
