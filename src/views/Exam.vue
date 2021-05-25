<template>
  <v-container fluid>
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
    the <div v-i="exam"> -->
    <div v-if="exam">
      <answer-sheet
        v-if="finished === false"
        :exam="exam"
        :students="students"
        @showError="showSnackMessage"
        @displayGrades="setReportData"
      />
      <exam-report v-else :exam="exam" :results="resultData" />
    </div>
  </v-container>
</template>
<script>
import ExamReport from "@/components/ExamReport.vue";
import AnswerSheet from "@/components/AnswerSheet.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Exam",
  components: {
    ExamReport,
    AnswerSheet,
  },
  data: () => ({
    snackVisibility: false,
    messageAlert: "",
    finished: false,
    examID: "faTusRgcmgf9UuhSrmnO",
    examType: "universidad",
    resultData: {},
  }),
  computed: {
    /**
     * VUEX import methods
     */
    ...mapGetters({ exam: "getExam", students: "getStudents" }),
  },
  methods: {
    /**
     * VUEX import methods
     */
    ...mapActions({
      getExam: "getExamFromDB",
      getStudents: "getStudentsFromDB",
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
      this.saveExam(payload)
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
  created() {
    this.getExam({ type: this.examType, examID: this.examID });
    // this.getStudents({ type: this.examType });
    // FOR TESTING PURPOSES
    this.getStudents({ type: "comipems" });
  },
};
</script>
