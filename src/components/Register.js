// Register.js
import React, { useState } from 'react';
import { registerUser } from '../firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';


function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole); 
  };

  const handleNavClick = () => {
    console.log('Navigation label clicked');
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before attempting registration
    setSuccessMessage(''); // Reset success message

    try {
      // Save user data to Firestore
      await registerUser(email, password, role, name, phone, specialization);
      
      setSuccessMessage('Registration successful! You will be directed to the login page in 5 secs.'); // Set success message
      setEmail(''); // Clear email field
      setPassword(''); // Clear password field
      setName(''); // Clear name field
      setPhone(''); // Clear phone field
      setSpecialization('');
      setTimeout(() => {   
        navigate('/login');
      }, 5000);
    } catch (err) {
      setError(err.message); // Sets the error message if registration fails
      console.error('Registration error:', err.message);
    }
  };

  return (
    <div>
      <header id="top-header" className="header-home">
        <div className="grid">
          <div className="content">
            <nav className="navigation">
              <label htmlFor="nav-button" onClick={handleNavClick}></label>
              <ul className="nav-container">
                    <li><Link to="/">Home</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <div style={styles.container}>
        <h2>Register</h2>
        {error && <p style={styles.error}>{error}</p>} {/* Display error message if exists */}
        {successMessage && <p style={styles.success}>{successMessage}</p>} {/* Display success message if exists */}
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputContainer}>
            <label>Register as:</label>
            <div>
              <input
                type="button"
                className={`btn-register ${role === 'patient' ? 'active' : ''}`}
                value="Patient"
                onClick={() => handleRoleSelect('patient')} 
                required
              />
              <div style={{ margin: '5px 0' }} /> {/* Small space between options */}
              <input
                type="button"
                className={`btn-register ${role === 'doctor' ? 'active' : ''}`} 
                value="Doctor"
                onClick={() => handleRoleSelect('doctor')} 
                required
              />
            </div>
          </div>
          {role === 'patient' ? (
          <><div style={styles.inputContainer}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input} />
            </div><div style={styles.inputContainer}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input} />
              </div><div style={styles.inputContainer}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.input} />
              </div><div style={styles.inputContainer}>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={styles.input} />
              </div>
            </>
          ) : (
          <><div style={styles.inputContainer}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input} />
            </div><div style={styles.inputContainer}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input} />
              </div><div style={styles.inputContainer}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.input} />
              </div><div style={styles.inputContainer}>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={styles.input} />
                </div>
                <div style={styles.inputContainer}>
                <label htmlFor="phone">Specialization:</label>
                <input
                  type="text"
                  id="specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                  style={styles.input} />
              </div>
            </>
          )}
          
          <button type="submit" className= "btn">Register</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  body: {
    display: 'flex',
    justifyContent: 'center',  // Centers horizontally
    alignItems: 'center',      // Centers vertically
    minHeight: '100vh',        // Full height of the viewport
    margin: 'auto',                 // Remove default margin
    backgroundColor: '#f8f9fa', // Optional: background color for contrast
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',            // Reduce margin for better centering
    border: '5px 20px 5px 20px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    width: '100%',
    height: '100%',
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
