// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn7FSchDRaIFQb8yaXf9eGVQPGaWly45g",
  authDomain: "dayflow876.firebaseapp.com",
  databaseURL: "https://dayflow876-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dayflow876",
  storageBucket: "dayflow876.firebasestorage.app",
  messagingSenderId: "476681554925",
  appId: "1:476681554925:web:36d23966ef9968fa13f5e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)