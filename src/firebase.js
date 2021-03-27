/*import { initializeApp } from 'firebase';*/
import firebase from 'firebase/app'
import 'firebase/firestore'

//const app = initializeApp({
const app = firebase.initializeApp({
    apiKey: "AIzaSyAzSJt993MinxF_qmkAAfJ9oW3LoujdPlM",
    authDomain: "ansheet-d14de.firebaseapp.com",
    databaseURL: "https://ansheet-d14de.firebaseio.com",
    projectId: "ansheet-d14de",
    storageBucket: "ansheet-d14de.appspot.com",
    messagingSenderId: "162631418651",
    appId: "1:162631418651:web:c4f049fa189e792d3dc9be",
    measurementId: "G-0S8V5D6GY1"
})

export const db = app.firestore();