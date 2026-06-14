<template>
  <fieldset>
    <div class="flex items-start justify-between gap-4">
      <div>
        <legend class="text-base font-medium text-gray-900">
          {{ staticData.title }}
        </legend>
        <p class="text-sm text-gray-500">
          {{ staticData.subtitle }}
        </p>
      </div>
      <span class="text-base font-semibold text-indigo-600 tabular-nums">
        + {{ count }}
      </span>
    </div>
    <div class="mt-4">
      <input
        v-model.number="count"
        :min="staticData.min"
        :max="staticData.max"
        :name="staticData.title"
        type="range"
        :aria-valuemin="staticData.min"
        :aria-valuemax="staticData.max"
        :aria-valuenow="count"
        class="
          w-full
          h-2
          bg-gray-200
          rounded-lg
          appearance-none
          cursor-pointer
          accent-indigo-600
          focus:outline-none
          focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        "
      >
      <div class="mt-1 flex justify-between text-xs text-gray-500">
        <span>{{ staticData.min }}</span>
        <span>{{ staticData.max }}</span>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import StaticData from '@/static/Settings'

const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const staticData = StaticData.incrementCount

const count = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
</script>
