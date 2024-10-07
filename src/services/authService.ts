import axios from 'axios'
import { useAuthenticationStore } from '@/stores/authToken'
import router from '@/router'
import jwt_decode from 'jwt-decode'
import type { Role } from '@/utils/userRoles'
import type { AdminSite } from '@/modules/shared/interfaces'
import type { AuthUser } from '@/modules/shared/interfaces/auth-user'

interface JwtTokenPayload {
  exp: number
  roles: string[]
  adminSites: AdminSite[]
  username: string
}

export const authService = {
  getRestServerUrl(): string {
    return import.meta.env.VITE_CRANK_REST_SERVER_URL
  },
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
    const response = await axios.post(this.getRestServerUrl() + 'token/refresh')
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
  },
  getUser(): AuthUser | null {
    const token = useAuthenticationStore().token

    if (!token) return null

    const decoded = jwt_decode<JwtTokenPayload>(token)

    return {
      username: decoded.username as string,
      roles: decoded.roles as Role[],
      adminSites: decoded.adminSites as AdminSite[]
    }
  }
}
