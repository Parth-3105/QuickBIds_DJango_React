import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './HomePage';
import Header from './components/Header';
import Hero from './components/Hero';
// import Category from './components/Category';
import LiveAuction from './components/LiveAuction';
import Features from './components/Features';
import About from './components/About';
import Services from './components/Service';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SignupLogin from './components/SignupLogin';
// import PrivateRoute from './components/PrivateRoute';
import ProductDetail from './components/ProductDetail';
import Products from './components/Products'
import UserProducts from './components/UserProducts';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<SignupLogin />} />
          <Route path="/signup" element={<SignupLogin />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/category/:categoryName" element={< Products />} />
          <Route path="/live-auction" element={<LiveAuction />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/userproducts" element={<UserProducts />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
