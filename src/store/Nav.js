export default {
  namespaced: true,
  state: () => {
    return {
      isMobileMenuOpen: false
    }
  },
  mutations: {
    SET_MOBILE_MENU(state, data) {
      state.isMobileMenuOpen = data;
    }
  },
  actions: {
    openMobileMenu({ commit }) {
      commit("SET_MOBILE_MENU", true)
    },
    closeMobileMenu({ commit }) {
      commit("SET_MOBILE_MENU", false)
    }
  },
}