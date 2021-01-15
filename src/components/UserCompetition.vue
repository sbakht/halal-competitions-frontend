<template>
  <div class="container">
    <div class="title">{{ competition.title }} - total: {{ total }}</div>
    <div v-for="counter in competition.counters" :key="counter.id">
      <clicker-button
        :counter="counter"
        @increment="increment"
      ></clicker-button>
    </div>
  </div>
</template>

<script>
import ClickerButton from "./ClickerButton.vue";
import { find } from "../utils";

export default {
  components: { ClickerButton },
  name: "UserCompetition",
  props: {
    competition: Object,
    week: String,
  },
  methods: {
    increment(logger) {
      logger.count++;
    },
  },
  computed: {
    total() {
      const isForCounter = (logger) => logger.counter === this.counter._id;
      const loggers = this.$store.getters.currentLoggers;
      const totals = this.competition.counters.map((counter) => {
        const { count } = find(
          (logger) => logger.counter === counter._id,
          loggers,
          { count: 0 }
        );
        return count;
      });
      return totals.reduce((a, b) => a + b, 0);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 25px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin: 12px;
}
</style>