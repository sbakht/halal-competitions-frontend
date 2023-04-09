<template>
  <div class="flex space-x-3">
    <button
      @click="carouselMode = true"
      class="rounded-lg p-1"
      :class="{ 'bg-gray-200': carouselMode === true }"
    >
      <svg
        class="w-6 h-6"
        fill="fill-current"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        ></path>
      </svg>
    </button>
    <button
      @click="carouselMode = false"
      class="rounded-lg p-1"
      :class="{ 'bg-gray-200': carouselMode === false }"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    carouselMode: {
      get() {
        return this.$store.state.Logger.carouselMode;
      },
      set(val) {
        this.$store.commit("Logger/SET_CAROUSEL_MODE", val);
      },
    },
  },
};
</script>

<style>
</style>