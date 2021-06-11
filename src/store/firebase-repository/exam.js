import { db } from "../../../firebase-config.js";
import { doc, getDoc } from "firebase/firestore";

export const exam = {
  state: () => ({
    exam: null,
    ids: null,
  }),
  getters: {
    getExam(state) {
      return state.exam;
    },
    getIDs(state) {
      return state.ids;
    },
  },
  mutations: {
    setExam(state, exam) {
      state.exam = exam;
    },
    setExamIDs(state, ids) {
      state.ids = ids;
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

      return new Promise((resolve, reject) => {
        if (docSnap.exists()) {
          const exam = { ...docSnap.data(), examen_id: examID };
          commit("setExam", exam);
          resolve(exam);
        } else {
          // doc.data() will be undefined in this case
          reject("No such document");
        }
      });
    },
    async getCurrentExamIDs({ commit }) {
      const examIDsCollectionName = `system-params`;
      const docName = "a9m7zvx0RaTdD7pd0Emz";
      const examIDsCollectionRef = doc(db, examIDsCollectionName, docName);
      const docSnap = await getDoc(examIDsCollectionRef);

      return new Promise((resolve, reject) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const comipemsExamID = data.current_exam_comipems;
          const universidadExamID = data.current_exam_universidad;
          const ids = { comipemsExamID, universidadExamID };
          commit("setExamIDs", ids);
          resolve(ids);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          reject("No such document");
        }
      });
    },
  },
};
