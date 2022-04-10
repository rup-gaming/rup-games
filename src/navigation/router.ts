import { createRouter, createWebHistory } from "vue-router";

import { HomeView, AboutView, PlayView } from "../views";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/about", name: "about", component: AboutView },
  { path: "/play", name: "play", component: PlayView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
