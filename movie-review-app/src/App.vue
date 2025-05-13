<template>
  <Navbar />
  <div class="min-h-screen w-full bg-aurora bg-fixed bg-cover text-white pt-20">
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { useRoute } from "vue-router";
import { onMounted, watch } from "vue";

const route = useRoute();

const updateBodyScroll = () => {
  if (["/login", "/register"].includes(route.path)) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
};

onMounted(updateBodyScroll);
watch(() => route.path, updateBodyScroll);
</script>
