<template>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3" v-if="!carousel">
    <IncrementButton
      v-for="logger in loggers"
      :logger="logger"
      @increment="increment"
      :key="logger.id"
    ></IncrementButton>
  </dl>

  <IncrementCarousel class="mt-5" v-else :data="loggers" />
  <!-- <carousel v-else :per-page="1">
    <Slide v-for="logger in loggers" :key="logger.id">
      <IncrementSlide :logger="logger" @increment="increment"></IncrementSlide>
    </Slide>
  </carousel> -->
</template>

<script>
import IncrementButton from "./IncrementButton.vue";
import IncrementCarousel from "./IncrementCarousel.vue";

export default {
  components: { IncrementButton, IncrementCarousel },
  props: ["loggers", "carousel"],
  methods: {
    increment(logger) {
      logger.count++;
    },
  },
};
</script>