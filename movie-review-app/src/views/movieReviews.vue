<template>
  <div
    class="min-h-screen px-6 pt-12 pb-24 max-w-4xl mx-auto text-white overflow-y-auto"
  >
    <h2 class="text-2xl font-bold font-sans truncate mb-10 text-white">
      All Reviews for:
      <span class="inline">{{ movie?.Title || "this movie" }}</span>
    </h2>

    <div v-if="loadingPublic" class="text-gray-300">Loading reviews...</div>

    <div v-else-if="publicReviews.length === 0" class="text-gray-400">
      No reviews yet for this movie.
    </div>

    <div
      v-else
      v-for="review in publicReviews"
      :key="review._id ?? review.reviewText ?? Math.random().toString()"
      class="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 shadow"
    >
      <p class="text-sm text-gray-400 mb-2">@{{ review.username || "anon" }}</p>
      <StarRating :modelValue="review.rating" :readOnly="true" class="mb-2" />
      <p class="text-base text-gray-200">{{ review.reviewText }}</p>
      <hr class="mt-4 border-white/20" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMovie } from "../modules/movies/useMovie";
import { usePublicReviews } from "../modules/review/useReview";
import StarRating from "../components/starRating.vue";

// Props
const props = defineProps<{ movieId: string }>();
const movieId = props.movieId;

const { movie, fetchMovie } = useMovie();
const { publicReviews, fetchPublicReviews, loadingPublic } =
  usePublicReviews(movieId);

const showAllReviews = ref(true);

// Load movie and reviews
onMounted(async () => {
  await fetchMovie(movieId);
  await fetchPublicReviews();
});
</script>
