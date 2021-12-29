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
const examName = "UNAM 2020 área 3";

const getStudents = async () => {
  const studentsRef = db.collection(studentsStringRef).orderBy("alumno_id");
  const snapshot = await studentsRef.get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    process.exit(1);
  }  
  return snapshot;

}

const getStudentScore = async (docId,name) => {
  const examsStringRef = `${studentsStringRef}/${docId}/examenes`;
  const examsRef = db.collection(examsStringRef);
  const examsSnapshot = await examsRef.get();

  let studentExamScore = {
    studentName: name,
    puntajeTotal: "-",
    puntajePorMateria: "-"
  };
  examsSnapshot.forEach( examDoc => {
    const examData = examDoc.data();
    if( examData.examen_id == examenId ) {
      studentExamScore.puntajeTotal = examData.puntajeTotal;
      const puntajeMat = examData.puntajePorMateria.map(pm => {
        return `${pm.nombre}: ${pm.puntaje}`
      })
      studentExamScore.puntajePorMateria = puntajeMat;
    }
  });

  return studentExamScore;
}

const getStudentsScores = async (students) => {
  let scoresPromises = [];
  await students.forEach( doc => {
    const score = getStudentScore(doc.id, doc.data().nombre);
    scoresPromises.push(score);
  });

  Promise.all(scoresPromises).then(values => {
    values.pop();
    console.log(`\t\t\tReporte examen ${examName}\n`);
    console.log("Reporte General\n");
    console.table(values,["studentName","puntajeTotal"])
    console.table("\n")

    console.log(`Reporte por alumno\n`);
    for( const value of values ) {
      if( value.puntajeTotal != "-" ) {
        console.log(value.studentName,value.puntajeTotal);
        console.table(value.puntajePorMateria);
        console.table("\n")
      }
    }
  });

}

async function main() {
  const students = await getStudents();
  await getStudentsScores(students);
}

main();
