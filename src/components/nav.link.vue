<template>
  <router-link
    :to="to"
    class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
    >{{ name }}</router-link
  >
</template>

<script>
export default {
  props: ["to", "name"],
};
</script>

<style scoped>
</style>
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
<style scoped>
.router-link-exact-active {
  @apply bg-gray-900 text-white;
}
</style>