<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="rounded-md bg-blue-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <InformationCircleIcon
          class="h-5 w-5 text-blue-400"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3 flex-1 md:flex md:justify-between">
        <slot></slot>
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button
              type="button"
              @click="dismiss"
              class="
                inline-flex
                rounded-md
                p-1.5
                text-red-500
                hover:bg-blue-100
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-offset-blue-50
                focus:ring-blue-600
              "
            >
              <span class="sr-only">Dismiss</span>
              <XIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { InformationCircleIcon, XIcon } from "@heroicons/vue/solid";

export default {
  components: {
    InformationCircleIcon,
    XIcon,
  },
  methods: {
    dismiss() {
      this.$emit("dismiss");
    },
  },
};
</script>