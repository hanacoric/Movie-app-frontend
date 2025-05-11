import { defineStore } from "pinia";
import api from "../services/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as any,
  }),
  actions: {
    async fetchUserProfile() {
      try {
        const response = await api.get("/users/lists");
        this.user = response.data;
      } catch (err) {
        console.error("Failed to fetch user lists:", err);
      }
    },
  },
});
