<template>
  <div class="container">
    <div class="title">{{ title }}</div>
    <ul v-if="hasWinner">
      <li v-for="(winner, i) in winners" :key="winner.id">
        {{ i + 1 }}. {{ winner.displayName }} - {{ winner.count }}
      </li>
    </ul>
    <div class="no-winner" v-else>No one won</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    loggers: Array,
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    winners() {
      const copy = this.loggers.slice().sort((a, b) => {
        return a.count >= b.count ? a : b;
      });
      const top = copy.slice(0, 3);

      return top.map((logger) => {
        const user = this.users.find((user) => user._id === logger.user) || {};
        return {
          id: user._id,
          displayName: user.displayName,
          count: logger.count,
        };
      });
    },
    hasWinner() {
      return (
        this.loggers.length && this.loggers.find((logger) => logger.count > 0)
      );
    },
  },
};
</script>

<style scoped>
.container {
  padding: 16px;
  border: 1px solid gray;
}

ul {
  list-style: none;
}

.no-winner {
  font-style: italic;
  color: #333;
  font-size: 13px;
}
</style>