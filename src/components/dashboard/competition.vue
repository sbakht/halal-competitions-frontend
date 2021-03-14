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
import DashboardCompetitionIncrement from "./increment.vue";

export default {
  components: { DashboardCompetitionIncrement },
  props: ["loggers"],
  methods: {
    increment(logger) {
      logger.count++;
    },
  },
};
</script>