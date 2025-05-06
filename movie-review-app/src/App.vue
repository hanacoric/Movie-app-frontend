<template>
  <Navbar />
  <div class="h-screen w-full overflow-hidden bg-aurora text-white">
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>
