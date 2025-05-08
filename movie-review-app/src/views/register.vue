<template>
  <div class="flex items-center justify-center h-screen w-full bg-transparent">
    <div
      class="backdrop-blur-xl bg-white/10 rounded-3xl shadow-xl p-10 w-full max-w-sm text-white"
    >
      <h2 class="text-center text-2xl font-semibold mb-6">REGISTER</h2>
      <div class="space-y-6">
        <div>
          <label class="block text-sm mb-1">Username</label>
          <input
            type="username"
            v-model="username"
            class="w-full bg-transparent border-b border-white/30 focus:border-white outline-none placeholder-transparent text-white"
            placeholder="Username"
          />
          <p v-if="fieldError" class="text-red-400 text-sm">
            {{ fieldError }}
          </p>
        </div>

        <div class="space-y-6">
          <div>
            <label class="block text-sm mb-1">Email</label>
            <input
              type="email"
              v-model="email"
              class="w-full bg-transparent border-b border-white/30 focus:border-white outline-none placeholder-transparent text-white"
              placeholder="Email"
            />
            <p v-if="emailError" class="text-red-400 text-sm mt-1">
              {{ emailError }}
            </p>

            <p v-if="fieldError" class="text-red-400 text-sm">
              {{ fieldError }}
            </p>
          </div>

          <div class="relative">
            <label class="block text-sm mb-1">Password</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="w-full bg-transparent border-b border-white/30 focus:border-white outline-none placeholder-transparent text-white pr-10"
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

            <p v-if="fieldError" class="text-red-400 text-sm">
              {{ fieldError }}
            </p>
          </div>
          <p v-if="error" class="text-red-400 text-sm mt-2 text-center">
            {{ error }}
          </p>

          <button
            class="w-full py-2 rounded-full bg-white text-black font-bold tracking-wide hover:bg-gray-200 transition"
            @click="handleRegister"
          >
            SUBMIT
          </button>

          <div class="text-sm text-center text-white mt-4">
            Have an account?
            <RouterLink
              to="/login"
              class="text-blue-300 underline hover:text-blue-200"
              >Login</RouterLink
            >
          </div>
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
import { ref } from "vue";
import { EyeIcon, EyeOffIcon } from "lucide-vue-next";
import { useReCaptcha } from "vue-recaptcha-v3";
const showPassword = ref(false);
const auth = useAuthStore();
const emailError = ref("");
const passwordError = ref("");
const fieldError = ref("");
const recaptcha = useReCaptcha();

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
  console.log("reCAPTCHA token:", recaptchaToken);
  await register(username.value, email.value, password.value, recaptchaToken);
  if (token.value) {
    auth.login(token.value, user.value?._id || "");
    router.push("/login");
  }
};

const router = useRouter();
const { username, email, password, register, isLoggedIn, token, user, error } =
  useAuth();

const goToLogin = () => {
  router.push("/login");
};
</script>
