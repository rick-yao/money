import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Money from "@/views/Money.vue";
import Labels from "@/views/Labels.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";
import LabelEdit from "@/components/Label/LabelEdit.vue";
import recordPage from "@/views/recordPage.vue";

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
    path: "/labels",
    component: Labels,
  },
  {
    path: "/statistics",
    component: recordPage,
  },
  {
    path: "/labels/edit/:id",
    component: LabelEdit,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
