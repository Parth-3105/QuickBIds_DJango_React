import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProducts = () => {
  const [loading, setLoading] = useState(true);
  const [userProducts, setUserProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products
        const response = await axios.get('http://127.0.0.1:8000/api/insertUserProduct/');
        const filteredProducts = response.data.filter(product =>
          product.username === localStorage.getItem('username')
        );

        // Fetch detailed info for each filtered product
        const productsWithDetails = await Promise.all(
          filteredProducts.map(async (product) => {
            const detailResponse = await axios.get(`http://127.0.0.1:8000/api/products/${parseInt(product.ProductId)}/`);
            return detailResponse.data;
          })
        );

        // Update state with detailed product data
        setUserProducts(productsWithDetails);
      } catch (err) {
        console.error(err);
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  if (userProducts.length === 0) {
    return <div style={{height:'70vh'}}><center><h4>No products found for this user.</h4></center></div>;
  }
  return (
    <div className="col-md-12" style={{ height: '70vh' }}>
      <center><h2>User Products</h2></center>
      <div
        className="row g-3"
        style={{
          justifyContent: 'center',
          display: 'flex',
          maxHeight: '400px',
          overflowY: 'auto',
        }}
      >
        {userProducts.map(product => (
          <div key={product.ItemID} className="col-sm-6">
            <div className="card p-3 h-100 d-flex flex-row">
              <img
                src={product.MainImageURL}
                alt={product.ProductTitle}
                className="img-fluid rounded me-3"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <div>
                <h3 className="h5">{product.ProductTitle}</h3>
                <p><strong>Price:</strong> ${product.current_BID}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProducts;
