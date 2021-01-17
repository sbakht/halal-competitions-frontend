<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-300"></div>
    </div>
    <div class="relative flex justify-center">
      <span class="px-3 bg-white text-lg font-medium text-gray-900">{{
        formatted
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    week: String,
  },
  computed: {
    formatted() {
      const s = this.week.split("");
      return `${s[0]}${s[1]}/${s[2]}${s[3]}/${s[4]}${s[5]}${s[6]}${s[7]}`;
    },
  },
};
</script>