import { ref } from "vue";
import { getTopRatedMovies } from "../../services/api";
export interface TopRatedMovie {
  movieId: string;
  title: string;
  year: string;
  poster: string;
  avgRating: number;
}

export function useTopRated() {
  const topRatedMovies = ref<TopRatedMovie[]>([]);
  const loading = ref(false);
  const error = ref("");

  const fetchTopRated = async () => {
    loading.value = true;
    error.value = "";
    try {
      const data = await getTopRatedMovies();
      topRatedMovies.value = data;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Failed to load top-rated movies.";
    } finally {
      loading.value = false;
    }
  };

  return {
    topRatedMovies,
    loading,
    error,
    fetchTopRated,
  };
}
