<template>
  <div>
    <page-heading title="Weekly Team Challenges"></page-heading>
    <main>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-gray-700 italic mb-6">
          These are the weekly challenges. Everyone's points go towards these
          goals, so let's work together to achieve them!
        </p>
        <loader v-if="!loaded"></loader>
        <template v-else>
          <div v-for="(challenge, i) in challenges" :key="challenge.id">
            <ProgressBar
              :class="{ 'mt-12': i > 0 }"
              :label="competitionKeys[challenge.id].title"
              :current="totalCum[challenge.id] ?? 0"
              :total="challenge.goal"
            />
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import PageHeading from '@/components/helpers/page.heading.vue'
import Loader from '@/components/helpers/loader.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { competitionKeys, type CounterId } from '@/data'

const challenges: { id: CounterId, goal: number }[] = [
  { id: 'dhikr_4', goal: 10000 },
  { id: 'dhikr_5', goal: 10000 },
  { id: 'fitness_1', goal: 500 },
  { id: 'mindful_2', goal: 120 },
]

const resultStore = useResultStore()

const totalCum = computed(() => resultStore.totalCum.data)
const loaded = computed(() => resultStore.loadedResults)

onMounted(() => {
  resultStore.loadChallenges()
})
</script>
