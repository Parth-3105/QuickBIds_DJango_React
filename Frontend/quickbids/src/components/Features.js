import React from 'react';
import '../style/Features.css';

function Features() {
  return (
    <section className="features">
      <h2 className="features-title">Our Features</h2>
      <div className="features-list">
        <div className="feature-item">
          <img src="https://img.icons8.com/officel/80/guest-male.png" alt="Feature 1" />
          <h3>User Registration and Profile Management</h3>
          <p>Description of the first feature.</p>
        </div>
        <div className="feature-item">
          <img src="https://img.icons8.com/pastel-glyph/100/auction.png" alt="Feature 2" />
          <h3>Auction Categories and Filtering</h3>
          <p>Description of the second feature.</p>
        </div>
        <div className="feature-item">
          <img src="https://img.icons8.com/color/100/overview-pages-1.png" alt="Feature 3" />
          <h3>Product Detail Pages</h3>
          <p>Description of the third feature.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
