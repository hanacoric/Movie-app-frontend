<template>
  <div class="p-6">
    <WatchedList :movies="user?.watchedMovies || []" />
    <Watchlist :movies="user?.watchlist || []" />
    <FavoriteMovies :movies="user?.favoriteMovies?.slice(0, 10) || []" />
  </div>
</template>

<script setup lang="ts">
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
