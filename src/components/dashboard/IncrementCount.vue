<template>
  <!-- <div class="flex space-x-4">
    <button
      @click="$emit('change', 1)"
      class="rounded-lg py-1 px-2"
      :class="{ 'bg-gray-200': count === 1 }"
    >
      +1 
    </button>
    <button
      @click="$emit('change', 5)"
      class="rounded-lg py-1 px-2"
      :class="{ 'bg-gray-200': count === 5 }"
    >
      +5 
    </button>
  </div> -->
  <fieldset>
    <div>
      <legend class="text-base font-medium text-gray-900">Increment</legend>
      <p class="text-sm text-gray-500">
        Number of points for each button press
      </p>
    </div>
    <div class="mt-4 space-y-4">
      <div
        v-for="choice in options.choices"
        :key="choice.value"
        class="flex items-center"
      >
        <input
          v-model="count"
          :value="choice.value"
          :id="choice.value"
          name="increment-count"
          type="radio"
          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
        />
        <label
          for="push-everything"
          class="ml-3 block text-sm font-medium text-gray-700"
        >
          {{ choice.name }}
        </label>
      </div>
    </div>
  </fieldset>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      count: this.modelValue,
    };
  },
  watch: {
    count(val) {
      this.$emit("update:modelValue", val);
    },
  },
};
</script>

<style>
</style>