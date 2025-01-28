import React from 'react';
import '../style/Contact.css';

function Contact() {
  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit" className="contact-button">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;
