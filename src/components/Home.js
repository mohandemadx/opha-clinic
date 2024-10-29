import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { getAllDoctors } from '../firebase/firestoreFunctions';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const {userID } = location.state || {};

  // Retrieve isLoggedIn from location.state or set to false if undefined
  const [isLoggedIn, setIsLoggedIn] = useState(location.state?.isLoggedIn || false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorData = await getAllDoctors();
        setDoctors(doctorData);
      } catch (err) {
        setError('Error fetching data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNavClick = () => {
    console.log('Navigation label clicked');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logged out successfully');
      setIsLoggedIn(false); // Update local state
      navigate('/', { state: { isLoggedIn: false } }); // Navigate to login page and reset isLoggedIn state
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Error logging out: ' + error.message);
    }
  };

    const handleProfileClick = () => {
    navigate('/patient-dashboard', {state : {userID}}); 
  };

  return (
    <div className="home-container">
      <header id="top-header" className="header-home">
        <div className="grid">
          <div className="content">
            <nav className="navigation">
              <label htmlFor="nav-button" onClick={handleNavClick}></label>
              <ul className="nav-container">
                {isLoggedIn ?
                (
                  <>
                    <li>
                        <a href="/patient-dashboard" onClick={handleProfileClick}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22" fill="currentColor">
                            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
                          </svg>
                        </a>
                    </li>
                    <li>
                      <a href="/" onClick={handleLogout}>Logout</a>
                    </li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <div className="parallax-section parallax1">
        <div className="grid grid-pad">
          <div className="content content-header">
            <h1>Welcome to Opha Clinic</h1>
          </div>
        </div>
      </div>

      <svg className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
      </svg>

      <div className="wrap services-wrap" id="services">
        <section className="grid grid-pad services">
          <h2>Our Doctors</h2>
          {doctors.map((doctor) => (
            <div className="col-1-4 service-box service-1" key={doctor.id}>
              <div className="content">
                <div className="service-icon">
                  <i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 22 22" fill="currentColor">
                      <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
                    </svg>
                  </i>
                </div>
                <div className="service-entry">
                  <h3>Dr. {doctor.name}</h3>
                  <p> Specialization </p>
                  <a className="btn read-more" href="doctors.html">Book an appointment</a>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>


      <svg className="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 C 50 100 80 100 100 0 Z"></path>
      </svg>
      
      <div className="parallax-section parallax2">
        <div className="wrap">
          <section className="grid grid-pad callout">
            <div className="col-1-3">
              <div className="content">
                <div className="info-counter"></div>
              </div>
            </div>
          </section>
        </div>
      </div>


      <svg className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
      </svg>

      <div className="wrap contact" id="contact">
        <div className="grid grid-pad">
          <h2>Contact</h2>
          <div className="content address">
            <h3>Talk to us</h3>
            <ul>
              <i><a href="mailto:shahda.abdelfatah@gmail.com">Shahd Abdelfattah</a></i>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
