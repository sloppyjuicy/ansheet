/**
 * Author:      <rhodfra@gmil.com>
 * Date:        May 07, 2021
 * Description: This program UPLOADS an EXAM if it feats the necesary
 *              requirements to firebase
 */
require("dotenv").config();
const admin = require("firebase-admin");

// Getting file name from env variable
const examFileRef = process.env.EXAMFILE;
// Following import is always changing
// on the examen we want to upload
const { exam } = require(examFileRef);

/******************************************************************************
 **********                    Auxiliar functions                  ************
 *****************************************************************************/

/**
 * Checks if an objec has the argument list properties
 */
const hasAllProperties = (obj, properties) => {
  for (prop of examProperties) {
    if (exam.hasOwnProperty(prop) === false) {
      return false;
    }
  }
  return true;
};

/**
 * The 'materias' has 'inicio' and 'fin' properties
 * This function makes sure 'fin' > 'inicio'
 */
const startLessThanEnd = (exam) => {
  for (let i = 0; i < exam.materias.length; i++) {
    if (exam.materias[i].inicio >= exam.materias[i].fin) {
      return true;
    }
  }
  return false;
};

/**
 * Check if 'inicio' and 'fin' from differnet items ('materias') doesnt overlap
 * It is require to have the array order by 'inicio'
 */
const limitOverlapping = (exam) => {
  for (let i = 0; i < exam.materias.length - 1; i++) {
    if (exam.materias[i].fin >= exam.materias[i + 1].inicio) {
      return true;
    }
  }
  return false;
};

/**
 * Depending on the exam type ('comipems' or 'universidad')
 * this function makes sure that the keys are valide.
 */
const areKeysValid = (exam) => {
  for (materia of exam.materias) {
    if (exam.tipo === "comipems") {
      if (keysForTypeComipems.includes(materia.clave) === false) {
        return false;
      }
    } else if (exam.tipo === "universidad") {
      if (keysForTypeUniversidad.includes(materia.clave) === false) {
        return false;
      }
    } else {
      console.log("Tipo inválido");
      return false;
    }
  }
  return true;
};

const buildExamName = (exam) => {
  if (exam.institucion === null) {
    return "examen-simulacion";
  }
  let name = `${exam.institucion}`;
  if (exam.annio != null) {
    name = name + `-${exam.annio}`;
  } else {
    name = name + "-simulacion";
  }
  if (exam.area != null) {
    name = name + `-${exam.area}`;
  }
  return name;
};

/******************************************************************************
 **********             Validations for exam object                ************
 *****************************************************************************/

// 1) Validating if EXAM has the necessary properties
const examProperties = [
  "institucion",
  "annio",
  "area",
  "tipo",
  "numReactivos",
  "numOpciones",
  "materias",
  "respuestas",
];

if (hasAllProperties(exam, examProperties) === false) {
  console.log("Wrong EXAM attributes");
  console.log("the EXAM must have the following attributes");
  console.log(examProperties);
  process.exit(1);
} else {
  console.log("Attributes list is OK");
}

// 2) numReactivos === respuestas.length
if (exam.numReactivos !== exam.respuestas.length) {
  console.log("Wrong num of EXAM length of 'respuestas' attribute");
  console.log(`numReactivos: ${exam.numReactivos}`);
  console.log(`length of 'respuestas': ${exam.respuestas.length}`);
  process.exit(1);
} else {
  console.log("Length of 'respuestas' is OK");
}

// 3) materias.inicio must not overlap with any materias.fin

// 3.5) materias.inicio < materias.fin
// Sorting the array by 'inicio' property
exam.materias = exam.materias.sort((m, n) => {
  return m.inicio - n.inicio;
});

if (startLessThanEnd(exam) === true) {
  console.log("In some item of 'materias' 'inicio' is greater than 'fin'");
  process.exit(1);
}

if (limitOverlapping(exam) === true) {
  console.log("Some limits are overlapping in 'materias'");
  process.exit(1);
} else {
  console.log("'inicio' and 'fin' limits are OK");
}

// 4) Validate 'clave' depending on 'tipo' attribute
//
// Validate 'clave's for 'tipo' = comipems
const keysForTypeComipems = [
  "hab-matematica",
  "biologia",
  "espanol",
  "quimica",
  "historia",
  "matematicas",
  "hab-verbal",
  "geografia",
  "fisica",
  "force",
];

const keysForTypeUniversidad = [
  // UNAM
  "biologia",
  "espanol",
  "quimica",
  "hist-mexico",
  "hist-universal",
  "matematicas",
  "hab-verbal",
  "geografia",
  "fisica",
  "literatura",
  "filosofia",
  // IPN Subjects
  "prod-escrita",
];

if (areKeysValid(exam) === false) {
  console.log("The 'clave' register in some item of 'materia' is incorrect");
  process.exit(1);
} else {
  console.log("All 'clave's seems OK");
}

/******************************************************************************
 **********               UPLOADING exam object                    ************
 *****************************************************************************/

// Instantiating FIRESTORE DB conexion
const serviceAccount = require("./anshetv2-5-firebase-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
// AT SAVING TIME
//
// 1) Check if it hasnt been previously save
// TODO:- Query DB to check above requirement

// THE FOLLOWING CODE WORKS PRETTY WELL
// BUT IS COMMENTED TO KEEP WORKING ON VALIDATIONS

let collectionName = "examenes-";
if (exam.tipo == "comipems") {
  collectionName = collectionName + "comipems";
} else if (exam.tipo == "universidad") {
  collectionName = collectionName + "universidad";
} else {
  console.log("Error: Tipo de examen incorrecto");
}

// Ading name to exam base on the properties
exam.nombre = buildExamName(exam);

db.collection(collectionName)
  .add(exam)
  .then((docRef) => {
    console.log(`El documento con id ${docRef.id} se inserto correctamente`);
  })
  .catch((error) => {
    console.log(`El documento no pudo ser insertado`);
    console.log(error);
  });
