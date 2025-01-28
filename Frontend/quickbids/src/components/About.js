import React from 'react';
import '../style/About.css';

function About() {
  return (
    <section className="about">
      <div className="about-content">
        <h2>About Us</h2>
        <p>We are dedicated to providing the best service and ensuring our customers' satisfaction. Learn more about our mission and values.</p>
        <a href="#learnmore" className="about-button">Learn More</a>
      </div>
      <div className="about-image">
        <img src="https://i.pinimg.com/originals/6f/16/56/6f1656563b661a65eb2a58ed8ef68180.jpg" alt="About Us" />
      </div>
    </section>
  );
}

export default About;
