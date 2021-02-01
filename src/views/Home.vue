<template>
  <div>
    <div class="text-black bg-img bg-cover">
      <div class="bg-black bg-opacity-70 flex justify-center">
        <div class="max-w-7xl mx-auto text-white py-24">
          <div class="my-6">
            <div class="arabic text-8xl">فَٱسۡتَبِقُواْ ٱلۡخَيۡرَٰتِۚ</div>
            <p
              class="text-gray-400 font-semibold mt-4 ml- text-center text-2xl"
            >
              (So race to all that is good)
            </p>
            <form class="mt-16 flex justify-center">
              <router-link to="/register" tag="button">
                <button
                  type="button"
                  class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Enjoin the Good
                </button>
              </router-link>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="bg-gray-50 h-screen">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex font-bold pt-12">
          <div
            class="border-b-2 hover:border-indigo-600 cursor-pointer uppercase tracking-wide"
          >
            Design Tips
          </div>
          <div class="flex-grow border-b-2 pb-4">.</div>
          <a
            class="border-b-2 hover:border-indigo-600 cursor-pointer text-indigo-600 font-semibold"
            href="#"
            >View All</a
          >
        </div>

        <div class="flex flex-wrap justify-between -m-6">
          <div class="w-full md:w-1/2 lg:w-1/3 px-6 mt-10">
            <div class="bg-white rounded-lg shadow-md flex-col overflow-hidden">
              <div class="img img2 h-32 bg-cover"></div>
              <div class="p-6 flex flex-col justify-between flex-grow">
                <h3 class="font-bold text-lg">Think Outside The Database</h3>
                <div class="mt-4">
                  <a class="text-gray-600 text-sm" href="#">twitter.com</a>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/3 px-6 mt-10">
            <div
              class="bg-white rounded-lg shadow-md flex flex-col overflow-hidden"
            >
              <div class="img img2 h-32 bg-cover"></div>
              <div class="p-6 flex flex-col justify-between flex-grow">
                <h3 class="font-bold text-lg">Use Fewer Borders</h3>
                <div class="mt-4">
                  <a class="text-gray-600 text-sm" href="#">twitter.com</a>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/3 px-6 mt-10">
            <div
              class="bg-white rounded-lg shadow-md flex flex-col overflow-hidden"
            >
              <div class="img img2 h-32 bg-cover"></div>
              <div class="p-6 flex flex-col justify-between flex-grow">
                <h3 class="font-bold text-lg">Overlap Images To Add Depth</h3>
                <div class="mt-4">
                  <a class="text-gray-600 text-sm" href="#">twitter.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.bg-img {
  background-image: url("https://images.unsplash.com/photo-1590720478291-aaabf8d53c49?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1490&q=80");
}

.img1 {
  background-image: url("https://images.unsplash.com/photo-1593975151703-5b13a61f1c1d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80");
}

.img2 {
  background-image: url("https://images.unsplash.com/photo-1599577296270-6a1202302973?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
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