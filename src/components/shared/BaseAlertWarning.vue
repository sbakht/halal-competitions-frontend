<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="rounded-md bg-yellow-50 p-4 mb-5">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <slot></slot>
      </div>
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            @click="dismiss"
            class="
              inline-flex
              rounded-md
              p-1.5
              text-green-500
              hover:bg-green-100
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-offset-green-50
              focus:ring-green-600
            "
          >
            <span class="sr-only">Dismiss</span>
            <XIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ExclamationIcon, XIcon } from "@heroicons/vue/solid";

export default {
  components: {
    ExclamationIcon,
    XIcon,
  },
  methods: {
    dismiss() {
      this.$emit("dismiss");
    },
  },
};
</script>

<style>
</style>