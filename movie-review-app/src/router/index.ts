import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Search from "../views/search.vue";
import Dashboard from "../views/dashboard.vue";
import Login from "../views/login.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/search", name: "Search", component: Search },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/login", name: "Login", component: Login },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
