// utils/auth.js
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth'; // Don't forget to import this
import { auth, provider } from '../utils/firebase_sdk';

export const handleLogin = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    console.log("User Info:", user);

    // Redirect to home after successful login
    navigate("/home");
  } catch (error) {
    // Handle Errors here.
    const errorMessage = error.message;
    console.error("Error signing in:", errorMessage);
    // Optionally, display an error message to the user or handle specific error cases
  }
};
