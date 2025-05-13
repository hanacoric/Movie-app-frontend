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
        <!-- Average Rating Badge -->
        <div
          v-if="averageRating > 0"
          class="mt-2 mb-4 text-center md:text-left"
        >
          <span
            class="inline-flex items-center gap-2 bg-purple-600/30 text-purple-200 text-sm px-4 py-2 rounded-full shadow-md backdrop-blur-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.367 2.448a1 1 0 00-.364 1.118l1.287 3.946c.3.921-.755 1.688-1.538 1.118l-3.367-2.448a1 1 0 00-1.175 0l-3.367 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.946a1 1 0 00-.364-1.118L2.07 9.373c-.783-.57-.38-1.81.588-1.81h4.157a1 1 0 00.95-.69l1.286-3.946z"
              />
            </svg>
            {{ averageRating.toFixed(1) }} from {{ totalReviews }} review{{
              totalReviews > 1 ? "s" : ""
            }}
          </span>
        </div>
        <p class="text-xl mb-1 text-gray-400">
          {{ movie.Genre }}
        </p>

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
            class="px-6 py-3 rounded-lg text-sm whitespace-nowrap border-2 border-blue-400 text-blue-300 font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600"
            @click="toggleCategory('watched')"
          >
            {{ isInList("watched") ? "Remove from Watched" : "Add to Watched" }}
          </button>

          <button
            class="px-6 py-3 rounded-lg text-sm whitespace-nowrap border-2 border-purple-400 text-purple-300 font-semibold shadow-lg shadow-purple-500/30 transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
            @click="toggleCategory('watchlist')"
          >
            {{
              isInList("watchlist")
                ? "Remove from Watchlist"
                : "Add to Watchlist"
            }}
          </button>

          <button
            class="px-6 py-3 rounded-lg text-sm whitespace-nowrap border-2 border-pink-400 text-pink-400 font-semibold shadow-lg shadow-pink-500/30 transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500"
            @click="toggleCategory('favorites')"
          >
            {{
              isInList("favorites")
                ? "Remove from Favorites"
                : "Add to Favorites"
            }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- View All Reviews Button -->
  <div class="w-full flex justify-center mt-10">
    <RouterLink
      :to="`/movie/${movie.imdbID}/reviews`"
      class="px-6 py-3 rounded-xl text-white font-semibold transition-all bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg hover:from-purple-600 hover:to-indigo-700"
    >
      View All Reviews
    </RouterLink>
  </div>

  <div class="w-full mt-12 px-20">
    <ReviewForm v-if="movie" :imdbID="movie.imdbID" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useMovie } from "../modules/movies/useMovie";
import { useListStore } from "../stores/listStore";
import ReviewForm from "./reviewForm.vue";
import api from "../services/api";

const { movie, fetchMovie } = useMovie();
const listStore = useListStore();
const route = useRoute();
const movieId = route.params.id as string;

const averageRating = ref(0);
const totalReviews = ref(0);

// Fetch movie and reviews
onBeforeMount(async () => {
  await listStore.fetchUserLists();
  await fetchMovie(movieId);
  await fetchAndCalculateAverage(movieId);
});

// List handling
const isInList = (category: "watched" | "watchlist" | "favorites") =>
  listStore.isInList(category, movieId);

const toggleCategory = (category: "watched" | "watchlist" | "favorites") =>
  listStore.toggleCategory(category, movieId);

// Average rating logic
const fetchAndCalculateAverage = async (id: string) => {
  try {
    const { data } = await api.get(`/reviews/${id}`);
    if (data.length > 0) {
      const total = data.reduce((sum: number, r: any) => sum + r.rating, 0);
      averageRating.value = parseFloat((total / data.length).toFixed(1));
      totalReviews.value = data.length;
    }
  } catch (err) {
    console.error("Error fetching reviews for average", err);
  }
};
</script>
