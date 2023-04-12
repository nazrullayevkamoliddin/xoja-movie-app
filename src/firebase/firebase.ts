import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {  getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD8pP7F4zZuaKjH2S8T28B8nPL3CdXFrU8",
  authDomain: "xoja-movie-app.firebaseapp.com",
  projectId: "xoja-movie-app",
  storageBucket: "xoja-movie-app.appspot.com",
  messagingSenderId: "198158379939",
  appId: "1:198158379939:web:9689d159705d0f5e3f8816",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth();

export default app;
export { db, auth};