import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return defineConfig({
    define: {
      'process.env': env,
      __APP_VERSION__: JSON.stringify(pkg.version)
    },
    plugins: [vue()],
    build: {
      lib: {
        entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        name: 'crank-web-admin',
        fileName: 'crank-web-admin'
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
