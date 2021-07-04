<template>
  <div class="submit-form mt-10 mx-auto">
    <p class="headline">Add post</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="post.description"
          :rules="[(v) => !!v || 'Description is required']"
          label="Description"
          required
        ></v-text-field>

        <v-text-field
          v-model="post.picture"
          :rules="[(v) => !!v || 'Picture is required']"
          label="Picture"
          required
        ></v-text-field>

        <v-text-field
          v-model="tag"
          label="Tags"
          required
          @keydown.space="addTag"
        ></v-text-field>
        <v-chip
          v-for="item, index in post.tags"
          :key="index"
          class="ma-2"
          close
          color="red"
          text-color="white"
          @click:close="removeTag(index)"
        >
          {{ item }}
        </v-chip>
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
import PostService from "../../services/PostService";

export default {
  name: "add-post",
  data() {
    return {
      post: {
        username: "nina",
        description : "",
        picture : "",
        tags: []
      },
      tag: "",
      submitted: false,
    };
  },
  methods: {
    save() {

      PostService.save(this.post)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refresh() {
      this.submitted = false;
      this.post = {};
    },

    addTag() {
      this.post.tags.push(this.tag);
      this.tag = "";
    },
    removeTag(index) {
      this.post.tags.splice(index, 1);
    }
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
