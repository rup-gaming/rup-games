import { createApp } from "vue";

import App from "./App.vue";
import router from "./navigation/router";

// General Font
import "vfonts/Lato.css";
// Monospace Font
import "vfonts/FiraCode.css";

const vueApp = createApp(App);

vueApp.use(router);

vueApp.mount("#app");
