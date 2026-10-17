import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'

import { defineConfig, loadEnv, type ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { BACKEND_PROFILES, type BackendProfile } from './src/config/features'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

// Standalone app build config (no library mode)
// Used by: npm run build:app, Dockerfile
export default ({ mode }: Pick<ConfigEnv, 'mode'>) => {
  const env = loadEnv(mode, process.cwd(), '')

  // See src/config/features.ts. Fail the build on a typo rather than silently building for
  // the default profile.
  const backendProfile = env.VITE_BACKEND_PROFILE
  if (backendProfile && !BACKEND_PROFILES.includes(backendProfile as BackendProfile)) {
    throw new Error(
      `Unknown VITE_BACKEND_PROFILE "${backendProfile}", expected one of: ${BACKEND_PROFILES.join(
        ', '
      )}`
    )
  }

  return defineConfig({
    define: {
      // Only NODE_ENV. Defining `process.env` as the whole loadEnv() result inlines every
      // environment variable of the build machine wherever a dependency reads `process.env`
      // (Vite 5+ no longer special-cases it, and lib mode leaves Vue's NODE_ENV checks in place).
      // The app reads its own settings through import.meta.env.VITE_*.
      'process.env': { NODE_ENV: env.NODE_ENV },
      // As a literal too, so `process.env.NODE_ENV !== 'production'` branches are dropped.
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
      __APP_VERSION__: JSON.stringify(pkg.version)
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}
