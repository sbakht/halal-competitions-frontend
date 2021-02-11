<template>
  <div>
    <page-heading title="Dashboard"></page-heading>
    <main>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <competitions-tabs></competitions-tabs>
        <dashboard-competition
          v-if="loaded"
          :loggers="loggers"
        ></dashboard-competition>
        <div class="flex justify-center items-center" v-else>
          <img src="../assets/loader.gif" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import PageHeading from "../components/page.heading.vue";
import CompetitionsTabs from "../components/competitions.tabs.vue";
import DashboardCompetition from "../components/dashboard.competition.vue";

export default {
  name: "dashboard",
  components: { PageHeading, CompetitionsTabs, DashboardCompetition },
  name: "HelloWorld",
  mounted() {
    this.$store.dispatch("loadDashboard");
  },
  computed: {
    loggers() {
      return this.$store.getters.activeLoggers;
    },
    loaded() {
      return Object.keys(this.loggers).length > 0;
    },
  },
};
</script>

<style scoped>
</style>
