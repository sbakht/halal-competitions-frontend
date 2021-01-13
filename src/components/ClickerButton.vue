<template>
  <button>
    {{ clicker.title }}
  </button>
</template>

<script>
export default {
  name: "UserCompetition",
  props: {
    clicker: Object,
  },
};
</script>

<style scoped>
button {
  margin: 12px;
  padding: 12px;
  cursor: pointer;
}
</style>