<template>
  <v-container fluid>
    <!-- snackNotificationMessage snackbar component -->
    <v-snackbar v-model="snack">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snack = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <div v-if="terminado === false">
      <v-row class="ml-md-5 mr-md-5">
        <v-col cols="8" class="d-flex align-center">
          <h2>
            Hoja de respuestas digital {{ examen.institucion }}
            {{ examen.annio }} {{ examen.area }}
          </h2>
        </v-col>
        <v-col cols="4" class="d-flex align-center">
          <v-text-field label="ID del alumno" v-model="alumnoID"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="multicol-two text-center">
          <div v-for="n in examen.numReactivos" :key="n">
            <div v-for="materia in examen.materias" :key="materia.nombre">
              <span v-if="n == materia.inicio">
                <b>{{ materia.nombre }}</b></span
              >
            </div>
            <div class="d-inline-block mr-2 number text-center">{{ n }}.</div>
            <!-- Necesita de internet para mostrar el simbolo de reactivo -->
            <!-- <v-radio-group v-model="reactivos[n]" row class="d-inline-block">
            <v-radio
              v-for="(opcion, index) in opciones"
              :key="index"
              :label="opcion"
              :value="`${n}-${index}-${opcion}`"
            ></v-radio>
          </v-radio-group> -->
            <div
              v-for="(opcion, index) in opciones"
              :key="index"
              class="d-inline"
            >
              <label class="mr-1">{{ opcion }}</label>
              <input
                :name="n"
                :value="opcion"
                type="radio"
                class="mr-3 mb-5"
                v-model="reactivos[n - 1]"
              />
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn outlined large color="indigo" @click="validar">Enviar</v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12">
          <h2>
            Resultados {{ examen.institucion }} {{ examen.annio }}
            {{ examen.area }}
          </h2>
          <h2>Rodrigo Francisco</h2>
          <h3>Aciertos totales 128/128</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <div class="mb-2">
            <span><b>Matematicas</b></span> <span>10/12</span>
            <v-progress-linear rounded value="30" height="25">
              <!-- <strong>{{ Math.ceil(knowledge) }}%</strong> -->
            </v-progress-linear>
          </div>
          <div class="mb-2">
            <span><b>Español</b></span> <span>10/12</span>
            <v-progress-linear rounded value="30" height="25">
              <!-- <strong>{{ Math.ceil(knowledge) }}%</strong> -->
            </v-progress-linear>
          </div>
        </v-col>
        <v-col cols="6" class="multicol-narrowed">
          <ol>
            <li v-for="n in 128" :key="n">
              n <span><b class="danger">A</b></span>
            </li>
          </ol>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import faker from "../faker/comu2018";

export default {
  data: () => ({
    // Alert a message
    snack: false,
    message: "",
    terminado: false,
    reactivos: Array.from({ length: 128 }),
    examen: faker,
    alumnoID: "",
  }),
  computed: {
    opciones() {
      const ops = [];
      for (let i = 0; i < this.examen.numOpciones; i += 1) {
        ops.push(String.fromCharCode(65 + i));
      }
      return ops;
    },
  },
  methods: {
    validar() {
      if (this.alumnoID.length >= 4) {
        console.log("Calificar");
        this.terminado = true;
      } else {
        this.message = "Ingrese un ID válido";
        this.snack = true;
      }
    },
  },
};
</script>

<style scoped>
.number {
  width: 30px;
  height: 30px;
  background-color: #a09bf2;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.multicol-two {
  column-count: 3;
}

.multicol-narrowed {
  column-count: 10;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .multicol-two {
    column-count: 1;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .multicol-two {
    column-count: 2;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .multicol-two {
    column-count: 2;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .multicol-two {
    column-count: 3;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .multicol-two {
    column-count: 4;
  }
}
</style>
