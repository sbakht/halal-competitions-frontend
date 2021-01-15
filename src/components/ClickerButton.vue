<template>
  <button @click="onClick">
    <div>{{ counter.title }}</div>
    <div>{{ logger.count }}</div>
    <div>{{ logger._id }}</div>
  </button>
</template>

<script>
import { find } from "../utils";
const DEBOUNCE_RATE = 3000;

export default {
  name: "UserCompetition",
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