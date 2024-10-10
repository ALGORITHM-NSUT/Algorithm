import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Define the sign-in handler function
const handleSignIn = async (email, password) => {
  const auth = getAuth();

  try {
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Get the signed-in user info
    const user = userCredential.user;
    console.log("User signed in successfully:", user);
    
    // You can do further actions with the user object here, such as saving token, navigating, etc.
    return user;

  } catch (error) {
    // Handle the errors appropriately
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error [${errorCode}]: ${errorMessage}`);

    // You can return or throw the error if you need to propagate it
    return { errorCode, errorMessage };
  }
};

// Example usage of handleSignIn:
const email = "test@example.com";
const password = "password123";

handleSignIn(email, password)
  .then((user) => {
    if (user.errorCode) {
      console.error("Sign-in failed:", user.errorMessage);
    } else {
      console.log("Signed in successfully!", user);
    }
  })
  .catch((err) => {
    console.error("Unexpected error during sign-in:", err);
  });
