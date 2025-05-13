<template>
  <router-link
    :to="`/movie/${movie.imdbID}`"
    class="bg-white/10 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 w-[260px]"
  >
    <div class="aspect-[2/3] w-full drop-shadow-lg">
      <img
        :src="movie.Poster"
        alt="Poster"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="px-3 py-2">
      <h4 class="text-white font-semibold text-base truncate">
        {{ movie.Title }}
      </h4>
      <p class="text-gray-400 text-sm">{{ movie.Year }}</p>
    </div>
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
