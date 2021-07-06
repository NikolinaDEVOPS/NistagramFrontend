<template>
  <div class="account-form py-3 mt-8">
    <h4>Requests</h4>
    <span v-if="!requests.length">No Agent requests available.</span>
    <v-simple-table v-if="requests.length">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Username
            </th>
            <th>Email</th>
            <th>Website</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item, index in requests"
            :key="index"
          >
            <td @click="openDetails(item.username)">
               {{ item.username }}
            </td>
            <td>{{ item.email }}
            </td>
            <td>{{ item.website }}
            </td>
            <td>
              <v-btn color="primary" class="mt-3 mb-5" @click="accept(item.agentId, item.index)">Accept</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <hr>
    <h4>Agents</h4>
    <span v-if="!agents.length">No Agents available.</span>

    <v-simple-table v-if="agents.length">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Username
            </th>
            <th>Email</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item, index in agents"
            :key="index"
          >
            <td @click="openDetails(item.username)">
               {{ item.username }}
            </td>
            <td>{{ item.email }}
            </td>
            <td>{{ item.website }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import CampaignService from "../../services/CampaignService";

export default {
  name: "Agents",
  data() {
    return {
      requests: [],
      agents: []
    };
  },
  methods: {
    getRequests() {
      CampaignService.requests()
        .then((response) => {
          this.requests = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAgents() {
      CampaignService.agents()
        .then((response) => {
          this.agents = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    openDetails(id) {
      this.$router.push({ name: "account-details", params: { id: id } });
    },
    accept(userToAccept, index) {
      CampaignService.approveAgent(userToAccept).then(() => {
          this.agents.push(this.requests[index])
          this.requests.splice(index, 1)
        })
        .catch((e) => {
          console.log(e);
        });
    }

  },
  mounted() {
    this.message = "";
    this.getRequests();
    this.getAgents();

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
