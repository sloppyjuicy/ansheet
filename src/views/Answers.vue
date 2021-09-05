<template>
  <v-container fluid>
    <v-tabs color="deep-purple accent-4" v-model="tab">
      <v-tab>COMIPEMS</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-row class="mt-5 ml-2">
          <v-col lg="8" sm="7" cols="12">
            <v-select
              v-if="exams"
              :items="exams"
              v-model="examSelected"
              label="Examen"
            ></v-select>
          </v-col>
          <v-col lg="4" sm="5" cols="12">
            <v-text-field
              v-model="password"
              type="password"
              label="Contraseña"
              append-outer-icon="mdi-send"
              clear-icon="mdi-close-circle"
              clearable
              @click:clear="clearSearch"
              v-on:keyup.enter="pressedSendButton"
              @click:append-outer="pressedSendButton"
            ></v-text-field>
          </v-col>
        </v-row>
        <show-answers :exam="comipemsExam" v-if="showAnswers" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import ShowAnswers from "../components/ShowAnswers.vue";
import { getExamFromDB as getExam } from "@/network/exam";
// import { getCurrentExamIDs as getExamIDs } from "@/network/exam";
export default {
  components: { ShowAnswers },
  data: () => ({
    tab: null,
    comipemsExam: null,
    password: "",
    showAnswers: true,
    examSelected: null,
    exams: ["examen 1", "examen 2"],
  }),
  methods: {
    clearSearch() {
      this.password = "";
      this.showAnswers = false;
    },
    pressedSendButton() {
      // validate password
      // show answers
      this.showAnswers = true;
    },
    async initializeData(type, examID) {
      // Exam query can fail if none matching ID is found
      const exam = await getExam({
        type,
        examID,
      }).catch(() => {
        if (type == "comipems") {
          this.notComipemsExam = true;
        } else if (type == "universidad") {
          this.notUniversidadExam = true;
        }
      });
      return exam;
    },
  },
  async mounted() {
    // const ids = await this.getExamIDs();
    this.comipemsExam = await this.initializeData(
      "comipems",
      // ids.comipemsExamID
      "R8oG3NJfLlxA0rMZbpI8"
    );
  },
};
</script>
