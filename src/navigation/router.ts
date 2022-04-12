import { createRouter, createWebHistory } from "vue-router";

import { HomeView, AboutView, PlayView, AuthView } from "../views";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/about", name: "about", component: AboutView },
  { path: "/play", name: "play", component: PlayView },
  { path: "/signin", name: "signin", component: AuthView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
