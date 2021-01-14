<template>
  <div class="container">
    <div class="title">{{ competition.title }} - total: {{ total }}</div>
    <div v-for="counter in competition.counters" :key="counter.id">
      <clicker-button :counter="counter"></clicker-button>
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
  computed: {
    total() {
      const isForCounter = (logger) => logger.counter === this.counter._id;
      const totals = this.competition.counters.map((counter) => {
        return this.$store.getters.currentLoggers.find(
          (logger) => logger.counter === counter._id
        ).count;
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