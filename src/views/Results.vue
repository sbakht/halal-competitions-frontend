<template>
  <div>
    <page-heading title="Results"></page-heading>
    <main class="mb-16">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <competitions-tabs></competitions-tabs>
        <leaderboard-date :start="startDate"></leaderboard-date>
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
import PageHeading from "../components/helpers/page.heading.vue";
import CompetitionsTabs from "../components/tabs/tabs.vue";
import LeaderboardTables from "../components/leaderboards/pure/tables";
import Loader from "../components/helpers/loader.vue";
import LeaderboardDate from "../components/leaderboards/pure/date";

export default {
  components: {
    PageHeading,
    CompetitionsTabs,
    LeaderboardTables,
    Loader,
    LeaderboardDate,
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