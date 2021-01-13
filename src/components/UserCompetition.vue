<template>
  <div class="container">
    <div class="title">{{ competition.title }}</div>
    <div v-for="counter in competition.counters" :key="counter.id">
      <clicker-button :clicker="counter" />
    </div>
  </div>
</template>

<script>
import ClickerButton from "./ClickerButton.vue";
export default {
  components: { ClickerButton },
  name: "UserCompetition",
  props: {
    competition: Object,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 25px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin: 12px;
}
</style>