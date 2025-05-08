<template>
  <div class="p-6">
    <div class="text-white p-4">
      <h1>Search Movies</h1>
    </div>
    <input
      v-model="query"
      @keyup.enter="handleKeyupEnter"
      class="w-full p-2 rounded-lg border bg-gray-900 text-white placeholder-gray-500"
      placeholder="Search movies..."
    />
    <div v-if="loading" class="mt-4 text-white">Loading...</div>
    <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
    <div
      v-if="!loading && results.length === 0 && query"
      class="mt-4 text-gray-400"
    >
      No results found for "{{ query }}"
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center px-10 mt-10 mb-10"
    >
      <MovieCard v-for="movie in results" :key="movie.imdbID" :movie="movie" />
    </div>

    <div class="flex justify-center gap-4 mt-4 text-white">
      <button
        @click="
          () => {
            if (page > 1) {
              page--;
              handleSearch();
            }
          }
        "
        :disabled="page === 1"
        class="px-4 py-2 bg-gray-700 rounded"
      >
        Prev
      </button>

      <button
        @click="
          () => {
            page++;
            handleSearch();
          }
        "
        class="px-4 py-2 bg-gray-700 rounded"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MovieCard from "../components/MovieCard.vue";
import { useSearch } from "../modules/movies/useSearch";

const { query, results, loading, error, page, search } = useSearch();

const handleSearch = () => {
  search(page.value);
};
const handleKeyupEnter = async (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    page.value = 1;
    await search(page.value);
  }
};
</script>
