// utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2dGtOjTvh2npFl_-WXx2HQ8cD6dgXF8A",
  authDomain: "algorithm-7e0a9.firebaseapp.com",
  projectId: "algorithm-7e0a9",
  storageBucket: "algorithm-7e0a9.appspot.com",
  messagingSenderId: "396579014008",
  appId: "1:396579014008:web:b67d2b11eb1ddce903b48d",
  measurementId: "G-KWFEV7XGG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
