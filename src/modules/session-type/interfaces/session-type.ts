import type { MindbodySessionType } from './mindbody-session-type'

export interface SessionType {
  id: string
  name: string
  active: boolean
  bannerImagePath?: string | null
  color?: string | null
  position?: number | null
  mindbodySessionTypes: MindbodySessionType[]
}
