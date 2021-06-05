import { db } from "../../../firebase-config.js";
// IMPORT to READ data
import { collection, query, getDocs, where } from "firebase/firestore";
// IMPORT to WRITE data
import { doc, setDoc } from "firebase/firestore";

export const students = {
  state: () => ({
    students: null,
    studentExams: null,
    studentID: null,
  }),
  getters: {
    getStudents(state) {
      return state.students;
    },
    getStudentExams(state) {
      return state.studentExams;
    },
    getStudentID(state) {
      return state.studentID;
    },
  },
  mutations: {
    setStudents(state, students) {
      state.students = students;
    },
    setStudentExams(state, payload) {
      state.studentExams = payload;
    },
    setStudentID(state, id) {
      state.studentID = id;
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
      const type = payload.type;
      const collectionRoute = `alumnos-${type}/${user}/examenes`;
      const examRef = doc(collection(db, collectionRoute));
      return new Promise((resolve) => {
        setDoc(examRef, {
          puntajeTotal: payload.sucessAnswersCount,
          reactivosTotales: payload.totalReactives,
          examen_id: payload.examen_id,
          nombre_examen: payload.exam_name,
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
    async getStudentExamFromDB({ commit }, payload) {
      const user = payload.student_id;
      const type = payload.type;
      const collectionRoute = `alumnos-${type}/${user}/examenes`;
      const se = [];
      const q = query(collection(db, collectionRoute));
      const querySnapshot = await getDocs(q);

      return new Promise((resolve) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          se.push({ ...doc.data(), id: doc.id });
        });
        commit("setStudentExams", se);
        resolve();
      });
    },
    async getStudentDocumentIDFromIntegerID({ commit }, { id, type }) {
      const collectionRoute = `alumnos-${type}`;
      // TODO:- Refactor this query
      const collectionRef = collection(db, collectionRoute);
      const q = query(collectionRef, where("alumno_id", "==", id));

      const querySnapshot = await getDocs(q);
      return new Promise((resolve) => {
        let documentID = "";
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          documentID = doc.id;
        });
        commit("setStudentID", documentID);
        resolve();
      });
    },
  },
};
