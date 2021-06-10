import { db } from "../../../firebase-config.js";
// IMPORT to READ data
import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  updateDoc,
} from "firebase/firestore";
// IMPORT to WRITE data
import { doc, setDoc } from "firebase/firestore";

export const students = {
  state: () => ({
    students: null,
    studentExams: null,
    studentID: null,
    student: null,
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
    getStudent(state) {
      return state.student;
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
    setStudent(state, data) {
      state.student = { nombre: data.nombre, sede: data.sede };
    },
  },
  actions: {
    /**
     * Return students from DB
     */
    async getStudentsFromDB({ commit }, { type, examID }) {
      const s = [];
      const q = query(
        collection(db, `alumnos-${type}`),
        where("currentExam", "==", examID),
        orderBy("alumno_id")
      );
      const querySnapshot = await getDocs(q);
      return new Promise((resolve) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          s.push({ ...doc.data(), id: doc.id });
        });
        commit("setStudents", s);
        resolve(s);
      });
    },
    // async filterStudents({ commit }, { type, students }) {
    //   const newS = [];
    //   for (const s of students) {
    //     const colName = `alumnos-${type}/${s.id}/examenes`;
    //     console.log(colName);
    //     const q = query(
    //       collection(db, colName),
    //       where("exmaen_id", "==", "g2GRBMRDa25m4wFWSuK5")
    //     );
    //     const querySnapshot = await getDocs(q);
    //     if (querySnapshot == 0) {
    //       newS.push(s);
    //     }
    //   }
    //   return new Promise((resolve) => {
    //     commit("setStudents", newS);
    //     resolve(newS);
    //   });
    // },
    /**
     * Save students score in the db
     */
    async saveScoreinDB({ nop }, payload) {
      const user = payload.student.id;
      const type = payload.type;
      const collectionRoute = `alumnos-${type}/${user}/examenes`;
      const examRef = doc(collection(db, collectionRoute));
      const userUpdateRef = doc(db, `alumnos-${type}`, user);
      return new Promise((resolve) => {
        setDoc(examRef, {
          puntajeTotal: payload.sucessAnswersCount,
          reactivosTotales: payload.totalReactives,
          examen_id: payload.examen_id,
          nombre_examen: payload.exam_name,
          puntajePorMateria: payload.sucessBySuject,
          respuestasAlumno: payload.userAnswers,
          mapaDeReactivos: payload.reactiveHeatMap,
          fechaAplicacion: new Date(),
        });
        // Set currentExamen to null
        updateDoc(userUpdateRef, { currentExam: null });
        resolve();
        nop;
      });
    },
    async getStudentExamFromDB({ commit }, payload) {
      const user = payload.student_id;
      const type = payload.type;
      const collectionRoute = `alumnos-${type}/${user}/examenes`;
      const se = [];
      const q = query(
        collection(db, collectionRoute),
        orderBy("fechaAplicacion")
      );
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
        let data = {};
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          documentID = doc.id;
          data = doc.data();
        });
        commit("setStudentID", documentID);
        commit("setStudent", data);
        resolve();
      });
    },
  },
};
