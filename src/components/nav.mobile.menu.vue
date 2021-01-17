<template>
  <!--
      Mobile menu, toggle classes based on menu state.

      Open: "block", closed: "hidden"
    -->
  <div class="hidden md:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
      <a
        href="#"
        class="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
        >Dashboard</a
      >

      <a
        href="#"
        class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >Team</a
      >

      <a
        href="#"
        class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >Projects</a
      >

      <a
        href="#"
        class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >Calendar</a
      >

      <a
        href="#"
        class="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >Reports</a
      >
    </div>
    <div class="pb-3 border-t border-gray-700">
      <div class="px-2 mt-3 space-y-1 mb-1">
        <nav-link to="signout" name="Sign out" class="text-base"></nav-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavLink from "./nav.link.vue";
export default {
  components: { NavLink },
};
</script>