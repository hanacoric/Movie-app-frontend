import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userIDToken"),
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    login(token: string, userId: string) {
      this.token = token;
      this.userId = userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userIDToken", userId);
    },
    logout() {
      this.token = null;
      this.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userIDToken");
    },
  },
});
