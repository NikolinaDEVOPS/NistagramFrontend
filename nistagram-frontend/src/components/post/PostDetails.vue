<template>
  <div v-if="post" class="account-form py-3 mt-8">
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <v-img
            :src="post.picture"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"          >
            <v-card-title v-text="post.description"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-chip
              v-for="item, index in post.tags"
              :key="index"
              class="ma-2"
              color="red"
              text-color="white"
            >
              {{ item }}
            </v-chip>
            <v-spacer></v-spacer>

            <v-btn icon @click="like(post.postId)">
              {{ post.likedBy.length }}
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon @click="dislike(post.postId)">
              {{ post.dislikedBy.length }}
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>

            <v-btn icon @click="save(post.postId)">
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <h4>Comments</h4>
      <div
        v-for="item, index in post.postComments"
        :key="index">
        <h6 class="pointer" @click="openDetails(item.username)">
          {{ item.username }}
        </h6>
        {{ item.content }}
        <hr >
      </div>
      <v-textarea
        solo
        v-model="comment"
        name="input-7-4"
        label="Solo textarea"
      ></v-textarea>
      <v-btn
          elevation="2"
          class="mt-2"
          @click="addComment(post.postId)"
        >
          Comment
        </v-btn>
    </v-row>
  </div>
</template>

<script>
import PostService from "../../services/PostService";
import UserService from "../../services/UserService";

export default {
  name: "PostDetails",
  data() {
    return {
      post: null,
      comment: "",
    };
  },
  methods: {
    getPost(id) {
      PostService.findByPostId(id)
        .then((response) => {
          this.post = response.data;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    like(id) {
      PostService.like("main", id).then(() => {
        this.getPost(this.post.postId);
      });
    },
    dislike(id) {
      PostService.dislike("main", id).then(() => {
        this.getPost(this.post.postId);
      });
    },
    save(id) {
      UserService.favourites("main", id);
    },
    addComment(id) {
      PostService.comment("main", id, this.comment).then(() => {
        this.getPost(this.post.postId);
        this.comment = ""
      });
    },
    openDetails(id) {
      this.$router.push({ name: "account-details", params: { id: id } });
    },
  },
  mounted() {
    this.message = "";
    this.getPost(this.$route.params.id);
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
