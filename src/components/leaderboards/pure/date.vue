<template>
  <div class="relative mt-8">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-300 border-none"></div>
    </div>
    <div class="relative flex justify-center">
      <span class="px-3 bg-white text-lg font-medium text-gray-900"
        >Week of {{ start.format() }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["start", "end"],
};
</script>