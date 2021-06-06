<template>
  <div class="mt-5">
    <v-row>
      <v-col cols="12">
        <h3>
          Resultados {{ exam.institucion }} {{ exam.annio }}
          {{ exam.area }}
        </h3>
        <h3>{{ results.student.nombre }}</h3>
        <h5>
          Aciertos totales {{ results.sucessAnswersCount }}/{{
            exam.numReactivos
          }}
        </h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="5" md="5" cols="12">
        <div
          class="mb-2"
          v-for="(subject, index) in exam.materias"
          :key="index"
        >
          <span
            ><b>{{ subject.nombre }}</b></span
          >
          <span>
            {{ results.sucessBySuject[index].puntaje }} /{{
              subjectTotalReactives(subject.inicio, subject.fin)
            }}</span
          >
          <v-progress-linear
            rounded
            :value="
              subjectProgress(
                results.sucessBySuject[index].puntaje,
                subjectTotalReactives(subject.inicio, subject.fin)
              )
            "
            height="12"
          >
          </v-progress-linear>
        </div>
      </v-col>
      <v-col lg="7" md="7" cols="12" class="multicol-narrowed">
        <ol>
          <div v-for="(r, n) in results.reactiveHeatMap" :key="n">
            <div
              v-for="materia in exam.materias"
              :key="materia.nombre"
              class="subjectStyle"
            >
              <span v-if="n + 1 == materia.inicio">
                <b>{{ shortName(materia.nombre) }}</b></span
              >
            </div>
            <li :class="{ good: r }">
              {{ results.userAnswers[n] }}
              <b><span v-html="gradeSymbol(r, n)"></span></b>
            </li>
          </div>
        </ol>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ExamReport",
  props: ["exam", "results"],
  methods: {
    subjectProgress(score, total) {
      return (score / total) * 100;
    },
    subjectTotalReactives(start, end) {
      return end - start + 1;
    },
    gradeSymbol(state, index) {
      return state === true ? "&#x2714" : this.exam.respuestas[index];
    },
    shortName(string) {
      return string.slice(0, 8) + "..";
    },
  },
};
</script>

<style>
.multicol-narrowed {
  column-count: 10;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .multicol-narrowed {
    column-count: 4;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .multicol-narrowed {
    column-count: 6;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .multicol-narrowed {
    column-count: 7;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .multicol-narrowed {
    column-count: 9;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .multicol-narrowed {
    column-count: 10;
  }
}

.error {
  color: red;
}
.good {
  color: green;
}

.subjectStyle {
  font-variant: small-caps;
  margin-left: -25px;
  font-size: 12px;
}
</style>
