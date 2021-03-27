const admin = require("firebase-admin");

const serviceAccount = require("./gen2020-2021-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gen2020-2021.firebaseio.com"
});

const db = admin.firestore()

console.log("========== ALUMNOS COMIPEMS =================");

(async ()=>{
  const comipemsRef = db.collection("comipems")
  const alumno = await comipemsRef.where('alumno_id','==','3000').get()

  if (alumno.empty) {
    console.log('No matching documents.');
    return;
  }

  alumno.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });

})();
