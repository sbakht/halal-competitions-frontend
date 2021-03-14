<template>
  <div class="antialiased">
    <Nav :isLoggedIn="isLoggedIn" :isMobileMenuOpen="isMobileMenuOpen"></Nav>
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/nav/nav";
import { mapGetters } from "vuex";
export default {
  components: { Nav },
  computed: {
    ...mapGetters(["isLoggedIn", "isMobileMenuOpen"]),
  },
};
</script>