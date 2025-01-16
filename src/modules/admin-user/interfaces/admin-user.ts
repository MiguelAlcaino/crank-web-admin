import type { Site } from '@/modules/shared/interfaces/site'
import type { Instructor } from './instructor'

export interface AdminUser {
  id: string
  username: string
  email: string
  roles?: string[]
  linkedInstructors?: Instructor[]
  linkedSites?: Site[]
  favoriteSite?: Site
}
