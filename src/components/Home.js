import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header id="top-header" class="header-home">
        <div class="grid">
            <div class="col-1-1">
              <div class="content">
                <div class="logo-wrap">
                </div>
                <nav class="navigation">
                  {/* <input type="checkbox" id="nav-button"> */}
                  <label for="nav-button" onclick></label>
                  <ul class="nav-container">
                      <li><a href="#home" class="current">Home</a></li>
                      <li><a href="/login">Login</a></li>
                      <li><a href="/register">Register</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
      </header>
      
      {/* Parallax Section */}
      <div class="parallax-section parallax1">
          <div class="grid grid-pad">
              <div class="col-1-1">
                    <div class="content content-header" >
                      <h1>Welcome to Opha Clinic</h1>
                      <p></p>
                  </div>
              </div>
          </div>
      </div>

      {/* CurveUp */}
      <svg class="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
      </svg>

      {/* Services Section */}
      <div class="wrap services-wrap" id="services">
          <section class="grid grid-pad services">
              <h2>Our Services</h2>
              <div class="col-1-4 service-box service-1" >
                  <div class="content">
                      <div class="service-icon">
                      {/* <i><img src="images\dodo.jpg" height="125px"></i> */}
                      </div>
                      <div class="service-entry">
                          <h3>Doctors</h3>
                          <p></p>
                          <a class="btn read-more" href="doctors.html">Read More</a>
                      </div>
                  </div>
              </div>
          </section>
      </div>

      {/* CurveDown */}
      <svg class="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 C 50 100 80 100 100 0 Z"></path>
      </svg>

      {/* Parallax Section - Counter */}
      <div class="parallax-section parallax2">
          <div class="wrap">
              <section class="grid grid-pad callout">
                  <div class="col-1-3">
                    <div class="content" >
                      <div class="info-counter">
                      </div>
                    </div>
                  </div>
              </section>
          </div>
      </div>

      {/* CurveUp */}
      <svg class="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
      </svg>


      {/* Contact Section */}
      <div class="wrap contact" id="contact">
        <div class="grid grid-pad" >
          <h2>Contact</h2>
          <div class="col-1-2" >
            <div class="content address">
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
