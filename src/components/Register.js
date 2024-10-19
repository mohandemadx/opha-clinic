// src/components/Register.js
import React, { useState } from 'react';
import { addUser } from '../userServices';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('patient'); // Default role
  const [phone, setPhone] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Simulate a user ID from Firebase Auth
    const userId = email; // Replace with actual user ID from Firebase Auth

    const profile = { name, phone };
    await addUser(userId, email, role, profile);
    // Clear fields or redirect after registration
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
