<template>
  <div>
    <page-heading title="Dashboard">
      <ViewModeIcons v-model="isCarouselMode" />
    </page-heading>
    <main>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <alert-username></alert-username>
        <alert-updates></alert-updates>
        <competitions-tabs></competitions-tabs>
        <dashboard-competition
          v-if="loaded"
          :loggers="loggers"
          :carousel="isCarouselMode"
        ></dashboard-competition>
        <loader v-else></loader>
      </div>
    </main>
  </div>
</template>

<script>
import PageHeading from "@/components/helpers/page.heading.vue";
import CompetitionsTabs from "@/components/tabs/tabs.vue";
import DashboardCompetition from "@/components/dashboard/competition.vue";
import Loader from "@/components/helpers/loader.vue";
import { mapGetters } from "vuex";
import AlertUsername from "@/components/utils/alert-username.vue";
import AlertUpdates from "@/components/utils/alert-updates.vue";
import ViewModeIcons from "@/components/dashboard/ViewModeIcons.vue";

export default {
  components: {
    PageHeading,
    CompetitionsTabs,
    DashboardCompetition,
    Loader,
    AlertUsername,
    AlertUpdates,
    ViewModeIcons,
  },
  data() {
    return {
      isCarouselMode: false,
    };
  },
  mounted() {
    this.$store.dispatch("Logger/loadDashboard");
  },
  computed: {
    ...mapGetters("Logger", {
      loggers: "activeLoggers",
      loaded: "isDashboardLoaded",
    }),
  },
};
</script>

<style scoped>
</style>
