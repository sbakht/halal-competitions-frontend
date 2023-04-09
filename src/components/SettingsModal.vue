<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog
      as="div"
      static
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="$emit('update:modelValue', false)"
      :open="modelValue"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block
          sm:p-0
        "
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="
              inline-block
              align-bottom
              bg-white
              rounded-lg
              px-4
              pt-5
              pb-5
              text-left
              overflow-hidden
              shadow-xl
              transform
              transition-all
              sm:my-8
              sm:align-middle
              sm:max-w-sm
              sm:w-full
              sm:p-6
            "
          >
            <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                class="
                  bg-white
                  rounded-md
                  text-gray-400
                  hover:text-gray-500
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
                @click="$emit('update:modelValue', false)"
              >
                <span class="sr-only">Close</span>
                <XIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div>
              <DialogTitle
                as="h3"
                class="text-lg leading-6 font-medium text-gray-900"
              >
                Settings
              </DialogTitle>
            </div>

            <div class="mt-5 sm:mt-6 space-y-5">
              <IncrementCount v-model="incrementCount" />
              <LanguageSetting v-model="language" />
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import IncrementCount from "@/components/dashboard/IncrementCount.vue";
import LanguageSetting from "@/components/dashboard/LanguageSetting.vue";
import { XIcon } from "@heroicons/vue/outline";

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    IncrementCount,
    LanguageSetting,
    XIcon,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    incrementCount: {
      get() {
        return this.$store.state.Logger.incrementCount;
      },
      set(val) {
        this.$store.commit("Logger/SET_INCREMENT_COUNT", val);
      },
    },
    language: {
      get() {
        return this.$store.state.Logger.language;
      },
      set(val) {
        this.$store.commit("Logger/SET_LANGUAGE", val);
      },
    },
  },
};
</script>