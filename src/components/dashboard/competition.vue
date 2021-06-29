<template>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
    <IncrementButton
      v-for="logger in loggers"
      :logger="logger"
      @increment="increment"
      :key="logger.id"
    ></IncrementButton>
  </dl>
</template>

<script>
import IncrementButton from "./IncrementButton.vue";

export default {
  components: { IncrementButton },
  props: ["loggers"],
  methods: {
    increment(logger) {
      logger.count++;
    },
  },
};
</script>