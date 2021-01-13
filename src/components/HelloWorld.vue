<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-for="competition in competitions" :key="competition.id">
      <user-competition :competition="competition" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserCompetition from "./UserCompetition.vue";

export default {
  components: { UserCompetition },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      competitions: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3001/api/competitions").then((response) => {
      this.competitions = response.data;
    });
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
