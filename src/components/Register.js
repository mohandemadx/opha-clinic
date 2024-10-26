// Register.js
import React, { useState } from 'react';
import { registerUser } from '../firebase/auth';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient'); // Default role
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before attempting registration
    setSuccessMessage(''); // Reset success message

    try {
      // Save user data to Firestore
      await registerUser(email, password, role, name, phone);
      
      setSuccessMessage('Registration successful! You can now log in.'); // Set success message
      setEmail(''); // Clear email field
      setPassword(''); // Clear password field
      setName(''); // Clear name field
      setPhone(''); // Clear phone field
    } catch (err) {
      setError(err.message); // Sets the error message if registration fails
      console.error('Registration error:', err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      {error && <p style={styles.error}>{error}</p>} {/* Display error message if exists */}
      {successMessage && <p style={styles.success}>{successMessage}</p>} {/* Display success message if exists */}
      <form onSubmit={handleRegister} style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label>Role:</label>
          <div>
            <label>
              <input
                type="radio"
                value="patient"
                checked={role === 'patient'}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              Patient
            </label>
            <div style={{ margin: '5px 0' }} /> {/* Small space between options */}
            <label>
              <input
                type="radio"
                value="doctor"
                checked={role === 'doctor'}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              Doctor
            </label>
          </div>
        </div>
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
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
  error: {
    color: 'red',
    marginBottom: '15px',
  },
  success: {
    color: 'green',
    marginBottom: '15px',
  },
};

export default Register;
