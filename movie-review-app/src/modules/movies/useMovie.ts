import { ref } from "vue";
import { getMovieDetails } from "../../services/api";

export function useMovie() {
  const movie = ref<any>(null);
  const loading = ref(false);
  const error = ref("");

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

  return {
    movie,
    loading,
    error,
    fetchMovie,
  };
}
