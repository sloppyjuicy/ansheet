/**
 * Author:      <rhodfra@gmil.com>
 * Date:        May 07, 2021
 * Description: This program Build collection to track students examn progress
 */

const admin = require("firebase-admin");

// Instantiating FIRESTORE DB conexion
const serviceAccount = require("./anshetv2-5-firebase-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

(async ()=>{

  const type= "comipems"
  const examID = "g2GRBMRDa25m4wFWSuK5" 
  //const examRef = `examenes-${type}-asignados/${examID}`
  const examRef = `examenes-${type}-asignados`

  // Inserting exam ref as document
  await db.collection(examRef).doc(examID).set(
    {fechaCreacion: new Date()}
  );
  
  // Ref collection for students exam assignation
  const studentRef = `examenes-${type}-asignados/${examID}/students`
  const res = await db.collection(studentRef).add({nombre: "Rodrigo F"})
  console.log(res.id)

})();
