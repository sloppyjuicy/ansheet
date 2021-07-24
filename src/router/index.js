import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Answers from "@/views/Answers.vue";
import Report from "@/views/MainReport.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/respuestas",
    name: "Respuestas",
    component: Answers,
  },
  {
    path: "/reporte",
    name: "Reporte",
    component: Report,
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
