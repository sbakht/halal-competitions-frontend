<template>
  <div>
    <div class="relative pt-1">
      <div class="flex mb-2 items-center justify-between">
        <div>
          <span
            :class="`text-xl mb-3 font-semibold inline-block text-${color}-600`"
          >
            {{ label }}
            <span class="text-md font-normal">{{ current }} / {{ total }}</span>
          </span>
        </div>
        <div class="text-right">
          <span :class="`text-xs font-semibold inline-block text-${color}-600`">
            {{ parseInt(width) + "%" }}
          </span>
        </div>
      </div>
      <div
        :class="`overflow-hidden h-2 mb-4 text-xs flex rounded bg-${color}-200`"
      >
        <div
          :style="{ width }"
          :class="`
            shadow-none
            flex flex-col
            text-center
            whitespace-nowrap
            text-white
            justify-center
            bg-${color}-500`"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
const colors = ["blue", "red", "green", "indigo", "purple", "yellow", "pink"];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default {
  props: {
    current: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    width() {
      return (this.current / this.total) * 100 + "%";
    },
    color() {
      return colors[getRandomInt(colors.length)];
    },
  },
};
</script>

<style>
</style>