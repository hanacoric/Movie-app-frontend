import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// fetches the login token from backend and sets it in the header of the request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// omdb external api for fetching movies
export const searchMovies = async (query: string, page = 1) => {
  const response = await api.get("/search", {
    params: { query, page },
  });
  return response.data;
};
// fetches the movie id from backend
export const getMovieDetails = async (id: string) => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};
// fetch top-rated movies
export const getTopRatedMovies = async () => {
  const response = await api.get("/movies/top-rated");
  return response.data;
};

export default api;
