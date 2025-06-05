import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Search.css";
import axios from 'axios';

const CropSearch = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleCropChange = (event) => {
    setSelectedCrop(event.target.value);
  };

  const handleRecommendedClick = (crop) => {
    setSelectedCrop(crop);
  };

  const Navbar = ({ handleLogout }) => {
    return (
      <nav>
        <div className="navbar">
          <div className="logo"><Link to="/">Indian Farmer Portal</Link></div>
          <ul className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Crops</Link></li>
            <li><Link to="/">Marketplace</Link></li>
            <li><Link to="/sell">Sell</Link></li>
            <li><Link to="/">Contact</Link></li>
            <li>
              <a href='#'>
                {isLoggedIn ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <Link to="/login"><button>Login</button></Link>
                )}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  };

  const Sidebar = ({ handleCropChange }) => {
    const cropNames = [
      'Cereals',
      'Pulses',
      'Oilseeds',
      'Fiber Crops',
      'Beverage Crops',
      'Spices',
      'Sugar Crops',
      'Fruits',
      'Vegetables',
      'Cash Crops',
      'Commercial Crops'
    ];

    return (
      <aside className="sidebar">
        <h2 className="sidebar-title">Filter by Crop</h2>
        <ul className="crop-list">
          {cropNames.map((crop, index) => (
            <li key={index}>
              <label className="crop-label">
                <input
                  type="radio"
                  name="crop"
                  value={crop}
                  onChange={handleCropChange}
                />
                {crop}
              </label>
            </li>
          ))}
        </ul>
      </aside>
    );
  };

  const Recommended = ({ handleRecommendedClick }) => {
    const recommendedCrops = ['Cereals', 'Pulses', 'Spices', 'Vegetables'];
    
    return (
      <>
        <div className='recommended'>
          <h2 className="recommended-title">Recommended</h2>
          <div className="recommended-flex">
            <button onClick={() => handleRecommendedClick('')}>All Products</button>
            {recommendedCrops.map((crop, index) => (
              <button key={index} onClick={() => handleRecommendedClick(crop)}>{crop}</button>
            ))}
          </div>
        </div>
      </>
    );
  };
  
  

  const Items = ({ products, selectedCrop }) => {
    const filteredProducts = selectedCrop ? products.filter(product => product.cropType === selectedCrop) : products;

    return (
      <section className="marketplace" id="marketplace">
        <div className="content">
          <div className="products">
            {filteredProducts.map(product => (
              <div className="product" key={product._id}>
                <img src={product.image} alt={product.sellerName} />
                <div className="prod-name">{product.variety}</div>
                <div className="prod-price">{product.pricePerUnit}</div>
                <button className='buy'>BUY</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/getdata')
      .then(response => setProducts(response.data))
      .catch(error => console.log(error))
  }, []);

  return (
    <div className='search'>
      <>
        <Navbar handleLogout={handleLogout} />
        <Sidebar handleCropChange={handleCropChange} />
        <Recommended handleRecommendedClick={handleRecommendedClick} />
        <Items products={products} selectedCrop={selectedCrop} />
      </>
    </div>
  );
};

export default CropSearch;
