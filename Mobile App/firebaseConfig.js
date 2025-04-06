// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANotXe3bOglk6jcGqqAblm_stSSt8vZGQ",
  authDomain: "solution-challenge-f74ab.firebaseapp.com",
  projectId: "solution-challenge-f74ab",
  storageBucket: "solution-challenge-f74ab.firebasestorage.app",
  messagingSenderId: "219291865691",
  appId: "1:219291865691:web:ab8d633e6f57ef5089657e",
  measurementId: "G-TYJFPLMG6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

  