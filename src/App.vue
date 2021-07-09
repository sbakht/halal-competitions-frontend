<template>
  <div class="antialiased">
    <TheNav />
    <router-view />
  </div>
</template>

<script>
import TheNav from "@/components/nav/TheNav";

export default {
  components: { TheNav },
};
</script>