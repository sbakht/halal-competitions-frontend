<template>
  <div class="about">
    <template v-if="showResults">
      <div v-for="(loggers, week) in loggersGroupedByWeek" :key="week">
        <template v-if="week != $store.state.week">
          <weekly-leaderboard
            :week="week"
            :loggers="loggers"
          ></weekly-leaderboard>
        </template>
      </div>
    </template>
    <div v-else>
      No data has been collected yet. Check back next week for the first weeks
      results!
    </div>
  </div>
</template>

<script>
import WeeklyLeaderboard from "../components/WeeklyLeaderboard.vue";
import { groupBy } from "../utils";

export default {
  components: { WeeklyLeaderboard },
  computed: {
    loggersGroupedByWeek() {
      const loggers = this.$store.state.allLoggers;
      const grouped = groupBy(loggers, "week");
      Object.keys(grouped).map((key) => {
        const obj = groupBy(grouped[key], "counter");
        grouped[key] = obj;
      });
      return grouped;
    },
    showResults() {
      const keys = Object.keys(this.loggersGroupedByWeek);
      return (
        keys.length >= 2 ||
        (keys.length === 1 && keys[0] !== this.$store.state.week)
      );
    },
  },
  mounted() {
    this.$store.dispatch("loadResults");
  },
};
</script>