// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu8vWLoKCBcOrzvX2aGLrTrq_Ja928FUE",
  authDomain: "netflixgpt-c0960.firebaseapp.com",
  projectId: "netflixgpt-c0960",
  storageBucket: "netflixgpt-c0960.firebasestorage.app",
  messagingSenderId: "1023989323915",
  appId: "1:1023989323915:web:ec6210b596d62292239c8e",
  measurementId: "G-JWEBW4HL6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();