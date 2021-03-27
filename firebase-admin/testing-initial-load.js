const admin = require("firebase-admin");

const serviceAccount = require("./testing-anshet-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore()

console.log("========== PROBANDO INSERCIONES =================");

(async ()=>{

db.collection('alumnos-nivel-superior-gen-2019-2020')
  .doc('1998-02-01-francisco-pablo-rodrigo').set({
  nombre: 'Rodrigo',
  ap_paterno: 'Francisco',
  ap_materno: 'Pablo',
  edad: 20
})

db.collection('alumnos-nivel-superior-gen-2019-2020')
  .doc('2000-09-11-lopez-martinez-julio').set({
  nombre: 'Julio',
  ap_paterno: 'López',
  ap_materno: 'Martínez',
  edad: 21
})


})();


