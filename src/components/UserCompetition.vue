<template>
  <div class="container">
    <div class="title">{{ competition.title }}</div>
    <div v-for="counter in competition.counters" :key="counter.id">
      <clicker-button
        :counter="counter"
        :logger="weeklyLogger(counter)"
        @increment="increment"
      ></clicker-button>
    </div>
  </div>
</template>

<script>
import ClickerButton from "./ClickerButton.vue";
export default {
  components: { ClickerButton },
  name: "UserCompetition",
  props: {
    competition: Object,
    week: Number,
  },
  methods: {
    weeklyLogger(counter) {
      return counter.loggers.find((logger) => logger.week === this.week);
    },
    increment(logger) {
      logger.count++;
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