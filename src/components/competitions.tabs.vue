<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select
        id="tabs"
        name="tabs"
        class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        @change="onChange"
      >
        <option
          v-for="competition in competitions"
          :value="competition._id"
          :key="competition._id"
        >
          {{ competition.title }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex" aria-label="Tabs">
          <competitions-tabs-item
            v-for="competition in competitions"
            :id="competition._id"
            :name="competition.title"
            :key="competition._id"
            :isActive="competition._id === activeID"
            @change="onChange"
          ></competitions-tabs-item>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import CompetitionsTabsItem from "./competitions.tabs.item.vue";
export default {
  components: { CompetitionsTabsItem },
  computed: {
    competitions() {
      return this.$store.state.competitions;
    },
    activeID() {
      return this.$store.state.activeID;
    },
  },
  methods: {
    onChange(e) {
      let id;
      if (e.currentTarget) {
        id = e.currentTarget.value;
      } else {
        id = e;
      }
      this.$store.dispatch("setActiveTab", id);
    },
  },
};
</script>