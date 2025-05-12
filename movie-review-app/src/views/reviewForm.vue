<template>
  <div class="mt-16 flex justify-center px-4">
    <div
      class="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white"
    >
      <h2 class="text-3xl font-bold mb-6">
        {{ isEditing ? "Edit Your Review" : "Write a Review" }}
      </h2>

      <StarRating v-model="rating" class="mb-6" />

      <textarea
        v-model="reviewText"
        placeholder="Write your thoughts about this movie..."
        class="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
        rows="5"
      />

      <button
        @click="submitReview"
        class="mt-4 px-6 py-2 border-2 border-purple-500 text-purple-500 rounded-md font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white"
      >
        {{ isEditing ? "Update Review" : "Post Review" }}
      </button>

      <p
        v-if="submissionStatus"
        class="mt-4 text-sm font-semibold"
        :class="{
          'text-green-400': submissionStatus.includes('successfully'),
          'text-red-400': submissionStatus.includes('Failed'),
        }"
      >
        {{ submissionStatus }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useReview } from "../modules/review/useReview";

const props = defineProps<{ imdbID: string }>();
const {
  reviewText,
  rating,
  isEditing,
  fetchUserReview,
  submitReview,
  submissionStatus,
} = useReview(props.imdbID);

onMounted(() => {
  fetchUserReview();
});
</script>
