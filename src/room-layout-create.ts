import { startRoomLayoutCreateApp } from '@/start-app-functions'

const selection = <HTMLElement | null>document.querySelector('#vue-app-parameters')
const token = selection?.dataset.token as string
const gqlUrl = selection?.dataset.gqlUrl as string
const site = selection?.dataset.site as string
const roomLayoutListUrl = selection?.dataset.roomLayoutListUrl as string

startRoomLayoutCreateApp(gqlUrl, token, site, roomLayoutListUrl, '#app')
