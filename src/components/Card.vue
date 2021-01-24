<template>
  <div class="px-4 py-5 sm:p-6">
    <dt class="text-base font-normal text-gray-900 truncate">{{ title }}</dt>
    <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
      <div
        class="flex items-baseline text-3xl font-semibold"
        :class="{ 'text-gray-500': secondary, 'text-indigo-600': !secondary }"
      >
        {{ number }}
      </div>
    </dd>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    number: Number,
    secondary: {
      type: Boolean,
    },
  },
};
</script>