/** An unsigned admin JWT carrying `roles`, enough for jwt-decode (the signature is never checked). */
export function adminToken(roles: string[]): string {
  const encode = (value: object) =>
    btoa(JSON.stringify(value)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_')

  const payload = {
    exp: Math.floor(Date.now() / 1000) + 3600,
    roles,
    adminSites: [],
    username: 'admin@example.com'
  }

  return `${encode({ alg: 'none', typ: 'JWT' })}.${encode(payload)}.signature`
}
