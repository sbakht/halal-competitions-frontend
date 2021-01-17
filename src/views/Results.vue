<template>
  <div>
    <header class="bg-white shadow-sm">
      <div
        class="flex justify-between max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8"
      >
        <h1 class="text-lg leading-6 font-semibold text-gray-900">Results</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <competitions-tabs></competitions-tabs>
        <template v-if="showResults">
          <div v-for="(loggers, week) in loggersGroupedByWeek" :key="week">
            <leaderboard-competition
              v-if="week != $store.state.week"
              :week="week"
              :loggers="loggers"
            ></leaderboard-competition>
          </div>
        </template>
        <div v-else>
          No data has been collected yet. Check back next week for the first
          weeks results!
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import CompetitionsTabs from "../components/competitions.tabs.vue";
import LeaderboardCompetition from "../components/leaderboard.competition.vue";
import { groupBy } from "../utils";

export default {
  components: { LeaderboardCompetition, CompetitionsTabs },
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