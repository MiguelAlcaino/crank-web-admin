import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'

import { defineConfig, loadEnv, type ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

// https://vitejs.dev/config/
export default ({ mode }: Pick<ConfigEnv, 'mode'>) => {
  const env = loadEnv(mode, process.cwd(), '')
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
    build: {
      lib: {
        entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        name: 'crank-web-admin',
        fileName: 'crank-web-admin',
        // Vite 5+ names the extracted CSS after the package (crank-web-admin.css). Keep the
        // `dist/style.css` path that package.json exports and crank-payments imports.
        cssFileName: 'style'
      },
      rollupOptions: {}
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://crank-payments.crank.local',
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: ''
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}
