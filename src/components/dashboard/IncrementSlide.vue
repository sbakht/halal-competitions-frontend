<template>
  <button
    class="
      bg-gray-50
      rounded-lg
      focus:outline-none
      focus:ring-1 focus:ring-offset-1 focus:ring-indigo-200
      w-full
    "
    @click="increment(logger)"
  >
    <BaseIncrement :data="logger" />
  </button>
</template>

<script>
import BaseIncrement from "./BaseIncrement.vue";
import isIncrement from "@/composables/isIncrement";

export default {
  components: { BaseIncrement },
  props: {
    logger: Object,
  },
  setup() {
    const { increment } = isIncrement();
    return { increment };
  },
};
</script>

<style scoped>
button {
  margin-top: 12px;
  padding: 12px;
  cursor: pointer;
  height: 100%;
}
</style>