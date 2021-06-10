<template>
  <v-container fluid>
    <!-- <v-tabs color="deep-purple accent-4" right> -->
    <v-tabs color="deep-purple accent-4" v-model="tab">
      <v-tab>COMIPEMS</v-tab>
      <v-tab>Universidad</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <exam
          v-if="comipemsData"
          examType="comipems"
          :exam="comipemsData.exam"
          :students="comipemsData.students"
        />
      </v-tab-item>
      <v-tab-item>
        <exam
          v-if="universidadData"
          examType="universidad"
          :exam="universidadData.exam"
          :students="universidadData.students"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import Exam from "@/components/Exam.vue";
import { mapActions } from "vuex";
export default {
  name: "Home",
  components: {
    Exam,
  },
  data: () => ({
    tab: null,
    comipemsExamID: "g2GRBMRDa25m4wFWSuK5",
    universidadExamID: "3pNWLwTZHjMMtxrCAARn",
    comipemsData: null,
    universidadData: null,
  }),

  methods: {
    /**
     * VUEX Methods
     */
    ...mapActions({
      getExam: "getExamFromDB",
      getStudents: "getStudentsFromDB",
    }),
    /**
     * Component Methods
     */
    // UNUSED FUNCTION
    // TROUBLES WITH ASYNC
    // initializeData(type, examID) {
    //   this.getExam({ type, examID }).then((exam) => {
    //     this.getStudents({ type }).then((students) => {
    //       const data = { exam, students };
    //       return data;
    //     });
    //   });
    // },
  },
  async mounted() {
    // Inititialize COMIPEMS
    this.getExam({ type: "comipems", examID: this.comipemsExamID }).then(
      (exam) => {
        this.getStudents({
          type: "comipems",
          examID: this.comipemsExamID,
        }).then((students) => {
          this.comipemsData = { exam, students };
        });
      }
    );
    // Inititialize Universidad
    this.getExam({ type: "universidad", examID: this.universidadExamID }).then(
      (exam) => {
        this.getStudents({
          type: "universidad",
          examID: this.universidadExamID,
        }).then((students) => {
          this.universidadData = { exam, students };
        });
      }
    );
  },
};
</script>
