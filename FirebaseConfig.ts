// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { initializeFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLSIYIIC2b15ypw-CNIQtfokIF4Fz0Sa8",
  authDomain: "loco-b29ba.firebaseapp.com",
  projectId: "loco-b29ba",
  storageBucket: "loco-b29ba.firebasestorage.app",
  messagingSenderId: "495398499919",
  appId: "1:495398499919:web:8f534fde650718c6d99c3a",
  measurementId: "G-M84FQ9DPJ6",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = initializeFirestore(FIREBASE_APP, {
  experimentalForceLongPolling: true
});

//export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const auth = getAuth(FIREBASE_APP);