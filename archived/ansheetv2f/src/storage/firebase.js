import firebase from 'firebase/app'
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyA21ctOCHgxKYwHu5mjCPkHEcp28JpguoQ",
    authDomain: "ansheet-full.firebaseapp.com",
    databaseURL: "https://ansheet-full.firebaseio.com",
    projectId: "ansheet-full",
    storageBucket: "ansheet-full.appspot.com",
    messagingSenderId: "112410207190",
    appId: "1:112410207190:web:2261ad509b00b86f063a77"
})

export const db = app.firestore();