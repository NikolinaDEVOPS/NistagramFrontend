<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Account</p>

    <div v-if="!submitted">
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

      <v-btn color="primary" class="mt-3" @click="save">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add Account.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="refresh">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import UserService from "../../services/UserService";

export default {
  name: "add-tutorial",
  data() {
    return {
      account: {
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

      UserService.save(this.account)
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
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
