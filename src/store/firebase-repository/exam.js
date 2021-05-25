import { db } from "../../../firebase-config.js";
import { doc, getDoc } from "firebase/firestore";

export const exam = {
  state: () => ({
    exam: null,
  }),
  getters: {
    getExam(state) {
      return state.exam;
    },
  },
  mutations: {
    setExam(state, exam) {
      state.exam = exam;
    },
  },
  actions: {
    /**
     * Return exam
     */
    async getExamFromDB({ commit }, payload) {
      const { type, examID } = payload;
      const examRef = doc(db, `examenes-${type}`, examID);
      const docSnap = await getDoc(examRef);

      if (docSnap.exists()) {
        commit("setExam", { ...docSnap.data(), examen_id: examID });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
  },
};
