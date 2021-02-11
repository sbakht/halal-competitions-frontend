<template>
  <div>
    <page-heading title="Dashboard"></page-heading>
    <main>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <competitions-tabs></competitions-tabs>
        <dashboard-competition
          :competition="competition"
        ></dashboard-competition>
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
  computed: {
    competition() {
      return this.$store.getters.activeCompetition;
    },
  },
  mounted() {
    this.$store.dispatch("loadDashboard");
  },
};
</script>

<style scoped>
</style>
