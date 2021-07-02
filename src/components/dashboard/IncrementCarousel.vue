<template>
  <div class="container">
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
};
</script>

<style scoped>
.container {
  max-height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: mandatory;
  scroll-snap-points-y: repeat(3rem);
  scroll-snap-type: y mandatory;
}

.item {
  scroll-snap-align: start;
}
</style>