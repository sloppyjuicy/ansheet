<template>
  <div class="mt-5">
    <!-- Floating button to send answers -->
    <v-btn
      absolute
      fixed
      dark
      fab
      bottom
      right
      color="blue"
      class="mb-10 d-print-none"
      @click="gradeAnswerSheet"
    >
      <v-icon>mdi-send</v-icon>
    </v-btn>
    <v-row class="ml-md-5 mr-md-5">
      <v-col lg="8" md="8" sm="12" cols="12" class="d-flex align-center">
        <h2>
          Hoja de respuestas digital {{ exam.institucion }} {{ exam.annio }}
          {{ exam.area }}
        </h2>
      </v-col>
      <v-col lg="4" md="4" sm="12" cols="12" class="d-flex align-center">
        <v-select
          v-if="students"
          :items="students"
          item-value="alumno_id"
          :item-text="textItem"
          v-model="studentSelected"
          label="Alumno"
        >
          <!-- <template v-slot:item="students">
            HOLA {{ students.nombre }}
          </template> -->
        </v-select>
      </v-col>
    </v-row>
    <v-row v-if="reactivos">
      <v-col cols="12" class="multicol-two text-center">
        <div v-for="n in exam.numReactivos" :key="n">
          <div v-for="materia in exam.materias" :key="materia.nombre">
            <span v-if="n == materia.inicio">
              <b>{{ materia.nombre }}</b></span
            >
          </div>
          <div class="d-inline-block mr-2 number text-center">{{ n }}.</div>
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
  </div>
</template>

<script>
export default {
  name: "AnswerSheet",
  props: ["exam", "students"],
  data: () => ({
    studentSelected: null,
    reactivos: [],
  }),
  computed: {
    opciones() {
      const ops = [];
      for (let i = 0; i < this.exam.numOpciones; i += 1) {
        ops.push(String.fromCharCode(65 + i));
      }
      return ops;
    },
  },
  methods: {
    textItem(item) {
      return `${item.alumno_id} - ${item.nombre}`;
    },
    validate() {
      // Validate selected student
      if (!this.studentSelected) {
        return { state: false, message: "Seleccione un estudiante" };
      }
      // Validate ALL reactives are check
      const unfillReactives = [];
      let hasUndefineds = false;
      this.reactivos.forEach((reactivo, index) => {
        if (reactivo === 0) {
          unfillReactives.push(index + 1);
          hasUndefineds = true;
        }
      });

      if (hasUndefineds === true) {
        return {
          state: false,
          unfilled: unfillReactives,
          message: "No has llenado todos los reactivos",
        };
      }

      return { state: true };
    },
    gradeAnswerSheet() {
      const { state, unfilled, message } = this.validate();
      // TODO:- Print this message somewhere else
      console.log("unfilled reactives are: ", unfilled);
      if (state === false) {
        this.$emit("showError", message);
      } else {
        this.gradingProcess();
      }
    },
    gradingProcess() {
      let sucessAnswersCount = 0;
      let reactiveHeatMap = [];
      let subjectIndex = 0;

      let sucessBySuject = Array(this.exam.materias.length).fill(0);
      for (let i = 0; i < this.exam.numReactivos; i++) {
        if (this.exam.respuestas[i] == this.reactivos[i]) {
          sucessAnswersCount = sucessAnswersCount + 1;
          reactiveHeatMap.push(true);
          sucessBySuject[subjectIndex] = sucessBySuject[subjectIndex] + 1;
        } else {
          reactiveHeatMap.push(false);
        }

        if (i + 1 == this.exam.materias[subjectIndex].fin) {
          subjectIndex = subjectIndex + 1;
        }
      }
      const sucessBySujectFormated = this.formatsucessBySuject(sucessBySuject);
      this.$emit("displayGrades", {
        sucessAnswersCount,
        reactiveHeatMap,
        sucessBySuject: sucessBySujectFormated,
        userAnswers: this.reactivos,
        student: this.getStudentById(this.studentSelected),
        examen_id: this.exam.examen_id,
        exam_name: this.exam.nombre,
        totalReactives: this.exam.numReactivos,
      });
    },
    formatsucessBySuject(gradesBysubject) {
      let subjectsGrades = [];
      this.exam.materias.forEach((s, index) => {
        subjectsGrades.push({
          clave: s.clave,
          nombre: s.nombre,
          puntaje: gradesBysubject[index],
          total: s.fin - s.inicio + 1,
        });
      });
      return subjectsGrades;
    },
    getStudentById(id) {
      const s = this.students.filter((s) => {
        return s.alumno_id == id;
      });
      if (s.length === 1) {
        return s[0];
      } else {
        return {};
      }
    },
    // FOLLOWING CODE IS ONLY FOR TESTING PURPOSES
    TESTING_randomReactives() {
      for (let i = 0; i < this.reactivos.length; i++) {
        let random = Math.floor(Math.random() * 4) + 1;
        this.reactivos[i] = String.fromCharCode(64 + random);
      }
    },
  },
  mounted() {
    if (this.exam) {
      this.reactivos = Array(this.exam.numReactivos).fill(0);
      // Uncomment only when performing test
      // this.TESTING_randomReactives();
    }
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
