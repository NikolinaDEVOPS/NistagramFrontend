import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/account/add",
      name: "addAccount",
      component: () => import("./components/account/AddAccount.vue")
    },
    {
      path: "/account/:id/update",
      name: "edit-account",
      component: () => import("./components/account/EditAccount.vue")
    },
    {
      path: "/account/:id",
      name: "account-details",
      component: () => import("./components/account/AccountDetails.vue")
    },
    {
      path: "/account/:id/:type",
      name: "account-list",
      component: () => import("./components/account/AccountList.vue")
    },
  ]
});
