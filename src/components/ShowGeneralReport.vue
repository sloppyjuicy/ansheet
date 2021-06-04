<template>
  <v-container>
    <v-row>
      <v-col>
        <canvas id="general" width="400" height="200"></canvas>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <canvas id="bySubject" width="400" height="200"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "chart.js/auto";
import { mapGetters, mapActions } from "vuex";
import { makeOptions } from "../../utils/chartOptions.js";
export default {
  name: "Report",
  data: () => ({
    type: "comipems",
    // studentID: "4vVoif92VpDMtNUXma63",
    studentID: "qntx83KqvsuGl1x9ZI6S",
  }),
  computed: {
    ...mapGetters({ studentExams: "getStudentExams" }),
  },
  methods: {
    /**
     * VUEX import methods
     */
    ...mapActions({ getStudentExams: "getStudentExamFromDB" }),
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
      let labels = studentExams[0].puntajePorMateria.map((m) => m.nombre);
      let scores = [];
      for (const exam of studentExams) {
        const tmpScores = exam.puntajePorMateria.map((m) => m.puntaje);
        scores.push(tmpScores);
      }
      return { labels, scores };
    },
  },
  mounted() {
    /**
     * 1)
     * Get data from DB
     * Process data as { label, data } array elements
     * There are 2 types of data:
     *    data for general score
     *    data for subject score
     */
    this.getStudentExams({ student_id: this.studentID, type: this.type }).then(
      () => {
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
           * 2)
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
      }
    );
  },
};
</script>
