import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { BACKEND_PROFILES, type BackendProfile } from './src/config/features'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

// Standalone app build config (no library mode)
// Used by: npm run build:app, Dockerfile
export default ({ mode }) => {
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
      'process.env': env,
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
