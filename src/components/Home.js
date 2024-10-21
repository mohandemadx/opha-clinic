import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const handleNavClick = () => {
  // Define the behavior you want when the label is clicked
  console.log('Navigation label clicked');
};

const Home = () => {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header id="top-header" className="header-home">
        <div className="grid">
            <div>
              <div className="content">
                <div>
                </div>
                <nav className="navigation">
                  {/* <input type="checkbox" id="nav-button"> */}
                  <label htmlFor="nav-button" onClick={handleNavClick}></label>
                  <ul className="nav-container">
                      <li><a href="/login">Login</a></li>
                      <li><a href="/register">Register</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
      </header>
      
      {/* Parallax Section */}
      <div className="parallax-section parallax1">
          <div className="grid grid-pad">
              <div>
                    <div className="content content-header" >
                      <h1>Welcome to Opha Clinic</h1>
                      <p></p>
                  </div>
              </div>
          </div>
      </div>

      {/* CurveUp */}
      <svg className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
      </svg>

      {/* Services Section */}
      <div className="wrap services-wrap" id="services">
          <section className="grid grid-pad services">
              <h2>Our Services</h2>
              <div className="col-1-4 service-box service-1" >
                  <div className="content">
                      <div className="service-icon">
                      {/* <i><img src="images\dodo.jpg" height="125px"></i> */}
                      </div>
                      <div className="service-entry">
                          <h3>Doctors</h3>
                          <p></p>
                          <a className="btn read-more" href="doctors.html">Read More</a>
                      </div>
                  </div>
              </div>
          </section>
      </div>

      {/* CurveDown */}
      <svg className="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 C 50 100 80 100 100 0 Z"></path>
      </svg>

      {/* Parallax Section - Counter */}
      <div className="parallax-section parallax2">
          <div className="wrap">
              <section className="grid grid-pad callout">
                  <div className="col-1-3">
                    <div className="content" >
                      <div className="info-counter">
                      </div>
                    </div>
                  </div>
              </section>
          </div>
      </div>

      {/* CurveUp */}
      <svg className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
      </svg>


      {/* Contact Section */}
      <div className="wrap contact" id="contact">
        <div className="grid grid-pad" >
          <h2>Contact</h2>
          <div >
            <div className="content address">
              <h3>Talk to us</h3>
              <ul>
                <i><a href="mailto:shahda.abdelfatah@gmail.com">Shahd Abdelfattah</a></i>
              </ul>
            </div>
          </div>
        </div>                        
      </div>

    </div>
  );
};

export default Home;
