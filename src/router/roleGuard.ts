import type { RouteMeta } from 'vue-router'

import type { Role } from '@/utils/userRoles'

/**
 * Whether an admin holding `roles` may open a route, given its matched records: every record's
 * `meta.requiresRole`, when set, must be among them. The roles are the raw ones of the token, so a
 * standalone role such as ROLE_DEVELOPER is not implied by ROLE_SUPER_ADMIN.
 */
export function hasRequiredRoles(
  matched: readonly { meta: RouteMeta }[],
  roles: readonly Role[]
): boolean {
  return matched.every(
    (record) => record.meta.requiresRole === undefined || roles.includes(record.meta.requiresRole)
  )
}
