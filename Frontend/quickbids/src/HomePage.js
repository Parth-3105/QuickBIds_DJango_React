import React from 'react';
// import Header from './components/Header';
import Hero from './components/Hero';
import Category from './components/Category';
import LiveAuction from './components/LiveAuction';
import Features from './components/Features';
import About from './components/About';
// import Services from './components/Service';
import Contact from './components/Contact';
// import Footer from './components/Footer';
function Homepage() {
  return (
    <div className="App">
      <Category/>
      <Hero />
      <LiveAuction/>
      <Features/>
      <About/>
      {/* <Services/> */}
      <Contact/>
      {/* Other components go here */}
    </div>
  );
}

export default Homepage;