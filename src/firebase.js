/*import { initializeApp } from 'firebase';*/
import firebase from 'firebase/app';
import 'firebase/firestore';

//const app = initializeApp({
const app = firebase.initializeApp({
  // apiKey: "AIzaSyAzSJt993MinxF_qmkAAfJ9oW3LoujdPlM",
  // authDomain: "ansheet-d14de.firebaseapp.com",
  // databaseURL: "https://ansheet-d14de.firebaseio.com",
  // projectId: "ansheet-d14de",
  // storageBucket: "ansheet-d14de.appspot.com",
  // messagingSenderId: "162631418651",
  // appId: "1:162631418651:web:c4f049fa189e792d3dc9be",
  // measurementId: "G-0S8V5D6GY1"
  apiKey: 'AIzaSyBQzu8hts67XUADcql0A5XZtq01WvvH4P0',
  authDomain: 'gen2020-2021.firebaseapp.com',
  databaseURL: 'https://gen2020-2021.firebaseio.com',
  projectId: 'gen2020-2021',
  storageBucket: 'gen2020-2021.appspot.com',
  messagingSenderId: '620703318344',
  appId: '1:620703318344:web:b7ca455e30242a2378737d',
});

export const db = app.firestore();
