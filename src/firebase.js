// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1J5Hi7OmzIGqOkzcbqGI1RD8NvirymRE",
  authDomain: "referral-dr-pepe-ai.firebaseapp.com",
  projectId: "referral-dr-pepe-ai",
  storageBucket: "referral-dr-pepe-ai.appspot.com",
  messagingSenderId: "76418074178",
  appId: "1:76418074178:web:b9abeba4131ae8ee3ccfdb",
  measurementId: "G-CJJLJ9DWKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);

export { db };