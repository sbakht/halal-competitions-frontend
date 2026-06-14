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

<script setup lang="ts">
import PageHeading from '@/components/helpers/page.heading.vue'
import Loader from '@/components/helpers/loader.vue'
import BaseTable from '@/components/dashboard/BaseTable.vue'
import { competitionKeys, type CounterId } from '@/data'

definePageMeta({ middleware: 'auth' })

interface StatsRow {
  name: string
  count: number
  avg: number
  avgPerDay: number
}

function sort(scores: StatsRow[]) {
  scores.sort((s1, s2) => (s1.count >= s2.count ? -1 : 1))
}

const loggerStore = useLoggerStore()

const loggers = computed(() => loggerStore.allLoggers)
const loaded = computed(() => loggerStore.loadedStats)

const totals = computed(() => {
  const keys = Object.keys(competitionKeys) as CounterId[]
  const result: Partial<Record<CounterId, number>> = {}
  keys.forEach((key) => {
    loggers.value.forEach((data) => {
      const currentVal = result[key] || 0
      result[key] = (data[key] || 0) + currentVal
    })
  })
  return result
})

const totalsArray = computed(() => {
  const rows = Object.keys(totals.value).map((key) => {
    const counterId = key as CounterId
    const count = totals.value[counterId] ?? 0
    return {
      name: competitionKeys[counterId].title,
      count,
      avg: Math.trunc(count / loggers.value.length),
      avgPerDay: Math.trunc(count / (loggers.value.length * 7)),
    }
  })
  sort(rows)
  return rows
})

onMounted(() => {
  loggerStore.loadStats()
})
</script>

<style scoped>
</style>
