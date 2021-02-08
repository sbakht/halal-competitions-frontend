<template>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
    <template v-for="logger in loggers">
      <dashboard-competition-increment
        :logger="logger"
        @increment="increment"
        :key="logger.id"
      ></dashboard-competition-increment>
    </template>
  </dl>
</template>

<script>
import { find } from "../utils";
import DashboardCompetitionIncrement from "./dashboard.competition.increment.vue";

export default {
  components: { DashboardCompetitionIncrement },
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
    loggers() {
      return this.$store.getters.activeLoggers;
    },
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