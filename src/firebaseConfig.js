// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // <-- Ensure these are imported

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTKsXmkWe9RcJxL-K0CbM1UKSxyxfAnGg",
  authDomain: "opha-clinic.firebaseapp.com",
  projectId: "opha-clinic",
  storageBucket: "opha-clinic.appspot.com",
  messagingSenderId: "511251374736",
  appId: "1:511251374736:web:693c6f2686a62e95832e15",
  measurementId: "G-GLVQ72MM2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, provider };