<template>
  <div v-if="post" class="account-form py-3 mt-8">
    <h3>Campaign Details</h3>
    Start Date: {{post.startDate}}
    <br />
    <v-btn v-if="checkMyCampaign" color="primary" class="mt-3" @click="deleteCampaign">Delete</v-btn>

    <v-row dense>
        <v-col
          class="mt-10"
          v-for="card, index in post.ads"
          :key="index"
          cols="3"
        >
          <v-card>
            <v-img
              :src="card.imagePath"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.website"></v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import CampaignService from '../../services/CampaignService';


export default {
  name: "CampaignDetails",
  data() {
    return {
      post: null,
      comment: "",
    };
  },
  methods: {
    getCampaign(id) {
      CampaignService.findById(id)
        .then((response) => {
          this.post = response.data;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteCampaign() {
      CampaignService.delete(this.$route.params.id)
        .then(() => {
          this.$router.push({name: "account-details", id: this.post.username})
        });
    },
    checkMyCampaign() {
      return this.post.username === "Nina"
    }
  },
  mounted() {
    this.message = "";
    this.getCampaign(this.$route.params.id);
  },
};
</script>

<style>
.account-form {
  max-width: 1200px;
  margin: auto;
}
.pointer {
  cursor: pointer;
}
</style>
