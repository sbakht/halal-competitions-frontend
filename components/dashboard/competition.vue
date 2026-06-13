<template>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3" v-if="!carousel">
    <IncrementButton
      v-for="logger in loggers"
      :logger="logger"
      :key="logger.id"
    ></IncrementButton>
  </dl>

  <IncrementCarousel class="mt-5" v-else :data="loggers" />
</template>

<script setup>
import IncrementButton from './IncrementButton.vue'
import IncrementCarousel from './IncrementCarousel.vue'

defineProps(['loggers', 'carousel'])
</script>
