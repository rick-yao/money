import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Money from "@/views/Money.vue";
import Labels from "@/views/Labels.vue";
import Statistics from "@/views/Statistics.vue";
import RecordEdit from "@/components/RecordEdit.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/labels",
  },
  {
    path: "/money",
    component: Money,
  },
  {
    path: "/records",
    component: Labels,
  },
  {
    path: "/statistics",
    component: Statistics,
  },
  {
    path: "/records/edit/:id",
    component: RecordEdit,
  },
  {
    path: "*",
    redirect: "/records",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
