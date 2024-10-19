// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // Optional if you use Analytics
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Google Auth Provider
import { getFirestore } from 'firebase/firestore'; // Firestore Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTKsXmkWe9RcJxL-K0CbM1UKSxyxfAnGg",
  authDomain: "opha-clinic.firebaseapp.com",
  projectId: "opha-clinic",
  storageBucket: "opha-clinic.appspot.com",
  messagingSenderId: "511251374736",
  appId: "1:511251374736:web:693c6f2686a62e95832e15",
  measurementId: "G-GLVQ72MM2Q" // Optional, if using Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Analytics
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // Google Auth Provider
const analytics = getAnalytics(app); // Optional if using Analytics

// Initialize Firestore
const db = getFirestore(app);

// Export initialized instances
export { auth, provider, db };
