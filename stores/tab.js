import { defineStore } from 'pinia'
import LocalStorage from '../utils/LocalStorage'

export const useTabStore = defineStore('tab', {
  state: () => ({
    activeTabId: LocalStorage.activeTabId.get(),
  }),
  actions: {
    setActiveTab(id) {
      this.activeTabId = id
      LocalStorage.activeTabId.set(id)
    },
  },
})
