<template>
  <div>
    <!-- Alert message component -->
    <v-snackbar v-model="snackVisibility">
      {{ messageAlert }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackVisibility = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Render answersheet or exam report -->
    <!-- But exam has to load first of that reason we have 
    the <div v-if="exam"> -->
    <div v-if="exam">
      <answer-sheet
        v-if="finished === false"
        :exam="exam"
        :examType="examType"
        :students="students"
        @showError="showSnackMessage"
        @displayGrades="setReportData"
      />
      <exam-report v-else :exam="exam" :results="resultData" />
    </div>
  </div>
</template>
<script>
import ExamReport from "@/components/ExamReport.vue";
import AnswerSheet from "@/components/AnswerSheet.vue";
import { mapActions } from "vuex";

export default {
  name: "Exam",
  components: {
    ExamReport,
    AnswerSheet,
  },
  props: ["exam", "students", "examType"],
  data: () => ({
    snackVisibility: false,
    messageAlert: "",
    finished: false,
    resultData: {},
  }),
  methods: {
    /**
     * VUEX import methods
     */
    ...mapActions({
      saveExam: "saveScoreinDB",
    }),
    /**
     * Component methods
     */
    showSnackMessage(message) {
      this.messageAlert = message;
      this.snackVisibility = true;
    },
    setReportData(payload) {
      this.resultData = payload;
      this.saveExam({ ...payload, type: this.examType })
        .then(() => {
          this.showSnackMessage("Guardado con éxito");
          this.finished = true;
        })
        .catch((error) => {
          this.showSnackMessage("Problemas al guardar en la base de datos");
          this.finished = true;
          console.log(error);
        });
    },
  },
};
</script>
