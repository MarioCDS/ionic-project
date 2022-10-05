// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByfB9C0ZdB8p4eLVMuFcnz20pjHVo8NVI",
  authDomain: "lyrics-ionic.firebaseapp.com",
  projectId: "lyrics-ionic",
  storageBucket: "lyrics-ionic.appspot.com",
  messagingSenderId: "940804760146",
  appId: "1:940804760146:web:52b84f607bb8ab9e40358b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);