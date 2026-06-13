import { defineStore } from 'pinia'
import { ref } from 'vue'
import LocalStorage from '../utils/LocalStorage'

export const useTabStore = defineStore('tab', () => {
  const activeTabId = ref(LocalStorage.activeTabId.get())

  function setActiveTab(id) {
    activeTabId.value = id
    LocalStorage.activeTabId.set(id)
  }

  return { activeTabId, setActiveTab }
})
