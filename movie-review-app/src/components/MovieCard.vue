<template>
  <div
    class="bg-white/10 backdrop-blur p-3 rounded-lg shadow-md hover:scale-105 transition"
  >
    <img
      :src="movie.Poster"
      alt="Poster"
      class="w-full h-72 object-cover rounded"
    />
    <h3 class="mt-2 text-lg font-semibold text-white">{{ movie.Title }}</h3>
    <p class="text-sm text-gray-300">{{ movie.Year }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  movie: {
    Title: string;
    Poster: string;
    Year: string;
    imdbID: string;
  };
}>();
</script>
