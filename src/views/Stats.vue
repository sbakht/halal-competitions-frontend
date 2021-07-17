<template>
  <div>
    <page-heading title="Your Statistics"> </page-heading>
    <main class="mb-16">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div v-if="loaded">
          <BaseTable :data="totalsArray" />
        </div>
        <loader v-else></loader>
      </div>
    </main>
  </div>
</template>

<script>
import PageHeading from "@/components/helpers/page.heading.vue";
import Loader from "@/components/helpers/loader.vue";
import { mapState } from "vuex";
import BaseTable from "@/components/dashboard/BaseTable.vue";
import { competitionKeys } from "../data";

function sort(scores) {
  scores.sort((s1, s2) => {
    return s1.count >= s2.count ? -1 : 1;
  });
}
export default {
  components: {
    PageHeading,
    Loader,
    BaseTable,
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("Logger/loadStats");
  },
  computed: {
    ...mapState("Logger", {
      loggers: (state) => state.allLoggers,
      loaded: (state) => state.loadedStats,
    }),
    totals() {
      const keys = Object.keys(competitionKeys);
      const result = {};
      keys.forEach((key) => {
        this.loggers.map((data) => {
          const currentVal = result[key] || 0;
          result[key] = data[key] + currentVal;
        });
      });
      return result;
    },
    totalsArray() {
      const totals = Object.keys(this.totals).map((key) => {
        return {
          name: competitionKeys[key].title,
          count: this.totals[key],
          avg: Math.trunc(this.totals[key] / this.loggers.length),
          avgPerDay: Math.trunc(this.totals[key] / (this.loggers.length * 7)),
        };
      });
      sort(totals);
      return totals;
    },
  },
};
</script>

<style scoped>
</style>
