<template>
  <div>
    <page-heading title="Results"></page-heading>
    <main>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <template v-if="showResults">
          <competitions-tabs></competitions-tabs>
          <div v-for="week in loggersGroupedByWeek" :key="week.week">
            <leaderboard-competition
              v-if="week.week != $store.state.week"
              :week="week.week"
              :loggers="week.loggers"
            ></leaderboard-competition>
          </div>
        </template>
        <div v-else class="text-lg text-center">
          No data has been collected yet. Check back next week for the first
          weeks results!
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import PageHeading from "../components/page.heading.vue";
import CompetitionsTabs from "../components/competitions.tabs.vue";
import LeaderboardCompetition from "../components/leaderboard.competition.vue";

export default {
  components: { PageHeading, LeaderboardCompetition, CompetitionsTabs },
  computed: {
    loggersGroupedByWeek() {
      return this.$store.getters.loggersByWeek;
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