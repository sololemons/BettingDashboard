import "./assets/styles.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
axios.defaults.baseURL = "http://51.20.190.211/";

app.mount("#app");
