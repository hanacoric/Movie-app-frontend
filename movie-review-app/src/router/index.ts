import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/home.vue");
const Search = () => import("../views/search.vue");
const Dashboard = () => import("../views/dashboard.vue");
const Login = () => import("../views/login.vue");
const Register = () => import("../views/register.vue");
const MovieDetails = () => import("../views/movieDetails.vue");
const MyReviews = () => import("../views/myReviews.vue");
const MovieReviews = () => import("../views/movieReviews.vue");

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
    component: MyReviews,
  },
  {
    path: "/movie/:movieId/reviews",
    name: "MovieReviews",
    component: MovieReviews,
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
