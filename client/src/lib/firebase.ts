import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9jB9AL9QVGF9Dg4t9SVOl9GsnXZPBsxo",
  authDomain: "last-digit-pro.firebaseapp.com",
  projectId: "last-digit-pro",
  storageBucket: "last-digit-pro.firebasestorage.app",
  messagingSenderId: "843809760352",
  appId: "1:843809760352:web:5e688aa75ed62087dacf05",
  measurementId: "G-X9DJL25EDR"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
