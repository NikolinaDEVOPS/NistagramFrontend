import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/addAccount",
      name: "addAccount",
      component: () => import("./components/account/AddAccount.vue")
    }
  ]
});
