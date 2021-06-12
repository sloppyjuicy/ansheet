<template>
  <v-row>
    <v-col cols="6" v-for="(curso, index) in cursos" :key="index">
      <v-card class="mx-auto" max-width="800">
        <v-img
          class="white--text align-end"
          height="400px"
          :src="require(`@/assets/${curso.imagen}`)"
        >
          <v-card-title>{{ curso.nombre }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">
          Hoja de respuestas digital para examen {{ curso.nombre }}
        </v-card-subtitle>

        <v-card-actions>
          <router-link :to="{ path: '/examen', query: { examen: 'Holi' } }"
            >Abrir</router-link
          >
          <!-- Testing with orange button -->
          <!-- <v-btn color="orange" text> Abrir </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
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
