/**
 * Author:      <rhodfra@gmil.com>
 * Date:        May 07, 2021
 * Description: This program UPLOADS an EXAM if it feats the necesary
 *              requirements to firebase
 */

const admin = require("firebase-admin");

// Instantiating FIRESTORE DB conexion
const serviceAccount = require("./anshetv2-5-firebase-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

(async () => {

  const type = "comipems";
  const studentID = 3000;
  const currentExam = "g2GRBMRDa25m4wFWSuK5";
  const collectionName = `alumnos-${type}`;

  // Getting student Doc ID
  const studentsRef = db.collection(collectionName)
    .where("alumno_id","==",studentID);
  const snapshot = await studentsRef.get();

  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  
  let data = {};
  snapshot.forEach(doc => {
    data = {id: doc.id, ...doc.data()};
  });

  console.log(data.alumno_id,"=>",data.nombre,"=>",data.id);

  const collectionExamName = `${collectionName}/${data.id}/examenes`;
  const examsRef = db.collection(collectionExamName)
    .where("examen_id","==",currentExam);
  const examSnapshot = await examsRef.get();
  if (examSnapshot.empty) {
    console.log('No matching documents.');
  } else {
    const examsDocsRef = [];
    examSnapshot.forEach(doc => {
      const data = {id: doc.id, ...doc.data()};
      examsDocsRef.push(data.id)
      console.log(data.id,"=>",data.nombre_examen, "=>", data.puntajeTotal,
        "examID =>",data.examen_id);
    });

    // Deleting docs
    for ( i = 0; i < examsDocsRef.length; i++ ){
      const docExamRef = await db.collection(collectionExamName)
        .doc(examsDocsRef[i]).delete();
      console.log("Deleted exam");
    }
  }

  // Updating currentExam for user
  const docStudentRef = db.collection(collectionName).doc(data.id);
  const res = await docStudentRef.update({currentExam:currentExam})
  console.log("Updated currentExam for ${studentID}");
 
 })();
