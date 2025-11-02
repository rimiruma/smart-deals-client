// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGUS0P8ErYwaKcAFDXHsI_4Do7NAgwj3k",
  authDomain: "smart-deals-4049c.firebaseapp.com",
  projectId: "smart-deals-4049c",
  storageBucket: "smart-deals-4049c.firebasestorage.app",
  messagingSenderId: "553745556687",
  appId: "1:553745556687:web:008a36eaafbe6e51d5c3ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);