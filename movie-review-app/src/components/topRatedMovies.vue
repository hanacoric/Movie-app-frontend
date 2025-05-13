<template>
  <div class="mb-20 px-8">
    <h2
      class="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 drop-shadow-md"
    >
      Top Rated Movies
    </h2>

    <div v-if="loading" class="text-white text-lg">Loading...</div>
    <div v-else-if="error" class="text-red-400 text-lg">{{ error }}</div>
    <div v-else-if="topRatedMovies.length === 0" class="text-gray-400 text-lg">
      No top-rated movies yet.
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <router-link
        v-for="movie in topRatedMovies"
        :key="movie.movieId"
        :to="`/movie/${movie.movieId}`"
        class="rounded-xl overflow-hidden transform transition-transform hover:scale-105 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
      >
        <div class="aspect-[2/3] w-full">
          <img
            :src="movie.poster"
            :alt="movie.title"
            class="w-full h-full object-cover shadow-xl"
          />
        </div>
        <div class="px-4 py-3 bg-white/10 backdrop-blur-sm">
          <h4 class="text-white font-semibold text-base truncate">
            {{ movie.title }}
          </h4>
          <p class="text-purple-300 text-sm mt-1">
            ⭐ {{ movie.avgRating }} – {{ movie.year }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useTopRated } from "../modules/movies/useTopRated";

const { topRatedMovies, loading, error, fetchTopRated } = useTopRated();
onMounted(fetchTopRated);
</script>
