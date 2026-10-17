import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark:
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      document.documentElement.setAttribute('data-bs-theme', this.isDark ? 'dark' : 'light')
    },
    initTheme() {
      document.documentElement.setAttribute('data-bs-theme', this.isDark ? 'dark' : 'light')
    }
  }
})
