import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Search from "../views/search.vue";
import Dashboard from "../views/dashboard.vue";
import Login from "../views/login.vue";
import Register from "../views/register.vue";
import MovieDetails from "../views/movieDetails.vue";
import MyReviews from "../views/myReviews.vue";
import MovieReviews from "../views/movieReviews.vue";

const routes = [
  { path: "/", name: "Home", component: Home, meta: { requiresAuth: true } },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/movie/:id", name: "Movie", component: MovieDetails },
  {
    path: "/my-reviews",
    name: "MyReviews",
    component: () => import("../views/myReviews.vue"),
  },
  {
    path: "/movie/:movieId/reviews",
    name: "MovieReviews",
    component: () => import("../views/movieReviews.vue"),
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});
