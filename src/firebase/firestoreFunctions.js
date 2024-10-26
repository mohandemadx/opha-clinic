import { db } from './firebaseConfig'; // Import your Firestore configuration
import { doc, setDoc, getDoc, collection, getDocs, query, where, updateDoc } from 'firebase/firestore';

export const addUser = async (userId, email, role, profile) => {
  if (!email || !role) {
    throw new Error("Email and role are required");
  }
  
  const userRef = doc(db, 'users', userId);
  
  try {
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      console.log("User already exists");
      return; // or handle the existing user scenario
    }

    await setDoc(userRef, {
      email,
      role,
      ...profile,
    });
    console.log("User added to Firestore");
    return `User ${userId} added successfully`;
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw new Error("Error adding user to Firestore: " + error.message);
  }
};

export const createUserDocument = async (uid, userData) => {
  try {
    const userDocRef = doc(db, 'users', uid); // Create a document reference in the 'users' collection with uid as the document ID
    await setDoc(userDocRef, userData); // Set the document with the userData
    console.log('User document created successfully');
  } catch (error) {
    console.error('Error creating user document:', error);
    throw new Error(error.message); // Rethrow error for handling in registerUser
  }
};

export const getUserDocument = async (userId) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.exists() ? userDoc.data() : null;
};

export const getAllPatients = async () => {
  const patientsCollection = collection(db, 'users'); // Reference to the users collection
  const q = query(patientsCollection, where('userType', '==', 'patient')); // Create a query to filter by userType
  const snapshot = await getDocs(q); // Fetch documents based on the query
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map over documents and return data
};

export const getAllDoctors = async () => {
  const patientsCollection = collection(db, 'users'); // Reference to the users collection
  const q = query(patientsCollection, where('userType', '==', 'doctor')); // Create a query to filter by userType
  const snapshot = await getDocs(q); // Fetch documents based on the query
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map over documents and return data
};

export const updateUserDocument = async (userId, data) => {
  const userDoc = doc(db, 'users', userId); // Reference to the user document
  await updateDoc(userDoc, data); // Update the document with new data
};