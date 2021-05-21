<template>
  <v-container>
    <v-row class="justify-center mt-4">
      <v-col cols="5" v-for="(curso, index) in cursos" :key="index">
        <router-link
          :to="{ path: '/examen' }"
          style="text-decoration: none; color: inherit"
        >
          <v-card class="mx-auto">
            <v-img
              :src="require(`@/assets/${curso.imagen}`)"
              height="300px"
            ></v-img>
            <v-card-title class="justify-center">
              {{ curso.nombre }}
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    cursos: [
      {
        nombre: "Universidad",
        link: "as",
        imagen: "math.jpg",
      },
      { nombre: "COMIPEMS", link: "as", imagen: "physics.jpg" },
    ],
  }),
};
</script>
