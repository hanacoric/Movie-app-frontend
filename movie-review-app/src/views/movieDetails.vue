<template>
  <div class="p-6 text-white">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <div v-if="movie">
        <img :src="movie.Poster" class="w-64 rounded mb-4" />
        <h1 class="text-3xl font-bold">{{ movie.Title }} ({{ movie.Year }})</h1>
        <p class="mt-2 text-gray-300">{{ movie.Plot }}</p>
      </div>
      <div class="flex gap-4 mt-6">
        <button class="bg-green-600 px-4 py-2 rounded">Add to Watched</button>
        <button class="bg-yellow-600 px-4 py-2 rounded">
          Add to Watchlist
        </button>
        <button class="bg-pink-600 px-4 py-2 rounded">Add to Favorites</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { useMovie } from "../modules/movies/useMovie";

const route = useRoute();
const { movie, loading, error, fetchMovie } = useMovie();

onMounted(() => {
  const id = route.params.id as string;
  fetchMovie(id);
});
</script>
