import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config.js";

const getExamFromDB = async ({ type, examID }) => {
  const examRef = doc(db, `examenes-${type}`, examID);
  const docSnap = await getDoc(examRef);

  return new Promise((resolve, reject) => {
    if (docSnap.exists()) {
      const exam = { ...docSnap.data(), examen_id: examID };
      resolve(exam);
    } else {
      console.log("document not found");
      reject();
    }
  });
};

const getCurrentExamIDs = async () => {
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
      resolve(ids);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      reject("No such document");
    }
  });
};

export { getExamFromDB, getCurrentExamIDs };
