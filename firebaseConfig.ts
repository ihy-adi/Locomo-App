// firebaseConfig.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDc1fgwUCwL8FUEzLbfheLKiyvRDH6ER60",
  authDomain: "locomo-b9e92.firebaseapp.com",
  projectId: "locomo-b9e92",
  storageBucket: "locomo-b9e92.firebasestorage.app",
  messagingSenderId: "266539039880",
  appId: "1:266539039880:web:e76739ad43d6183eccb33d",
  measurementId: "G-Z80YCS9DMG"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const database: Database = getDatabase(app);
