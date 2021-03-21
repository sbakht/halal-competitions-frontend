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
          :value="competition.id"
          :key="competition.id"
          :selected="competition.id === activeTabId"
        >
          {{ competition.title }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex" aria-label="Tabs">
          <tab-item
            v-for="competition in competitions"
            :id="competition.id"
            :name="competition.title"
            :key="competition.id"
            :isActive="competition.id === activeTabId"
            @change="onChange"
          ></tab-item>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import TabItem from "./pure/item.vue";
import { mapGetters } from "vuex";
export default {
  components: { TabItem },
  computed: {
    ...mapGetters({
      competitions: "competitions",
      activeTabId: "Tab/activeTabId",
    }),
  },
  methods: {
    onChange(e) {
      let id;
      if (e.currentTarget) {
        id = e.currentTarget.value;
      } else {
        id = e;
      }
      this.$store.dispatch("Tab/setActiveTab", id);
    },
  },
};
</script>