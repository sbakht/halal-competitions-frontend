<template>
  <div>
    <Nav></Nav>
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/page.nav";
export default {
  components: { Nav },
};
</script>