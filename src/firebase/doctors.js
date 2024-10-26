import { doc, setDoc } from "firebase/firestore";

// Function to create a doctor document
export const createDoctorDocument = async (doctorId, doctorData) => {
  await setDoc(doc(db, "Doctors", doctorId), {
    specialization: doctorData.specialization,
    patients: doctorData.patients, // Array of patient IDs
  });
};

export const getDoctorDocument = async (doctorId) => {
    const doctorDoc = await getDoc(doc(db, "Doctors", doctorId));
    return doctorDoc.exists() ? doctorDoc.data() : null;
};
