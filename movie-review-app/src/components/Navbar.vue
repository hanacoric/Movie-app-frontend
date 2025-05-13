<template>
  <nav
    class="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10"
  >
    <div
      class="flex justify-between items-center px-8 py-6 text-white text-xl font-bold"
    >
      <RouterLink
        to="/"
        class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 text-2xl font-extrabold tracking-wide animate-pulse"
      >
        MovieLog
      </RouterLink>
      <div class="space-x-8">
        <RouterLink
          to="/"
          class="relative text-white transition duration-300 ease-in-out hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-500"
        >
          HOME
        </RouterLink>

        <RouterLink
          to="/search"
          class="relative text-white transition duration-300 ease-in-out hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-500"
          >SEARCH</RouterLink
        >
        <RouterLink
          to="/dashboard"
          class="relative text-white transition duration-300 ease-in-out hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-500"
          >DASHBOARD</RouterLink
        >
        <template v-if="auth.isLoggedIn">
          <button
            class="relative text-white transition duration-300 ease-in-out hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-500"
            @click="
              auth.logout();
              router.push('/login');
            "
          >
            LOGOUT
          </button>
        </template>
        <template v-else>
          <RouterLink
            to="/login"
            class="relative text-white transition duration-300 ease-in-out hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-500"
            >LOGIN</RouterLink
          >
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from "vue-router";
import { useAuth } from "../modules/auth/useAuth";
import { ref, watchEffect } from "vue";
import { useAuthStore } from "../stores/authStore";
const auth = useAuthStore();

const { logout } = useAuth();
const isLoggedIn = ref<boolean>(!!localStorage.getItem("token"));

watchEffect(() => {
  isLoggedIn.value = !!localStorage.getItem("token");
});

const router = useRouter();

const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>

<style scoped>
nav {
  font-family: "AgeoBold", sans-serif;
}
</style>
