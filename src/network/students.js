import {
  doc,
  collection,
  getDocs,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config.js";

const getStudent = async (type, studentID) => {
  const collectionBuilder = collection(db, `alumnos-${type}`);
  const q = query(collectionBuilder, where("alumno_id", "==", studentID));

  let studentData = {};
  const querySnapshot = await getDocs(q);

  return new Promise((resolve) => {
    querySnapshot.forEach((doc) => {
      studentData = { id: doc.id, ...doc.data() };
    });
    resolve(studentData);
  });
};

const saveScoreinDB = async (payload) => {
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
  });
};

const getStudentExamFromDB = async (payload) => {
  const user = payload.student_id;
  const type = payload.type;
  const collectionRoute = `alumnos-${type}/${user}/examenes`;
  const se = [];
  const q = query(collection(db, collectionRoute), orderBy("fechaAplicacion"));
  const querySnapshot = await getDocs(q);

  return new Promise((resolve) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      se.push({ ...doc.data(), id: doc.id });
    });
    // commit("setStudentExams", se);
    resolve(se);
  });
};

const getStudentDocumentIDFromIntegerID = async ({ id, type }) => {
  const collectionRoute = `alumnos-${type}`;
  // TODO:- Refactor this query
  const collectionRef = collection(db, collectionRoute);
  const q = query(collectionRef, where("alumno_id", "==", id));

  const querySnapshot = await getDocs(q);
  return new Promise((resolve) => {
    let student = {};
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      student = { id: doc.id, ...doc.data() };
    });
    resolve(student);
  });
};

export {
  getStudent,
  saveScoreinDB,
  getStudentExamFromDB,
  getStudentDocumentIDFromIntegerID,
};
