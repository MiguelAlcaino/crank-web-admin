import type { Role } from '@/utils/userRoles'

export interface AuthUser {
  roles: Role[]
  adminSites: AdminSite[]
  username: string
}

export interface AdminSite {
  name: string
  serviceKey: string
}
