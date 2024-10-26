import { auth, provider } from './firebaseConfig';
import { createUserDocument, getUserDocument } from './firestoreFunctions';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";

export const registerUser = async (email, password, userType, name, phone) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data to Firestore
    await createUserDocument(user.uid, { userType, name, email, phone });

    return { user, error: null }; // Return user and no error
  } catch (error) {
    console.error("Error registering user:", error);
    return { user: null, error: error.message }; // Return null user and the error message
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userID = user.uid;

    // Fetch the user document to see if it exists
    const userData = await getUserDocument(userID);

    return { user, userData, userID }; // Return user information and user data
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error("Login failed: " + error.message);
  }
};

export const loginWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Create a user document in Firestore after successful login
    await createUserDocument(user.uid, { email: user.email, userType: 'patient' }); // Adjust userType as necessary

    return { user, error: null };
  } catch (error) {
    console.error("Error during Google login:", error);
    return { user: null, error: "Google login failed: " + error.message };
  }
};
