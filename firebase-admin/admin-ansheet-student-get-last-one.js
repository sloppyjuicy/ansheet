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
    data = {id: doc.id, ...doc.data()};
  });

  console.log(data.alumno_id,"=>",data.nombre,"=>",data.id);
 
 })();
