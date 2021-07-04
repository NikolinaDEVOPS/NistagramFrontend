<template>
  <div v-if="account" class="account-form py-3 mt-8">
    <v-row class="account-header">
      <v-col>
        <v-avatar color="red" size="250">
          <span class="white--text text-h2">{{account.name[0]}} {{account.surname[0]}}</span>
        </v-avatar>
      </v-col>
      <v-col>
        <h1>{{account.username}}</h1>
        <p>
          <b>Account Informations</b> <br/>
          {{account.name}} {{account.surname}} <br />
          {{account.birthDate}} | {{account.sex}} <br />
          <b>Biography</b> <br/>
          {{account.biography}} <br />
          <b>Website</b><br />
          {{account.website}} <br /><br />

          <b> Followers</b> {{followers.length}} <br />
          <b> Following </b> {{following.length}} <br />

          <v-btn
            elevation="2"
            class="mt-2"
            @click="follow"
          >
            {{ userFollow ? "Following" : "Follow" }}
          </v-btn>
          </p>
      </v-col>
    </v-row>
    <hr>
    <v-row>
      <v-col v-if="!account.isPublic && !userFollow" class="text-center mt-8">
        <h3>This account is private.</h3>
        <small>Follow this account to see their photos.</small>
      </v-col>
      <v-col v-else>
        <div v-if="campaigns.length">
          <h4>CAMPAIGNS</h4>
          <campaign-list :posts="campaigns"></campaign-list>
          <hr>
        </div>
        <post-list :posts="posts"></post-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserService from "../../services/UserService";
import PostService from "../../services/PostService";
import CampaignService from "../../services/CampaignService";

import PostList from '../post/PostList.vue';
import CampaignList from '../campaign/CampaignList.vue';

export default {
  components: { PostList, CampaignList },
  name: "AccountDetails",
  data() {
    return {
      account: null,
      posts: null,
      followers: [],
      following: [],
      userFollow: false,
      message: "",
      campaigns: []
    };
  },
  methods: {
    getAccount(id) {
      UserService.get(id)
        .then((response) => {
          this.account = response.data;
          if (this.account.isPublic) this.getPosts(id);

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
        this.getFollowers(id);
        this.getFollowing(id);
    },
    getFollowers(id) {
      UserService.getFollowers(id)
        .then((response) => {
          this.followers = response.data;
          console.log(this.followers);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getFollowing(id) {
      UserService.getFollowing(id)
        .then((response) => {
          this.following = response.data;
          console.log(this.following);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    checkUserFollows(id) {
      UserService.checkUserFollows("main", id)
        .then((response) => {
          this.userFollow = response.data;
          if (this.userFollow && !this.account.isPublic) this.getPosts(id);
          console.log("CHECK", this.userFollow);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    follow() {
      if (this.userFollow) return;
      UserService.follow("main", this.account.username).then((response) => {
          this.userFollow = response.data;
          console.log(this.userFollow);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPosts(username) {
      PostService.findByUsername(username)
        .then((response) => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCampaign(username) {
      CampaignService.findByUsername(username)
        .then((response) => {
          this.campaigns = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = "";
    this.getAccount(this.$route.params.id);
    this.checkUserFollows(this.$route.params.id);
    this.getCampaign(this.$route.params.id)
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
