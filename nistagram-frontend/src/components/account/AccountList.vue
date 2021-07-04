<template>
  <div class="account-form py-3 mt-8">
    <h3 class="text-capitalize">{{  this.$route.params.type }}</h3>
      <v-simple-table v-if="accounts.length">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              #
            </th>
            <th class="text-left">
              Username
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item, index in accounts"
            :key="index"
            @click="openDetails(item.username)"
          >
            <td>
               <v-avatar color="red" size="30">
                <span class="white--text">{{item.name[0]}} {{item.surname[0]}}</span>
              </v-avatar>
            </td>
            <td>{{ item.username }}
            </td>
            <td>
              <v-btn color="success" class="mt-3 mb-5" v-if="$route.params.type === 'requests'" @click="accept(item.username, item.index)">Accept</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import UserService from "../../services/UserService";

export default {
  name: "AccountDetails",
  data() {
    return {
      accounts: [],
    };
  },
  methods: {
    getFollowers(id) {
      UserService.getFollowers(id)
        .then((response) => {
          this.accounts = response.data;
          console.log(this.accounts);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getFollowing(id) {
      UserService.getFollowing(id)
        .then((response) => {
          this.accounts = response.data;
          console.log(this.accounts);
        })
        .catch((e) => {
          console.log(e);
        });
    },
     getRequests(id) {
      UserService.getRequests(id)
        .then((response) => {
          this.accounts = response.data;
          console.log(this.accounts);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    openDetails(id) {
      this.$router.push({ name: "account-details", params: { id: id } });
    },
    accept(userToAccept, index) {
      UserService.accept(this.$route.params.id, userToAccept).then((response) => {
          this.accounts.splice(index, 1)
          this.userFollow = response.data;
          console.log(this.userFollow);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = "";
    const type = this.$route.params.type;
    switch(type){
      case "following":
        this.getFollowing(this.$route.params.id);
        break;
      case "followers":
        this.getFollowers(this.$route.params.id);
        break;
      case "requests":
        this.getRequests(this.$route.params.id);
        break;
    }
  },
};
</script>

<style>
.account-form {
  max-width: 1200px;
  margin: auto;
}

tr {
  cursor: pointer;
}
</style>
