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

  const studentsRef = db.collection(`alumnos-${type}`).orderBy("alumno_id");
  const snapshot = await studentsRef.get();

  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  

  snapshot.forEach(doc => {
    //console.log(doc.id, '=>', doc.data());
    const data = doc.data();
    const s = {
      alumno_id: data.alumno_id,
      nombre: data.nombre
    };
    console.log(s.alumno_id,"=>",s.nombre);
  });

})();
