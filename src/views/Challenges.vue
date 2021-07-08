<template>
  <div>
    <page-heading title="Weekly Team Challenges"></page-heading>
    <main>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-gray-700 italic mb-6">These are the weekly challenges. Everyone's points go towards these goals, so let's work together to achieve them!</p>
          <loader v-if="!loaded"></loader>
          <template v-else>
            <div v-for="(challenge, i) in challenges" :key="challenge.id">
              <ProgressBar
                :class="{ 'mt-12': i > 0 }"
                :label="competitionKeys[challenge.id].title"
                :current="totalCum[challenge.id]"
                :total="challenge.goal"
              />
            </div>
            <!-- <leaderboard-date
            v-if="showResults"
            :start="startDate"
          ></leaderboard-date>
          <leaderboard-tables
            v-if="showResults"
            :data="orderedByScore"
          ></leaderboard-tables>
          <div v-else class="text-lg mt-16">
            No data has been collected yet. Check back next week for the
            results!
          </div> -->
          </template>
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import PageHeading from "../components/helpers/page.heading.vue";
import LeaderboardTables from "../components/leaderboards/pure/tables";
import Loader from "../components/helpers/loader.vue";
import LeaderboardDate from "../components/leaderboards/pure/date";
import ProgressBar from "@/components/ProgressBar";
import { competitionKeys } from "../data";

export default {
  components: {
    PageHeading,
    LeaderboardTables,
    Loader,
    LeaderboardDate,
    ProgressBar,
  },
  data() {
    return {
      challenges: [
        { id: "dhikr_1", goal: 2000 },
        { id: "dhikr_2", goal: 2000 },
        { id: "dhikr_3", goal: 2000 },
      ],
    };
  },
  computed: {
    competitionKeys() {
      return competitionKeys;
    },
    startDate() {
      return this.$store.getters.orderedByScore.start;
    },
    orderedByScore() {
      return this.$store.getters.orderedByScore.data;
    },
    totalCum() {
      return this.$store.getters.totalCum.data;
    },
    showResults() {
      return this.orderedByScore.length > 0;
    },
    loaded() {
      return this.$store.state.Result.loadedResults;
    },
  },
  mounted() {
    this.$store.dispatch("loadChallenges");
  },
};
</script>