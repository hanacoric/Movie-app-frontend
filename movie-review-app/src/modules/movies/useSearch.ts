import { ref } from "vue";
import { searchMovies } from "../../services/api";

export function useSearch() {
  const query = ref("");
  const results = ref<any[]>([]);
  const loading = ref(false);
  const error = ref("");

  const search = async (): Promise<void> => {
    if (!query.value) return;
    loading.value = true;
    error.value = "";
    results.value = [];

    try {
      const data = await searchMovies(query.value);
      results.value = data;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Search failed.";
    } finally {
      loading.value = false;
    }
  };

  return {
    query,
    results,
    loading,
    error,
    search,
  };
}
