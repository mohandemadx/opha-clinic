import { db } from './firebaseConfig';
import { doc, setDoc } from "firebase/firestore"; 

// Function to create a new user document in Firestore
export const createUserDocument = async (userId, userData) => {
  await setDoc(doc(db, "Users", userId), {
    userType: userData.userType, // "admin", "doctor", or "patient"
    name: userData.name,
    email: userData.email,
    profileCompleted: false,
  });
};

export const getUserDocument = async (userId) => {
  const userDoc = await getDoc(doc(db, "Users", userId));
  return userDoc.exists() ? userDoc.data() : null;
};
