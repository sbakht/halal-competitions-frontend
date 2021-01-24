<template>
  <div class="mt-14" v-if="hasWinner">
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      {{ title }}
    </h3>

    <dl
      class="mt-5 grid grid-cols-3 rounded-lg bg-white overflow-hidden shadow divide-gray-200 divide-x"
    >
      <Card
        v-for="winner in winners"
        :key="winner.id"
        :title="winner.username"
        :number="winner.count"
      >
      </Card>
    </dl>
  </div>
</template>

<script>
import Card from "./Card";
export default {
  components: { Card },
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
        return a.count >= b.count ? -1 : 1;
      });
      const top = copy.slice(0, 3);

      return top.map((logger) => {
        const user = this.users.find((user) => user._id === logger.user) || {};
        return {
          id: user._id,
          username: user.username,
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