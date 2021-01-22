<template>
  <header class="bg-white shadow-sm">
    <div
      class="flex justify-between max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8"
    >
      <h1 class="text-lg leading-6 font-semibold text-gray-900">{{ title }}</h1>
    </div>
  </header>
</template>

<script>
export default {
  props: ["title"],
};
</script>