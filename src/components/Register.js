// src/components/Register.js
import React, { useState } from 'react';
import { addUser } from '../userServices';
import './style.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('patient'); // Default role
  const [phone, setPhone] = useState('');
  const [userID, setID] = useState('');
  const [error, setError] = useState(null); // To handle errors
  const [success, setSuccess] = useState(null); // To display success messages

  const handleRegister = async (e) => {
    e.preventDefault();

    // Simulate a user ID from Firebase Auth (ideally, you would replace this with the actual user ID)
    const userId = userID; // Replace with actual user ID from Firebase Auth

    const profile = { name, phone };

    try {
      await addUser(userId, email, role, profile);
      setSuccess('User registered successfully!');
      setError(null);
      // Clear fields or redirect after registration
    } catch (err) {
      setError('Error adding user: ' + err.message);
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div class='register'>
        <h2> Register </h2>
        <img src="images/bg_2.jpg"></img>
        <br></br>
        <h7>National ID </h7><br></br>
        <input 
          type="text"
          placeholder="National ID"
          value={userID}
          onChange={(e) => setID(e.target.value)}
          required
        /><br></br>
        <h7>Full Name </h7><br></br>
        <input 
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br></br>
        <h7>Email Address </h7><br></br>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br></br>
        <h7>Phone Number</h7><br></br>
        <input 
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /><br></br>
        <h7>Role</h7><br></br>
        <select  onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <br></br><br></br>
        <button class='btn' type="submit">Register</button>
      </div>
    </form>
  );
};

export default Register;
