// src/userService.js
import { db } from './firebaseConfig'; // Adjust the path as needed
import { collection, doc, setDoc } from 'firebase/firestore';

// Reference to the users collection
const usersCollection = collection(db, 'Users');

// Function to add a new user
export const addUser = async (userId, email, role, profile) => {
  try {
    const userDocRef = doc(usersCollection, userId);
    await setDoc(userDocRef, {
      email,
      role,
      profile,
      createdAt: new Date(),
    });
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
  }
};
