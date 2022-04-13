import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./navigation/router";

// General Font
import "vfonts/Lato.css";
// Monospace Font
import "vfonts/FiraCode.css";
// Custom CSS
import "./main.css";

const pinia = createPinia();
const vueApp = createApp(App);

vueApp.use(router);
vueApp.use(pinia);

vueApp.mount("#app");
