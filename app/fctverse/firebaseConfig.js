// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkBDQKBoe8AcrITH3MBwInlp0qChXcL3Q",
  authDomain: "fctverse.firebaseapp.com",
  databaseURL: "https://fctverse-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "fctverse",
  storageBucket: "fctverse.appspot.com",
  messagingSenderId: "888031984426",
  appId: "1:888031984426:web:5712dfe1089ef30ec37c53",
  measurementId: "G-5GEW6XPB4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("firdatabaseapp");
console.log(app);
const database = getDatabase(app);
console.log("database");
console.log(database);
export{database}