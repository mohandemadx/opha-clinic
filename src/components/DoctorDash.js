import React, { useEffect, useState } from 'react'; // Import necessary hooks
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { getUserDocument } from '../firebase/firestoreFunctions'; // Adjust the path as needed
import { auth } from '../firebase/firebaseConfig'; // Import your Firebase auth configuration
import { signOut } from 'firebase/auth'; // Import signOut from Firebase auth

const DoctorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { userID } = location.state || {}; // Retrieve userID from state
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const data = await getUserDocument(userID); // Use userID here
        if (data) {
          setDoctorData(data);
        } else {
          setError('No doctor data found');
        }
      } catch (err) {
        setError('Error fetching doctor data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [userID]); // Dependency should be userID

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log('Logged out successfully'); 
      navigate('/login'); // Navigate to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Error logging out: ' + error.message); // Display logout error
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display any error messages
  }

  return (
    <div style={styles.container}>
      <h2>Doctor Dashboard</h2>
      <div style={styles.card}>
        <h3>Welcome, Dr. {doctorData.name}!</h3>
        <p>Email: {doctorData.email}</p>
        <p>Phone: {doctorData.phone}</p>
      </div>
      <div style={styles.section}>
        <h4>Your Appointments</h4>
        {/* Logic to display doctor's appointments goes here */}
      </div>
      <div style={styles.section}>
        <h4>Your Patients</h4>
        {/* Logic to display patient's list goes here */}
      </div>
      <button style={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  card: {
    padding: '20px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  section: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default DoctorDashboard;
