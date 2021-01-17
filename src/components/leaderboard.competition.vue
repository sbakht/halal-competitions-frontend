<template>
  <div class="mt-16">
    <leaderboard-competition-date :week="week"></leaderboard-competition-date>
    <leaderboard-top
      v-for="counter in competition.counters"
      :key="counter.id"
      :title="counter.title"
      :loggers="loggers[counter._id] || []"
    >
    </leaderboard-top>
  </div>
</template>

<script>
import LeaderboardTop from "../components/leaderboard.top.vue";
import LeaderboardCompetitionDate from "../components/leaderboard.competition.date";
import { groupBy } from "../utils";

export default {
  components: { LeaderboardTop, LeaderboardCompetitionDate },
  props: {
    week: String,
    loggers: Object,
  },
  computed: {
    competition() {
      return (
        this.$store.state.competitions.find(
          (comp) => comp._id === this.$store.state.activeID
        ) || {}
      );
    },
  },
};
</script>