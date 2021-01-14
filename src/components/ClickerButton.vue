<template>
  <button @click="onClick">
    <div>{{ counter.title }}</div>
    <div>{{ logger.count }}</div>
    <div>{{ logger._id }}</div>
  </button>
</template>

<script>
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
      return this.$store.getters.currentLoggers.find(
        (logger) => logger.counter === this.counter._id
      );
    },
  },
  methods: {
    onClick() {
      clearTimeout(this.timeout);
      this.$emit("increment", this.logger);
      this.timeout = setTimeout(() => {
        this.$emit("saveToDatabase");
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