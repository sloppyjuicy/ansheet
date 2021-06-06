<template>
  <div>
    <v-row>
      <v-col>
        <h3>{{ student.nombre }}</h3>
        <p><b>Sede: </b>{{ student.sede }}</p>
      </v-col>
      <v-col cols="12">
        <canvas id="general" width="400" height="200"></canvas>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <canvas id="bySubject" width="400" height="200"></canvas>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { makeOptions } from "../../utils/chartOptions.js";
export default {
  name: "ShowGeneralReport",
  props: ["studentExams", "student"],
  methods: {
    /**
     * component methods
     */
    loadCharts(labels, data, id, max, tooltipLabels) {
      const datasets = this.makeDatasets(data, tooltipLabels);
      let ctx = document.getElementById(id);
      new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets,
        },
        options: makeOptions(max), // Imported from general file configurations
      });
    },
    makeDataset(data, tLabel) {
      const bgColor = this.randomBGColors(data.length, 0.2);
      const borderColor = this.randomBGColors(data.length, 1);
      return {
        label: tLabel,
        data,
        backgroundColor: bgColor,
        borderColor,
        borderWidth: 1,
      };
    },
    makeDatasets(data, tooltipLabels) {
      const datasets = [];
      let j = 0;
      for (const d of data) {
        datasets.push(this.makeDataset(d, tooltipLabels[j]));
        j = j + 1;
      }
      return datasets;
    },
    randomBGColors(n, alpha) {
      const colors = [];
      for (let i = 0; i < n; i++) {
        colors.push(this.randomBGColor(alpha));
      }
      return colors;
    },
    randomBGColor(alpha) {
      const red = Math.random() * 256;
      const green = Math.random() * 256;
      const blue = Math.random() * 256;
      return `rgba(${red},${green},${blue},${alpha})`;
    },
    getGenLabelsAndScores(studentExams) {
      let genLabels = [];
      let genScores = [];
      for (const exam of studentExams) {
        genLabels.push(exam.nombre_examen);
        genScores.push(exam.puntajeTotal);
      }
      return { genLabels, genScores };
    },
    getLabelsAndScoresBySubject(studentExams) {
      // Sorting by subject name
      let studentExamsSorted = [];
      for (const se of studentExams) {
        studentExamsSorted.push(
          se.puntajePorMateria.sort((m, n) => {
            if (m.clave > n.clave) return 1;
            else if (m.clave < n.clave) return -1;
            return 0;
          })
        );
      }
      // console.log(studentExamsSorted);
      let labels = studentExamsSorted[0].map((m) => m.nombre);
      let scores = [];
      for (const exam of studentExamsSorted) {
        const tmpScores = exam.map((m) => m.puntaje);
        scores.push(tmpScores);
      }
      return { labels, scores };
    },
  },
  mounted() {
    if (this.studentExams.length > 0) {
      // general scores
      const { genLabels, genScores } = this.getGenLabelsAndScores(
        this.studentExams
      );
      // scores by subjects
      const { labels, scores } = this.getLabelsAndScoresBySubject(
        this.studentExams
      );
      /**
       * Plot the information
       */
      this.loadCharts(genLabels, [genScores], "general", 128, [
        "Aciertos generales",
      ]);
      this.loadCharts(labels, scores, "bySubject", 16, genLabels);
    } else {
      this.$emit(
        "showError",
        "Aún no hay información de este usuario en la BD"
      );
    }
  },
};
</script>
