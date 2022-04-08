import Vue from "vue";
import { createRouter } from "vue-router";
import Home from "../pages/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
];

const router = createRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
