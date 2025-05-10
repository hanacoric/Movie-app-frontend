import { ref } from "vue";
import api from "../../services/api";
import { getMovieDetails } from "../../services/api";

export function useMovie() {
  const movie = ref<any>(null);
  const loading = ref(false);
  const error = ref("");

  const lists = ref({
    watched: [] as string[],
    watchlist: [] as string[],
    favorites: [] as string[],
  });

  //loads the movie data from the backend
  const fetchMovie = async (id: string) => {
    movie.value = null;
    loading.value = true;
    error.value = "";

    try {
      const data = await getMovieDetails(id);
      movie.value = data;
    } catch (err: any) {
      console.error("Movie fetch error:", err);
      error.value = err.response?.data?.message || "Failed to load movie.";
    } finally {
      loading.value = false;
    }
  };

  //gets the user lists from the backend
  const fetchUserLists = async () => {
    try {
      const { data } = await api.get("/users/lists");
      lists.value = {
        watched: data.watchedMovies || [],
        watchlist: data.watchlist || [],
        favorites: data.favoriteMovies || [],
      };
    } catch (err) {
      console.error("Failed to load user lists", err);
    }
  };

  //checks if the movie is in the list
  const isInList = (list: keyof typeof lists.value, movieId: string) => {
    return lists.value[list].includes(movieId);
  };

  //adds or removes the movie from the list
  const toggleCategory = async (
    category: "watched" | "watchlist" | "favorites",
    movieId: string
  ) => {
    const listKeyMap = {
      watched: "watchedMovies",
      watchlist: "watchlist",
      favorites: "favoriteMovies",
    };

    const listName = listKeyMap[category];
    const action = isInList(category, movieId) ? "remove" : "add";

    try {
      await api.put(`/movies/${action}`, { listName, movieId });

      if (action === "add") {
        lists.value[category].push(movieId);
      } else {
        lists.value[category] = lists.value[category].filter(
          (id) => id !== movieId
        );
      }

      console.log(
        `${action === "add" ? "Added to" : "Removed from"} ${category}`
      );
    } catch (err) {
      console.error(`Failed to ${action} ${category}`, err);
    }
  };

  return {
    movie,
    loading,
    error,
    fetchMovie,
    fetchUserLists,
    isInList,
    toggleCategory,
  };
}
