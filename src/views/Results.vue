<template>
  <div>
    <page-heading title="Results"></page-heading>
    <main class="mb-16">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <competitions-tabs></competitions-tabs>
        <leaderboard-competition-date
          :start="startDate"
        ></leaderboard-competition-date>
        <loader v-if="!loaded"></loader>
        <template v-else>
          <leaderboard-tables
            v-if="showResults"
            :data="orderedByScore"
          ></leaderboard-tables>
          <div v-else class="text-lg mt-16">
            No data has been collected yet. Check back next week for the
            results!
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import PageHeading from "../components/page.heading.vue";
import CompetitionsTabs from "../components/competitions.tabs.vue";
import LeaderboardTables from "../components/leaderboards/leaderboard.tables.vue";
import Loader from "../components/loader/loader.vue";
import LeaderboardCompetitionDate from "../components/leaderboards/leaderboard.competition.date.vue";

export default {
  components: {
    PageHeading,
    CompetitionsTabs,
    LeaderboardTables,
    Loader,
    LeaderboardCompetitionDate,
  },
  computed: {
    startDate() {
      return this.$store.getters.orderedByScore.start;
    },
    orderedByScore() {
      return this.$store.getters.orderedByScore.data;
    },
    showResults() {
      return this.orderedByScore.length > 0;
    },
    loaded() {
      return this.$store.state.Result.loadedResults;
    },
  },
  mounted() {
    this.$store.dispatch("loadResults");
  },
};
</script>