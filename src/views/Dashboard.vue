<template>
  <div>
    <SettingsModal v-model="settingsModalOpen" />
    <page-heading title="Dashboard">
      <div class="flex space-x-6">
      <ViewModeIcons v-model="isCarouselMode" />
      <button class="rounded-lg p-1" @click="settingsModalOpen = true">
        <CogIcon class="cursor-pointer h-6 w-6" aria-hidden="true" />
      </button>
      </div>
    </page-heading>
    <main>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <TheAlerts />
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
import ViewModeIcons from "@/components/dashboard/ViewModeIcons.vue";
import TheAlerts from "@/components/alerts/TheAlerts.vue";
import { CogIcon } from "@heroicons/vue/outline";
import SettingsModal from "@/components/SettingsModal.vue";

export default {
  components: {
    PageHeading,
    CompetitionsTabs,
    DashboardCompetition,
    Loader,
    ViewModeIcons,
    TheAlerts,
    CogIcon,
    SettingsModal,
  },
  data() {
    return {
      isCarouselMode: false,
      settingsModalOpen: false,
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
