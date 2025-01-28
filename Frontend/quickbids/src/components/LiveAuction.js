import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/LiveAuction.css'
import axios from 'axios';
const LiveAuction = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = 'http://127.0.0.1:8000/api/products/';
        const response = await axios.get(endpoint);
        const products = response.data
        const currentTime = new Date();
        const filteredProducts = products.filter((product) => {
          const endingTime = new Date(product.EndTime);
          return endingTime > currentTime; // Show only products whose endingTime is still in the future
        });
        setProducts(getRandomItems(filteredProducts));
        setLoading(false);
      } catch (error) {
        setError('Error fetching products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  function getRandomItems(productArray, count = 4) {
    const shuffledArray = productArray.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  }

  return (
    <section className="live-auction">
      <div className="live-auction-content">
        <h2>Live Auctions</h2>
        <div className="view-more-container">
          <a href="/products" className="view-more-link">
            View More Auctions
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="view-more-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </div>
        <div className="auction-items">
          {products && products.length > 0 ? (
            products.map((item, index) => (
              <div key={item.ItemID} className="auction-item">
                <Link to={`/products/${item.ItemID}`}>
                  <img src={item.MainImageURL} alt={item.ProductTitle} />
                </Link>
                <h3>{item.ProductTitle}</h3>
                <p className="bid-price">${item.current_BID}</p>
              </div>
            ))
          ) : (
            <p>No auctions available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LiveAuction;
