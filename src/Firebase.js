// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librarie
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtDB-GyXHtDpPjL3l0hZ0q-UqfRUmhZWk",
  authDomain: "ecommerce-7be59.firebaseapp.com",
  projectId: "ecommerce-7be59",
  storageBucket: "ecommerce-7be59.firebasestorage.app",
  messagingSenderId: "342031603913",
  appId: "1:342031603913:web:35cdeaa3ba0b2e05b11518",
  measurementId: "G-151YVWZYB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage=getStorage(app)
export const auth =getAuth()
export {storage}
export default app;