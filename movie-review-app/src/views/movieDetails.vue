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
        <!-- Buttons -->
        <div class="flex gap-4 flex-nowrap">
          <button
            class="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-lg font-semibold"
            @click="addToCategory('watched')"
          >
            Add to Watched
          </button>
          <button
            class="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg text-lg font-semibold"
            @click="addToCategory('watchlist')"
          >
            Add to Watchlist
          </button>
          <button
            class="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg text-lg font-semibold"
            @click="addToCategory('favorites')"
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
import api from "../services/api";

const { movie, error, fetchMovie } = useMovie();
const route = useRoute();
const movieId = route.params.id as string;

onMounted(() => {
  fetchMovie(movieId);
});

const listMap = {
  watched: "watchedMovies",
  watchlist: "watchlist",
  favorites: "favoriteMovies",
};

const addToCategory = async (
  category: "watched" | "watchlist" | "favorites"
) => {
  const token = localStorage.getItem("token");
  if (!token || !movie.value?.imdbID) {
    console.warn("Missing token or movie ID");
    return;
  }

  try {
    await api.post("/movies/add", {
      listName: listMap[category],
      movieId: movie.value.imdbID,
    });
    console.log(`Successfully added to ${category}`);
  } catch (err) {
    console.error(`Failed to add to ${category}`, err);
  }
};
</script>
