import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import Notifications from "@kyvg/vue3-notification";
import { get, set } from "idb-keyval";

get("history_list").then((value) => {
  if (!value) {
    set("history_list", []);
    console.log("history created");
  } else console.log("history is already created ");
});
get("fav_list").then((value) => {
  if (!value) {
    set("fav_list", []);
    console.log("favorite list created");
  } else console.log("favorite list is already created ");
});

createApp(App).use(router).use(Notifications).mount("#app");
