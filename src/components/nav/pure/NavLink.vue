<template>
  <router-link
    :to="to"
    class="
      px-3
      py-2
      text-sm
      font-medium
      text-gray-300
      rounded-md
      hover:bg-gray-700
      hover:text-white
    "
    >{{ name }}
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.router-link-exact-active {
  @apply bg-gray-900 text-white;
}
</style>