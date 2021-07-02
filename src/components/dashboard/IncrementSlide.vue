<template>
  <LogicIncremental>
    <button
      slot-scope="{ incrementFn }"
      class="
        bg-gray-50
        rounded-lg
        focus:outline-none
        focus:ring-1 focus:ring-offset-1 focus:ring-indigo-200
        w-full
      "
      @click="incrementFn(logger)"
    >
      <BaseIncrement :data="logger" />
    </button>
  </LogicIncremental>
</template>

<script>
import LogicIncremental from "./LogicIncremental.vue";
import BaseIncrement from "./BaseIncrement.vue";

export default {
  components: { LogicIncremental, BaseIncrement },
  props: {
    logger: Object,
  },
};
</script>

<style scoped>
button {
  margin-top: 12px;
  padding: 12px;
  cursor: pointer;
  height: 100vh;
}
</style>