import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

//const firebaseConfig = {
//  apiKey: process.env.REACT_APP_FIREBASE_KEY,
//  authDomain: "chat-ab746.firebaseapp.com",
//  projectId: "chat-ab746",
//  storageBucket: "chat-ab746.appspot.com",
//  messagingSenderId: "901216368405",
//  appId: "1:901216368405:web:8ec942ee51611df5c49b1c",
//};

//// Initialize Firebase
//export const app = initializeApp(firebaseConfig);
//export const auth = getAuth();
//export const storage = getStorage();
//export const db = getFirestore()

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnlO4dfqAgEPlO2_kutzzUoBL9h-tDzlE",
    authDomain: "chat-app-3d36b.firebaseapp.com",
    projectId: "chat-app-3d36b",
    storageBucket: "chat-app-3d36b.appspot.com",
    messagingSenderId: "267093288469",
    appId: "1:267093288469:web:94550c59422c76e00b101c",
    measurementId: "G-F0EXGL761K"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()

