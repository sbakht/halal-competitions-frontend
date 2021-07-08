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

<script>
import IncrementSlide from "./IncrementSlide.vue";

export default {
  name: "MyComponent",
  components: { IncrementSlide },
  props: ["data"],
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    this.height = window.innerHeight - 64 - 32 - 24 - 120 + "px";
  },
};
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