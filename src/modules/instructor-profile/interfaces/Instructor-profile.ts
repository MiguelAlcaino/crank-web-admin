import type { MindbodyStaff } from './mindbody-staff'

export interface InstructorProfile {
  id: string
  name: string
  description?: string | null
  profilePictureUrl?: string
  active: boolean
  createdAt: Date
  updatedAt: Date
  mindbodyStaffs: MindbodyStaff[]
}
