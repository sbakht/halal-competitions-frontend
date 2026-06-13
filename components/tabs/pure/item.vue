<template>
  <button
    @click="onClick"
    class="border-transparent text-gray-500 hover:text-gray-700 flex-grow py-4 px-1 text-center border-b-2 font-medium text-sm focus:outline-none"
    :class="{ 'border-indigo-500 text-indigo-600': isActive }"
  >
    {{ name }}
  </button>
</template>

<script>
export default {
  props: ["id", "name", "isActive"],
  methods: {
    onClick() {
      this.$emit("change", this.id);
    },
  },
};
</script>