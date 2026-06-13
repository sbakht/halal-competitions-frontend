import { defineStore } from 'pinia'

export const useNavStore = defineStore('nav', {
  state: () => ({
    isMobileMenuOpen: false,
  }),
  actions: {
    openMobileMenu() {
      this.isMobileMenuOpen = true
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },
  },
})
