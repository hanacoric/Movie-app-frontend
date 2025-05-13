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
            class="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-sm font-semibold whitespace-nowrap"
            @click="toggleCategory('watched')"
          >
            {{ isInList("watched") ? "Remove from Watched" : "Add to Watched" }}
          </button>

          <button
            class="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg text-sm font-semibold whitespace-nowrap"
            @click="toggleCategory('watchlist')"
          >
            {{
              isInList("watchlist")
                ? "Remove from Watchlist"
                : "Add to Watchlist"
            }}
          </button>

          <button
            class="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg text-sm font-semibold whitespace-nowrap"
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
  <PublicReviewList v-if="showAllReviews && movie" :movieId="movie.imdbID" />

  <button
    @click="showAllReviews = !showAllReviews"
    class="mt-6 px-4 py-2 border border-blue-400 text-blue-400 rounded hover:bg-blue-500 hover:text-white"
  >
    {{ showAllReviews ? "Hide Reviews" : "Show All Reviews for This Movie" }}
  </button>

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
import PublicReviewList from "../components/publicReviewList.vue";

const showAllReviews = ref(false);

const { movie, fetchMovie } = useMovie();
const listStore = useListStore();
const route = useRoute();
const movieId = route.params.id as string;

// Fetch movie and lists before component renders
onBeforeMount(async () => {
  await listStore.fetchUserLists();
  await fetchMovie(movieId);
  console.log("Fetched movie:", movie.value);
});

const isInList = (category: "watched" | "watchlist" | "favorites") =>
  listStore.isInList(category, movieId);

const toggleCategory = (category: "watched" | "watchlist" | "favorites") =>
  listStore.toggleCategory(category, movieId);
</script>
