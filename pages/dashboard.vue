<template>
  <div>
    <SettingsModal v-model="settingsModalOpen" />
    <page-heading title="Dashboard">
      <div class="flex space-x-6">
        <ViewModeIcons />
        <button class="rounded-lg p-1" @click="settingsModalOpen = true">
          <CogIcon class="cursor-pointer h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </page-heading>
    <main>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <TheAlerts />
        <competitions-tabs></competitions-tabs>
        <dashboard-competition
          v-if="loaded"
          :loggers="loggers"
          :carousel="carouselMode"
        ></dashboard-competition>
        <loader v-else></loader>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import PageHeading from '@/components/helpers/page.heading.vue'
import CompetitionsTabs from '@/components/tabs/tabs.vue'
import DashboardCompetition from '@/components/dashboard/competition.vue'
import Loader from '@/components/helpers/loader.vue'
import ViewModeIcons from '@/components/dashboard/ViewModeIcons.vue'
import TheAlerts from '@/components/alerts/TheAlerts.vue'
import { CogIcon } from '@heroicons/vue/outline'
import SettingsModal from '@/components/SettingsModal.vue'

definePageMeta({ middleware: 'auth' })

const loggerStore = useLoggerStore()

const settingsModalOpen = ref(false)

const loggers = computed(() => loggerStore.activeLoggers)
const loaded = computed(() => loggerStore.isDashboardLoaded)
const carouselMode = computed(() => loggerStore.carouselMode)

onMounted(() => {
  loggerStore.loadDashboard()
})
</script>

<style scoped>
</style>
