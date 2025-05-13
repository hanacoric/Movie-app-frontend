<template>
  <div class="container mx-auto px-4 py-6">
    <TopRatedMovies />
  </div>
</template>

<script setup lang="ts">
import TopRatedMovies from "../components/topRatedMovies.vue";
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
