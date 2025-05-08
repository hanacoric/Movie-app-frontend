<template>
  <Navbar />
  <div class="min-h-screen w-full bg-aurora bg-fixed bg-cover text-white pt-20">
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>
