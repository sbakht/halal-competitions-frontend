<template>
  <div class="hello">
    <div v-for="competition in competitions" :key="competition.id">
      <user-competition
        :competition="competition"
        :week="$store.state.week"
      ></user-competition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserCompetition from "./UserCompetition.vue";

export default {
  components: { UserCompetition },
  name: "HelloWorld",
  computed: {
    competitions() {
      return this.$store.state.competitions;
    },
  },
  methods: {},
  mounted() {
    this.$store.dispatch("loadDashboard");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
