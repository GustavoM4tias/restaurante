// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "../../frontend/src/router";
import { createPinia } from "pinia";
import './assets/tailwind.css'; // Adjust the path as needed

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
