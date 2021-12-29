/**
 * Author:      <rhodfra@gmil.com>
 * Date:        May 07, 2021
 * Description: This program transfers an exam record from one student to other
 */

const admin = require("firebase-admin");

// Instantiating FIRESTORE DB conexion
const serviceAccount = require("./anshetv2-5-firebase-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

(async () => {

  const type = "universidad";
  const examID = "JkjDJZp8witZyVvMBnFM"
  const studentIdOrigin = 2002;
  const studentIdTarget = 2024;
  const collectionName = `alumnos-${type}-2021-2022`;

  // Getting doc ID of origin Student
  const studentsRef = db.collection(collectionName)
    .where("alumno_id","in",[studentIdOrigin,studentIdTarget])
    
  const snapshot = await studentsRef.get();

  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  
  let studentsData = [];
  snapshot.forEach(doc => {
    studentsData.push({id: doc.id, ...doc.data()});
  });

  // Documents IDs
  studentsData.forEach( data =>{
    console.log(data.alumno_id,"=>",data.nombre,"=>",data.id);
  }) 

  if( studentsData.length != 2 ){
    console.log("Error: Wrong length of studentsData array");
    return
  }

  const indexStudentOrig = studentsData[0].alumno_id == studentIdOrigin? 0 : 1;
  const originDocID = studentsData[indexStudentOrig];
  const collectionExamName = `${collectionName}/${originDocID.id}/examenes`
  const examRef = db.collection(collectionExamName)
    .where("examen_id","==",examID);
  const examSnapshot = await examRef.get();

  if (examSnapshot.empty) {
    console.log('No matching documents..:)');
    return;
  }  
  let examTarget = {};
  let idForDeleting = "";
  examSnapshot.forEach(doc => {
    //console.log(doc.id, '=>', doc.data());
    examTarget = doc.data();
    idForDeleting = doc.id;
  });

  const indexTarget = studentsData[1].alumno_id == studentIdTarget? 1 : 0;
  const targetDocID = studentsData[indexTarget];
  const collectionExamTarget = `${collectionName}/${targetDocID.id}/examenes`;

  console.log(`Transfering exam from ${originDocID.nombre} to ${targetDocID.nombre}`);
  const res = await db.collection(collectionExamTarget).add(examTarget);

  console.log('Added document with ID: ', res.id);

  console.log(`Deleting exam of ${originDocID.nombre}`);
  const delRest = await db.collection(collectionExamName).doc(idForDeleting).delete();

 })();
