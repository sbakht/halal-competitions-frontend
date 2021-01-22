<template>
  <button
    class="bg-gray-50 overflow-hidden shadow-md rounded-lg focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-200"
    @click="onClick"
  >
    <div class="px-4 py-5 sm:p-6">
      <dt class="text-sm font-medium text-gray-500 truncate">
        {{ counter.title }}
      </dt>
      <dd class="mt-1 text-3xl font-semibold text-gray-900">
        {{ logger.count }}
      </dd>
    </div>
  </button>
</template>

<script>
import { find } from "../utils";
const DEBOUNCE_RATE = 3000;

export default {
  data() {
    return {
      timeout: null,
    };
  },
  props: {
    counter: {
      type: Object,
      validator: (val) => {
        return val.title.length > 0;
      },
    },
  },
  computed: {
    logger() {
      return find(this.isForCounter, this.$store.getters.currentLoggers, {});
    },
  },
  methods: {
    isForCounter(logger) {
      return logger.counter === this.counter._id;
    },
    onClick() {
      clearTimeout(this.timeout);
      this.$store.dispatch("increment", this.logger);
      this.timeout = setTimeout(() => {
        this.$store.dispatch("save", this.logger);
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