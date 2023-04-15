import About from '../components/About.vue';

<template>
  <div>
    <div class="text-black bg-img bg-cover">
      <div class="bg-black bg-opacity-70 flex justify-center">
        <div class="max-w-7xl mx-auto text-white py-24">
          <div class="my-6">
            <div class="arabic text-8xl text-center">فَٱسۡتَبِقُواْ ٱلۡخَيۡرَٰتِۚ</div>
            <p class="text-gray-400 font-semibold mt-4 ml- text-center text-2xl">
              (So race to all that is good)
            </p>
            <form class="mt-16 flex justify-center">
              <router-link to="/register" tag="button">
                <button
                  type="button"
                  class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Start Competing
                </button>
              </router-link>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-50">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div
          class="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px"
        >
          <div
            class="rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
          >
            <div>
              <span
                class="rounded-lg inline-flex p-3 bg-teal-50 text-teal-700 ring-4 ring-white"
              >
                <!-- Heroicon name: outline/clock -->
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </span>
            </div>
            <div class="mt-8">
              <h3 class="text-lg font-medium">
                <a href="#" class="focus:outline-none">
                  <!-- Extend touch target to entire panel -->
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  Tasbih Competition
                </a>
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                We have included 'Subhan Allahi wa bihamdihi' weekly because of the sheer
                power of that Zikr! (please refer to Sahih al-Bukhari 6405)
              </p>
            </div>
          </div>

          <div
            class="sm:rounded-tr-lg relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
          >
            <div>
              <span
                class="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white"
              >
                <!-- Heroicon name: outline/badge-check -->
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
              </span>
            </div>
            <div class="mt-8">
              <h3 class="text-lg font-medium">
                <a href="#" class="focus:outline-none">
                  <!-- Extend touch target to entire panel -->
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  Mindful Minutes Competition
                </a>
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                Compete in reading Quran, listening to Quran, and watching lectures.
              </p>
            </div>
          </div>

          <div
            class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
          >
            <div>
              <span
                class="rounded-lg inline-flex p-3 bg-light-blue-50 text-light-blue-700 ring-4 ring-white"
              >
                <!-- Heroicon name: outline/users -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>
            </div>
            <div class="mt-8">
              <h3 class="text-lg font-medium">
                <a href="#" class="focus:outline-none">
                  <!-- Extend touch target to entire panel -->
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  Sadaqah (Charity) Competition
                </a>
              </h3>
              <p class="mt-2 text-sm text-gray-500">Compete in helping out others</p>
            </div>
          </div>

          <div
            class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
          >
            <div>
              <span
                class="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-700 ring-4 ring-white"
              >
                <!-- Heroicon name: outline/cash -->
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </span>
            </div>
            <div class="mt-8">
              <h3 class="text-lg font-medium">
                <a href="#" class="focus:outline-none">
                  <!-- Extend touch target to entire panel -->
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  Fitness Competition
                </a>
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                A strong believer is better and is more lovable to Allah than a weak
                believer, and there is good in everyone,--- [Sahih Muslim 2664]
              </p>
            </div>
          </div>
        </div>
        <div class="mt-12">
          <About />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import About from "../components/About.vue";
</script>

<style>
.bg-img {
  background-image: url("https://images.unsplash.com/photo-1590720478291-aaabf8d53c49?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1490&q=80");
}

@font-face {
  font-family: "uthmani-hafs";
  src: url("../assets/Uthmani-Hafs.woff2") format("woff2"),
    url("../assets/Uthmani-Hafs.woff") format("woff");
}

.arabic {
  font-family: "uthmani-hafs";
}
</style>
