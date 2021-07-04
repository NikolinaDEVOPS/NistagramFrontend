<template>
  <div class="submit-form mt-10 mx-auto">
    <p class="headline">Add campaign</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="campaign.gender"
          label="Gender"

        ></v-text-field>

        <v-text-field
          v-model="campaign.startDate"
          label="Start Date"

        ></v-text-field>

        <h4>Ads</h4>
        <v-text-field
          v-model="ad.imagePath"
          label="Image Path"

        ></v-text-field>
        <v-text-field
          v-model="ad.website"
          label="Ad website"
        ></v-text-field>
        <v-btn color="primary" class="mt-3" @click="addAd">Add ad</v-btn>

        <v-simple-table v-if="campaign.ads.length">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Image Path
                </th>
                <th class="text-left">
                  Website
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item, index in campaign.ads"
                :key="index"
              >
                <td>
                  {{ item.imagePath }}
                </td>
                <td>{{ item.website }}
                </td>
                <td>
                  <v-btn color="danger" class="mt-3 mb-5" @click="deleteAd(index)">Delete</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="save">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script>
import CampaignService from "../../services/CampaignService";

export default {
  name: "add-campaign",
  data() {
    return {
      campaign: {
        username: "nina",
        gender : "",
        startDate : "",
        ads: []
      },
      ad: {
        imagePath: "",
        website: ""
      },
      submitted: false,
    };
  },
  methods: {
    save() {

      CampaignService.save(this.campaign)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addAd() {
      this.campaign.ads.push(this.ad);
    },
    deleteAd(id) {
      this.campaign.ads.slice(id, 1);
    },
    refresh() {
      this.submitted = false;
      this.ads = {};
    },

  },
};
</script>

<style>
.submit-form {
  max-width: 1200px;
}
</style>
