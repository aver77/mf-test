import { createApp } from "vue";
import App from "./App.vue";

const mount = (el) => {
  createApp(App).mount(el);
};

export default mount;

mount("#app");
