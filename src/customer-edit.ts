import { startCustomerEditApp } from '@/start-app-functions'

const selection = <HTMLElement | null>document.querySelector('#vue-app-parameters')
const token = selection?.dataset.token as string
const gqlUrl = selection?.dataset.gqlUrl as string
const userId = selection?.dataset.userId as string
const appDiv = selection?.dataset.appDiv as string

startCustomerEditApp(gqlUrl, token, userId, appDiv)
