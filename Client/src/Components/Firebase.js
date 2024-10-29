// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGUZ-VdgxdJGUwvX8eeX50BSaRno6xHBQ",
  authDomain: "dfcms-5934a.firebaseapp.com",
  projectId: "dfcms-5934a",
  storageBucket: "dfcms-5934a.appspot.com",
  messagingSenderId: "634681209670",
  appId: "1:634681209670:web:d6a1ef30a938bbf9d6eb47",
  measurementId: "G-PE19K06F8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;