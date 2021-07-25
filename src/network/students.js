import { collection, getDocs, where, query } from "firebase/firestore";
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
    console.log(studentData);
    resolve(studentData);
  });
};

export { getStudent };
