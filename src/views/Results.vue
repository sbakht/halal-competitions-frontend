<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <div v-for="user in users" :key="user.userId">
      {{ user.displayName }}
    </div> -->
    <div v-for="(loggers, week) in formattedLoggers" :key="week">
      <div v-for="competition in competitions" :key="competition.id">
        <div>{{ competition.title }}</div>
        <div v-for="counter in competition.counters" :key="counter.id">
          {{ counter.title }}
          <div v-for="(win, i) in top3(loggers[counter._id])" :key="win._id">
            {{ i + 1 }}. {{ userById(win.user).displayName }} {{ win.count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function groupBy(arr, key) {
  const obj = {};
  try {
    arr.forEach((item) => {
      const val = item[key];
      if (!obj[val]) {
        obj[val] = [];
      }
      obj[val].push(item);
    });
    return obj;
  } catch (e) {
    console.log(e);
    debugger;
  }
}

export default {
  computed: {
    loggers() {
      return this.$store.state.allLoggers;
    },
    formattedLoggers() {
      if (!this.loggers.length) {
        return {};
      }
      const grouped = groupBy(this.loggers, "week");
      Object.keys(grouped).map((key) => {
        const obj = groupBy(grouped[key], "counter");
        grouped[key] = obj;
      });
      return grouped;
    },
    competitions() {
      return this.$store.state.competitions;
    },
    users() {
      const users = this.$store.getters.resultsByUsers;
      return users;
    },
  },
  methods: {
    top3(arr) {
      const copy = arr.slice().sort((a, b) => {
        return a.count >= b.count ? a : b;
      });
      return copy.slice(0, 3);
    },
    userById(id) {
      return this.users.find((user) => user.userId === id);
    },
  },
  mounted() {
    this.$store.dispatch("loadResults");
  },
};
</script>