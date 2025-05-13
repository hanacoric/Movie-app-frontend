<template>
  <div class="p-6">
    <div class="w-full flex justify-center">
      <h1
        class="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 drop-shadow-md"
      >
        Search Movies
      </h1>
    </div>
    <input
      v-model="query"
      @keyup.enter="handleKeyupEnter"
      class="w-full max-w-3xl mx-auto block p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      placeholder="Search movies..."
    />
    <div v-if="loading" class="mt-4 text-white">Loading...</div>
    <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
    <div
      v-if="!loading && results.length === 0 && query"
      class="w-full flex justify-center mt-4 text-gray-400"
    >
      No results found for "{{ query }}"
    </div>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-items-center px-10 mt-10 mb-10"
    >
      <MovieCard v-for="movie in results" :key="movie.imdbID" :movie="movie" />
    </div>

    <div class="flex justify-center gap-4 mt-10">
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
        class="px-6 py-2 rounded-lg border-2 border-purple-500 text-purple-500 font-semibold transition hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white shadow-lg disabled:opacity-50"
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
        class="px-6 py-2 rounded-lg border-2 border-purple-500 text-purple-500 font-semibold transition hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white shadow-lg"
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
