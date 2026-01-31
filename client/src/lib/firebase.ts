import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJ9BAL9VQFGPD4t9SVL9XXXXXX",
  authDomain: "last-digit-pro.firebaseapp.com",
  projectId: "last-digit-pro",
  storageBucket: "last-digit-pro.appspot.com",
  messagingSenderId: "84380976352",
  appId: "1:84380976352:web:5e68aa75ed62087dacf05"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
