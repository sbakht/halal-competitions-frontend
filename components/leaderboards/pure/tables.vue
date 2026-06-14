<template>
  <div class="">
    <div v-for="tracker in data" :key="tracker.title">
      <leaderboard-table :data="tracker"></leaderboard-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import LeaderboardTable from './table.vue'

interface LeaderboardRow {
  title: string
  users: { username: string, count: number }[]
}

defineProps<{
  data: LeaderboardRow[]
}>()
</script>