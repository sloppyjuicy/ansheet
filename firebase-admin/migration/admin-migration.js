/**
 * Author:      <rhodfra@gmil.com>
 * Date:        May 07, 2021
 * Description: Script to perform migrations from old system
 */

const admin = require("firebase-admin");

const subjectNameMaker = (subjectName) => {
  const subjectNames = [ 
    "Biología", "Español", "Force","Física","Geografía", "Habilidad mat",
    "Habilidad verbal", "Historia", "Matemáticas","Química"
  ]
  const formatedSubjectNames = [
    { clave: "biologia", nombre: "Biología"},
    { clave: "espanol", nombre: "Español"},
    { clave: "force", nombre: "Formación Cívica"},
    { clave: "fisica", nombre: "Física"},
    { clave: "geografia", nombre: "Geografía"},
    { clave: "hab-matematica", nombre: "Hab. Matemática"},
    { clave: "hab-verbal", nombre: "Hab. Verbal"},
    { clave: "historia", nombre: "Historia"},
    { clave: "matematica", nombre: "Matemáticas"},
    { clave: "quimica", nombre: "Química"},
  ]

  for(i = 0; i < subjectNames.length; i++){
     if (subjectName.toLowerCase().includes(subjectNames[i].toLowerCase())) {
       return formatedSubjectNames[i];
    }
  }

  return {}

}

const duplicatedHistoryKeyEraser = (scoreArray) => {
  const newScores = [];

  const duplicatedScores = [];
  for( s of scoreArray ){
    if( s.clave == "historia" ){
      duplicatedScores.push(s)
    } else {
      newScores.push(s)
    }
  }
  let acumTotal = 0;
  let acumPuntaje = 0;
  for ( d of duplicatedScores ){
    acumPuntaje = acumPuntaje + d.puntaje
    acumTotal = acumTotal + d.total
  }

  const newHistoria = {
    puntaje: acumPuntaje,
    total: acumTotal,
    clave: "historia",
    nombre: "Historia",
  }

  newScores.push(newHistoria);

  return newScores;

}

(async ()=>{

  // Instantiating FIRESTORE DB conexion
  const serviceAccount = require("./gen2020-2021-firebase.json");
  const admin1 = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const db = admin1.firestore();

  const students = []
  const type = "comipems"
  const collectionRef = db.collection(type)
  const snapshot = await collectionRef.get();
  if (snapshot.empty) {
    console.og('No matching documents.');
    return;
  }  

  snapshot.forEach(doc => {
    const data = doc.data();
    const student = {
      tmp_id:doc.id, 
      alumno_id:parseInt(data.alumno_id),
      nombre:data.nombre_alumno,
      sede:null
    };
    students.push(student);
  })

  // Getting exams for each user
  for (let i = 0; i < students.length; i++){
    const t = students[i]
    const examCollectionRef = db.collection(`${type}/${t.tmp_id}/examenes`);
    const examSnapshot = await examCollectionRef.get();
    const exams = [];

    examSnapshot.forEach(doc => {
      const data = doc.data()
      const exam = {
        tmp_id: doc.id,
        examen_id: null,
        mapaDeReactivos: null,
        respuestasAlumno: null,
        nombre_examen: data.nombre_examen,
        puntajeTotal:data.puntaje,
        reactivosTotales: data.total,
        fechaAplicacion: data.fecha_aplicacion
      }
      exams.push(exam);
    })
    t.examenes = exams
  }

  // Get all the students scores for each subject
  for(let i = 0; i < students.length; i++){
    const t = students[i]
    for(let j = 0; j < t.examenes.length; j++){
      // Get the scores for each subject
      const exam = t.examenes[j]
      const ref =`${type}/${t.tmp_id}/examenes/${exam.tmp_id}/puntaje_por_materia`
      const individualScoresRef = db.collection(ref)
      let individualScores = []
      //console.log(i,"=>",ref)
      puntajeSnapshot = await individualScoresRef.get();
      puntajeSnapshot.forEach(doc => {
        const data = doc.data();
        //console.log(data)
        const scoreSubjectRecord = {
          puntaje: data.puntaje,
          total: data.total,
          ...subjectNameMaker(data.materia)
        }
        individualScores.push(scoreSubjectRecord);
      })
      
      if ( individualScores.length > 10 ){
        individualScores = duplicatedHistoryKeyEraser(individualScores)
      }
      exam.puntajePorMateria = individualScores;
    }
  }

  // New BD instance
  const newServiceAccount = require("../anshetv2-5-firebase-admin.json");
  const admin2 = admin.initializeApp({
    credential: admin.credential.cert(newServiceAccount),
    databaseURL: "anshetv2-5.firebaseapp.com"
  },"anshetv2-5");

  const newDB = admin2.firestore();


  // Upload the information
  //const studentsDocumentRef = []
  for( i = 0; i < students.length; i++ ){
    console.log("===========================================================")
    const collectionName = "alumnos-comipems";
    const studentIT = students[i];
    const studentResponse = await newDB.collection(collectionName).add({
      alumno_id: studentIT.alumno_id,
      nombre: studentIT.nombre,
      sede: studentIT.sede
    })
    //studentsDocumentRef.push(studentResponse);
      const examCollectionName = `${collectionName}/${studentResponse.id}/examenes`

    for ( j = 0; j  < studentIT.examenes.length; j++ ){
      const examIT = studentIT.examenes[j];
      delete examIT.tmp_id;
      const examResponse = await newDB.collection(examCollectionName).add(examIT);
      console.log(i, "=>", examResponse.id);
    }
  }


})()
