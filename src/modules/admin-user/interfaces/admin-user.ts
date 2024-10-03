import type { Site } from '@/modules/shared/interfaces/site'
import type { Instructor } from './instructor'
import type { Role } from '@/utils/userRoles'

export interface AdminUser {
  id: string
  username: string
  email: string
  roles: Role[]
  linkedInstructors: Instructor[]
  linkedSites: Site[]
}
