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

<script setup>
import PageHeading from '@/components/helpers/page.heading.vue'
import Loader from '@/components/helpers/loader.vue'
import BaseTable from '@/components/dashboard/BaseTable.vue'
import { competitionKeys } from '@/data'

definePageMeta({ middleware: 'auth' })

function sort(scores) {
  scores.sort((s1, s2) => {
    return s1.count >= s2.count ? -1 : 1
  })
}

const loggerStore = useLoggerStore()

const loggers = computed(() => loggerStore.allLoggers)
const loaded = computed(() => loggerStore.loadedStats)

const totals = computed(() => {
  const keys = Object.keys(competitionKeys)
  const result = {}
  keys.forEach((key) => {
    loggers.value.map((data) => {
      const currentVal = result[key] || 0
      result[key] = (data[key] || 0) + currentVal
    })
  })
  return result
})

const totalsArray = computed(() => {
  const rows = Object.keys(totals.value).map((key) => {
    return {
      name: competitionKeys[key].title,
      count: totals.value[key],
      avg: Math.trunc(totals.value[key] / loggers.value.length),
      avgPerDay: Math.trunc(totals.value[key] / (loggers.value.length * 7)),
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
