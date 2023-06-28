// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getAuth } from "firebase/auth";
import {getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'; // Import the getAuth function


const firebaseConfig = {
  apiKey: "AIzaSyA3GhJkelOtTst89JhELx3QtLFBWPVZbV8",
  authDomain: "todo-reactn.firebaseapp.com",
  projectId: "todo-reactn",
  storageBucket: "todo-reactn.appspot.com",
  messagingSenderId: "996351502225",
  appId: "1:996351502225:web:6f72ac8fcc9ede0f18dc30",
  measurementId: "G-ZFKCWX4MWL"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);