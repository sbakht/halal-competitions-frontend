<template>
  <!--
      Mobile menu, toggle classes based on menu state.

      Open: "block", closed: "hidden"
    -->
  <div class="md:hidden" :class="{ hidden: !isOpen }">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
      <router-link
        to="/"
        class="
          block
          px-3
          py-2
          text-base
          font-medium
          text-gray-300
          rounded-md
          hover:bg-gray-700
          hover:text-white
        "
        :class="{ hidden: isLoggedIn }"
        >Home</router-link
      >
      <router-link
        to="/dashboard"
        class="
          block
          px-3
          py-2
          text-base
          font-medium
          text-gray-300
          rounded-md
          hover:bg-gray-700
          hover:text-white
        "
        :class="{ hidden: !isLoggedIn }"
        >Dashboard</router-link
      >
      <router-link
        to="/stats"
        class="
          block
          px-3
          py-2
          text-base
          font-medium
          text-gray-300
          rounded-md
          hover:bg-gray-700
          hover:text-white
        "
        :class="{ hidden: !isLoggedIn }"
        >Your Statistics</router-link
      >

      <router-link
        to="/challenges"
        class="
          block
          px-3
          py-2
          text-base
          font-medium
          text-gray-300
          rounded-md
          hover:bg-gray-700
          hover:text-white
        "
        >Challenges</router-link
      >
      <router-link
        to="/results"
        class="
          block
          px-3
          py-2
          text-base
          font-medium
          text-gray-300
          rounded-md
          hover:bg-gray-700
          hover:text-white
        "
        >Results</router-link
      >
    </div>
    <div class="pb-3 border-t border-gray-700">
      <div class="px-2 mt-3 space-y-1 mb-1">
        <router-link
          to="/login"
          class="
            block
            px-3
            py-2
            text-base
            font-medium
            text-gray-300
            rounded-md
            hover:bg-gray-700
            hover:text-white
          "
          :class="{ hidden: isLoggedIn }"
          >Login</router-link
        >
        <router-link
          to="/register"
          class="
            block
            px-3
            py-2
            text-base
            font-medium
            text-gray-300
            rounded-md
            hover:bg-gray-700
            hover:text-white
          "
          :class="{ hidden: isLoggedIn }"
          >Register</router-link
        >
        <router-link
          to="/logout"
          class="
            block
            px-3
            py-2
            text-base
            font-medium
            text-gray-300
            rounded-md
            hover:bg-gray-700
            hover:text-white
          "
          :class="{ hidden: !isLoggedIn }"
          >Log out</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import NavLink from "./link.vue";
export default {
  components: { NavLink },
  props: ["isOpen", "isLoggedIn"],
};
</script>

<style scoped>
.router-link-exact-active {
  @apply bg-gray-900 text-white;
}
</style>