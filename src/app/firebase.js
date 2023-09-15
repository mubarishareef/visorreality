// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANxMbB5JKbLxTXx9uPBuE7RvZECTgDxng",
  authDomain: "visorreality.firebaseapp.com",
  projectId: "visorreality",
  storageBucket: "visorreality.appspot.com",
  messagingSenderId: "1079731021888",
  appId: "1:1079731021888:web:97126e5af6d4ada33697a5",
  measurementId: "G-TKQWDT6YL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)