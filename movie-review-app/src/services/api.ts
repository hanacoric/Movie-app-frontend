import axios from "axios";

const api = axios.create({
  baseURL: "https://movie-app-backend-ujpg.onrender.com/api",
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
export const searchMovies = async (query: string) => {
  const response = await api.get("/search", {
    params: { query },
  });
  return response.data;
};
export default api;
