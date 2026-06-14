<template>
  <button
    @click="onClick"
    class="border-transparent text-gray-500 hover:text-gray-700 flex-grow py-4 px-1 text-center border-b-2 font-medium text-sm focus:outline-none"
    :class="{ 'border-indigo-500 text-indigo-600': isActive }"
  >
    {{ name }}
  </button>
</template>

<script setup lang="ts">
import type { CompetitionId } from '@/types/competition'

const props = defineProps<{
  id: CompetitionId
  name: string
  isActive: boolean
}>()

const emit = defineEmits<{
  change: [id: CompetitionId]
}>()

function onClick() {
  emit('change', props.id)
}
</script>