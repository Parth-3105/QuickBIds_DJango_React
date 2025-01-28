// import React, { useState, useEffect } from 'react';
// import { Link, useParams ,useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import Category from './Category';

// const ProductList = () => {
//   const { categoryName } = useParams(); // Get category name from URL params
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const endpoint = categoryName
//           ? `http://127.0.0.1:8000/api/products/category/${categoryName}`
//           : 'http://127.0.0.1:8000/api/products/';
//         const response = await axios.get(endpoint);
//         const products = response.data
//         const currentTime = new Date();
//         const filteredProducts = products.filter((product) => {
//           const endingTime = new Date(product.EndTime);
//           if (currentTime >= endingTime) {
//             console.log(product.ItemID);
//             handleSubmit(product.ItemID,product.current_BIDDER)
//           }
//           return endingTime > currentTime; // Show only products whose endingTime is still in the future
//         });
//         setProducts(filteredProducts);
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching products.');
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryName]);

//   const handleSubmit = async (productId,current_BIDDER) => {
//     const username = current_BIDDER
//     if (username==='null'){
//         return
//     }
//     try {
//       // Make the POST request to insert data into the backend
//       const response = await axios.post('http://127.0.0.1:8000/api/insertUserProduct/', {
//         username: username,
//         ProductId: productId,
//       });

//       if (response.status === 200) {
//         console.log('Data successfully inserted!');
//       }
//     } catch (error) {
//       console.error('Error inserting data:', error);
//     }
//   };


//   // Depend on categoryName to refetch if it changes

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <>
//       <Category /> {/* Display the category selection component */}
//       <div style={styles.container}>
//         {products.map((product) => (
//           <Link to={`/products/${product.ItemID}`} style={styles.cardLink} key={product.id}>
//             <div style={styles.card}>
//               <img
//                 src={product.MainImageURL}
//                 alt={product.ProductTitle || 'Product Image'}
//                 style={styles.image}
//               />
//               <div>
//                 <h5>{product.ProductTitle}</h5>
//                 <p>${product.current_BID}</p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </>
//   );
// };

// const styles = {
//   container: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//     gap: '20px',
//     padding: '20px',
//   },
//   card: {
//     display: 'flex',
//     flexDirection: 'column',
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     width: '100%',
//     height: '350px',
//     textAlign: 'center',
//     padding: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     boxSizing: 'border-box',
//   },
//   image: {
//     width: '100%',
//     height: '40%',
//     objectFit: 'cover',
//     borderRadius: '8px',
//     marginBottom: '10px',
//   },
//   cardLink: {
//     textDecoration: 'none',
//     color: 'inherit',
//   },
// };

// export default ProductList;
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Category from './Category';

const ProductList = () => {
  const { categoryName } = useParams(); // Get category name from URL params
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = categoryName
          ? `http://127.0.0.1:8000/api/products/category/${categoryName}`
          : 'http://127.0.0.1:8000/api/products/';
        
        const response = await axios.get(endpoint);
        const products = response.data;
        const currentTime = new Date();
        const filteredProducts = products.filter((product) => {
          const endingTime = new Date(product.EndTime);
          if (currentTime >= endingTime) {
            console.log(product.ItemID);
            handleSubmit(product.ItemID, product.current_BIDDER);
          }
          return endingTime > currentTime; // Show only products whose endingTime is still in the future
        });
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const handleSubmit = async (productId, current_BIDDER) => {
    const username = current_BIDDER;
    if (username === 'null') {
      return;
    }
    try {
      // Make the POST request to insert data into the backend
      const response = await axios.post('http://127.0.0.1:8000/api/insertUserProduct/', {
        username: username,
        ProductId: productId,
      });

      if (response.status === 200) {
        console.log('Data successfully inserted!');
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.ProductTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Category /> {/* Display the category selection component */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
          style={styles.searchInput}
        />
        <img src='https://img.icons8.com/ios-filled/39/search--v1.png' style={{height:'35px'}}></img>
      </div>
      <div style={styles.container}>
        {filteredProducts.map((product) => (
          <Link to={`/products/${product.ItemID}`} style={styles.cardLink} key={product.id}>
            <div style={styles.card}>
              <img
                src={product.MainImageURL}
                alt={product.ProductTitle || 'Product Image'}
                style={styles.image}
              />
              <div>
                <h5>{product.ProductTitle}</h5>
                <p>${product.current_BID}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

const styles = {
  searchContainer: {
    display:'flex',
    justifyContent:'end',
    padding: '20px',
    textAlign: 'center',
  },
  searchInput: {
    padding: '10px',
    width: '80%',
    maxWidth: '400px',
    borderRadius: '4px',
    border: '1px solid black',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '100%',
    height: '350px',
    textAlign: 'center',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    fontFamily:'Arial'
  },
  image: {
    width: '100%',
    height: '40%',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

export default ProductList;
