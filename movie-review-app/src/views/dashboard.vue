<template>
  <div class="w-full flex justify-center mt-4 mb-10">
    <RouterLink
      to="/my-reviews"
      class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 drop-shadow-md relative group transition duration-300"
    >
      See My Reviews
      <span
        class="absolute left-0 -bottom-1 w-full h-0.5 bg-pink-400 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300"
      ></span>
    </RouterLink>
  </div>
  <div class="max-w-7xl mx-auto px-4 py-12 space-y-20">
    <WatchedList :movies="user?.watchedMovies || []" />
    <Watchlist :movies="user?.watchlist || []" />
    <FavoriteMovies :movies="user?.favoriteMovies?.slice(0, 10) || []" />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

import { onMounted, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import WatchedList from "../components/watched.vue";
import Watchlist from "../components/watchlist.vue";
import FavoriteMovies from "../components/favoriteMovies.vue";

const userStore = useUserStore();
onMounted(() => {
  userStore.fetchUserProfile();
});
const user = computed(() => userStore.user);
</script>
