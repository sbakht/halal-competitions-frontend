<template>
  <div>
    <page-heading title="Results"></page-heading>
    <main class="mb-16">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <competitions-tabs></competitions-tabs>
        <loader v-if="!loaded"></loader>
        <template v-else>
          <leaderboard-date
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
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup>
import PageHeading from '@/components/helpers/page.heading.vue'
import CompetitionsTabs from '@/components/tabs/tabs.vue'
import LeaderboardTables from '@/components/leaderboards/pure/tables'
import Loader from '@/components/helpers/loader.vue'
import LeaderboardDate from '@/components/leaderboards/pure/date'

const resultStore = useResultStore()

const startDate = computed(() => resultStore.orderedByScore.start)
const orderedByScore = computed(() => resultStore.orderedByScore.data)
const showResults = computed(() => orderedByScore.value.length > 0)
const loaded = computed(() => resultStore.loadedResults)

onMounted(() => {
  resultStore.loadResults()
})
</script>
