import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "notes",
    component: () => import("../views/Notes.vue"),
  },
  {
    path: "/note/:id",
    name: "note",
    sensitive: true,
    component: () => import("../views/Note.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
