const admin = require("firebase-admin");

const serviceAccount = require("./gen2020-2021-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gen2020-2021.firebaseio.com"
});

const db = admin.firestore()

let tipo = "comipems"

console.log(`========== ALUMNOS ${tipo} =================`);
db.collection(tipo).orderBy('alumno_id').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const alumnos = doc.data()
        console.log(`${alumnos.alumno_id}  ${alumnos.nombre_alumno}`);
    });
});

