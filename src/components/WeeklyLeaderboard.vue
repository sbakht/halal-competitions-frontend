<template>
  <div class="about">
    <div>{{ format(week) }}</div>
    <div
      class="competition"
      v-for="competition in competitions"
      :key="competition.id"
    >
      <div>{{ competition.title }}</div>
      <div v-for="counter in competition.counters" :key="counter.id">
        <leaderboard
          :title="counter.title"
          :loggers="loggers[counter._id] || []"
        ></leaderboard>
      </div>
    </div>
  </div>
</template>

<script>
import Leaderboard from "../components/Leaderboard.vue";
import { groupBy } from "../utils";

export default {
  components: { Leaderboard },
  props: {
    week: String,
    loggers: Object,
  },
  computed: {
    competitions() {
      return this.$store.state.competitions;
    },
  },
  methods: {
    format(week) {
      const s = week.split("");
      return `${s[0]}${s[1]}/${s[2]}${s[3]}/${s[4]}${s[5]}${s[6]}${s[7]}`;
    },
  },
};
</script>

<style  scoped>
.competition {
  display: flex;
  border: 1px solid black;
  padding: 20px;
}
</style>