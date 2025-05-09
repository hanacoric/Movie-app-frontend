<template>
  <div v-if="movie" class="px-20 py-20 flex justify-center text-white">
    <div class="flex flex-col md:flex-row items-center gap-20 max-w-4xl w-full">
      <!-- Poster -->
      <img
        :src="movie.Poster"
        alt="Movie Poster"
        class="w-80 rounded-xl shadow-2xl"
      />

      <!-- Movie Info -->
      <div
        class="flex flex-col items-center md:items-start max-w-2xl text-center md:text-left"
      >
        <h1 class="text-5xl font-bold mb-2 leading-tight font-sans">
          {{ movie.Title }}
          <span
            class="font-light text-3xl not-italic"
            style="font-family: Arial, sans-serif"
          >
            ({{ movie.Year }})
          </span>
        </h1>

        <p class="text-xl mb-1">
          <strong>Director:</strong> {{ movie.Director }}
        </p>
        <p class="text-xl mb-4"><strong>Actors:</strong> {{ movie.Actors }}</p>

        <p class="text-base text-gray-300 mb-8 leading-relaxed max-w-xl">
          {{ movie.Plot }}
        </p>

        <!-- Buttons -->
        <div class="flex gap-4 flex-nowrap">
          <button
            class="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-lg font-semibold whitespace-nowrap"
          >
            Add to Watched
          </button>
          <button
            class="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg text-lg font-semibold whitespace-nowrap"
          >
            Add to Watchlist
          </button>
          <button
            class="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg text-lg font-semibold whitespace-nowrap"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<span class="font-normal"></span>

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
