<template>
  <div>
    <v-row dense>
        <v-col
          class="pointer"
          @click="openDetails(card.postId)"
          v-for="card, index in posts"
          :key="index"
          cols="3"
        >
          <v-card>
            <v-img
              :src="card.picture"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.description"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon @click="like(card.postId)">
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon @click="dislike(card.postId)">
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>

              <v-btn icon @click="save(card.postId)">
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import PostService from '../../services/PostService';
import UserService from '../../services/UserService';

export default {
  name: "add-post",
  props: ['posts'],
  methods: {
    like(id) {
      PostService.like("main", id);
    },
    dislike(id) {
      PostService.dislike("main", id);
    },
    save(id) {
      UserService.favourites("main", id);
    },
    openDetails(id) {
      this.$router.push({ name: "post-details", params: { id: id } });
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
.pointer {
  cursor: pointer;
}
</style>
