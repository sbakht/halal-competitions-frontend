<template>
  <div class="flex space-x-4">
    <button
      @click="$emit('change', 1)"
      class="rounded-lg py-1 px-2"
      :class="{ 'bg-gray-200': count === 1 }"
    >
      +1 
    </button>
    <button
      @click="$emit('change', 5)"
      class="rounded-lg py-1 px-2"
      :class="{ 'bg-gray-200': count === 5 }"
    >
      +5 
    </button>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style>
</style>