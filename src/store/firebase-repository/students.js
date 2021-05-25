import { db } from "../../../firebase-config.js";
// IMPORT to READ data
import { collection, query, getDocs } from "firebase/firestore";
// IMPORT to WRITE data
import { doc, setDoc } from "firebase/firestore";

export const students = {
  state: () => ({
    students: null,
  }),
  getters: {
    getStudents(state) {
      return state.students;
    },
  },
  mutations: {
    setStudents(state, students) {
      state.students = students;
    },
  },
  actions: {
    /**
     * Return students from DB
     */
    async getStudentsFromDB({ commit }, { type }) {
      const s = [];
      const q = query(collection(db, `alumnos-${type}`));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        s.push({ ...doc.data(), id: doc.id });
      });
      commit("setStudents", s);
    },
    /**
     * Save students score in the db
     */
    async saveScoreinDB({ commit }, payload) {
      const user = payload.student.id;
      // only for debug purposes
      const type = "comipems";
      return new Promise((resolve) => {
        setDoc(doc(db, `alumnos-${type}/${user}/examenes`, "LA"), {
          name: "Los Angeles",
          state: "CA",
          country: "USA",
        });
        resolve();
        commit("doNothig");
      });
    },
  },
};
