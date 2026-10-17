import { gql } from '@apollo/client'

/*
 * Operations that only exist on the main backend profile. They live in their own file so the
 * KAN-231 codegen (codegen.ts) can leave them out. Only call them behind isFeatureAvailable() from
 * src/config/backendProfile.ts.
 */

/** Re-reads every class schedule of a site from Mindbody. ROLE_SUPER_ADMIN only. */
export const SYNC_ALL_CLASS_SCHEDULES_MUTATION = gql`
  mutation syncAllClassSchedules($site: SiteEnum!) {
    syncAllClassSchedules(site: $site)
  }
`
