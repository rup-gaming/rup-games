import { createRouter, createWebHistory } from "vue-router";

import {
  HomeView,
  AboutView,
  PlayView,
  AuthView,
  UserProfileView,
} from "../views";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/about", name: "about", component: AboutView },
  { path: "/play", name: "play", component: PlayView },
  { path: "/signin", name: "signin", component: AuthView },
  { path: "/profile", name: "profile", component: UserProfileView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
