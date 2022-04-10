import { createRouter, createWebHistory } from "vue-router";

import { HomeView, PlayView } from "../views";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/play", name: "play", component: PlayView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
