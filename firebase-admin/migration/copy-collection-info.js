const admin = require("firebase-admin");

const currentPeriod = "2021-2022";
const type = "comipems";
const baseOldCollection = `alumnos-${type}`;
const baseNewCollection = `${baseOldCollection}-${currentPeriod}`;

(async () => {
  // Instantiating FIRESTORE DB conexion
  const serviceAccount = require("../anshetv2-5-firebase-admin.json");
  const admin1 = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const db = admin1.firestore();

  const studentsRef = db.collection(baseOldCollection);
  const snapshot = await studentsRef.get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  snapshot.forEach(async (doc) => {
    const student = doc.data();
    delete student.currentExam;
    const res = await db.collection(baseNewCollection).doc(doc.id).set(student);
    console.log(res);

    const baseOldExamCollection = `${baseOldCollection}/${doc.id}/examenes`;
    const baseNewExamCollection = `${baseNewCollection}/${doc.id}/examenes`;

    const examsRef = db.collection(baseOldExamCollection);
    const examsSnapshot = await examsRef.get();
    if (examsSnapshot.empty) {
      console.log("No exams");
    }

    examsSnapshot.forEach(async (examDoc) => {
      const res = await db
        .collection(baseNewExamCollection)
        .doc(examDoc.id)
        .set(examDoc.data());
      console.log(res);
    });
  });
})();
