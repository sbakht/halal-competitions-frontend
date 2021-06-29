<template>
  <LogicIncremental>
    <button
      slot-scope="{ incrementFn }"
      class="
        bg-gray-50
        overflow-hidden
        shadow-md
        rounded-lg
        focus:outline-none
        focus:ring-1 focus:ring-offset-1 focus:ring-indigo-200
      "
      @click="incrementFn(logger)"
    >
      <BaseIncrement :data="logger" />
    </button>
  </LogicIncremental>
</template>

<script>
const DEBOUNCE_RATE = 3000;
import LogicIncremental from "./LogicIncremental.vue";
import BaseIncrement from "./BaseIncrement.vue";

export default {
  components: { LogicIncremental, BaseIncrement },
  data() {
    return {
      timeout: null,
    };
  },
  props: {
    logger: Object,
  },
  methods: {
    onClick() {
      clearTimeout(this.timeout);
      this.$store.dispatch("increment", this.logger);
      this.timeout = setTimeout(() => {
        this.$store.dispatch("save");
      }, DEBOUNCE_RATE);
    },
  },
};
</script>

<style scoped>
button {
  margin: 12px;
  padding: 12px;
  cursor: pointer;
}
</style>