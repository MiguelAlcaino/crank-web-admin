import { PositionIconEnum } from '@/modules/shared/interfaces'
import { EnrollmentStatusEnum } from './enrollment-status.enum'

export interface ClassInfo {
  class: Class
  enrollments: EnrollmentInfo[]
  roomLayout?: RoomLayout
  onHoldSpots: number
  orphanedClassStatsSpots: number[]
}

interface RoomLayout {
  id: string
  name: string
  matrix?: Array<ClassPosition>
}

interface ClassPosition {
  x: number
  y: number
  icon: PositionIconEnum
  spotNumber?: number
  enabled?: boolean
}

interface Class {
  id: string
  name: string
  description: string
  instructorName: string
  startWithNoTimeZone: Date
  duration: number
  waitListAvailable: boolean
  showAsDisabled: boolean
  maxCapacity: number
  isSubstitute: boolean
  hasClassStats: boolean
  isSynchronizing: boolean
}

export interface EnrollmentInfo {
  id: string
  enrollmentStatus: EnrollmentStatusEnum
  identifiableSiteUser?: IdentifiableSiteUser | null
  enrollmentDateTime: Date
  isCheckedIn?: boolean
  spotNumber?: number | null
  isBookedForFree?: boolean | null
  hasStats?: boolean | null
}

interface IdentifiableSiteUser {
  id: string
  identifiableUser: IdentifiableUser
}

interface IdentifiableUser {
  id?: string
  user?: User
}

interface User {
  email: string
  firstName: string
  lastName: string
  leaderboardUsername?: string
}
