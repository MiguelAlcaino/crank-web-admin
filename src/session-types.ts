import { startSessionTypesApp } from '@/start-app-functions'

const selection = <HTMLElement | null>document.querySelector('#vue-app-parameters')

const appDiv = selection?.dataset.appDiv as string
const gqlUrl = selection?.dataset.gqlUrl as string
const token = selection?.dataset.token as string

startSessionTypesApp(gqlUrl, token, appDiv)
