const admin = require("firebase-admin");
const serviceAccount = require("./gen2020-2021-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gen2020-2021.firebaseio.com"
});

const db = admin.firestore();

/**
 * IMPORTANTE:  NOOO OLVIDES MODIFICAR IDINICIAL 
 */
const idInicial = 2031
const nombres = [
  "Fatima Rojas",
]

let tipo = "comipems"

for (let i = 0; i < nombres.length; i++){
  console.log(`======= Insercion alumno ${tipo} =========`)
  db.collection(tipo).add({
    alumno_id : idInicial + i,
    nombre_alumno: nombres[i]

  })
  .then( (docRef) => {
    console.log(`El documento con id ${docRef.id} se inserto correctamente`)
  })
  .catch( (error) => {
    console.log(`El documento no pudo ser insertado`)
    console.log(error)
  })

}
