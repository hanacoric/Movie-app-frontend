import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";
import "./style.css";
import { VueReCaptcha } from "vue-recaptcha-v3";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
app.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
  loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: false,
  },
});
