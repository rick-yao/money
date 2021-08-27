import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Navbar from "@/components/Navbar.vue";

Vue.config.productionTip = false;
Vue.component("Navbar", Navbar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
