<template>
  <div v-if="campaigns.length" class="account-form py-3 mt-8">
    <h4>MY CAMPAIGNS</h4>
    <campaign-list :posts="campaigns"></campaign-list>
    <hr>
  </div>
</template>

<script>
import CampaignService from "../../services/CampaignService";

import CampaignList from '../campaign/CampaignList.vue';

export default {
  components: { CampaignList },
  name: "AccountDetails",
  data() {
    return {
      campaigns: []
    };
  },
  methods: {
    getCampaigns(id) {
      CampaignService.myCampaign(id)
        .then((response) => {
          this.campaigns = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

  },
  mounted() {
    this.message = "";
    this.getCampaigns("main");
  }
};
</script>

<style>
.account-form {
  max-width: 1200px;
  margin: auto;
}
.account-header {
  max-width: 800px;
    margin: auto;

}
</style>
