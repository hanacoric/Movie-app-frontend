import { ref } from "vue";
import api from "../../services/api";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const token = ref<string | null>(localStorage.getItem("token"));
  const isLoggedIn = ref<boolean>(false);
  const error = ref<string | null>(null);
  const user = ref<any>(null);

  const name = ref<string>("");
  const email = ref<string>("");
  const password = ref<string>("");

  //login user

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post("/users/login", { email, password });

      token.value = response.data.token;
      user.value = response.data;
      isLoggedIn.value = true;

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userIDToken", response.data._id);

      console.log("user is logged in:", response.data);
    } catch (err: any) {
      console.error("Login error:", err);
      error.value = err.response?.data?.error || "Login failed";
    }
  };

  //logout user
  const logout = () => {
    token.value = null;
    user.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem("token");
    localStorage.removeItem("userIDToken");
    console.log("User logged out");
  };

  return {
    token,
    isLoggedIn,
    error,
    user,
    name,
    email,
    password,
    login,
    logout,
  };
};
