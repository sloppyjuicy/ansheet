<template>
  <v-container class="mt-7">
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
    <v-row>
      <v-col cols="12" class="text-center">
        <h2>Reporte de calificaciones COMIPEMS</h2>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="studentID"
          append-outer-icon="mdi-send"
          label="Ingrese el ID del estudiante"
          type="text"
          @click:append-outer="pressedSendButton"
        ></v-text-field>
      </v-col>
    </v-row>
    <show-general-report
      @showError="showSnackMessage"
      v-if="showGeneralReport"
    />
  </v-container>
</template>
<script>
import ShowGeneralReport from "@/components/ShowGeneralReport.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Report",
  components: {
    ShowGeneralReport,
  },
  data: () => ({
    snackVisibility: false,
    messageAlert: "",
    studentID: "",
    showGeneralReport: false,
    type: "comipems",
  }),
  computed: {
    ...mapGetters({ id: "getStudentID" }),
  },
  methods: {
    /**
     * VUEX import methods
     */
    ...mapActions({ getStudentID: "getStudentDocumentIDFromIntegerID" }),
    showSnackMessage(message) {
      this.messageAlert = message;
      this.snackVisibility = true;
    },
    isIDTextFieldValid(textID) {
      if (textID.length < 4) {
        return false;
      }
      const r = textID.match(/[^0-9]/g);
      if (r != null) {
        return false;
      }
      return true;
    },
    pressedSendButton() {
      // Make validations
      if (this.isIDTextFieldValid(this.studentID)) {
        this.getStudentReport();
      } else {
        this.showSnackMessage("ID inválido");
      }
    },
    getStudentReport() {
      this.getStudentID({ id: parseInt(this.studentID), type: this.type }).then(
        () => {
          console.log(this.id);
        }
      );
    },
  },
};
</script>
