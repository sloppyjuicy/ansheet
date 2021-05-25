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
    async saveScoreinDB({ _ignore }, payload) {
      const user = payload.student.id;
      const type = "comipems"; // only for debug purposes
      const collectionRoute = `alumnos-${type}/${user}/examenes`;
      const examRef = doc(collection(db, collectionRoute));
      return new Promise((resolve) => {
        setDoc(examRef, {
          puntajeTotal: payload.sucessAnswersCount,
          reactivosTotales: payload.totalReactives,
          examen_id: payload.examen_id,
          puntajePorMateria: payload.sucessBySuject,
          respuestasAlumno: payload.userAnswers,
          mapaDeReactivos: payload.reactiveHeatMap,
        });
        resolve();
        /**
         * NOTE:
         * Following code make uses ANonymus function to get ride of non use
         * "_ignore" variable.
         * It its not the best option but it works at a time
         */
        ((t) => {
          t;
        })(_ignore);
      });
    },
  },
};
