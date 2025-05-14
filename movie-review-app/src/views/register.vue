<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-transparent overflow-hidden"
  >
    <div
      class="backdrop-blur-xl bg-white/10 rounded-3xl shadow-xl p-10 w-full max-w-sm text-white"
    >
      <h2 class="text-4xl font-bold text-pink-400 text-center mb-10">
        REGISTER
      </h2>

      <div class="space-y-6">
        <div>
          <label class="block text-sm mb-1">Username</label>
          <input
            type="text"
            v-model="username"
            class="w-full bg-transparent border-b border-white/30 focus:border-white outline-none text-white placeholder-gray-400"
            placeholder="Username"
          />
        </div>

        <div>
          <label class="block text-sm mb-1">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full bg-transparent border-b border-white/30 focus:border-white outline-none text-white placeholder-gray-400"
            placeholder="Email"
          />
          <p v-if="emailError" class="text-red-400 text-sm mt-1">
            {{ emailError }}
          </p>
        </div>

        <div class="relative">
          <label class="block text-sm mb-1">Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            class="w-full bg-transparent border-b border-white/30 focus:border-white outline-none text-white pr-10 placeholder-gray-400"
            placeholder="Password"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-0 top-0 mt-1.5 mr-2 text-white"
          >
            <component
              :is="showPassword ? EyeOffIcon : EyeIcon"
              class="w-5 h-5"
            />
          </button>
          <p v-if="passwordError" class="text-red-400 text-sm mt-1">
            {{ passwordError }}
          </p>
        </div>

        <p v-if="fieldError" class="text-red-400 text-sm text-center">
          {{ fieldError }}
        </p>
        <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>

        <button
          @click="handleRegister"
          class="w-full py-2 border-2 border-purple-500 text-purple-500 rounded-md font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white"
        >
          Submit
        </button>

        <div class="text-sm text-center text-white mt-4">
          Have an account?
          <RouterLink
            to="/login"
            class="text-purple-400 underline hover:text-pink-200"
          >
            Login
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuth } from "../modules/auth/useAuth";
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";
import { EyeIcon, EyeOffIcon } from "lucide-vue-next";
import { useReCaptcha } from "vue-recaptcha-v3";

const showPassword = ref(false);
const auth = useAuthStore();
const emailError = ref("");
const passwordError = ref("");
const fieldError = ref("");
const recaptcha = useReCaptcha();
const router = useRouter();
const { username, email, password, register, token, user, error } = useAuth();

const handleRegister = async () => {
  emailError.value = "";
  passwordError.value = "";
  fieldError.value = "";

  if (!username.value || !email.value || !password.value) {
    fieldError.value = "All fields are required.";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    emailError.value = "Please enter a valid email address.";
    return;
  }

  const passwordPattern = /^(?=.*\d).{6,}$/;
  if (!passwordPattern.test(password.value)) {
    passwordError.value =
      "Password must be at least 6 characters and include a number.";
    return;
  }

  if (!recaptcha || !recaptcha.executeRecaptcha) {
    fieldError.value = "ReCAPTCHA is not ready.";
    return;
  }

  const recaptchaToken = await recaptcha.executeRecaptcha("register");
  if (!recaptchaToken) {
    fieldError.value = "ReCAPTCHA verification failed.";
    return;
  }

  await register(username.value, email.value, password.value, recaptchaToken);
  if (token.value) {
    auth.login(token.value, user.value?._id || "");
    router.push("/");
  }
};
</script>

<style scoped>
.grecaptcha-badge {
  visibility: visible !important;
  opacity: 1 !important;
}
</style>
