<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <router-link :to="{ path: '/' }">
        <v-img
          alt="Ludomatics Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/ludomatics.png')"
          transition="scale-transition"
          width="130"
      /></router-link>
    </div>

    <v-spacer></v-spacer>

    <!-- <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      text
    >
      <span class="mr-2">Puntajes</span>
    </v-btn> -->
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
};
</script>
