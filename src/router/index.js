import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/payroll",
      name: "payroll",
      component: () => import("../views/PayrollView.vue"),
    },
    {
      path: "/timeoff",
      name: "timeoff",
      component: () => import("../views/TimeOffView.vue"),
    },
  ],
});

export default router;
