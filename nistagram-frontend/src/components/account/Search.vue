<template>
  <div class="account-form py-3 mt-8">
    <h3 class="text-capitalize">Search</h3>
      <v-autocomplete
        v-model="select"
        :items="accounts"
        @change="openDetails"
        item-text="username"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="Search public accounts.."
        solo-inverted
      ></v-autocomplete>
      <h3 class="mt-10">Search tags</h3>
      <v-text-field
          v-model="tag"
          label="Tag"
        ></v-text-field>
      <v-btn color="primary" class="mt-3" @click="search">Submit</v-btn>

      <post-list v-if="posts" :posts="posts"></post-list>
  </div>
</template>

<script>
import PostService from '../../services/PostService';
import UserService from "../../services/UserService";
import PostList from '../post/PostList.vue';

export default {
  components: { PostList },
  name: "Search",
  data() {
    return {
      accounts: [],
      posts: [],
      tag: "",
      select: ""
    };
  },
  methods: {
    getPublic(id) {
      UserService.getPublicAccounts(id)
        .then((response) => {
          this.accounts = response.data;
          console.log(this.accounts);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    search() {
      console.log("search")
      PostService.search(this.tag)
        .then((response) => {
          this.posts = response.data;
          console.log(this.posts);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    openDetails() {
      const id = this.select;
      this.$router.push({ name: "account-details", params: { id: id } });
    },

  },
  mounted() {
    this.getPublic();
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
