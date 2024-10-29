// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../firebase/auth'; // Make sure the path is correct
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  // State for error handling
  const navigate = useNavigate();

  const handleNavClick = () => {
    console.log('Navigation label clicked');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);  // Reset error state before attempting login
    try {
      const { user, userData, userID } = await loginUser(email, password); // Login and get user data
      console.log('Login successful');
      // Navigate based on userType
      if (user) {
        const userType = userData.userType; // Assuming userType is returned from your login function
        // Navigate to the appropriate dashboard
        if (userType === 'patient') {
          navigate('/patient-dashboard', { state: { userID } });
        } else if (userType === 'doctor') {
          navigate('/doctor-dashboard', { state: { userID }}); // Add this route if you have a doctor dashboard
        } else {
          navigate('/admin-dashboard'); // Add this route if you have an admin dashboard
        }
      }
    } catch (err) {
      setError(err.message);  // Sets the error message if login fails
      console.error('Login error:', err.message);
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
        <h2>Login</h2>
        {error && <p style={styles.error}>{error}</p>}  {/* Display error message if exists */}
        <form onSubmit={handleLogin} style={styles.form}>
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
          <button className="btn" type="submit" >Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  html: {
    height: '100%',           // Ensure html takes the full height
  },
  body: {
    display: 'flex',
    justifyContent: 'center',  // Centers horizontally
    alignItems: 'center',      // Centers vertically
    minHeight: '100vh',        // Full height of the viewport
    margin: '0px',                 // Remove default margin
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
    margin: '10px 10px',
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

export default Login;
