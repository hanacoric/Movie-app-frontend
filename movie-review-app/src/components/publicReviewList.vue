<template>
  <div class="mt-12 px-6 max-w-4xl mx-auto text-white">
    <h2 class="text-2xl font-bold mb-6">All Reviews</h2>

    <div
      v-for="review in publicReviews"
      :key="review._id"
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
import api from "../services/api";
import StarRating from "./starRating.vue";

const props = defineProps<{ movieId: string }>();
const publicReviews = ref<any[]>([]);

onMounted(async () => {
  try {
    const { data } = await api.get(`/reviews/${props.movieId}`);
    publicReviews.value = data.map((r: any) => ({
      ...r,
      username: r.userId?.username || "anon",
    }));
  } catch (err) {
    console.error("Failed to load public reviews", err);
  }
});
</script>
