/**
 * Author:      <rhodfra@gmil.com>
 * Date:        May 07, 2021
 * Description: Update current exam in progress
 */

const admin = require("firebase-admin");

// Instantiating FIRESTORE DB conexion
const serviceAccount = require("./anshetv2-5-firebase-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

(async ()=>{

  const type= "comipems";
  const examID = "g2GRBMRDa25m4wFWSuK5";
  const studentID = "GIT58nT9zlMwrcB0D23I";
  const collectionName = `alumnos-${type}`;
  
  // Get all students id 
  const studentIDs = [];
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();
  if (snapshot.empty) {
    console.og('No matching documents.');
    return;
  }  
  snapshot.forEach(doc => {
    studentIDs.push(doc.id);
  })

  //console.log(studentIDs);

  for ( i = 0; i < studentIDs.length; i++ ){
    const studentID = studentIDs[i]
    // Updated examID in the student document
    const res = await db.collection(collectionName).doc(studentID).update(
      {currentExam : examID}
    );
    console.log(res)
  }

})();
