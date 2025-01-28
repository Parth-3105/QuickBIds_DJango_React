import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import axios from 'axios';
// import Product from './Products'
import { useNavigate } from 'react-router-dom';
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [bidHistory, setBidHistory] = useState([]);
  const [newBid, setNewBid] = useState('');
  const [error, setError] = useState('');
  const [cBidder, setcBidder] = useState('');

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${parseInt(id)}/`); // Fetch by ID
        let data = response.data;
        console.log(JSON.stringify(data));

        // Parse the data fields
        const parsedData = {
          title: data.ProductTitle,
          price: parseFloat(data.ProductPrice),
          description: data.ProductDescription,
          images: JSON.parse(data.AllImagesURLs),
          specifications: JSON.parse(data.ItemSpecifications),
          endingTime: data.EndTime,
          currentBid: parseFloat(data.current_BID),
          bidHistory: data.BidHistory || [], // Assume BidHistory is a JSON string
        };

        setProduct(parsedData);
        setCurrentBid(parsedData.currentBid);
        setBidHistory(parsedData.bidHistory);
        setcBidder(data.current_BIDDER)
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Time remaining logic
  const [timeRemaining, setTimeRemaining] = useState('');
  useEffect(() => {
    if (product) {
      const interval = setInterval(() => {
        const now = new Date();
        const end = new Date(product.endingTime);
        const remaining = Math.max(0, end - now);
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remaining / (1000 * 60)) % 60);
        const seconds = Math.floor((remaining / 1000) % 60);
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        if (remaining === 0) {
          alert("Bid is closed")
          clearInterval(interval)
          navigate('/products')
        };
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [product]);

  if (!product) {
    return <div>Product not found!</div>;
  }

  const images = product.images.map((url) => ({
    original: url,
    thumbnail: url,
  }));

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access');
    if (!token) {
      // Redirect to login page if no token is found
      navigate('/login');
      return;
    }

    const bidAmount = parseFloat(newBid);
    const bidder = localStorage.getItem('username')
    if (isNaN(bidAmount) || bidAmount <= currentBid) {
      setError('Please enter a valid bid amount higher than the current bid.');
      return;
    }

    const newBidEntry = {
      amount: bidAmount,
      bidder: bidder, // Replace with real user data
      timestamp: new Date().toISOString(),
    };

    try {
      if (cBidder !== bidder) {
        await axios.patch(`http://127.0.0.1:8000/api/products/${parseInt(id)}/`, {
          current_BIDDER: bidder,
          current_BID: bidAmount,
          BidHistory: [...bidHistory, newBidEntry],
        });

        setCurrentBid(bidAmount);
        setBidHistory([...bidHistory, newBidEntry]);
        setError('');
        setNewBid('');
      }
      else {
        alert('you can not bid as you are the current bidder for this item')
      }
    } catch (error) {
      console.error('Error submitting bid:', error);
      setError('There was an error submitting your bid. Please try again.');
    }
    window.location.reload()
  };


  return (
    <>
      <div style={styles.container}>
        {/* Scrollable left side */}
        <div style={styles.leftSide}>
          <div style={styles.scrollableSection}>
            <ReactImageGallery items={images} showPlayButton={false} showFullscreenButton={false} />
            <h2>{product.title}</h2>
            <p><strong>Price:</strong> ${product.price}</p>
            <p>{product.description}</p>
            <h4>Specifications:</h4>
            <ul>
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scrollable right side */}
        <div style={styles.rightSide}>
          <div style={styles.scrollableSection}>
            <p><strong>Ending Time:</strong> {new Date(product.endingTime).toLocaleString()}</p>
            <p><strong>Time Remaining:</strong> {timeRemaining}</p>

            <h3>Current Bid: ${currentBid}</h3>
            <form onSubmit={handleBidSubmit}>
              <label>
                Place a Bid:
                <input
                  type="number"
                  value={newBid}
                  onChange={(e) => setNewBid(e.target.value)}
                  placeholder={`Enter a bid higher than ${currentBid}`}
                  style={styles.input}
                  min={currentBid}
                />
              </label>
              <button type="submit" style={styles.button}>Submit Bid</button>
              {error && <p style={styles.error}>{error}</p>}
            </form>


            <h4>Bid History:</h4>
            <ul>
              {bidHistory.map((bid, index) => (
                <li key={index}>
                  <strong>{bid.bidder}</strong> bid ${bid.amount} at {new Date(bid.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100vh', // Full viewport height
    padding: '20px',
    fontFamily:'Arial'
  },
  leftSide: {
    flex: '1 1 60%',
    paddingRight: '20px',
    height: '100%', // Set height for scrollable behavior
    overflow: 'hidden', // Hide outer overflow
  },
  rightSide: {
    flex: '1 1 35%',
    paddingLeft: '20px',
    borderLeft: '1px solid #ddd',
    height: '100%', // Set height for scrollable behavior
    overflow: 'hidden', // Hide outer overflow
  },
  scrollableSection: {
    height: '100%',
    overflowY: 'scroll', // Enable scrolling within the section
    paddingRight: '10px', // Optional: add some padding for right side
  },
  input: {
    display: 'block',
    marginTop: '10px',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default ProductDetail;
