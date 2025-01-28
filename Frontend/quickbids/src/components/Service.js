import React from 'react';
import '../style/Service.css';

function Services() {
  return (
    <section className="services">
      <h2>Our Services</h2>
      <div className="service-list">
        <div className="service-item">
          <h3>Service One</h3>
          <p>Details about the first service offered.</p>
        </div>
        <div className="service-item">
          <h3>Service Two</h3>
          <p>Details about the second service offered.</p>
        </div>
        <div className="service-item">
          <h3>Service Three</h3>
          <p>Details about the third service offered.</p>
        </div>
      </div>
    </section>
  );
}

export default Services;
