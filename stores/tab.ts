import { defineStore } from 'pinia'
import { ref } from 'vue'
import LocalStorage from '@/utils/LocalStorage'
import type { CompetitionId } from '@/types/competition'

export const useTabStore = defineStore('tab', () => {
  const activeTabId = ref<CompetitionId>(LocalStorage.activeTabId.get())

  function setActiveTab(id: CompetitionId) {
    activeTabId.value = id
    LocalStorage.activeTabId.set(id)
  }

  return { activeTabId, setActiveTab }
})
