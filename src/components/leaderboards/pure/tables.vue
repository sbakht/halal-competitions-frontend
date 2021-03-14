<template>
  <div class="">
    <div v-for="tracker in data" :key="tracker.title">
      <leaderboard-table :data="tracker"></leaderboard-table>
    </div>
  </div>
</template>

<script>
import LeaderboardTable from "./table.vue";

export default {
  components: {
    LeaderboardTable,
  },
  props: ["data"],
};
</script>