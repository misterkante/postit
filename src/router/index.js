import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    sensitive: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
