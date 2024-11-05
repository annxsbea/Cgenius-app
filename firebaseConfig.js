import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"; 
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCmlJkrzJdX6rVxd54szhmPM-jRrxX3FkA",
  authDomain: "cgenius-mobile.firebaseapp.com",
  projectId: "cgenius-mobile",
  storageBucket: "cgenius-mobile.appspot.com",
  messagingSenderId: "424466155738",
  appId: "1:424466155738:web:cf9484515f929f336cfde3",
  measurementId: "G-4EG21HFET7",
};
const app = initializeApp(firebaseConfig);

let auth;
if (typeof window === "undefined") {
  const ReactNativeAsyncStorage = require('@react-native-async-storage/async-storage').default;
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  auth = getAuth(app);
}

const database = getFirestore(app);

export { auth, database };