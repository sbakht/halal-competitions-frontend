<template>
  <fieldset>
    <div>
      <legend class="text-base font-medium text-gray-900">
        {{ staticData.title }}
      </legend>
      <p class="text-sm text-gray-500">
        {{ staticData.subtitle }}
      </p>
    </div>
    <div class="mt-4 space-y-4">
      <div
        v-for="choice in staticData.choices"
        :key="choice.value"
        class="flex items-center"
      >
        <input
          v-model="count"
          :value="choice.value"
          :id="choice.value"
          :name="staticData.title"
          type="radio"
          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
        />
        <label
          for="push-everything"
          class="ml-3 block text-sm font-medium text-gray-700"
        >
          {{ choice.name }}
        </label>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
import StaticData from '../../static/Settings'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const staticData = StaticData.incrementCount

const count = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>
