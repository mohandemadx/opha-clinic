// src/patients.js
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

// Add a patient
export const addPatient = async (patientData) => {
  try {
    const docRef = await addDoc(collection(db, 'patients'), {
      ...patientData,
      createdAt: new Date(), // Optionally add a created timestamp
    });
    console.log("Patient added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding patient: ", error);
  }
};

// Get all patients
export const getPatients = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'patients'));
    const patients = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return patients;
  } catch (error) {
    console.error("Error getting patients: ", error);
    return [];
  }
};

// Delete a patient
export const deletePatient = async (id) => {
  try {
    await deleteDoc(doc(db, 'patients', id));
    console.log(`Patient with ID ${id} deleted.`);
  } catch (error) {
    console.error("Error deleting patient: ", error);
  }
};
