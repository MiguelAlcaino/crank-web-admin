export interface CalendarListClass {
  id: string
  name: string
  startWithNoTimeZone: Date
  maxCapacity: number
  totalBooked: number
  totalUnderMaintenanceSpots: number
  showAsDisabled: boolean
  instructorName: string
}
