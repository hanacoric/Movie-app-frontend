<template>
  <div class="flex items-center justify-center h-screen w-full bg-transparent">
    <div
      class="backdrop-blur-xl bg-white/10 rounded-3xl shadow-xl p-10 w-full max-w-sm text-white"
    >
      <h2 class="text-center text-2xl font-semibold mb-6">LOGIN</h2>

      <div class="space-y-6">
        <div>
          <label class="block text-sm mb-1">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full bg-transparent border-b border-white/30 focus:border-white outline-none placeholder-transparent text-white"
            placeholder="Email"
          />
        </div>

        <div>
          <label class="block text-sm mb-1">Password</label>
          <input
            type="password"
            v-model="password"
            class="w-full bg-transparent border-b border-white/30 focus:border-white outline-none placeholder-transparent text-white"
            placeholder="Password"
          />
        </div>

        <button
          class="w-full py-2 rounded-full bg-white text-black font-bold tracking-wide hover:bg-gray-200 transition"
          @click="handleLogin"
        >
          SUBMIT
        </button>

        <div class="text-sm text-center text-white mt-4">
          Don’t have an account?
          <RouterLink
            to="/register"
            class="text-blue-300 underline hover:text-blue-200"
            >Register</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import { useRouter } from "vue-router";
import { useAuth } from "../modules/auth/useAuth";
import { useAuthStore } from "../stores/authStore";
const auth = useAuthStore();

const handleLogin = async () => {
  await login(email.value, password.value);
  if (token.value) {
    auth.login(token.value, user.value._id);
    router.push("/");
  }
};

const router = useRouter();
const { email, password, login, isLoggedIn, token, user } = useAuth();

const goToRegister = () => {
  router.push("/register");
};
</script>
