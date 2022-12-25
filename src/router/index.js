import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  createMemoryHistory,
} from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/explore",
    name: "explore",
    component: () => {
      return import("../views/ExploreView.vue");
    },
  },
  {
    path: "/explore/:provider",
    name: "exploreViaProvider",
    component: () => {
      return import("../views/ExploreView.vue");
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/AboutView.vue");
    },
  },
  {
    path: "/history",
    name: "history",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/HistoryView.vue");
    },
  },
  {
    path: "/:provider/:id",
    name: "showViaId",
    component: () => {
      return import("../views/ShowView.vue");
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: () => {
      return import("../views/SettingsView.vue");
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: function () {
      return import("../views/errors/404.vue");
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
