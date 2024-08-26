import type { CalendarListClass } from './calendar-list-class.interface'

export interface CalendarListWeekDay {
  date: Date
  classes: CalendarListClass[]
}
