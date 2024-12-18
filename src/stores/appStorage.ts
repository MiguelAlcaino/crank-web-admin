import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { SiteEnum } from '@/modules/shared/interfaces'

dayjs.Ls.en.weekStart = 1

export const appStore = defineStore({
  id: 'appStore',
  state: () => ({
    site:
      localStorage.getItem('site') != null
        ? (localStorage.getItem('site') as SiteEnum)
        : SiteEnum.Dubai
  }),
  actions: {
    setSite(site: SiteEnum) {
      localStorage.setItem('site', site)
      this.site = site
    }
  }
})
