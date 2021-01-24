<template>
  <nav class="bg-gray-800">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img
              class="w-8 h-8"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
          </div>
          <div class="hidden md:block">
            <div class="flex items-baseline ml-10 space-x-4">
              <nav-link
                :class="{ hidden: isLoggedIn }"
                to="/"
                name="Home"
              ></nav-link>
              <nav-link
                :class="{ hidden: !isLoggedIn }"
                to="/dashboard"
                name="Dashboard"
              ></nav-link>
              <nav-link to="/results" name="Results"></nav-link>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="flex items-center ml-4 md:ml-6">
            <nav-link
              :class="{ hidden: isLoggedIn }"
              to="/login"
              name="Login"
            ></nav-link>
            <nav-link
              :class="{ hidden: isLoggedIn }"
              to="/register"
              name="Register"
            ></nav-link>
            <nav-link
              :class="{ hidden: !isLoggedIn }"
              to="/logout"
              name="Log out"
            ></nav-link>
          </div>
        </div>
        <div class="flex -mr-2 md:hidden">
          <!-- Mobile menu button -->
          <button
            class="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            @click="toggleMobile"
          >
            <span class="sr-only">Open main menu</span>
            <!--
              Heroicon name: menu

              Menu open: "hidden", Menu closed: "block"
            -->
            <svg
              class="block w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              :class="{ hidden: isMobileOpen }"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!--
              Heroicon name: x

              Menu open: "block", Menu closed: "hidden"
            -->
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              :class="{ hidden: !isMobileOpen }"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <nav-mobile-menu :isOpen="isMobileOpen"></nav-mobile-menu>
  </nav>
</template>

<script>
import NavLink from "./nav.link.vue";
import NavMobileMenu from "./nav.mobile.menu.vue";
export default {
  components: { NavLink, NavMobileMenu },
  methods: {
    toggleMobile() {
      if (this.isMobileOpen) {
        this.$store.dispatch("closeMobileMenu");
      } else {
        this.$store.dispatch("openMobileMenu");
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    isMobileOpen() {
      return this.$store.state.isMobileMenuOpen;
    },
  },
};
</script>