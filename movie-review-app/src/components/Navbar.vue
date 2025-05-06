<template>
  <nav
    class="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10"
  >
    <div
      class="flex justify-between items-center px-8 py-6 text-white text-xl font-bold"
    >
      <RouterLink
        to="/"
        class="text-purple-400 hover:text-purple-300 transition"
      >
        MovieLog
      </RouterLink>
      <div class="space-x-8">
        <RouterLink to="/" class="hover:text-purple-400 transition"
          >HOME</RouterLink
        >
        <RouterLink to="/search" class="hover:text-purple-400 transition"
          >SEARCH</RouterLink
        >
        <RouterLink to="/dashboard" class="hover:text-purple-400 transition"
          >DASHBOARD</RouterLink
        >
        <RouterLink to="/login" class="hover:text-purple-400 transition"
          >LOGIN</RouterLink
        >
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
nav {
  font-family: "AgeoBold", sans-serif;
}
</style>
