<template>
  <div>
    <page-heading title="Results"></page-heading>
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