<template>
  <div v-if="show" class="rounded-md bg-blue-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <!-- Heroicon name: solid/information-circle -->
        <svg
          class="h-5 w-5 text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="ml-3 flex-1 md:flex md:justify-between">
        <div>
          <p class="font-bold text-blue-700">Whats New</p>
          <div class="mt-3 text-gray-700">
            <ol>
              <li class="mt-2">
                1.
                <a class="text-blue-700 underline" href="/stats"
                  >Your statistics</a
                >
                page to see your cumulative and average scores
              </li>
              <li class="mt-2">
                2. Single Select View (click the icon on the right above)
              </li>
              <li class="mt-2">
                3. Check out our new
                <a class="text-blue-700 underline" href="/challenges"
                  >Group Challenges</a
                >
                page to some extra motivation!
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            @click="dismiss"
            class="
              inline-flex
              bg-blue-50
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
            <!-- Heroicon name: solid/x -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: !localStorage.getItem("hide_alert_updates"),
    };
  },
  methods: {
    dismiss() {
      localStorage.setItem("hide_alert_updates", true);
      this.show = false;
    },
  },
};
</script>

<style>
</style>