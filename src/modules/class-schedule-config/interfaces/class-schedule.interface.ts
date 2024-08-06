import type { RoomLayout } from './room-layout.interface'

export interface ClassSchedule {
  id: string
  type: string
  instructorName: string
  dayOfWeek: string
  startWithNoTimeZone: Date
  endWithNoTimeZone: Date
  roomLayout: RoomLayout
  capacity: number
}
