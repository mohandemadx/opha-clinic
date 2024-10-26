import { doc, setDoc } from "firebase/firestore";

// Function to create a patient document
export const createPatientDocument = async (patientId, patientData) => {
  await setDoc(doc(db, "Patients", patientId), {
    doctorID: patientData.doctorID, // Link to the assigned doctor
    personalInfo: patientData.personalInfo, // Contains personal and medical details
  });
};

export const getPatientDocument = async (patientId) => {
    const patientDoc = await getDoc(doc(db, "Patients", patientId));
    return patientDoc.exists() ? patientDoc.data() : null;
};