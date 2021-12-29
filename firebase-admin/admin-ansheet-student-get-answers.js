/**
 * Author:      <rhodfra@gmil.com>
 * Date:        Nov 15, 2021
 * Description: 
 */

const admin = require("firebase-admin");

// Instantiating FIRESTORE DB conexion
const serviceAccount = require("./anshetv2-5-firebase-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const type = "universidad";
const studentsStringRef = `alumnos-${type}-2021-2022`
const examenId = "JkjDJZp8witZyVvMBnFM";
const studentId = 2001

const getStudent = async () => {
  const studentsRef = db.collection(studentsStringRef).where("alumno_id", "==", studentId);
  const snapshot = await studentsRef.get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    process.exit(1);
  }  
  let studentDoc = "";
  snapshot.forEach(doc => {
    studentDoc = doc.id;
  });

  return studentDoc;

}

const getStudentAnswers = async (docId) => {
  const examsStringRef = `${studentsStringRef}/${docId}/examenes`;
  const examsRef = db.collection(examsStringRef).where("examen_id","==",examenId);
  const examsSnapshot = await examsRef.get();

  let studentAnswers = {};
  examsSnapshot.forEach( examDoc => {
    studentAnswers = examDoc.data().respuestasAlumno;
  });

  return studentAnswers;
}


async function main() {
  const student = await getStudent();
  const answers = await getStudentAnswers(student);
  let i = 0;
  for( const answer of answers ) {
    console.log(`${++i}. ${answer}`) 
  }
}

main();
