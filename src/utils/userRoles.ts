export enum Role {
  ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN',
  ROLE_ADMIN_MANAGER = 'ROLE_ADMIN_MANAGER',
  ROLE_STAFF = 'ROLE_STAFF',
  ROLE_USER = 'ROLE_USER',
  ROLE_MINDBODY_USER = 'ROLE_MINDBODY_USER',
  ROLE_INSTRUCTOR = 'ROLE_INSTRUCTOR',
  /**
   * Developer tools (failed messages, incomplete feedbacks). Standalone: super admins do not
   * inherit it, so only admins granted it explicitly carry it in their token.
   */
  ROLE_DEVELOPER = 'ROLE_DEVELOPER'
}
