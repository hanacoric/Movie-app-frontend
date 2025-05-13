<template>
  <div class="px-6 py-12 max-w-4xl mx-auto text-white">
    <h1
      class="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 drop-shadow-md"
    >
      Your Reviews
    </h1>

    <div v-if="reviews.length === 0" class="text-gray-400">
      You haven’t reviewed any movies yet.
    </div>

    <div
      v-for="review in reviews"
      :key="review._id"
      class="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 shadow"
    >
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2"
      >
        <h2 class="text-xl font-semibold font-sans truncate mb-2 text-white">
          {{ review.movieTitle }}
        </h2>

        <StarRating :modelValue="review.rating" :readOnly="true" />
      </div>
      <p class="text-base text-gray-300 mb-4">{{ review.reviewText }}</p>
      <button
        @click="deleteReview(review._id)"
        class="px-4 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-600 hover:text-white"
      >
        Delete Review
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useUserReviews } from "../modules/review/useReview";
import StarRating from "../components/starRating.vue";

const { reviews, fetchUserReviews, deleteReview } = useUserReviews();

onMounted(fetchUserReviews);
</script>
