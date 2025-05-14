import { ref } from "vue";
import api from "../../services/api";

export const useAuth = () => {
  const token = ref<string | null>(localStorage.getItem("token"));
  const isLoggedIn = ref<boolean>(false);
  const error = ref<string | null>(null);
  const user = ref<any>(null);

  const username = ref<string>("");
  const email = ref<string>("");
  const password = ref<string>("");

  //authenticates a user, stores token in localStorage, and updates auth state
  const login = async (
    email: string,
    password: string,
    recaptchaToken: string
  ): Promise<void> => {
    try {
      const payload = { email, password, recaptchaToken };

      const response = await api.post("/users/login", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      token.value = response.data.token;
      user.value = response.data;
      isLoggedIn.value = true;

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userIDToken", response.data._id);
      error.value = null;

      console.log("user is logged in:", response.data);
    } catch (err: any) {
      console.error("Login error:", err);
      error.value = err.response?.data?.error || "User not found";
    }
  };

  //logout user, clears all user-related localStorage and state
  const logout = () => {
    token.value = null;
    user.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem("token");
    localStorage.removeItem("userIDToken");
    console.log("User logged out");
  };

  //registers a new user and stores their token
  const register = async (
    username: string,
    email: string,
    password: string,
    recaptchaToken: string
  ): Promise<void> => {
    try {
      const response = await api.post("/users/register", {
        username,
        email,
        password,
        recaptchaToken,
      });
      token.value = response.data.token;
      user.value = response.data;
      isLoggedIn.value = true;

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userIDToken", response.data._id);

      console.log("user is registered:", response.data);
    } catch (err: any) {
      console.error("Register error:", err);
      error.value = err.response?.data?.error || "User already exists";
    }
  };

  return {
    token,
    isLoggedIn,
    error,
    user,
    username,
    email,
    password,
    login,
    logout,
    register,
  };
};
