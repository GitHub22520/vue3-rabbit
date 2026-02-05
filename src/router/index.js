import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      component: () => import("@/views/Layout/index.vue"),
      children: [
        {
          // 默认二级路由： path为空
          path: "category",
          component: () => import("@/views/Category/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/Login/index.vue"),
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});

export default router;
