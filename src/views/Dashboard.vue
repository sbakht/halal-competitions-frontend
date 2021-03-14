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
import PageHeading from "../components/helpers/page.heading.vue";
import CompetitionsTabs from "../components/tabs/tabs.vue";
import DashboardCompetition from "../components/dashboard/competition.vue";
import Loader from "../components/helpers/loader.vue";
import { mapGetters } from "vuex";

export default {
  components: { PageHeading, CompetitionsTabs, DashboardCompetition, Loader },
  mounted() {
    this.$store.dispatch("loadDashboard");
  },
  computed: {
    ...mapGetters({
      loggers: "activeLoggers",
      loaded: "isDashboardLoaded",
    }),
  },
};
</script>

<style scoped>
</style>
