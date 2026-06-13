<template>
  <!--
      Mobile menu, toggle classes based on menu state.

      Open: "block", closed: "hidden"
    -->
  <div class="md:hidden" :class="{ hidden: !isOpen }">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
      <NuxtLink
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
        >Home</NuxtLink
      >
      <NuxtLink
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
        >Dashboard</NuxtLink
      >
      <NuxtLink
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
        >Your Statistics</NuxtLink
      >

      <NuxtLink
        to="/about"
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
        >About</NuxtLink
      >
      <!-- <router-link
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
      > -->
      <NuxtLink
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
        >Results</NuxtLink
      >
    </div>
    <div class="pb-3 border-t border-gray-700">
      <div class="px-2 mt-3 space-y-1 mb-1">
        <NuxtLink
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
          >Login</NuxtLink
        >
        <NuxtLink
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
          >Register</NuxtLink
        >
        <NuxtLink
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
          >Log out</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isOpen", "isLoggedIn"],
};
</script>

<style scoped>
.router-link-exact-active,
.router-link-active {
  @apply bg-gray-900 text-white;
}
</style>