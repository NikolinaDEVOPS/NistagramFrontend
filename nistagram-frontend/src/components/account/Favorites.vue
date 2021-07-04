<template>
  <div v-if="posts" class="account-form py-3 mt-8">
    <h1>Favorites</h1>
    <post-list :posts="posts"></post-list>
  </div>
</template>

<script>
import UserService from "../../services/UserService";
import PostList from '../post/PostList.vue';

export default {
  components: { PostList },
  name: "Favorites",
  data() {
    return {
      posts: null
    };
  },
  methods: {
    getFavorites(id) {
      UserService.getFavorites(id)
        .then((response) => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getFavorites(this.$route.params.id);
  },
};
</script>

<style>
.account-form {
  max-width: 1200px;
  margin: auto;
}
</style>
