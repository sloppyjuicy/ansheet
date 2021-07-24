<template>
  <div class="mt-1 ml-5">
    <v-row v-if="exam">
      <v-col cols="12">
        <h3>
          {{ exam.tipo.toUpperCase() }} {{ exam.institucion }}
          {{ exam.annio }}
          {{ exam.area }}
        </h3>
      </v-col>
      <v-col cols="12" class="multicol">
        <ol>
          <li v-for="(respuesta, index) in exam.respuestas" :key="index">
            {{ respuesta }}
          </li>
        </ol>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ShowAnswers",
  props: ["exam"],
};
</script>

<style scoped>
.multicol {
  column-count: 3;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .multicol {
    column-count: 1;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .multicol {
    column-count: 2;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .multicol {
    column-count: 2;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .multicol {
    column-count: 5;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .multicol {
    column-count: 6;
  }
}
</style>
