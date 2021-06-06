<template>
  <v-container fluid>
    <!-- <v-tabs color="deep-purple accent-4" right> -->
    <v-tabs color="deep-purple accent-4">
      <v-tab>COMIPEMS</v-tab>
      <v-tab>Universidad</v-tab>

      <v-tab-item :key="1">
        <exam :examID="comipemsExamID" examType="comipems" />
      </v-tab-item>
      <v-tab-item :key="2">
        <exam :examID="universidadExamID" examType="universidad" />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import Exam from "@/components/Exam.vue";
export default {
  name: "Home",
  components: {
    Exam,
  },
  data: () => ({
    comipemsExamID: "g2GRBMRDa25m4wFWSuK5",
    universidadExamID: "3pNWLwTZHjMMtxrCAARn",
  }),
};
</script>
