<template>
  <div class="p-6">
    <RouterLink
      to="/my-reviews"
      class="inline-block mb-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
    >
      See My Reviews
    </RouterLink>
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
