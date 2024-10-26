import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPatients, getAllDoctors, updateUserDocument } from '../firebase/firestoreFunctions';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import EditUser from './EditUser';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientData = await getAllPatients();
        const doctorData = await getAllDoctors();
        setPatients(patientData);
        setDoctors(doctorData);
      } catch (err) {
        setError('Error fetching data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Error logging out: ' + error.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = async (id, updatedData) => {
    try {
      await updateUserDocument(id, updatedData); // Update the user in the database
      // Optionally refresh the data or update the local state
      setPatients((prevPatients) => 
        prevPatients.map((patient) => (patient.id === id ? { ...patient, ...updatedData } : patient))
      );
      setDoctors((prevDoctors) => 
        prevDoctors.map((doctor) => (doctor.id === id ? { ...doctor, ...updatedData } : doctor))
      );
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error updating user: ' + error.message);
    } finally {
      setEditingUser(null); // Close the edit form after saving
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>
      <div style={styles.section}>
        <h4>Patients</h4>
        {patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <ul>
            {patients.map((patient) => (
              <li key={patient.id}>
                {patient.name} - {patient.email} - {patient.phone}
                <FontAwesomeIcon 
                  icon={faPen} 
                  style={styles.icon} 
                  onClick={() => handleEdit(patient)} 
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={styles.section}>
        <h4>Doctors</h4>
        {doctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          <ul>
            {doctors.map((doctor) => (
              <li key={doctor.id}>
                Dr. {doctor.name} - {doctor.email} - {doctor.phone}
                <FontAwesomeIcon 
                  icon={faPen} 
                  style={styles.icon} 
                  onClick={() => handleEdit(doctor)} 
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <button style={styles.button} onClick={handleLogout}>
        Logout
      </button>
      {editingUser && (
        <EditUser 
          user={editingUser} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      )}
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
  icon: {
    marginLeft: '10px',
    cursor: 'pointer',
    color: '#007bff',
  },
};

export default AdminDashboard;
