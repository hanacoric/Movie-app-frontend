<template>
  <div class="mb-10">
    <h3 class="text-2xl font-bold mb-4 text-white">Watched Movies</h3>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
    >
      <router-link
        v-for="movie in movies"
        :key="movie.imdbID"
        :to="`/movie/${movie.imdbID}`"
        class="bg-white/10 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
      >
        <div class="aspect-[2/3] w-full">
          <img
            :src="movie.poster"
            alt="Poster"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="px-3 py-2">
          <h4 class="text-white font-semibold text-sm truncate">
            {{ movie.title }}
          </h4>
          <p class="text-gray-400 text-xs">{{ movie.year }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  movies: {
    imdbID: string;
    title: string;
    poster: string;
    year: string;
  }[];
}>();
</script>
