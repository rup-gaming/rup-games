import { createRouter, createWebHistory } from "vue-router";

import { HomeView, PlayView } from "../views";

const routes = [
    { path: "/", component: HomeView },
    { path: "/play", component: PlayView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
