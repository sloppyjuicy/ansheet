import { db } from "../../firebase-config.js";
import { doc, getDoc } from "firebase/firestore";

export const firebaseRepository = {
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
     * TODO:-
     * 1) Return exam
     * 2) add examID as an argument
     */
    async getExamFromDB({ commit }, examID) {
      const examRef = doc(db, "examenes-universidad", examID);
      const docSnap = await getDoc(examRef);

      if (docSnap.exists()) {
        commit("setExam", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
  },
};
