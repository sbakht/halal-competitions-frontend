<template>
  <div class="md:max-w-md mt-8">
    <div class="text-gray-900 font-semibold">{{ data.title }}</div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="flex flex-col mt-3">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- Odd row -->
                <tr
                  v-for="(user, i) in top(data.users)"
                  :key="user.username"
                  class="bg-white"
                  :class="{ 'bg-gray-50': i % 2 === 1 }"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ user.username }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.count }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    top(arr) {
      return arr;
      // return arr.slice(0, 5);
    },
  },
};
</script>