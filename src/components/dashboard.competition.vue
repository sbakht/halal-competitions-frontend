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
  },
};
</script>