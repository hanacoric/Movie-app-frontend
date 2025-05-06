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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import { useRouter } from "vue-router";
import { useAuth } from "../modules/auth/useAuth";

const router = useRouter();
const { email, password, login } = useAuth();

const goToRegister = () => {
  router.push("/register");
};

const handleLogin = async () => {
  await login(email.value, password.value);
};
</script>
