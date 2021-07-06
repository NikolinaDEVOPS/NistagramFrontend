import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./components/HelloWorld.vue")
    },
    {
      path: "/account/add",
      name: "addAccount",
      component: () => import("./components/account/AddAccount.vue")
    },
    {
      path: "/account/:id/update",
      name: "edit-account",
      component: () => import("./components/account/EditAccount.vue")
    },
    {
      path: "/account/:id/favorites",
      name: "favorites",
      component: () => import("./components/account/Favorites.vue")
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
    {
      path: "/post/add",
      name: "add-post",
      component: () => import("./components/post/AddPost.vue")
    }
    ,{
      path: "/post/:id",
      name: "post-details",
      component: () => import("./components/post/PostDetails.vue")
    },
    {
      path: "/search",
      name: "search-account",
      component: () => import("./components/account/Search.vue")
    },
    {
      path: "/campaign/add",
      name: "add-campaign",
      component: () => import("./components/campaign/AddCampaign.vue")
    },
    {
      path: "/campaign/:id",
      name: "campaign-details",
      component: () => import("./components/campaign/CampaignDetails.vue")
    },
    {
      path: "/campaigns",
      name: "campaigns-details",
      component: () => import("./components/campaign/MyCampaigns.vue")
    },
    {
      path: "/agent/add",
      name: "add-agent",
      component: () => import("./components/agent/AddAgent.vue")
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("./components/agent/AgentList.vue")
    },
  ]
});
