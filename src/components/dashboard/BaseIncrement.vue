<template>
  <div class="px-4 py-5 sm:p-6">
    <dt class="text-sm font-medium text-gray-500 truncate">
      <div v-if="showEnglish">{{ data.title }}</div>
      <div class="arabic text-lg mt-1" v-if="showArabic">
        {{ data.arabic }}
      </div>
    </dt>
    <dd class="mt-1 text-3xl font-semibold text-gray-900">
      {{ data.count }}
      <span class="text-gray-300 text-2xl" v-if="data.target">
        ({{ data.target }})</span
      >
    </dd>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  computed: {
    language() {
      return this.$store.state.Logger.language;
    },
    showEnglish() {
      return this.language.includes("english") || !this.data.arabic;
    },
    showArabic() {
      return this.language.includes("arabic") || !this.data.title;
    },
  },
};
</script>

<style scoped>
</style>