// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBXnC77p5gnBPKJ0ZNSF1mNZUVkn04w2Ws",
  authDomain: "powerfit-5c943.firebaseapp.com",
  projectId: "powerfit-5c943",
  storageBucket: "powerfit-5c943.firebasestorage.app",
  messagingSenderId: "996895173740",
  appId: "1:996895173740:web:a248e9925404a3c5a97c49",
  measurementId: "G-XVMTCEKNJ1"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;