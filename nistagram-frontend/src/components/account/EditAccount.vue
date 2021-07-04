<template>
  <div class="submit-form mt-3 mx-auto">
    <h2>Account</h2>

    <div class="mt-8">
      <h4>Update profile informations</h4>
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="account.username"
          :rules="[(v) => !!v || 'Username is required']"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="account.name"
          :rules="[(v) => !!v || 'Name is required']"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="account.surname"
          :rules="[(v) => !!v || 'Surname is required']"
          label="Surname"
          required
        ></v-text-field>

        <v-text-field
          v-model="account.phoneNumber"
          :rules="[(v) => !!v || 'Phone number is required']"
          label="Phone number"
          type="number"
          required
        ></v-text-field>

        <v-text-field
          v-model="account.sex"
          :rules="[(v) => !!v || 'Gender is required']"
          label="Gender"
          required
        ></v-text-field>

        <v-text-field
          v-model="account.birthDate"
          :rules="[(v) => !!v || 'Birth Date is required']"
          label="Birth Date"
          required
        ></v-text-field>

        <v-text-field
          v-model="account.website"
          :rules="[(v) => !!v || 'Website is required']"
          label="Website"
          required
        ></v-text-field>

        <v-text-field
          v-model="account.biography"
          :rules="[(v) => !!v || 'Biography is required']"
          label="Biography"
          required
        ></v-text-field>

      </v-form>

      <v-btn color="primary" class="mt-3 mb-5" @click="save">Update</v-btn>
      <h4>Profile privacy</h4>

      <v-btn color="primary" class="mt-3 mb-5" @click="updatePrivacy">{{ account.isPublic ? "Set Private"  : "Set Public "}} </v-btn>

      <v-alert type="success" v-if="submitted">
        Profile updated.
      </v-alert>
    </div>
  </div>
</template>

<script>
import UserService from "../../services/UserService";

export default {
  name: "edit-account",
  data() {
    return {
      account: {
        userId: "",
        username : "",
        name : "",
        surname : "",
        phoneNumber : null,
        sex: "",
        birthDate : "",
        website: "",
        biography: "",
        isPublic: true
      },
      submitted: false,
    };
  },
  methods: {
    save() {
      UserService.update(this.account.username, this.account)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAccount(id) {
      console.log(11)
      UserService.get(id)
        .then((response) => {
          this.account = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updatePrivacy() {
      if (this.account.isPublic) {
        this.account.isPublic = false;

        UserService.setPrivate(this.account.username)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
        return;
      }
      this.account.isPublic = true;

      UserService.setPublic(this.account.username)
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
      this.account = {};
    },
  },
  mounted() {
    this.message = "";
    this.getAccount(this.$route.params.id);
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
