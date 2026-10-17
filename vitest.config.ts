import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

// vite.config.ts exports a function of the mode; call it so its `@` alias applies to tests too.
export default mergeConfig(
  viteConfig({ mode: 'test' }),
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true
    }
  })
)
