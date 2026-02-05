import type { MindbodyStaff } from './mindbody-staff'

export interface InstructorProfile {
  id: string
  name: string
  description: string
  profilePictureUrl: string
  active: boolean
  createdAt: Date
  updatedAt: Date
  mindbodyStaffs: MindbodyStaff[]
}
