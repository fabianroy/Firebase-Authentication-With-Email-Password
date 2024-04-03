// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy0dG2FBS1Rp6xk7fZSTdWYwKN-LgTaLc",
  authDomain: "agun-d6163.firebaseapp.com",
  projectId: "agun-d6163",
  storageBucket: "agun-d6163.appspot.com",
  messagingSenderId: "488387449807",
  appId: "1:488387449807:web:8e7d1dea3ddef4714878ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);