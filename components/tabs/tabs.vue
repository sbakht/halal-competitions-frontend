<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select
        id="tabs"
        name="tabs"
        class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        @change="onChange"
      >
        <option
          v-for="competition in competitions"
          :value="competition.id"
          :key="competition.id"
          :selected="competition.id === activeTabId"
        >
          {{ competition.title }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex" aria-label="Tabs">
          <tab-item
            v-for="competition in competitions"
            :id="competition.id"
            :name="competition.title"
            :key="competition.id"
            :isActive="competition.id === activeTabId"
            @change="onChange"
          ></tab-item>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TabItem from './pure/item.vue'
import { competitionsJSON } from '@/data'
import type { CompetitionId } from '@/types/competition'

const tabStore = useTabStore()

const competitions = competitionsJSON
const activeTabId = computed(() => tabStore.activeTabId)

function onChange(e: Event | CompetitionId) {
  let id: CompetitionId
  if (typeof e === 'string') {
    id = e
  } else {
    id = (e.currentTarget as HTMLSelectElement).value as CompetitionId
  }
  tabStore.setActiveTab(id)
}
</script>
