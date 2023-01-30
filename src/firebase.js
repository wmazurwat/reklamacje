// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//nowa
const firebaseConfig = {
  apiKey: "AIzaSyBFeJsEEgFEcoUMVJf8yWSaZgvhVQsMf4s",
  authDomain: "reklamacje-82cd4.firebaseapp.com",
  projectId: "reklamacje-82cd4",
  storageBucket: "reklamacje-82cd4.appspot.com",
  messagingSenderId: "896182900147",
  appId: "1:896182900147:web:a763f5968b753783c8a7c6",
  measurementId: "G-92J32LGLFT",
};
//stara
// const firebaseConfig = {
//   apiKey: "AIzaSyDAbxFo5aVlHnBmtjmEkZ7AQcFrFRF9-cw",
//   authDomain: "reklamacje-c3ddd.firebaseapp.com",
//   projectId: "reklamacje-c3ddd",
//   storageBucket: "reklamacje-c3ddd.appspot.com",
//   messagingSenderId: "569697533452",
//   appId: "1:569697533452:web:69e171daba9360ac647829",
//   measurementId: "G-W2TKG1DL1Y",
// };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
