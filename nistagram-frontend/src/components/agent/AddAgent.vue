<template>
  <div class="submit-form mt-10 mx-auto">
    <p class="headline">Agent Request</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="agent.email"
          label="Email"

        ></v-text-field>

        <v-text-field
          v-model="agent.website"
          label="Website"
        ></v-text-field>
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
  name: "add-agent",
  data() {
    return {
      agent: {
        username: "nina",
        email : "",
        website : "",
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

      CampaignService.saveAgent(this.agent)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 1200px;
}
</style>
