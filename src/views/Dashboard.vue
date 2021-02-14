<template>
  <div>
    <page-heading title="Dashboard"></page-heading>
    <main class="mb-16">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <competitions-tabs></competitions-tabs>
        <dashboard-competition
          v-if="loaded"
          :loggers="loggers"
        ></dashboard-competition>
        <loader v-else></loader>
      </div>
    </main>
  </div>
</template>

<script>
import PageHeading from "../components/page.heading.vue";
import CompetitionsTabs from "../components/competitions.tabs.vue";
import DashboardCompetition from "../components/dashboard.competition.vue";
import Loader from "../components/loader.vue";

export default {
  name: "dashboard",
  components: { PageHeading, CompetitionsTabs, DashboardCompetition, Loader },
  name: "HelloWorld",
  mounted() {
    this.$store.dispatch("loadDashboard");
  },
  computed: {
    loggers() {
      return this.$store.getters.activeLoggers;
    },
    loaded() {
      return this.$store.state.Logger.loadedDashboard;
    },
  },
};
</script>

<style scoped>
</style>
