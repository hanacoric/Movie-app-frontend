<template>
  <div class="p-6">
    <div class="text-white p-4">
      <h1>Search Page</h1>
    </div>
    <input
      v-model="query"
      @keyup.enter="search"
      class="w-full p-2 rounded-lg border bg-gray-900 text-white placeholder-gray-500"
      placeholder="Search movies..."
    />
    <div v-if="loading" class="mt-4 text-white">Loading...</div>
    <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <MovieCard v-for="movie in results" :key="movie.imdbID" :movie="movie" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieCard from "../components/MovieCard.vue";
import { useSearch } from "../modules/movies/useSearch";

const { query, results, loading, error, search } = useSearch();
</script>
