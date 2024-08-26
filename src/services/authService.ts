import axios from 'axios'
import { useAuthenticationStore } from '@/stores/authToken'
import router from '@/router'
import jwt_decode from 'jwt-decode'
import { Config } from '@/model/Config'
import type { Role } from '@/utils/userRoles'
import type { AdminSite } from '@/modules/shared/interfaces'

interface JwtTokenPayload {
  exp: number
  roles: string[]
  adminSites: AdminSite[]
}

export const authService = {
  isLoggedId(): boolean {
    const store = useAuthenticationStore()
    return store.token !== null
  },
  startRefreshTokenTimer(): void {
    const decoded = jwt_decode<JwtTokenPayload>(useAuthenticationStore().token!)

    const expires = new Date(decoded.exp * 1000)
    const now = Date.now()
    const timeout = expires.getTime() - now - 60 * 1000 // 1 minute before it expires
    const self = this
    useAuthenticationStore().setRefreshTokenTimeout(
      window.setTimeout(async function () {
        try {
          await self.refreshToken()
          self.startRefreshTokenTimer()
        } catch (e) {
          await self.logout()
        }
      }, timeout)
    )
  },
  async refreshToken(): Promise<void> {
    const response = await axios.post(Config.AUTH_SERVICE_HOST + '/api/token/refresh')
    useAuthenticationStore().setSession(response.data.token)
  },
  async logout(): Promise<void> {
    useAuthenticationStore().deleteSession()
    await router.push({ name: 'login' })
  },
  userHasRole(role: Role): boolean {
    const token = useAuthenticationStore().token

    if (token) {
      const decoded = jwt_decode<JwtTokenPayload>(token)

      const userRoles = decoded.roles as Role[]

      for (let index = 0; index < userRoles.length; index++) {
        if (role === userRoles[index]) return true
      }
    }

    return false
  },
  getAvailableSites(): AdminSite[] {
    const token = useAuthenticationStore().token

    if (token) {
      const decoded = jwt_decode<JwtTokenPayload>(token)

      const adminSites = decoded.adminSites as AdminSite[]

      if (adminSites) return adminSites
    }

    return []
  }
}
