import { defineStore } from "pinia";
import api from "../services/api";

interface Movie {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
}

export const useListStore = defineStore("lists", {
  state: () => ({
    watched: [] as Movie[],
    watchlist: [] as Movie[],
    favorites: [] as Movie[],
  }),
  actions: {
    async fetchUserLists() {
      try {
        const { data } = await api.get("/users/lists");
        this.watched = data.watchedMovies || [];
        this.watchlist = data.watchlist || [];
        this.favorites = data.favoriteMovies || [];
      } catch (err) {
        console.error("Failed to load user lists", err);
      }
    },
    isInList(category: "watched" | "watchlist" | "favorites", movieId: string) {
      return this[category].some((movie) => movie.imdbID === movieId);
    },
    async toggleCategory(
      category: "watched" | "watchlist" | "favorites",
      movieId: string
    ) {
      const listMap = {
        watched: "watchedMovies",
        watchlist: "watchlist",
        favorites: "favoriteMovies",
      };

      const listName = listMap[category];
      const exists = this.isInList(category, movieId);
      const action = exists ? "remove" : "add";

      try {
        await api.put(`/movies/${action}`, { listName, movieId });
        if (exists) {
          this[category] = this[category].filter((m) => m.imdbID !== movieId);
        } else {
          const movie = await api.get(`/movie/${movieId}`); // Fetch full movie details
          this[category].push(movie.data);
        }
      } catch (err) {
        console.error(`Failed to ${action} ${category}`, err);
      }
    },
  },
});
