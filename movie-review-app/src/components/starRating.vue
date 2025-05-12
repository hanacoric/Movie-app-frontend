<template>
  <div class="flex justify-start items-center space-x-2 mt-2 mb-6">
    <button
      v-for="i in 5"
      :key="i"
      @click="selectRating(i)"
      @mouseover="hover = i"
      @mouseleave="hover = 0"
      class="focus:outline-none"
      :class="{ 'cursor-pointer': !readOnly }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        :class="['w-8 h-8', isFilled(i) ? 'text-purple-500' : 'text-gray-500']"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1
            1 0 00.95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.367
            2.448a1 1 0 00-.364 1.118l1.287
            3.946c.3.921-.755 1.688-1.538
            1.118l-3.367-2.448a1 1 0 00-1.175
            0l-3.367 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.946a1
            1 0 00-.364-1.118L2.07 9.373c-.783-.57-.38-1.81.588-1.81h4.157a1
            1 0 00.95-.69l1.286-3.946z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

const props = defineProps<{
  modelValue: number;
  readOnly?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const hover = ref(0);

const selectRating = (value: number) => {
  if (!props.readOnly) emit("update:modelValue", value);
};

const isFilled = (i: number) => {
  return hover.value ? i <= hover.value : i <= props.modelValue;
};
</script>
