// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrnk8mDy-38rn8auLKfyOaXJy1ggWDXps",
  authDomain: "qr-code-7944d.firebaseapp.com",
  projectId: "qr-code-7944d",
  storageBucket: "qr-code-7944d.appspot.com",
  messagingSenderId: "431823955552",
  appId: "1:431823955552:web:cd6aabc70ade7deb6f8505",
  measurementId: "G-WJ5Q4J2488",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
