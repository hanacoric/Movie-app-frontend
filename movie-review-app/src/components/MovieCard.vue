<template>
  <router-link
    :to="`/movie/${movie.imdbID}`"
    class="bg-white/10 p-3 rounded-xl shadow-lg w-[300px]"
  >
    <div class="aspect-[2/3] overflow-hidden rounded-md">
      <img
        :src="movie.Poster"
        alt="Poster"
        class="w-full h-full object-cover"
      />
    </div>
    <h3 class="mt-3 text-lg font-semibold text-white truncate">
      {{ movie.Title }}
    </h3>
    <p class="text-sm text-gray-300">{{ movie.Year }}</p>
  </router-link>
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
