<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">
        NISTA<span style="color: #F44336">GRAM</span>
      </div>

      <v-btn to="/add" text>
        Add
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>
