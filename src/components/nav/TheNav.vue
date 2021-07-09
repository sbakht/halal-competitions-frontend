<template>
  <nav class="bg-gray-800">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="text-white font-bold tracking-wide">
              <span>Halal</span>
              <span class="text-green-400">Competitions</span>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="flex items-baseline ml-10 space-x-4">
              <NavLink
                :class="{ hidden: isLoggedIn }"
                to="/"
                name="Home"
              ></NavLink>
              <NavLink
                :class="{ hidden: !isLoggedIn }"
                to="/dashboard"
                name="Dashboard"
              ></NavLink>
              <NavLink
                :class="{ hidden: !isLoggedIn }"
                to="/stats"
                name="Your Statistics"
              ></NavLink>
              <NavLink to="/challenges" name="Challenges"></NavLink>
              <NavLink to="/results" name="Results"></NavLink>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="flex items-center ml-4 md:ml-6">
            <NavLink
              :class="{ hidden: isLoggedIn }"
              to="/login"
              name="Login"
            ></NavLink>
            <NavLink
              :class="{ hidden: isLoggedIn }"
              to="/register"
              name="Register"
            ></NavLink>
            <NavLink
              :class="{ hidden: !isLoggedIn }"
              to="/logout"
              name="Log out"
            ></NavLink>
          </div>
        </div>
        <div class="flex -mr-2 md:hidden">
          <!-- Mobile menu button -->
          <button
            class="
              inline-flex
              items-center
              justify-center
              p-2
              text-gray-400
              bg-gray-800
              rounded-md
              hover:text-white
              hover:bg-gray-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-offset-gray-800
              focus:ring-white
            "
            @click="toggleMobile"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon
              v-if="!isMobileMenuOpen"
              class="block h-6 w-6"
              aria-hidden="true"
            />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
    <nav-mobile-menu
      :isLoggedIn="isLoggedIn"
      :isOpen="isMobileMenuOpen"
    ></nav-mobile-menu>
  </nav>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import NavLink from "./pure/NavLink.vue";
import NavMobileMenu from "./pure/mobilemenu.vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";

export default {
  components: { NavLink, NavMobileMenu, MenuIcon, XIcon },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState("Nav", {
      isMobileMenuOpen: (state) => state.isMobileMenuOpen,
    }),
  },
  methods: {
    toggleMobile() {
      if (this.isMobileMenuOpen) {
        this.$store.dispatch("Nav/closeMobileMenu");
      } else {
        this.$store.dispatch("Nav/openMobileMenu");
      }
    },
  },
};
</script>