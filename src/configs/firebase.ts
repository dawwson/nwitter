// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGtguZvIP2LIjPojoS32G9KKgIFazQ67c",
  authDomain: "nwitter-576b4.firebaseapp.com",
  projectId: "nwitter-576b4",
  storageBucket: "nwitter-576b4.appspot.com",
  messagingSenderId: "437477518537",
  appId: "1:437477518537:web:ccc1653db76b89b3463118",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
