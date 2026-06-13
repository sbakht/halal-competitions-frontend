<template>
  <div class="">
    <div v-for="tracker in data" :key="tracker.title">
      <leaderboard-table :data="tracker"></leaderboard-table>
    </div>
  </div>
</template>

<script setup>
import LeaderboardTable from './table.vue'

defineProps(['data'])
</script>