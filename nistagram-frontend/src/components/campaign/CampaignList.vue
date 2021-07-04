<template>
  <div>
    <v-row dense>
        <v-col
          class="pointer"
          @click="openDetails(card.campaignId)"
          v-for="card, index in posts"
          :key="index"
          cols="3"
        >
          <v-card>
            <v-img
              v-if="card.ads[0]"
              :src="card.ads[0].imagePath"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.startDate"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>
              {{ card.ads.length }} Ads | {{card.gender}}
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
  name: "campaign-list",
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
      this.$router.push({ name: "campaign-details", params: { id: id } });
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
