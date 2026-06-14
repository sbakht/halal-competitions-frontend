<template>
  <div class="increment-carousel" :style="{ height }">
    <IncrementSlide
      class="item"
      v-for="item in data"
      :key="item.title"
      :logger="item"
    />
  </div>
</template>

<script setup lang="ts">
import IncrementSlide from './IncrementSlide.vue'
import type { ActiveLogger } from '@/types/competition'

defineProps<{
  data: ActiveLogger[]
}>()

const height = ref('0')

onMounted(() => {
  height.value = `${window.innerHeight - 64 - 32 - 24 - 120}px`
})
</script>

<style scoped>
.increment-carousel {
  height: 100%;
  overflow-y: scroll;
  scroll-snap-type: mandatory;
  scroll-snap-points-y: repeat(3rem);
  scroll-snap-type: y mandatory;
}

.item {
  scroll-snap-align: start;
}
</style>
