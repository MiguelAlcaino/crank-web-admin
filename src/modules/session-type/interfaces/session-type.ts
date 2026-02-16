import type { MindbodySessionType } from './mindbody-session-type'

export interface SessionType {
  id: string
  name: string
  active: boolean
  bannerImagePath?: string | null
  mindbodySessionTypes: MindbodySessionType[]
}
