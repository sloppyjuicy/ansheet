/**
 * Author:      <rhodfra@gmil.com>
 * Date:        May 07, 2021
 * Description: This program UPLOADS an EXAM if it feats the necesary
 *              requirements to firebase
 */

require('dotenv').config();
const admin = require("firebase-admin");

// Instantiating FIRESTORE DB conexion
const serviceAccount = require("./anshetv2-5-firebase-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const studentsFileRef = process.env.STUDENTSFILE
const calculatedType = studentsFileRef.includes("comipems") 
  ? "comipems" : studentsFileRef.includes("univerFileRef") ? "universidad" : "" 

const { students: studentsData} = require(studentsFileRef);

(async () => {

  const type = calculatedType;
  const  newStudents = studentsData;
  const collectionName = `alumnos-${type}`;

  // Getting last ID with the exam ID ref
  const studentsRef = db.collection(collectionName)
    .orderBy("alumno_id","desc")
    .limit(2)
  const snapshot = await studentsRef.get();

  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  
  let data = {};
  snapshot.forEach(doc => {
    data = doc.data();
  });
 
  for ( i = 0; i < newStudents.length; i++ ){
    // Building new student object
    const newStudent = {
      ...newStudents[i],
      currentExam:data.currentExam, 
      alumno_id: data.alumno_id + i + 1
    }
    console.log(newStudent)
    const res = await db.collection(collectionName).add(newStudent);
    console.log(newStudent.alumno_id, "=>", newStudent.nombre, "=>", res.id);
  }

})();
